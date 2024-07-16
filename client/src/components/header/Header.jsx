import React from 'react'
import { Link } from 'react-router-dom'
import './styles/styles.scss'

export default function Header() {
	return (
		<header className='header'>
			<nav>
				<ul>
					<li>
						<Link to='/stream'>Stream</Link>
					</li>
					<li>
						<Link to='/homeworks'>Homeworks</Link>
					</li>
					<li>
						<Link to='/users'>Users</Link>
					</li>
				</ul>
			</nav>
			<h1>Educational Portal</h1>
		</header>
	)
}
