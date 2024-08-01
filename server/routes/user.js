const {
	registerUser,
	getAllUsers,
	getUserById,
	updateUser,
	deleteUser,
	loginUser,
	getCurrentUser,
} = require('../controllers/user.js')
const express = require('express')
const passport = require('passport')
require('../config/passport')(passport) // Ensure passport configuration is loaded

const userRouter = express.Router()

userRouter.get(
	'/me',
	passport.authenticate('jwt', { session: false }),
	getCurrentUser
)
userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)

userRouter.get(
	'',
	passport.authenticate('jwt', { session: false }),
	getAllUsers
)
userRouter.get(
	'/:userId',
	passport.authenticate('jwt', { session: false }),
	getUserById
)
userRouter.put(
	'/:userId',
	passport.authenticate('jwt', { session: false }),
	updateUser
)
userRouter.delete(
	'/:userId',
	passport.authenticate('jwt', { session: false }),
	deleteUser
)

module.exports = userRouter
