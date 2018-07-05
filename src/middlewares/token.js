import libraryToken from 'library/token';

export default async (req, res, next) => {
  try {
    if (req.path === '/register' || req.path === '/login') {
      return next();
    }
    const { token } = req.headers;
    if (!token) {
      return res.send({
        success: false,
        message: 'No Token',
        url: req.path
      });
    }
    await libraryToken.verifyToken(token);
    return next();
  } catch (err) {
    const isError = Object.keys(err).length;
    const message = isError ? err : 'Token Error';
    return res.send({
      success: false,
      message
    });
  }
};
