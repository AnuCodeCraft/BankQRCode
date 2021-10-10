const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const crypto = require("crypto"); 
const mongoose = require("mongoose");
const BankDetails = require('../models/bankDetails.model.js')

const router = express.Router()

router.use(bodyParser.json());

router.use( bodyParser.urlencoded({ extended: true }));

router.post("/submit-bankdetails", async (req,res)=>{
    const bankdetails = req.body;
    let hashcode = crypto.randomBytes(20).toString('hex');
    try{
      const response = await BankDetails.create({
        bankDetails: bankdetails,
        hashCode: hashcode
      })
      res.status(200).json({ message: "Details added Successfully" , UserId: response._id , HashCode: response.hashCode })
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ status: 'error', error: 'Try again' })
      }
      throw error
    }
  })


router.post("/get-bankdetails", async (req, res) => {
   const id = req.body.UserId;
   const hashcode = req.body.HashCode;
   const bankDetails = await BankDetails.findOne({ _id: id, hashCode: hashcode })
   if (!bankDetails) {
		return res.status(400).json({ status: 'error', error: 'Invalid data' })
	}
  return res.status(200).json({ message: 'success', data: bankDetails.bankDetails })
	
})



module.exports = router;