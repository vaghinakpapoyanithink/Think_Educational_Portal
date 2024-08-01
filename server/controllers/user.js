require('dotenv').config()
const User = require('../models/User')
const jwt = require('jwt-simple')
const bcrypt = require('bcryptjs')

const registerUser = async (req, res) => {
	const { name, surname, username, email, password, role } = req.body

	try {
		const userExists = await User.findOne({
			$or: [{ email: email }, { username: username }],
		})
		if (userExists) {
			return res.status(400).json({ message: 'User already exists' })
		}

		const user = await User.create({
			name,
			surname,
			username,
			email,
			password,
			role,
		})

		if (user) {
			res.status(201).json({
				_id: user._id,
				name: user.name,
				surname: user.surname,
				username: user.username,
				email: user.email,
				role: user.role,
			})
		} else {
			res.status(400).json({ message: 'Invalid user data' })
		}
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

const getAllUsers = async (req, res) => {
	try {
		const users = await User.find().populate('courses')
		res.status(200).json(users)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

const getUserById = async (req, res) => {
	const { userId } = req.params

	try {
		const user = await User.findById(userId).populate('courses')
		if (!user) {
			return res.status(404).json({ message: 'User not found' })
		}
		res.status(200).json({
			name: user.name,
			surname: user.surname,
			email: user.email,
			username: user.username,
			role: user.role,
			courses: user.courses,
		})
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

const updateUser = async (req, res) => {
	const { userId } = req.params
	let { name, surname, email, username, role, password } = req.body

	if (password) {
		const salt = await bcrypt.genSalt(10)
		password = await bcrypt.hash(password, salt)
	}
	const emailExists = await User.findOne({ email, _id: { $ne: userId } })
	if (emailExists) {
		return res.status(400).json({ message: 'Email already in use' })
	}
	const usernameExists = await User.findOne({ username, _id: { $ne: userId } })
	if (usernameExists) {
		return res.status(400).json({ message: 'Username already in use' })
	}
	try {
		let updatedUser
		if (password) {
			updatedUser = await User.findByIdAndUpdate(
				userId,
				{
					name,
					surname,
					email,
					username,
					role,
					password,
				},
				{ new: true }
			)
		} else {
			updatedUser = await User.findByIdAndUpdate(
				userId,
				{
					name,
					surname,
					email,
					username,
					role,
				},
				{ new: true }
			)
		}

		if (!updatedUser) {
			return res.status(404).json({ message: 'User not found' })
		}

		res.status(200).json(updatedUser)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

const deleteUser = async (req, res) => {
	const { userId } = req.params

	try {
		const user = await User.findById(userId)

		if (!user) {
			return res.status(404).json({ message: 'User not found' })
		}

		await user.deleteOne()

		res.status(200).json({ message: 'User removed' })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

const loginUser = async (req, res) => {
	const { identifier, password } = req.body
	try {
		const adminUsername = process.env.ADMIN_USERNAME
		const adminEmail = process.env.ADMIN_EMAIL

		if (identifier === adminUsername || identifier === adminEmail) {
			const user = await User.findOne({
				$or: [{ email: adminEmail }, { username: adminUsername }],
			})

			if (!user) {
				return res
					.status(400)
					.json({ error: 'Invalid email/username or password' })
			}

			const isMatch = await user.matchPassword(password)
			if (!isMatch) {
				return res
					.status(400)
					.json({ error: 'Invalid email/username or password' })
			}

			const payload = { id: user.id, role: 'admin' }
			const token = jwt.encode(payload, process.env.SECRET_OR_KEY)

			return res.json({ token, role: 'admin' })
		}

		const user = await User.findOne({
			$or: [{ email: identifier }, { username: identifier }],
		}).populate('courses')

		if (!user) {
			return res
				.status(400)
				.json({ error: 'Invalid email/username or password' })
		}

		const isMatch = await user.matchPassword(password)
		if (!isMatch) {
			return res
				.status(400)
				.json({ error: 'Invalid email/username or password' })
		}

		const payload = { id: user.id, role: user.role }
		const token = jwt.encode(payload, process.env.SECRET_OR_KEY)

		res.json({
			token,
			role: user.role,
			name: user.name,
			email: user.email,
			surname: user.surname,
			username: user.username,
			courses: user.courses,
		})
	} catch (err) {
		console.error(err)
		res.status(500).json({ error: 'Internal server error' })
	}
}

const getCurrentUser = async (req, res) => {
	try {
		const user = await User.findById(req.user.id)
			.select('-password')
			.populate('courses')
		if (!user) {
			return res.status(404).json({ message: 'User not found' })
		}
		res.status(200).json(user)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

module.exports = {
	registerUser,
	loginUser,
	getAllUsers,
	getUserById,
	updateUser,
	deleteUser,
	loginUser,
	getCurrentUser,
}
