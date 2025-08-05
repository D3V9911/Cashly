import express from 'express';
import { authMiddleware } from "../middleware.js";
import { Account } from "../db.js";
import mongoose from 'mongoose';

export const accountRouter = express.Router();

accountRouter.get('/balance', authMiddleware, async(req,res) => {
    try {
        const userAccount = await Account.findOne({
            userId: req.userId
        });

        if(!userAccount) {
            res.status(404).json({
                message: 'Client side error'
            })
        }
        res.status(200).json({
            balance: userAccount.balance
        }); 
    } catch(error) {
        console.log(error);
    }
});

accountRouter.post('/transfer', authMiddleware, async(req,res) => {
    const session = await mongoose.startSession(); //used when we need to update multiple docs either all or none (atomicity)

    session.startTransaction(); //either all take place or rollback
    try {
        const {to, amount}=req.body;
        if(amount<0) {
            await session.abortTransaction();//rollback
            res.status(400).json({
                message: "Negative amount is not allowed."
            })
        }

        const fromAccount = await Account.findOne({
            userId: req.userId
        }).session(session)

        if(!fromAccount || amount > fromAccount.balance) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient Balance."
            })
        }

        await Account.updateOne(
            {userId: req.userId},
            {
                $inc : { //used to increase balance
                    balance: -amount
                }
            }, 
        ).session(session); ////


        const toAccount = await Account.findOne({
            userId: req.userId
        }).session(session);

        if(!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid Account"
            })
        }

        await Account.updateOne(
            {userId: to},
            {
                $inc: {
                    balance: amount
                }
            }
        ).session(session);

        await session.commitTransaction();
        res.status(200).json({
            message: "Transfer successful"
        })
    } catch(error) {
        await session.abortTransaction();
        res.status(400).json({
            message: "Internal server error so rollback"
        })
    }
    finally {
        await session.endSession();
    }
});