import libraryToken from 'library/token';

export default (req, res, next) => {
  if (req.path === '/register' || req.path === '/login') {
    next();
  }
  const { token } = req.headers;
  if (token) {
    libraryToken.verifyToken(token).then(result => {
      req.decoded = result.verifyResult;
      next();
    }).catch(() => {
      return res.send({ success: false, message: 'Token Error' });
    });
  } else {
    return res.send({
      success: false,
      message: 'No Token',
      url: req.path
    });
  }
};
