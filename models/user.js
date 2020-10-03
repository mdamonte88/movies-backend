"use strict";

import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
		id: {
			type: "Number",
			primaryKey: true,
			autoIncrement: true
		},
		username:"String",
		email: {
			type: "String",
			required: true,
			unique: true
		},
		password:"String",
		name:"String",
		gender: "String"
	},
	{ collection:"users" })

module.exports = mongoose.model("Users",movieSchema);
