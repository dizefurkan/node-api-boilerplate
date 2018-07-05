export default [
  {
    method: 'get',
    path: '/',
    handler: (req, res) => {
      res.send({
        success: true,
        message: 'home get',
        data: req.decoded
      });
    }
  },
  {
    method: 'post',
    path: '/',
    handler: (req, res) => {
      res.send('home post');
    }
  }
];
