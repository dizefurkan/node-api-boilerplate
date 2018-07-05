import jwt from 'jsonwebtoken';
import dbo from 'library/dbHelper';
import Joi from 'joi';
import validater from './validater';
import { models } from 'models';
import { jwtConfig } from 'config';

export default [
  {
    method: 'post',
    path: '/login',
    handler: async (req, res) => {
      try {
        const { email, password } = req.body;
        await Joi.validate(req.body, validater.login);
        const query = {
          where: { email }
        };
        const result = await dbo.findOne(models.user, query);
        if (result.found) {
          if (result.user.password === password) {
            const { user } = result;
            const token = jwt.sign({ user }, jwtConfig.secretKey);
            return res.send({
              found: true,
              user: {
                email: user.email,
                password: user.password,
                name: user.name,
                surname: user.surname
              },
              token
            });
          }
          return res.send({
            found: false,
            message: 'Wrong Email or Password'
          });
        }
        return res.send({
          found: false,
          message: 'Wrong Email or Password'
        });
      } catch (err) {
        return res.send(err);
      }
    }
  },
  {
    method: 'post',
    path: '/register',
    handler: async (req, res) => {
      try {
        const {
          username,
          email,
          password,
          name,
          surname
        } = req.body;
        await Joi.validate(req.body, validater.register);
        let result;
        let query = {
          where: { username }
        };
        result = await dbo.findOne(models.user, query);
        if (!result.found) {
          query = {
            where: { email }
          };
          result = await dbo.findOne(models.user, query);
          if (!result.found) {
            result = await models.user.create(req.body);
            return res.send(result);
          }
          return res.send({
            success: false,
            message: 'This email is already taken'
          });
        }
        return res.send({
          success: false,
          message: 'This username is already taken'
        });
      } catch (err) {
        return res.send(err);
      }
    }
  }
];
