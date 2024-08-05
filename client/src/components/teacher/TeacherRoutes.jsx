import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from '../header/Header.jsx'
import Sidebar from '../sidebar/Sidebar.jsx'
import Stream from '../../pages/stream/Stream.jsx'
import Homeworks from '../../pages/homeworks/Homeworks.jsx'
import Homework from '../../pages/homework/Homework.jsx'
import Users from '../../pages/users/Users.jsx'
import ProtectedRoute from '../../components/hoc/ProtectedRoute.jsx'

const TeacherRoutes = ({ isAuthenticated, role, setUser, user }) => (
	<Router>
		<div className='container'>
			<div className='left'>
				<Sidebar role={user.role} />
			</div>
			<div className='right'>
				<Header role={user.role} setUser={setUser} />
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
									element={<Homeworks />}
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
	</Router>
)

export default TeacherRoutes
