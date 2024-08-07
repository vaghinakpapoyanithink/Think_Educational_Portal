import React, { useContext } from 'react'
import NoRoleRoutes from './components/no-role/NoRoleRoutes.jsx'
import AdminRoutes from './components/admin/AdminRoutes.jsx'
import StudentRoutes from './components/student/StudentRoutes.jsx'
import TeacherRoutes from './components/teacher/TeacherRoutes.jsx'
import './styles/styles.scss'
import { BrowserRouter as Router } from 'react-router-dom'
import Loading from './components/loading/Loading.jsx'
import UserContext, { UserProvider } from './contexts/UserContext'

function App() {
	const { user, setUser, loading } = useContext(UserContext)

	if (loading) {
		return <Loading />
	}
	if (!user?.role) {
		return <NoRoleRoutes setUser={setUser} />
	}
	if (user?.role === 'admin') {
		return <AdminRoutes isAuthenticated={!!user} setUser={setUser} />
	}
	if (user?.role === 'student') {
		return (
			<Router>
				<StudentRoutes user={user} setUser={setUser} isAuthenticated={!!user} />
			</Router>
		)
	}
	if (user?.role === 'teacher') {
		return (
			<Router>
				<TeacherRoutes user={user} setUser={setUser} isAuthenticated={!!user} />
			</Router>
		)
	}

	return null
}

export default function AppWrapper() {
	return (
		<UserProvider>
			<App />
		</UserProvider>
	)
}
