module.exports = (request, response, next) => {
  const { method } = request;
  if (method !== 'HEAD' && method !== 'GET') {
    const error = new Error('Method Not Allowed');
    error.status = 405;
    next(error);
  }
  next();
};
