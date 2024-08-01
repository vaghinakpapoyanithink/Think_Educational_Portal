import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from '../header/Header.jsx'
import ProtectedRoute from '../hoc/ProtectedRoute.jsx'
import AdminUsers from './pages/Users.jsx'
import CreateUser from './pages/CreateUser.jsx'
import CreateCourse from './pages/CreateCourse.jsx'
import Courses from './pages/Courses.jsx'
import Course from './pages/Course.jsx'
import User from './pages/User.jsx'

const AdminRoutes = ({ isAuthenticated, role, setUser }) => (
	<Router>
		<div className='container'>
			<div className='right'>
				<Header role={role} setUser={setUser} />
				<div className='content'>
					<Routes>
						<Route
							path='/admin'
							element={
								<ProtectedRoute
									isAuthenticated={isAuthenticated}
									element={<AdminUsers />}
								/>
							}
						/>
						<Route
							path='/'
							element={
								<ProtectedRoute
									isAuthenticated={isAuthenticated}
									element={<AdminUsers />}
								/>
							}
						/>
						<Route
							path='/admin/create-user'
							element={
								<ProtectedRoute
									isAuthenticated={isAuthenticated}
									element={<CreateUser />}
								/>
							}
						/>
						<Route
							path='/admin/users'
							element={
								<ProtectedRoute
									isAuthenticated={isAuthenticated}
									element={<AdminUsers />}
								/>
							}
						/>
						<Route
							path='/admin/users/:userId'
							element={
								<ProtectedRoute
									isAuthenticated={isAuthenticated}
									element={<User />}
								/>
							}
						/>
						<Route
							path='/admin/create-course'
							element={
								<ProtectedRoute
									isAuthenticated={isAuthenticated}
									element={<CreateCourse />}
								/>
							}
						/>
						<Route
							path='/admin/courses'
							element={
								<ProtectedRoute
									isAuthenticated={isAuthenticated}
									element={<Courses />}
								/>
							}
						/>
						<Route
							path='/admin/courses/:courseId'
							element={
								<ProtectedRoute
									isAuthenticated={isAuthenticated}
									element={<Course />}
								/>
							}
						/>
					</Routes>
				</div>
			</div>
		</div>
	</Router>
)

export default AdminRoutes
