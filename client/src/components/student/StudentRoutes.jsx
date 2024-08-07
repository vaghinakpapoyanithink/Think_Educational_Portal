import React, { useEffect, useState } from 'react'
import {
	BrowserRouter as Router,
	Route,
	Routes,
	useLocation,
} from 'react-router-dom'
import Header from '../header/Header.jsx'
import Sidebar from '../sidebar/Sidebar.jsx'
import Stream from '../../pages/stream/Stream.jsx'
import Homeworks from '../../pages/homeworks/Homeworks.jsx'
import Homework from '../../pages/homework/Homework.jsx'
import Users from '../../pages/users/Users.jsx'
import ProtectedRoute from '../../components/hoc/ProtectedRoute.jsx'

const StudentRoutes = ({ isAuthenticated, role, setUser, user }) => {
	const [idFromUrl, setIdFromUrl] = useState('')
	const location = useLocation()

	useEffect(() => {
		const pathArray = location.pathname.split('/')
		const id = pathArray[pathArray.length - 1]
		setIdFromUrl(id)
	}, [location.pathname])
	return (
		<div className='container'>
			<div className='left'>
				<Sidebar role={user.role} idFromUrl={idFromUrl} />
			</div>
			<div className='right'>
				<Header
					idFromUrl={idFromUrl}
					setIdFromUrl={setIdFromUrl}
					role={user.role}
					setUser={setUser}
				/>
				<div className='content'>
					<Routes>
						<Route
							path='/:id'
							element={
								<ProtectedRoute
									isAuthenticated={isAuthenticated}
									element={<Stream />}
								/>
							}
						/>
						<Route
							path='/stream/:id'
							element={
								<ProtectedRoute
									isAuthenticated={isAuthenticated}
									element={<Stream />}
								/>
							}
						/>
						<Route
							path='/homeworks/:id'
							element={
								<ProtectedRoute
									isAuthenticated={isAuthenticated}
									element={<Homeworks idFromUrl={idFromUrl} />}
								/>
							}
						/>
						<Route
							path='/homework/:id'
							element={
								<ProtectedRoute
									isAuthenticated={isAuthenticated}
									element={<Homework />}
								/>
							}
						/>
						<Route
							path='/users/:id'
							element={
								<ProtectedRoute
									isAuthenticated={isAuthenticated}
									element={<Users />}
								/>
							}
						/>
					</Routes>
				</div>
			</div>
		</div>
	)
}

export default StudentRoutes
