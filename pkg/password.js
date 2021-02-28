const brcrypt = require("bcryptjs");

module.exports.hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    brcrypt
      .genSalt(10)
      .then((salt) => {
        brcrypt.hash(password, salt).then((hash) => {
          resolve(hash);
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports.isMatchPassword = (passwordString, passwordHash) => {
  return brcrypt.compare(passwordString, passwordHash);
};
