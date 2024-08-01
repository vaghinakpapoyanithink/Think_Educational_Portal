import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axiosInstance from '../../../axiosConfig.js'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'

export default function Course() {
	const { courseId } = useParams()
	const [course, setCourse] = useState(null)
	const [teachers, setTeachers] = useState([])
	const [students, setStudents] = useState([])
	const [selectedTeacher, setSelectedTeacher] = useState(null)
	const [selectedStudents, setSelectedStudents] = useState([])
	const [formData, setFormData] = useState({
		courseName: '',
		courseType: '',
		instructor: '',
		starts: '',
		ends: '',
	})
	const navigate = useNavigate()

	useEffect(() => {
		fetchCourse()
	}, [])

	const fetchCourse = async () => {
		try {
			const response = await axiosInstance.get('/users')
			let tempTeachers = []
			let tempStudents = []
			response.data.forEach(user => {
				if (user.role === 'teacher') {
					tempTeachers.push({
						label: user.name + ' ' + user.surname,
						value: user._id,
					})
				} else if (user.role === 'student') {
					tempStudents.push({
						label: user.name + ' ' + user.surname,
						value: user._id,
					})
				}
			})
			setTeachers(tempTeachers)
			setStudents(tempStudents)
			const courseResponse = await axiosInstance.get(`/course/${courseId}`)
			const courseData = courseResponse.data
			setCourse(courseData)
			setFormData({
				courseName: courseData.courseName,
				courseType: courseData.courseType,
				starts: new Date(courseData.starts).toISOString().split('T')[0],
				ends: new Date(courseData.ends).toISOString().split('T')[0],
			})

			setSelectedStudents(
				tempStudents.filter(label => courseData.students.includes(label.value))
			)
			setSelectedTeacher(
				tempTeachers.filter(label => courseData.teachers.includes(label.value))
			)
		} catch (error) {
			console.error('Error of fetching:', error)
		}
	}
	const handleChange = e => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	const handleDelete = async () => {
		if (window.confirm('Are you sure you want to delete this course?')) {
			try {
				await axiosInstance.delete(`/course/${courseId}`)
				toast.success('Course deleted')
				navigate('/admin/courses')
			} catch (error) {
				toast.error('Error deleting course: ' + error?.response?.data?.message)
				console.error('Error deleting course: ', error)
			}
		}
	}

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			const response = await axiosInstance.put(`/course/${courseId}`, {
				...formData,
				teachers: selectedTeacher.map(teacher => teacher.value),
				students: selectedStudents.map(student => student.value),
			})
			toast.success('Course updated')
			console.log('Course updated: ', response?.data)
			// Optionally update local state or show success message
		} catch (error) {
			toast.error('Error updating course: ' + error?.response?.data?.message)
			console.error('Error updating course: ', error)
		}
	}

	if (!course) {
		return <div>Loading...</div>
	}

	return (
		<>
			<ToastContainer />
			<div className='course-settings'>
				<h1>Course Details</h1>
				<form onSubmit={handleSubmit}>
					<div>
						<label>Course Name:</label>
						<input
							type='text'
							name='courseName'
							value={formData.courseName}
							onChange={handleChange}
							required
						/>
					</div>
					<div>
						<label>Course Type:</label>
						<select
							name='courseType'
							value={formData.courseType}
							onChange={handleChange}
							required
						>
							<option value='online'>Online</option>
							<option value='offline'>Offline</option>
						</select>
					</div>

					<div>
						<label>Teachers:</label>
						<Select
							options={teachers}
							value={selectedTeacher}
							onChange={setSelectedTeacher}
							placeholder='Select Teacher'
							isMulti
							required
						/>
					</div>

					<div>
						<label>Students:</label>
						<Select
							options={students}
							value={selectedStudents}
							onChange={setSelectedStudents}
							placeholder='Select Students'
							isMulti
							required
						/>
					</div>
					<div>
						<label>Starts:</label>
						<input
							type='date'
							name='starts'
							value={formData.starts}
							onChange={handleChange}
							required
						/>
					</div>
					<div>
						<label>Ends:</label>
						<input
							type='date'
							name='ends'
							value={formData.ends}
							onChange={handleChange}
							required
						/>
					</div>
					<button type='submit'>Save Changes</button>
					<Link to='/admin/courses'>
						<button className='go-back'>Back to Courses</button>
					</Link>
					<button className='delete' type='button' onClick={handleDelete}>
						Delete Course
					</button>
				</form>
			</div>
		</>
	)
}
