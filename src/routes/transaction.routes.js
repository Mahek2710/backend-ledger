const { Router } = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const transactionController = require('../controllers/transaction.controller');

const transactionRoutes = Router();

/**
 * -POST /api/transactions/
 * -Create a new transaction for the authenticated user
 * -Protected route, requires authentication
 */
transactionRoutes.post("/", authMiddleware, transactionController.createTransaction);

/**
 * - POST /api/transactions/system/initial-funds
 * - Create initial funds transaction from system user
 */

// ❌ removed .authSystemMiddleware (it was undefined)
transactionRoutes.post("/system/initial-funds", authMiddleware, transactionController.createInitialFundsTransaction);

module.exports = transactionRoutes;