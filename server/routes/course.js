const express = require('express')
const router = express.Router()
const courseController = require('../controllers/course.js')

module.exports = io => {
	const {
		addCourse,
		getCoursesByUserId,
		getAllCourses,
		getCourseById,
		updateCourse,
		deleteCourse,
	} = courseController(io)

	router.post('/', addCourse)
	router.get('/user', getCoursesByUserId)
	router.get('/all', getAllCourses)
	router.get('/:courseId', getCourseById)
	router.put('/:courseId', updateCourse)
	router.delete('/:courseId', deleteCourse)

	return router
}
