import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../axiosConfig.js'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './style/styles.scss'

export default function Login({ setUser }) {
	const [formData, setFormData] = useState({
		identifier: '',
		password: '',
	})
	const [error, setError] = useState('')
	const navigate = useNavigate()

	const handleChange = e => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			const response = await axiosInstance.post('users/login', formData)
			toast.success('Login successful!')
			localStorage.setItem('token', response.data.token)
			setUser(response.data)
			navigate(`/${response.data.courses[0]._id}`)
		} catch (err) {
			toast.error('Invalid email/username or password')
			setError('Invalid email/username or password')
		}
	}

	return (
		<div className='login-container'>
			<ToastContainer />
			<h2>Login</h2>
			<form onSubmit={handleSubmit}>
				<div className='form-group'>
					<label htmlFor='identifier'>Email or Username</label>
					<input
						type='text'
						id='identifier'
						name='identifier'
						value={formData.identifier}
						onChange={handleChange}
						required
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						id='password'
						name='password'
						value={formData.password}
						onChange={handleChange}
						required
					/>
				</div>
				{error && <p className='error'>{error}</p>}
				<button type='submit'>Login</button>
			</form>
		</div>
	)
}
