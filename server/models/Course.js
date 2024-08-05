const mongoose = require('mongoose')

const Schema = mongoose.Schema

const homeworkSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	dueDate: {
		type: Date,
		required: true,
	},
	assignedDate: {
		type: Date,
		default: Date.now,
	},
})

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
	homeworks: {
		type: [homeworkSchema],
		default: [],
	},
})

const Course = mongoose.model('Course', courseSchema)

module.exports = Course
