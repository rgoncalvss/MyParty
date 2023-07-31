const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const UserModel = require('../models/User');

dotenv.config();

const userController = {

  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields are mandatory!' });
      }
      const alreadyExists = await UserModel.findOne({ email });

      if (alreadyExists) {
        return res.status(400).json({ error: 'Email address already taken' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      const user = {
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
      };

      const response = await UserModel.create(user);

      res.status(201).json({ response, msg: 'User created!' });
    } catch (e) {
      res.status(500).json({ error: 'An error occurred while creating the user' });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'All fields are mandatory' });
      }

      const user = await UserModel.findOne({ email });

      const payload = {
        name: user.name,
        email: user.email,
        id: user.id,
      };

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (user && isPasswordValid) {
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: '1d' });
        return res.status(200).json({ accessToken });
      }
      return res.status(401).json({ error: 'User credentials are incorrect' });
    } catch (e) {
      res.status(500).json({ error: 'An error occurred while creating the user' });
    }
  },
};

module.exports = userController;
