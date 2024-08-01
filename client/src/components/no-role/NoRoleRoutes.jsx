import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Header from '../header/Header.jsx'
import Login from '../login/Login.jsx'

const NoRoleRoutes = ({ setUser }) => {
	return (
		<Router>
			<div className='container'>
				<div className='right'>
					<Header role='' />
					<div className='content'>
						<Login setUser={setUser} />
					</div>
				</div>
			</div>
		</Router>
	)
}

export default NoRoleRoutes
