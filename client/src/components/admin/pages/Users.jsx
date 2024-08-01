import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axiosInstance from '../../../axiosConfig.js'
import teacherIcon from '../../../assets/images/teacher.png'
import studentIcon from '../../../assets/images/student.png'
import adminIcon from '../../../assets/images/admin.png'

export default function Users() {
	const [users, setUsers] = useState([])
	const [filter, setFilter] = useState('')

	useEffect(() => {
		fetchUsers()
	}, [])

	const fetchUsers = async () => {
		try {
			const response = await axiosInstance.get('/users')
			setUsers(response.data)
		} catch (error) {
			console.error('Error fetching users:', error)
		}
	}

	const handleFilterChange = e => {
		setFilter(e.target.value)
	}

	const filteredUsers = users.filter(
		user =>
			user.name.toLowerCase().includes(filter.toLowerCase()) ||
			user.surname.toLowerCase().includes(filter.toLowerCase()) ||
			user.email.toLowerCase().includes(filter.toLowerCase())
	)

	return (
		<div className='users-container'>
			<h1>Users</h1>
			<div>
				<Link to='/admin/create-user' className='add-user'>
					<button>Add User</button>
				</Link>
				<input
					type='text'
					placeholder='Filter by name, surname, or email'
					value={filter}
					onChange={handleFilterChange}
				/>
			</div>
			<ul>
				{filteredUsers.map(user => (
					<Link key={user._id} to={`/admin/users/${user._id}`}>
						<li>
							<div>
								<strong>
									{user.name} {user.surname}
								</strong>{' '}
								- {user.email}
							</div>
							{user.role === 'student' ? (
								<img src={studentIcon} />
							) : user.role === 'teacher' ? (
								<img src={teacherIcon} />
							) : (
								<img src={adminIcon} />
							)}
						</li>
					</Link>
				))}
			</ul>
		</div>
	)
}
