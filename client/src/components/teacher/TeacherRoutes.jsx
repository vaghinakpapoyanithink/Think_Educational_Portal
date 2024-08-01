import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from '../header/Header.jsx'
import Sidebar from '../sidebar/Sidebar.jsx'
import Stream from '../../pages/stream/Stream.jsx'
import Homeworks from '../../pages/homeworks/Homeworks.jsx'
import Homework from '../../pages/homework/Homework.jsx'
import Users from '../../pages/users/Users.jsx'
import ProtectedRoute from '../../components/hoc/ProtectedRoute.jsx'

const TeacherRoutes = ({ isAuthenticated, role, setUser }) => (
	<Router>
		<div className='container'>
			<div className='left'>
				<Sidebar />
			</div>
			<div className='right'>
				<Header role={role} setUser={setUser} />
				<div className='content'>
					<Routes>
						<Route
							path='/'
							element={
								<ProtectedRoute
									isAuthenticated={isAuthenticated}
									element={<Stream />}
								/>
							}
						/>
						<Route
							path='/stream'
							element={
								<ProtectedRoute
									isAuthenticated={isAuthenticated}
									element={<Stream />}
								/>
							}
						/>
						<Route
							path='/homeworks'
							element={
								<ProtectedRoute
									isAuthenticated={isAuthenticated}
									element={<Homeworks />}
								/>
							}
						/>
						<Route
							path='/homework'
							element={
								<ProtectedRoute
									isAuthenticated={isAuthenticated}
									element={<Homework />}
								/>
							}
						/>
						<Route
							path='/users'
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
