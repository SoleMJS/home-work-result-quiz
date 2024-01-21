const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const {
	getQuestions,
	addQuestion,
	deleteQuestion,
	editQuestion,
} = require('./controllers/question')
const PORT = 3001
const app = express()

app.use(express.static('../frontend/build'))

app.use(cookieParser())
app.use(express.json())

app.get('/questions', async (req, res) => {
	const questions = await getQuestions()

	res.json(questions)
})

app.post('/questions', async (req, res) => {
	try {
		const newQuestion = await addQuestion(req.body)

		res.send(newQuestion)
	} catch (error) {
		console.error('Something went wrong!', error)
	}
})

app.put('/questions/:id', async (req, res) => {
	try {
		await editQuestion(req.params.id, req.body)

		res.json({
			_id: req.params.id,
			...req.body,
		})
	} catch (error) {
		console.error('Something went wrong!', error)
	}
})

app.delete('/questions/:id', async (req, res) => {
	await deleteQuestion(req.params.id)

	res.json(req.params.id)
})

mongoose
	.connect(
		'mongodb+srv://solemka:solemka@solem.onrgtkl.mongodb.net/testsn?retryWrites=true&w=majority'
	)
	.then(() => {
		app.listen(PORT, () => {
			console.log('Server started on port: ', PORT)
		})
	})
