import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import axiosInstance from '../../axiosConfig.js'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import UserContext from '../../contexts/UserContext.js'
import './style/style.scss'
import deleteIcon from '../../assets/images/delete.png'
import editIcon from '../../assets/images/edit.png'

function formatDateToMDY(isoDate) {
	const date = new Date(isoDate)
	const month = date.getMonth() + 1
	const day = date.getDate()
	const year = date.getFullYear()
	const formattedMonth = month < 10 ? `0${month}` : month
	const formattedDay = day < 10 ? `0${day}` : day
	return `${formattedMonth}-${formattedDay}-${year}`
}
export default function HomeWorks({ idFromUrl }) {
	const { user } = useContext(UserContext)

	const course = user.courses.find(course => course._id === idFromUrl)
	console.log(idFromUrl)

	let homeworks = course
		? course.homeworks.sort((a, b) => {
				return new Date(b.dueDate) - new Date(a.dueDate)
		  })
		: []

	const handleDelete = async (courseId, homeworkId) => {
		const confirmDelete = window.confirm(
			'Are you sure you want to delete this homework?'
		)
		if (confirmDelete) {
			try {
				await axiosInstance.delete(
					`/course/${courseId}/homeworks/${homeworkId}`
				)
				toast.success('Homework deleted successfully')
			} catch (error) {
				console.error('Failed to delete homework', error)
				toast.error('Failed to delete homework')
			}
		}
	}

	return (
		<div
			className={
				user.role === 'student'
					? 'homeworks-container homeworks-container-student'
					: 'homeworks-container homeworks-container-teacher'
			}
		>
			<ToastContainer />
			<h2>Homeworks</h2>
			{user.role === 'teacher' && (
				<Link to={`/homeworks/create-homework/${idFromUrl}`}>Add Homework</Link>
			)}
			<ul>
				{homeworks.map(homework => (
					<li key={homework._id} className='homework-item'>
						<div className='left'>{homework.title}</div>
						<div className='right'>
							<div className='date'>{formatDateToMDY(homework.dueDate)}</div>
							{user.role === 'teacher' && (
								<div className='buttons'>
									<Link
										to={`/homeworks/create-homework/${homework._id}/${idFromUrl}`}
										className='edit-icon'
									>
										<img src={editIcon} alt='Edit' />
									</Link>
									<button
										onClick={() => handleDelete(idFromUrl, homework._id)}
										className='delete-icon'
									>
										<img src={deleteIcon} alt='Delete' />
									</button>
								</div>
							)}
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}
