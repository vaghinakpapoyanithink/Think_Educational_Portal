const mongoose = require('mongoose')

const Schema = mongoose.Schema

const courseSchema = new Schema({
	courseName: {
		type: String,
		required: true,
	},
	starts: {
		type: Date,
		required: true,
	},
	ends: {
		type: Date,
		required: true,
	},
	courseType: {
		type: String,
		enum: ['online', 'offline'],
		required: true,
	},
	teachers: {
		type: [String],
		required: true,
	},
	students: {
		type: [String],
		required: true,
	},
})

const Course = mongoose.model('Course', courseSchema)

module.exports = Course
