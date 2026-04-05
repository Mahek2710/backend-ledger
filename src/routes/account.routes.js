const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const accountController = require('../controllers/account.controller');



const router = express.Router();

/**
 * -POST /api/accounts/
 * -Create a new account for the authenticated user
 * -Protected route, requires authentication
 */

router.post("/", authMiddleware, accountController.createAccountController);


module.exports = router;