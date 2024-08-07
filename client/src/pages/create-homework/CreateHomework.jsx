import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../axiosConfig.js' // Adjust the path as necessary
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './style/style.scss'
import UserContext from '../../contexts/UserContext.js'

export default function CreateHomework({ idFromUrl, setState }) {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [dueDate, setDueDate] = useState('')
	const [loading, setLoading] = useState(false)
	const { user } = useContext(UserContext)

	const navigate = useNavigate()
	const { homeworkId, id } = useParams()

	useEffect(() => {
		if (homeworkId) {
			const course = user.courses.find(course => course._id === id)
			const homework = course.homeworks.find(
				homework => homework._id === homeworkId
			)
			setTitle(homework.title)
			setDescription(homework.description)
			setDueDate(new Date(homework.dueDate).toISOString().split('T')[0])
		} else {
			setDueDate(new Date().toISOString().split('T')[0])
		}
	}, [])

	const handleSubmit = async e => {
		e.preventDefault()
		const homework = { title, description, dueDate }
		if (homeworkId) {
			try {
				setLoading(true)
				await axiosInstance.put(
					`/course/${id}/homeworks/${homeworkId}`,
					homework
				)
				setLoading(false)
				navigate(`/homeworks/${idFromUrl}`) // Redirect to the course page or update as needed
			} catch (error) {
				toast.error('Error adding homework. Please try again.')
				console.error('Error adding homework:', error)
			}
		} else {
			try {
				setLoading(true)
				await axiosInstance.post(`/course/${idFromUrl}/homeworks`, homework)
				setLoading(false)
				navigate(`/homeworks/${idFromUrl}`) // Redirect to the course page or update as needed
			} catch (error) {
				toast.error('Error adding homework. Please try again.')
				console.error('Error adding homework:', error)
			}
		}
	}
	return (
		<div className='add-homework-container'>
			<ToastContainer />
			<h2>Add Homework</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Title:</label>
					<input
						type='text'
						value={title}
						onChange={e => setTitle(e.target.value)}
						required
					/>
				</div>
				<div>
					<label>Description:</label>
					<textarea
						value={description}
						onChange={e => setDescription(e.target.value)}
						required
					></textarea>
				</div>
				<div>
					<label>Due Date:</label>
					<input
						type='date'
						value={dueDate}
						onChange={e => setDueDate(e.target.value)}
						required
					/>
				</div>
				{loading && <button type='button'>loading</button>}
				{!loading && <button type='submit'>Add Homework</button>}
			</form>
		</div>
	)
}
