const jwt = require('jsonwebtoken');

const tokenSign = async (user) => {

  return jwt.sign(
    {
      id: user.id,
      usuario: user.usuario,
    },
    "123456",
    {
      expiresIn: "12h",
    }
  );
};
const verifyToken = async (token) => {
  try {
    return jwt.verify(token, "123456");
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      const error = new Error("Token inválido");
      error.status = 409;
      throw error;
    }
    return null;
  }
};

module.exports = {tokenSign, verifyToken};
