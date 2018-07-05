import libraryToken from 'library/token';

export default (req, res, next) => {
  if (req.path === '/register' || req.path === '/login') {
    next();
  }
  const token = req.headers.token;
  if (token) {
    const checkToken = libraryToken.verifyToken(token);
    checkToken.then(result => {
      req.decoded = result.verifyResult;
      next();
    }).catch(() => {
      res.send({ success: false, message: 'Token Error' });
    });
  } else {
    res.send({ success: false, message: 'No Token', url: req.path });
  }
}