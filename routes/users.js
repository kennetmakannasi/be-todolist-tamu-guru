var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
// eslint-disable-next-line
const { stringify } = require('jade/lib/utils');

//get All users
router.get('/get-all', async function (req, res) {
  const users = await prisma.user.findMany();
  res.json(users);
});

//get by id
router.get('/:id', async function (req, res) {
  const { id } = req.params;
  const users = await prisma.user.findMany({
    where: {
      id: parseInt(id),
    },
  });
  res.json(users);
});

// Create User
router.post('/create', async function (req, res) {
  const { username, email, password } = req.body;
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
  const user = await prisma.user.delete({
    where: {
      id: parseInt(id),
    },
  });
  res.send(user);
});

module.exports = router;
