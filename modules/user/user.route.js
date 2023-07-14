'use strict';
const express = require('express');
const router = express.Router();
const UserController = require('./user.controller');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for users management
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       id:
 *         type: number
 *       name:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 *   SuccessResponse:
 *     type: object
 *     properties:
 *       status:
 *         type: number
 *       message:
 *         type: string
 *       data:
 *         type: object
 *         properties:
 *           accessToken:
 *             type: string
 *           user:
 *             $ref: '#/definitions/User'
 *       error:
 *         type: null
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
 *               name:
 *                 type: string
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
 *               $ref: '#/definitions/SuccessResponse'
 */
router.post('/register', UserController.register);
router.post('/login', UserController.login);

module.exports = router;