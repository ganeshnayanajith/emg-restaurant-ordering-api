'use strict';
const express = require('express');
const router = express.Router();
const UserController = require('./user.controller');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for users management
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Register user
 *     tags: [Users]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Registration Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 */
router.post('/register', UserController.register);
router.post('/login', UserController.login);

module.exports = router;