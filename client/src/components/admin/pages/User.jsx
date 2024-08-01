import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axiosInstance from '../../../axiosConfig'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'

export default function User() {
	const { userId } = useParams()
	const [user, setUser] = useState(null)
	const [formData, setFormData] = useState({
		name: '',
		surname: '',
		username: '',
		email: '',
		password: '',
	})
	const [teacherCourses, setTeacherCourses] = useState([])
	const [studentCourses, setStudentCourses] = useState([])
	const [userRole, setUserRole] = useState('')
	const navigate = useNavigate()

	useEffect(() => {
		fetchUser()
	}, [])

	const fetchUser = async () => {
		try {
			const response = await axiosInstance.get(`/users/${userId}`)
			const userData = response.data
			setUser(userData)
			setFormData({
				name: userData.name,
				surname: userData.surname,
				username: userData.username,
				email: userData.email,
			})
			setUserRole(userData.role)
			fetchCourses(userData.role)
		} catch (error) {
			console.error('Error fetching user:', error)
		}
	}

	const fetchCourses = async role => {
		try {
			const response = await axiosInstance.get(`/course?userId=${userId}`)
			const { teacherCourses, studentCourses } = response.data
			if (role === 'teacher') {
				setTeacherCourses(teacherCourses)
			} else {
				setStudentCourses(studentCourses)
			}
		} catch (error) {
			console.error('Error fetching courses:', error)
		}
	}

	const handleChange = e => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	const handleDelete = async () => {
		if (window.confirm('Are you sure you want to delete this user?')) {
			try {
				await axiosInstance.delete(`/users/${userId}`)
				toast.success('User deleted')
				navigate('/admin/users')
			} catch (error) {
				toast.error('Error deleting user: ' + error?.response?.data?.message)
				console.error('Error deleting user: ', error)
			}
		}
	}

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			const response = await axiosInstance.put(`/users/${userId}`, formData)
			toast.success('User updated')
			console.log('User updated: ', response?.data)
		} catch (error) {
			toast.error('Error updating user: ' + error?.response?.data?.message)
			console.error('Error updating user: ', error)
		}
	}

	if (!user) {
		return <div>Loading...</div>
	}

	return (
		<>
			<ToastContainer />
			<div className='user-settings'>
				<h1>User Details</h1>
				<form onSubmit={handleSubmit}>
					<div>
						<label>Name:</label>
						<input
							type='text'
							name='name'
							value={formData.name}
							onChange={handleChange}
							required
						/>
					</div>
					<div>
						<label>Surname:</label>
						<input
							type='text'
							name='surname'
							value={formData.surname}
							onChange={handleChange}
							required
						/>
					</div>
					<div>
						<label>Username:</label>
						<input
							type='text'
							name='username'
							value={formData.username}
							onChange={handleChange}
							required
						/>
					</div>
					<div>
						<label>Email:</label>
						<input
							type='email'
							name='email'
							value={formData.email}
							onChange={handleChange}
							required
						/>
					</div>
					<div>
						<label>Password:</label>
						<input
							type='text'
							name='password'
							value={formData.password}
							onChange={handleChange}
						/>
					</div>

					{userRole === 'teacher' && (
						<div className='user-courses'>
							<h2>Courses as Teacher</h2>
							<ul>
								{teacherCourses.map(course => (
									<li key={course._id}>
										{course.courseName} (Starts:{' '}
										{new Date(course.starts).toLocaleDateString()}, Ends:{' '}
										{new Date(course.ends).toLocaleDateString()})
									</li>
								))}
							</ul>
						</div>
					)}
					{userRole === 'student' && (
						<div className='user-courses'>
							<h2>Courses as Student</h2>
							<ul>
								{studentCourses.map(course => (
									<li key={course._id}>
										{course.courseName} (Starts:{' '}
										{new Date(course.starts).toLocaleDateString()}, Ends:{' '}
										{new Date(course.ends).toLocaleDateString()})
									</li>
								))}
							</ul>
						</div>
					)}
					<button type='submit'>Save Changes</button>
					<Link to='/admin/users'>
						<button className='go-back'>Back to Users</button>
					</Link>
					<button className='delete' type='button' onClick={handleDelete}>
						Delete user
					</button>
				</form>
			</div>
		</>
	)
}
