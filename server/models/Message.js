const mongoose = require('mongoose')

const Schema = mongoose.Schema

const messageSchema = new Schema({
	sender: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	timestamp: {
		type: Date,
		default: Date.now,
	},
	courseId: {
		type: Schema.Types.ObjectId,
		ref: 'Course',
		required: true,
	},
})

const Message = mongoose.model('Message', messageSchema)

module.exports = Message
