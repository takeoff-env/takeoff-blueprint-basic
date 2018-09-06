module.exports = server => async req => {
  const { id } = req.params;
  try {
    const user = await server.app.models.User.findOne({ id }).select(
      '-password',
    );
    return user;
  } catch (e) {
    throw e;
  }
};
