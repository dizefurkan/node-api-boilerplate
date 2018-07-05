import jwt from 'jsonwebtoken';
import auth from 'constants/auth';
import { models } from 'models';
import { jwtConfig } from 'config';

export default [
  {
    method: 'post',
    path: '/login',
    handler: async (req, res) => {
      const { email, password } = req.body;
      if (email && password) {
        const result = await auth.findOne('user', 'email', email);
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
      }
      return res.send({
        success: false,
        message: 'All Area is Required!'
      });
    }
  },
  {
    method: 'post',
    path: '/register',
    handler: async (req, res) => {
      const { username, email, password, name, surname } = req.body;
      if (username && email && password && name && surname) {
        let result;
        result = await auth.findOne('user', 'username', username);
        if (!result.found) {
          result = await auth.findOne('user', 'email', email);
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
      }
      return res.send({
        success: false,
        message: 'Please fill all field!'
      });
    }
  }
];
