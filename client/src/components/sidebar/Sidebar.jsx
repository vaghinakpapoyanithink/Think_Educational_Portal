import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './styles/styles.scss'
import blenderIcon from '../../assets/images/blender.png'
import webIcon from '../../assets/images/web.png'
import scratchIcon from '../../assets/images/scratch.png'
import UserContext from '../../contexts/UserContext.js'

const courseIcons = {
	'Վեբ ծրագրավորում': webIcon,
	'3d մոդելավորում': blenderIcon,
	scratch: scratchIcon,
}

export default function Sidebar({ role }) {
	const { user } = useContext(UserContext)
	if (user?.courses?.length === 1 || !user || role === 'admin') {
		return null
	}
	if (role === 'student') {
		return (
			<div className='sidebar'>
				<ul>
					{user.courses?.map(course => (
						<li key={course.courseName}>
							<Link to={`/${course._id}`}>
								<img
									src={courseIcons[course.courseName] || webIcon}
									alt={course.courseName}
								/>{' '}
								{course.courseName}
							</Link>
						</li>
					))}
				</ul>
			</div>
		)
	} else if (role === 'teacher') {
		return (
			<div className='sidebar'>
				<ul>
					{user.courses?.map(course => (
						<li key={course.courseName}>
							<Link to={`/${course._id}`}>
								<img
									src={courseIcons[course.courseName] || webIcon}
									alt={course.courseName}
								/>{' '}
								{course.courseName}
							</Link>
						</li>
					))}
				</ul>
			</div>
		)
	}
}
