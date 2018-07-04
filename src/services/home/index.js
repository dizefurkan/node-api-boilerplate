export default [
  {
    method: 'get',
    path: '/home',
    handler: (req, res) => {
      res.send({ success: true, message: 'home get', data: req.decoded });
    }
  },
  {
    method: 'post',
    path: '/home',
    handler: (req, res) => {
      res.send('home post');
    }
  }
];
