const auth = (req, res, next) => {

  // authication using the role and pass
  const { role, pass } = req.headers;
  if (role == 'admin' && pass == 'saveearth') {
    next()
  }
  else {
    res.status(401).json({ message: 'unauthorized' })
  }
};
module.exports = {
  auth,
};

