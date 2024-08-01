require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const passport = require('passport')
const usersRouter = require('./routes/user.js')
const courseRouter = require('./routes/course.js')
const chatRouter = require('./routes/chat.js')

const http = require('http')
const socketIo = require('socket.io')
const Message = require('./models/Message')
require('./config/passport')(passport)

const app = express()
const PORT = process.env.PORT || 5000

const server = http.createServer(app)
const io = socketIo(server, {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST'],
	},
})

app.use(cors())
app.use(express.json())
app.use(passport.initialize())

app.use('/api/users', usersRouter)
app.use(
	'/api/course',
	passport.authenticate('jwt', { session: false }),
	courseRouter(io)
)
app.use(
	'/api/chat',
	passport.authenticate('jwt', { session: false }),
	chatRouter
)

io.on('connection', socket => {
	console.log('New client connected')

	socket.on('joinCourse', courseId => {
		socket.join(courseId)
	})

	socket.on('sendMessage', async data => {
		try {
			const message = new Message(data)
			await message.save()
			io.to(data.courseId).emit('receiveMessage', message)
		} catch (err) {
			console.error('Error saving message:', err)
		}
	})

	socket.on('disconnect', () => {
		console.log('Client disconnected')
	})
})

mongoose
	.connect(process.env.MONGODB_URI, {})
	.then(() => console.log('MongoDB connected'))
	.catch(err => console.log(err))

server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
