const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

async function comparePassword(plainPassword, hashedPassword) {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    return plainPassword === hashedPassword;
  }
}

async function hashPassword(password) {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    return password;
  }
}

router.post('/register', async (req, res) => {
  try {
    const { username, email, password, fullName } = req.body;

    let user = await global.db.User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await hashPassword(password);

    user = await global.db.User.create({
      username,
      email,
      password: hashedPassword,
      fullName
    });

    const token = jwt.sign(
      { userId: user.id || user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user.id || user._id,
        username: user.username,
        email: user.email,
        fullName: user.full_name || user.fullName
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await global.db.User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    if (user.id) {
      await global.db.User.update(user.id, { lastLogin: new Date().toISOString() });
    }

    const token = jwt.sign(
      { userId: user.id || user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user.id || user._id,
        username: user.username,
        email: user.email,
        fullName: user.full_name || user.fullName
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
