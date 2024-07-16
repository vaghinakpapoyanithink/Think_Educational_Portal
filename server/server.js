const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Connect to MongoDB
mongoose
	.connect(
		'mongodb+srv://vaghinakpapoyanithink:auvbJRUerPR0a26S@thinklearningportal.zagadkr.mongodb.net/?retryWrites=true&w=majority&appName=ThinkLearningPortal',
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	)
	.then(() => console.log('MongoDB connected'))
	.catch(err => console.log(err))

app.get('/', (req, res) => {
	res.send('Server is running')
})

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
