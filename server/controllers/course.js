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
			const existingCourse = await Course.findById(courseId)

			if (!existingCourse) {
				return res.status(404).send({ message: 'Course not found' })
			}

			const updatedCourse = await Course.findByIdAndUpdate(
				courseId,
				updateData,
				{
					new: true,
				}
			)

			const oldTeachers = existingCourse.teachers
			const newTeachers = updateData.teachers || []
			const oldStudents = existingCourse.students
			const newStudents = updateData.students || []

			const teachersToAdd = newTeachers.filter(
				teacher => !oldTeachers.includes(teacher)
			)
			const teachersToRemove = oldTeachers.filter(
				teacher => !newTeachers.includes(teacher)
			)
			const studentsToAdd = newStudents.filter(
				student => !oldStudents.includes(student)
			)
			const studentsToRemove = oldStudents.filter(
				student => !newStudents.includes(student)
			)

			await User.updateMany(
				{ _id: { $in: teachersToAdd } },
				{ $push: { courses: courseId } }
			)
			await User.updateMany(
				{ _id: { $in: teachersToRemove } },
				{ $pull: { courses: courseId } }
			)
			await User.updateMany(
				{ _id: { $in: studentsToAdd } },
				{ $push: { courses: courseId } }
			)
			await User.updateMany(
				{ _id: { $in: studentsToRemove } },
				{ $pull: { courses: courseId } }
			)

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
	const addHomework = async (req, res) => {
		const { courseId } = req.params
		const { title, description, dueDate } = req.body

		try {
			const course = await Course.findById(courseId)
			if (!course) {
				return res.status(404).send('Course not found')
			}

			const newHomework = {
				title,
				description,
				dueDate,
			}

			course.homeworks.push(newHomework)
			await course.save()
			res.status(201).send(course)
		} catch (error) {
			res.status(500).send(error.message)
		}
	}
	const updateHomework = async (req, res) => {
		const { courseId, homeworkId } = req.params
		const { title, description, dueDate } = req.body

		try {
			const course = await Course.findById(courseId)
			if (!course) {
				return res.status(404).send('Course not found')
			}

			const homework = course.homeworks.id(homeworkId)
			if (!homework) {
				return res.status(404).send('Homework not found')
			}

			homework.title = title || homework.title
			homework.description = description || homework.description
			homework.dueDate = dueDate || homework.dueDate

			await course.save()
			res.status(200).send(course)
		} catch (error) {
			res.status(500).send(error.message)
		}
	}
	const deleteHomework = async (req, res) => {
		const { courseId, homeworkId } = req.params

		try {
			const course = await Course.findById(courseId)
			if (!course) {
				return res.status(404).send('Course not found')
			}

			course.homeworks.id(homeworkId).remove()
			await course.save()
			res.status(200).send(course)
		} catch (error) {
			res.status(500).send(error.message)
		}
	}

	return {
		addCourse,
		getCoursesByUserId,
		getAllCourses,
		getCourseById,
		updateCourse,
		deleteCourse,
		addHomework,
		deleteHomework,
		updateHomework,
	}
}
