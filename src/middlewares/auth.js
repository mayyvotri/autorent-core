module.exports = (req, res, next) => {
  const userId = req.header("x-user-id");

  if (!userId) {
    return res.status(401).json({
      error: {
        message: "Unauthorized - missing x-user-id",
        code: "UNAUTHORIZED",
      },
    });
  }

  // mock login
  req.user = { id: userId };

  next();
};
