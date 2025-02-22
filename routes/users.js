var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

//get All users
router.get('/get-all', async function (req, res) {
  const users = await prisma.user.findMany();
  res.send(users);
});

//get by id
router.get('get-user/:id', async function (req, res) {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (user === null || user === undefined) {
    res.json(`user with ${id} not found`);
  } else {
    res.send(user);
  }
});

// Create User
router.post('/create', async function (req, res) {
  const { username, email, password } = req.body;

  if (!username) return res.json({ error: 'Please fill the username field' });
  if (!email) return res.json({ error: 'Please fill the email field' });
  if (!password) return res.json({ error: 'Please fill the password field' });

  const hashPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      username: username,
      email: email,
      password: hashPassword,
    },
  });
  res.send(user);
});

// Update User
router.put('/update/:id', async function (req, res) {
  const { id } = req.params;
  const { username, email, password } = req.body;

  const userExist = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!userExist) return res.json({ error: `user with id ${id} not found` });

  if (!username) return res.json({ error: 'Please fill the username field' });
  if (!email) return res.json({ error: 'Please fill the email field' });
  if (!password) return res.json({ error: 'Please fill the password field' });

  const hashPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.update({
    where: {
      id: parseInt(id),
    },
    data: {
      username: username,
      email: email,
      password: hashPassword,
    },
  });
  res.send(user);
});

// Delete User
router.delete('/delete/:id', async function (req, res) {
  const { id } = req.params;
  const userExist = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!userExist) return res.json({ error: `user with id ${id} not found` });

  const user = await prisma.user.delete({
    where: {
      id: parseInt(id),
    },
  });
  res.send(user);
});

module.exports = router;
