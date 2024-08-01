import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './styles.scss'
import axiosInstance from '../../../axiosConfig.js'

const generateRandomString = length => {
	const characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	let result = ''
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length))
	}
	return result
}

const FormComponent = () => {
	const [formData, setFormData] = useState({
		name: '',
		surname: '',
		email: '',
		username: '',
		password: '',
		role: 'student',
	})

	const handleChange = e => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	const handleGenerate = () => {
		const username = `${formData.name}_${formData.surname}`.toLowerCase()
		const password = generateRandomString(8)
		setFormData({
			...formData,
			username,
			password,
		})
	}

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			const response = await axiosInstance.post('/users/register', formData)
			toast.success('User registered successfully!')
			setFormData({
				name: '',
				surname: '',
				email: '',
				username: '',
				password: '',
				role: 'student',
			})
			console.log('User registered: ', response.data)
		} catch (error) {
			toast.error(`Error: ${error.response?.data?.message || error.message}`)
			console.error('Error: ', error.response?.data?.message || error.message)
		}
	}

	return (
		<>
			<ToastContainer />
			<form onSubmit={handleSubmit} className='create-user'>
				<div>
					<label>Name:</label>
					<input
						type='text'
						name='name'
						value={formData.name}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label>Surname:</label>
					<input
						type='text'
						name='surname'
						value={formData.surname}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label>Email:</label>
					<input
						type='email'
						name='email'
						value={formData.email}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label>Username:</label>
					<input
						type='text'
						name='username'
						value={formData.username}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label>Password:</label>
					<input
						type='text'
						name='password'
						value={formData.password}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label>Role:</label>
					<select
						name='role'
						value={formData.role}
						onChange={handleChange}
						required
					>
						<option value='student'>Student</option>
						<option value='teacher'>Teacher</option>
					</select>
				</div>
				<button type='button' onClick={handleGenerate}>
					Generate Username & Password
				</button>
				<button className='submit' type='submit'>
					Submit
				</button>
			</form>
		</>
	)
}

export default FormComponent
