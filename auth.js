const argon2 = require("@node-rs/argon2");

const hashingMDP = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPasswords = (req, res, next) => {
  argon2
    .hash(req.body.password, hashingMDP)
    .then((hashedPassword) => {
      req.body.hashedPassword = hashedPassword;
      delete req.body.password;

      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = { hashPasswords };