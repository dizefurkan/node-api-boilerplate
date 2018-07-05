import jwt from 'jsonwebtoken';
import { jwtConfig } from 'config';

export default {
  verifyToken: (token) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, jwtConfig.secretKey, (err, data) => {
        if (err) {
          reject(new Error({
            success: false,
            message: err
          }));
        }
        resolve({
          success: true,
          message: 'Token is Decoded',
          verifyResult: data
        });
      });
    });
  }
};
