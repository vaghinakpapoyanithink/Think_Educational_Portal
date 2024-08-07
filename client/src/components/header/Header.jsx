import React, { useState, useContext } from 'react'
import './styles/styles.scss'
import UserContext from '../../contexts/UserContext.js'
import { NavLink } from 'react-router-dom'

export default function Header({ role, setUser, setIdFromUrl, idFromUrl }) {
	const { user } = useContext(UserContext)
	const [showLogoutPopup, setShowLogoutPopup] = useState(false)

	if (!user) {
		return null
	}

	const logout = () => {
		localStorage.removeItem('token')
		setUser(null)
		setShowLogoutPopup(false)
	}

	const handleLogoutClick = () => {
		setShowLogoutPopup(!showLogoutPopup)
	}

	const handleClosePopup = () => {
		setShowLogoutPopup(false)
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
							<NavLink to='/admin/users' activeClassName='active'>
								All users
							</NavLink>
						</li>
						<li>
							<NavLink to='/admin/create-user' activeClassName='active'>
								Create a user
							</NavLink>
						</li>
						<li>
							<NavLink to='/admin/courses' activeClassName='active'>
								All courses
							</NavLink>
						</li>
						<li>
							<NavLink to='/admin/create-course' activeClassName='active'>
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
							<NavLink to={`/stream/${idFromUrl}`} activeClassName='active'>
								Stream
							</NavLink>
						</li>
						<li>
							<NavLink to={`/homeworks/${idFromUrl}`} activeClassName='active'>
								Homeworks
							</NavLink>
						</li>
						<li>
							<NavLink to={`/users/${idFromUrl}`} activeClassName='active'>
								Users
							</NavLink>
						</li>
					</ul>
				</nav>
				<button className='user-name-button' onClick={handleLogoutClick}>
					{user.name + ' ' + user.surname}
				</button>
				{showLogoutPopup && (
					<div className='logout-popup'>
						<p>Do you want to log out?</p>
						<button onClick={logout}>Yes</button>
						<button onClick={handleClosePopup}>No</button>
					</div>
				)}
			</header>
		)
	} else if (user.role === 'teacher') {
		return (
			<header className='header'>
				<nav>
					<ul>
						<li>
							<NavLink to={`/stream/${idFromUrl}`} activeClassName='active'>
								Stream
							</NavLink>
						</li>
						<li>
							<NavLink to={`/homeworks/${idFromUrl}`} activeClassName='active'>
								Homeworks
							</NavLink>
						</li>
						<li>
							<NavLink to={`/users/${idFromUrl}`} activeClassName='active'>
								Users
							</NavLink>
						</li>
					</ul>
				</nav>
				<button className='user-name-button' onClick={handleLogoutClick}>
					Educational Portal
				</button>
				{showLogoutPopup && (
					<div className='logout-popup'>
						<p>Do you want to log out?</p>
						<button onClick={logout}>Yes</button>
						<button onClick={handleClosePopup}>No</button>
					</div>
				)}
			</header>
		)
	}
}
