import React, { useState, useContext, useEffect } from 'react'
import './styles/styles.scss'
import UserContext from '../../contexts/UserContext.js'
import { Link } from 'react-router-dom'

export default function Header({ role, setUser }) {
	const { user } = useContext(UserContext)
	const [showLogoutPopup, setShowLogoutPopup] = useState(false)
	const [idFromUrl, setIdFromUrl] = useState('')

	useEffect(() => {
		const pathArray = window.location.pathname.split('/')
		const id = pathArray[pathArray.length - 1]
		setIdFromUrl(id)
	}, [])

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
							<Link to='/admin/users'>All users</Link>
						</li>
						<li>
							<Link to='/admin/create-user'>Create a user</Link>
						</li>
						<li>
							<Link to='/admin/courses'>All courses</Link>
						</li>
						<li>
							<Link to='/admin/create-course'>Create a course</Link>
						</li>
					</ul>
				</nav>
				<button onClick={() => logout()}>Log-out</button>
			</header>
		)
	} else if (user.role === 'student') {
		return (
			<>
				<header className='header'>
					<nav>
						<ul>
							<li>
								<Link to={`/stream/${idFromUrl}`}>Stream</Link>
							</li>
							<li>
								<Link to={`/homeworks/${idFromUrl}`}>Homeworks</Link>
							</li>
							<li>
								<Link to={`/users/${idFromUrl}`}>Users</Link>
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
			</>
		)
	} else if (user.role === 'teacher') {
		return (
			<>
				<header className='header'>
					<nav>
						<ul>
							<li>
								<Link to={`/stream/${idFromUrl}`}>Stream</Link>
							</li>
							<li>
								<Link to={`/homeworks/${idFromUrl}`}>Homeworks</Link>
							</li>
							<li>
								<Link to={`/users/${idFromUrl}`}>Users</Link>
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
			</>
		)
	}
}
