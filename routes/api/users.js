const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const Profile = require('../../models/Profile');

router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Valid email is required').isEmail(),
    check('password', 'Password should be be minimum of length 6').isLength({
      min: 6
    }),
    check('gender', 'Gender is required')
      .not()
      .isEmpty(),
    check('age', 'Age is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password, age, gender } = req.body;
    try {
      const user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exsist' }] });
        console.log('user exsist');
      }
      const users = new User({
        name,
        email,
        password
      });

      //Password encryption
      const salt = await bcrypt.genSalt(10);
      users.password = await bcrypt.hash(password, salt);
      await users.save();

      //Create Profile
      const profileField = {
        user: users.id,
        name: users.name,
        age: age,
        gender: gender
      };

      const profile = new Profile(profileField);
      await profile.save();
      console.log({ user: users, profile: profile });
      return res.json({ user: users, profile: profile });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
