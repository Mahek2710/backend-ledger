const mongoose = require('mongoose');


const transactionSchema = new mongoose.Schema({
    fromAccount:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Account",
        required:[true,"Transaction must have a source account"],
        index:true
    },

    toAccount:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Account",
        required:[true,"Transaction must have a destination account"],
        index:true
    },
    status:{
        type:String,
        enum:{
            values:["PENDING","COMPLETED","FAILED","REVERSED"],
            message:"Status must be either PENDING, COMPLETED, FAILED, or REVERSED"
        },
        default:"PENDING"
    },
    amount:{
        type:Number,
        required:[true,"Transaction must have an amount"],
        min:[0,"Amount cannot be negative"]    
    },
    idempotencyKey:{
        type:String,
        required:[true,"Transaction must have an idempotency key"], 
}
},{
    timestamps:true
});

const transactionModel = mongoose.model("Transaction",transactionSchema);

module.exports = transactionModel;