const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
    });
    next();
  } catch (err) {
    return res.status(400).json(err.errors);
  }
};

module.exports = validate;
