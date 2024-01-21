import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components'

export const FinishPage = ({ score, numQuestions, onRestart }) => {
	const navigate = useNavigate()

	useEffect(() => {
		const data = {
			date: new Date(),
			numQuestions,
			numCorrectAnswers: score,
		}
		const walkthroughs = localStorage.getItem('walkthroughs')
			? JSON.parse(localStorage.getItem('walkthroughs'))
			: []

		walkthroughs.push(data)
		localStorage.setItem('walkthroughs', JSON.stringify(walkthroughs))
	}, [numQuestions, score])
	return (
		<div className="container mt-5 text-center">
			<h1 className="mb-4 display-4">Тест завершён</h1>
			<p className="lead mb-4">
				Правильных ответов: <span className="text-danger">{score}</span>
			</p>
			{score / numQuestions <= 0.3 && (
				<div className="bg-bad h-[200px] w-[200px] bg-center"></div>
			)}
			{score / numQuestions > 0.3 && score / numQuestions < 0.7 && (
				<div className="bg-norm h-[200px] w-[200px] bg-center"></div>
			)}
			{score / numQuestions >= 0.7 && (
				<div className="bg-good h-[200px] w-[200px] bg-center"></div>
			)}

			<div className="d-flex justify-content-center mt-4">
				<Button
					className="btn btn-primary me-2"
					title="На главную"
					onClick={() => navigate('/')}
				/>
				<Button
					className="btn btn-success"
					title="Пройти ещё раз"
					onClick={onRestart}
				/>
			</div>
		</div>
	)
}
