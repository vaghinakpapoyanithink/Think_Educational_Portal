import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ element, isAuthenticated, ...rest }) => {
	return isAuthenticated ? element : <Navigate to='/' />
}

export default ProtectedRoute
