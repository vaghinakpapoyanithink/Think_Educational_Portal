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
		addHomework,
		updateHomework,
		deleteHomework,
	} = courseController(io)

	router.post('/add', addCourse)
	router.get('/user', getCoursesByUserId)
	router.get('/all', getAllCourses)
	router.get('/:courseId', getCourseById)
	router.put('/:courseId', updateCourse)
	router.delete('/:courseId', deleteCourse)
	router.post('/courses/:courseId/homeworks', addHomework)
	router.put('/courses/:courseId/homeworks/:homeworkId', updateHomework)
	router.delete('/courses/:courseId/homeworks/:homeworkId', deleteHomework)

	return router
}
