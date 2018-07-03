import jwt from 'jsonwebtoken';
import { jwtConfig } from '../../config';

import { models } from '../../models';
import auth from '../../constants/auth';

export default [
    {
        method: 'post',
        path: '/login',
        handler: (req, res) => {
            const rb = req.body;
            if (rb.username && rb.password) {
                const usernameFind = auth.findOne('users', 'username', rb.username);
                usernameFind.then(data => {
                    if (data.found) {
                        if (data.user.password === rb.password) {
                            const user = data.user;
                            const token = jwt.sign( { user }, jwtConfig.secretKey );
                            res.send({ success: true, message: 'Welcome', user: data.user, token: token });
                        } else {
                            res.send({ success: false, message: 'Wrong Password'});
                        }
                    } else {
                        res.send({ success: false, message: 'No Username Found' });
                    }
                })
            } else {
                res.send({ success: false, message: 'All Area is Required!' });
            }
        }
    },
    {
        method: 'post',
        path: '/register',
        handler: (req, res) => {
            const rb = req.body;
            if (rb.username && rb.email && rb.password && rb.name && rb.surname) {
                const usernameFind = auth.findOne('users', 'username', rb.username);
                usernameFind.then(data => {
                    if (!data.found) {
                        const emailFind = auth.findOne('users', 'email', rb.email);
                        emailFind.then(data => {
                            if (!data.found) {
                                models.users.create({
                                    username: req.body.username,
                                    email: req.body.email,
                                    password: req.body.password,
                                    name: req.body.name,
                                    surname: req.body.surname,
                                    isApproved: false
                                }).then((result) => {
                                    res.send( {
                                        success: true,
                                        message: 'Register Successful',
                                        data: result
                                    });
                                }).catch((error) => {
                                    res.send( {
                                        success: false,
                                        message: error
                                    });
                                });
                            } else {
                                res.send({ success: false, message: 'This Email is Already Have' });
                            }
                        })
                    } else {
                        res.send({ success: false, message: 'This Username is Already Have' });
                    }
                });
            } else {
                res.send({ success: false, message: 'All Area Is Required!' });
            }
        }
    }
];
