import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import UserContext from '../../contexts/UserContext.js'

export default function HomeWorks() {
	const { user } = useContext(UserContext)
	const { courseId } = useParams()

	const course = user.courses.find(course => course._id === courseId)
	const homeworks = course ? course.homeworks : []

	return (
		<div>
			<h2>Homeworks</h2>
			{user.role === 'teacher' && (
				<button onClick={() => alert('Add Homework functionality')}>
					Add Homework
				</button>
			)}
			<ul>
				{homeworks.map(homework => (
					<li key={homework._id}>
						{homework.title}: {homework.description}
					</li>
				))}
			</ul>
		</div>
	)
}
