import React from 'react'
import { NavLink } from 'react-router-dom'
import './styles/styles.scss'

export default function Header() {
	return (
		<header className='header'>
			<nav>
				<ul>
					<li>
						<NavLink to='/stream' activeClassName='active'>
							Stream
						</NavLink>
					</li>
					<li>
						<NavLink to='/homeworks' activeClassName='active'>
							Homeworks
						</NavLink>
					</li>
					<li>
						<NavLink to='/users' activeClassName='active'>
							Users
						</NavLink>
					</li>
				</ul>
			</nav>
			<h1>Educational Portal</h1>
		</header>
	)
}
