import { models } from '../../models';

export default [
    {
        method: 'get',
        path: '/login',
        handler: (req, res) => {
            res.send('login get');
        }
    },
    {
        method: 'post',
        path: '/login',
        handler: (req, res) => {
            res.send('login post');
        }
    },
    {
        method: 'get',
        path: '/register',
        handler: (req, res) => {
            res.send('register get');
        }
    },
    {
        method: 'post',
        path: '/register',
        handler: (req, res) => {
            const rb = req.body;
            if (rb.username && rb.email && rb.password && rb.name && rb.surname) {
                models.users.findOne({ where: { username: rb.username }}).then(response => {
                    if (!response) {
                        models.users.findOne({ where: { email: rb.email }}).then(data => {
                            if (!data) {
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
                                        message: 'An Error %s', error
                                    });
                                });
                            } else {
                                res.send({ success: false, message: 'This Email is already exists' });
                            }
                        })
                    } else {
                        res.send({ success: false, message: 'This username is already exists' });
                    }
                })
            } else {
                res.send({ success: false, message: 'All Area Is Required!' });
            }
        }
    }
];
