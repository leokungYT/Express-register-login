const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../models/db");

exports.register = async (req, res, next) => {
  const { username, lastname, email, password, phone, Role } = req.body;
  try {
    // validation
    if (!(username && lastname && email && password && phone)) {
      return next(new Error("Fulfill all inputs"));
    }
    const hashedPassword = await bcrypt.hash(password, 8);
    const data = {
      username,
      lastname,
      email,
      password: hashedPassword,
      phone,
      Role,
    };
    const newUser = await prisma.user.create({ data });
    console.log(newUser);

    res.json({ msg: "Registration successful" });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // validation
    if (!(email.trim() && password.trim())) {
      throw new Error("username or password must not blank");
    }
    // find username in db.user
    const user = await prisma.user.findFirstOrThrow({ where: { email } });
    // check password
    const pwOk = await bcrypt.compare(password, user.password);
    if (!pwOk) {
      throw new Error("invalid login");
    }
    // issue jwt token
    const payload = { id: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    console.log(token);
    res.json({ token: token });
  } catch (err) {
    next(err);
  }
};

exports.getme = (req, res, next) => {
  res.json(req.user);
};
