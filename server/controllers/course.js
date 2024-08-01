const Course = require('../models/Course')
const User = require('../models/User')

module.exports = io => {
	const addCourse = async (req, res) => {
		try {
			const {
				courseName,
				starts,
				ends,
				courseType,
				selectedTeacher,
				selectedStudents,
			} = req.body
			const newCourse = new Course({
				courseName,
				starts: new Date(starts),
				ends: new Date(ends),
				courseType,
				teachers: selectedTeacher,
				students: selectedStudents,
			})

			await newCourse.save()

			await User.updateMany(
				{ _id: { $in: selectedTeacher } },
				{ $push: { courses: newCourse._id } }
			)

			await User.updateMany(
				{ _id: { $in: selectedStudents } },
				{ $push: { courses: newCourse._id } }
			)

			res
				.status(201)
				.json({ message: 'Course created successfully', course: newCourse })
		} catch (error) {
			res.status(400).json({ error: error.message })
		}
	}

	const getCoursesByUserId = async (req, res) => {
		const { userId } = req.query
		try {
			const teacherCourses = await Course.find({ teachers: userId })
			const studentCourses = await Course.find({ students: userId })
			res.json({ teacherCourses, studentCourses })
		} catch (error) {
			res.status(500).json({ message: 'Error fetching courses', error })
		}
	}

	const getAllCourses = async (req, res) => {
		console.log('sdf')
		try {
			const courses = await Course.find()
			res.status(200).json(courses)
		} catch (error) {
			res.status(500).json({ message: 'Error fetching courses', error })
		}
	}

	const getCourseById = async (req, res) => {
		try {
			const courseId = req.params.courseId
			const course = await Course.findById(courseId)

			if (!course) {
				return res.status(404).json({ message: 'Course not found' })
			}

			res.status(200).json(course)
		} catch (error) {
			res.status(500).json({ message: 'Server error' })
		}
	}

	const updateCourse = async (req, res) => {
		try {
			const courseId = req.params.courseId
			const updateData = req.body
			const updatedCourse = await Course.findByIdAndUpdate(
				courseId,
				updateData,
				{
					new: true,
				}
			)

			if (!updatedCourse) {
				return res.status(404).send({ message: 'Course not found' })
			}

			res.send(updatedCourse)
		} catch (error) {
			res.status(500).send({ message: error.message })
		}
	}

	const deleteCourse = async (req, res) => {
		try {
			const courseId = req.params.courseId

			const deletedCourse = await Course.findByIdAndDelete(courseId)

			if (!deletedCourse) {
				return res.status(404).send({ message: 'Course not found' })
			}

			await User.updateMany(
				{ courses: courseId },
				{ $pull: { courses: courseId } }
			)

			res.send({ message: 'Course deleted successfully' })
		} catch (error) {
			res.status(500).send({ message: error.message })
		}
	}

	return {
		addCourse,
		getCoursesByUserId,
		getAllCourses,
		getCourseById,
		updateCourse,
		deleteCourse,
	}
}
