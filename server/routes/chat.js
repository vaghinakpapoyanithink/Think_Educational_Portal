const express = require('express')
const router = express.Router()
const Message = require('../models/Message')

// Get messages for a specific course
router.get('/messages/:courseId', async (req, res) => {
	try {
		const messages = await Message.find({ courseId: req.params.courseId }).sort(
			'timestamp'
		)
		res.json(messages)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})

module.exports = router
