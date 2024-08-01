import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import axiosInstance from '../../../axiosConfig.js'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const CreateCourse = () => {
	const [courseName, setCourseName] = useState('')
	const [starts, setStarts] = useState('')
	const [ends, setEnds] = useState('')
	const [courseType, setCourseType] = useState('')
	const [teachers, setTeachers] = useState([])
	const [students, setStudents] = useState([])
	const [selectedTeacher, setSelectedTeacher] = useState(null)
	const [selectedStudents, setSelectedStudents] = useState([])

	useEffect(() => {
		fetchUsers()
	}, [])

	const fetchUsers = async () => {
		try {
			const response = await axiosInstance.get('/users')
			let teachers = []
			let students = []
			response.data.forEach(user => {
				if (user.role === 'teacher') {
					teachers.push({
						label: user.name + ' ' + user.surname,
						value: user._id,
					})
				} else if (user.role === 'student') {
					students.push({
						label: user.name + ' ' + user.surname,
						value: user._id,
					})
				}
			})
			setTeachers(teachers)
			setStudents(students)
		} catch (error) {
			console.error('Error fetching users:', error)
		}
	}

	const handleSubmit = async e => {
		e.preventDefault()
		const courseData = {
			courseName,
			starts,
			ends,
			courseType,
			selectedTeacher: selectedTeacher.map(teacher => teacher.value),
			selectedStudents: selectedStudents.map(student => student.value),
		}
		console.log('Course Data:', courseData)
		try {
			const response = await axiosInstance.post('/course/add', courseData)
			console.log('Course created successfully:', response.data)
			toast.success('Course created successfully!')
		} catch (error) {
			console.error('Error creating course:', error)
			toast.error('Error creating course')
		}
	}

	return (
		<>
			<ToastContainer />
			<form className='create-course' onSubmit={handleSubmit}>
				<div>
					<label>Course Name:</label>
					<input
						type='text'
						value={courseName}
						onChange={e => setCourseName(e.target.value)}
						required
					/>
				</div>

				<div>
					<label>Starts:</label>
					<input
						type='date'
						value={starts}
						onChange={e => setStarts(e.target.value)}
						required
					/>
				</div>

				<div>
					<label>Ends:</label>
					<input
						type='date'
						value={ends}
						onChange={e => setEnds(e.target.value)}
						required
					/>
				</div>

				<div>
					<label>Course Type:</label>
					<select
						value={courseType}
						onChange={e => setCourseType(e.target.value)}
						required
					>
						<option value=''>Select Type</option>
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

				<button type='submit'>Create Course</button>
			</form>
		</>
	)
}

export default CreateCourse
