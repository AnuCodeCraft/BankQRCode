const mongoose = require('mongoose');

const bankDetailsSchema = new mongoose.Schema(
	{   
		bankDetails:{
			type: Object,
			required: true,
			default: null
		},
		hashCode:{ 
			type: String,
			required: true
		},
	},
	{
	  timestamps: true,
	}
)

const BankDetailsSchema = mongoose.model('bankDetailsSchema', bankDetailsSchema)

module.exports = BankDetailsSchema;