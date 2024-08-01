import React, { createContext, useState, useEffect } from 'react'
import axiosInstance from '../axiosConfig.js'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchUser = async () => {
			const token = localStorage.getItem('token')
			if (token) {
				try {
					const response = await axiosInstance.get('/users/me')
					setUser(response.data)
				} catch (error) {
					console.error('Error fetching user info:', error)
					localStorage.removeItem('token')
				}
			}
			setLoading(false)
		}
		fetchUser()
	}, [])

	return (
		<UserContext.Provider value={{ user, setUser, loading }}>
			{children}
		</UserContext.Provider>
	)
}

export default UserContext
