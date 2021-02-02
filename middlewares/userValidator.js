module.exports = (req, res, next) => {
  const user = req.body;

  if (user.name && user.email && user.password) {
    return next();
  };
  res.status(400).send({
    error: 'Missing requied arguments'
  })
}