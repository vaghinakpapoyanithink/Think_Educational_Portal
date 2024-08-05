import React, { useContext, useState, useEffect } from 'react'
import UserContext from '../../contexts/UserContext.js'
import './style/style.scss'

export default function Users() {
	const { user } = useContext(UserContext)
	const [currentCourse, setCurrentCourse] = useState(null)

	useEffect(() => {
		const pathArray = window.location.pathname.split('/')
		const id = pathArray[pathArray.length - 1]
		const course = user.courses.find(course => course._id === id)
		setCurrentCourse(course)
	}, [user.courses])

	if (!currentCourse) {
		return <div>Loading...</div>
	}

	const { students, teachers } = currentCourse

	return (
		<div className='course-users-container'>
			<h2>Course Users</h2>
			<div>
				<h3>Teachers</h3>
				<ul>
					{teachers.map(teacher => (
						<li key={teacher._id}>
							{teacher.name} {teacher.surname} ({teacher.username}) -{' '}
							{teacher.email}
						</li>
					))}
				</ul>
			</div>
			<div>
				<h3 className='students__title'>Students</h3>
				<ul>
					{students.map(student => (
						<li key={student._id}>
							{student.name} {student.surname} ({student.username}) -{' '}
							{student.email}
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}
