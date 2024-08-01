import React, { useContext } from 'react'
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
	console.log(user)
	if (!user) {
		return null
	}
	if (role === 'admin') {
		return <></>
	} else if (role === 'student') {
		return (
			<div className='sidebar'>
				<ul>
					{user.courses?.map(course => (
						<li key={course.courseName}>
							<a href='#'>
								<img
									src={courseIcons[course.courseName] || webIcon}
									alt={course.courseName}
								/>{' '}
								{course.courseName}
							</a>
						</li>
					))}
				</ul>
			</div>
		)
	} else if ((role = 'teacher')) {
		return (
			<div className='sidebar'>
				<ul>
					{user.courses?.map(course => (
						<li key={course.courseName}>
							<a href='#'>
								<img
									src={courseIcons[course.courseName] || webIcon}
									alt={course.courseName}
								/>{' '}
								{course.courseName}
							</a>
						</li>
					))}
				</ul>
			</div>
		)
	}
}
