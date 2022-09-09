const { Users } = require('../models/users.model');

const userExist = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({
        message: 'El Id no fue encontrado, middleware',
        status: 'operacion fallida',
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { userExist };
