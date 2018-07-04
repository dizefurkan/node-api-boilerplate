import jwt from 'jsonwebtoken';
import { models } from 'models';
import { jwtConfig } from 'config';

export default {
  findOne: (table, column, value) => {
    return new Promise((resolve, reject) => {
      models[table].findOne( { where: { [column]: value }}).then(response => {
        if (response) {
          resolve({ message: 'Found', found: true, user: response });
        } else {
          resolve({ message: 'Not Found', found: false });
        }
      })
    })
  },
  verifyToken: (token) => {
    return new Promise((resolve, reject) => {
      const verify = jwt.verify(token, jwtConfig.secretKey, (err, data) => {
        if (err) {
          reject({ success: false, message: err });
        } else {
          resolve({ success: true, message: 'Token is Decoded', verifyResult: data });
        }
      });
    })
  }
};
