var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client');
// eslint-disable-next-line
const prisma = new PrismaClient();
// eslint-disable-next-line
const bcrypt = require('bcrypt');
// eslint-disable-next-line
const { stringify } = require('jade/lib/utils');

module.exports = router;
