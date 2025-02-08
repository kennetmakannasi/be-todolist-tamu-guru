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
  username === ''
    ? res.json('Please fill the username field')
    : email === ''
      ? res.json('Please fill the email field')
      : password === ''
        ? res.json('Please fill the password field')
        : async () => {
            const hashPassword = await bcrypt.hash(password, 10);
            const user = await prisma.user.create({
              data: {
                username: username,
                email: email,
                password: hashPassword,
              },
            });
            res.send(user);
          };
});

// Update User
router.put('/update/:id', async function (req, res) {
  const { id } = req.params;
  const { username, email, password } = req.body;
  username === ''
    ? res.json('Please fill the username field')
    : email === ''
      ? res.json('Please fill the email field')
      : password === ''
        ? res.json('Please fill the password field')
        : async () => {
            const hashPassword = await bcrypt.hash(password, 10);
            const user = await prisma.user.create({
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
          };
});

// Delete User
router.delete('/delete/:id', async function (req, res) {
  const { id } = req.params;
  const userExist = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  userExist === null
    ? res.json(`user with id ${id} not found`)
    : async () => {
        const user = await prisma.user.delete({
          where: {
            id: parseInt(id),
          },
        });
        res.send(user);
      };
});

module.exports = router;
