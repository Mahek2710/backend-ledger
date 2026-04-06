const transactionModel = require('../models/transaction.model');
const ledgerModel = require('../models/ledger.model');
const accountModel = require('../models/account.model');
const emailService = require('../services/email.service');
const mongoose = require('mongoose');



/**
 * - Create a new transaction
 * The 10 step transfer flow:
 * 1. Validate request
 *2. Validate idempotency key
 *3. Check account status
 *4. Derive sender balance from ledger
 *5. Create transaction (PENDING)
 *6. Create DEBIT ledger entry
 *7. Create CREDIT ledger entry
 *8. Mark transaction COMPLETED
 *9. Commit MongoDB session
 *10. Send email notification
 */

 async function createTransaction(req,res){
    /**
     * 1. Validate request
     */
    const {fromAccount,toAccount,amount,idempotencyKey} = req.body;

    if(!fromAccount || !toAccount || !amount || !idempotencyKey){
        return res.status(400).json({message:"Missing required fields: fromAccount, toAccount, amount, idempotencyKey"});
    }

    const fromUserAccount = await accountModel.findOne({_id:fromAccount});
    const toUserAccount = await accountModel.findOne({_id:toAccount});

    if(!fromUserAccount || !toUserAccount){
        return res.status(404).json({message:"One or both accounts not found"});
    }
 }