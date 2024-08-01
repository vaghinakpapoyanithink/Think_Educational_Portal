import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import './styles/styles.scss'
import UserContext from '../../contexts/UserContext.js'

export default function Header({ role, setUser }) {
	const { user } = useContext(UserContext)

	if (!user) {
		return null
	}

	const logout = () => {
		localStorage.removeItem('token')
		setUser(null)
	}

	if (user.role === '') {
		return (
			<header className='header'>
				<nav>
					<ul>
						<li></li>
					</ul>
				</nav>
				<h1>Educational Portal</h1>
			</header>
		)
	}
	if (user.role === 'admin') {
		return (
			<header className='header'>
				<nav>
					<ul>
						<li>
							<NavLink to='/admin/users' activeclassname='active'>
								All users
							</NavLink>
						</li>
						<li>
							<NavLink to='/admin/create-user' activeclassname='active'>
								Create a user
							</NavLink>
						</li>
						<li>
							<NavLink to='/admin/courses' activeclassname='active'>
								All courses
							</NavLink>
						</li>
						<li>
							<NavLink to='/admin/create-course' activeclassname='active'>
								Create a course
							</NavLink>
						</li>
					</ul>
				</nav>
				<button onClick={() => logout()}>Log-out</button>
			</header>
		)
	} else if (user.role === 'student') {
		return (
			<header className='header'>
				<nav>
					<ul>
						<li>
							<NavLink to='/stream' activeclassname='active'>
								Stream
							</NavLink>
						</li>
						<li>
							<NavLink to='/homeworks' activeclassname='active'>
								Homeworks
							</NavLink>
						</li>
						<li>
							<NavLink to='/users' activeclassname='active'>
								Users
							</NavLink>
						</li>
					</ul>
				</nav>
				<h1>{user.name + ' ' + user.surname}</h1>
			</header>
		)
	} else if (user.role === 'teacher') {
		return (
			<header className='header'>
				<nav>
					<ul>
						<li>
							<NavLink to='/stream' activeclassname='active'>
								Stream
							</NavLink>
						</li>
						<li>
							<NavLink to='/homeworks' activeclassname='active'>
								Homeworks
							</NavLink>
						</li>
						<li>
							<NavLink to='/users' activeclassname='active'>
								Users
							</NavLink>
						</li>
					</ul>
				</nav>
				<h1>Educational Portal</h1>
			</header>
		)
	}
}
