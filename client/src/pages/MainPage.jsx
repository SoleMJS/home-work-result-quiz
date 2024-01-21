import { useLayoutEffect, useState } from 'react'
import Moment from 'react-moment'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components'
import { loadQuestionsAsync } from '../redux'

export const MainPage = () => {
	const [walkthroughs, setwalkthroughs] = useState([])
	const navigate = useNavigate()
	const dispatch = useDispatch()

	useLayoutEffect(() => {
		dispatch(loadQuestionsAsync())
		setwalkthroughs(
			localStorage.getItem('walkthroughs')
				? JSON.parse(localStorage.getItem('walkthroughs'))
				: []
		)
	}, [dispatch])

	return (
		<>
			<div className="container mt-5 d-flex justify-content-center gap-3">
				<Button
					className="btn btn-primary"
					title="Запустить тест"
					onClick={() => navigate('/quiz')}
				/>
				<Button
					className="btn btn-secondary"
					title="Редактировать тест"
					onClick={() => navigate('/edit')}
				/>
			</div>
			<h2 className="mt-2 mb-4 text-center text-primary">
				История прохождений
			</h2>
			<div className="p-4 d-flex justify-content-between border border-primary rounded">
				<div className="w-100 d-flex flex-column align-items-center">
					<ul className="w-75 list-group">
						{walkthroughs.map((walkthrough) => (
							<li
								key={walkthrough.date.toString()}
								className="my-2 py-2 px-4 d-flex justify-content-between border border-primary rounded"
							>
								<div className="text-primary">
									<Moment date={walkthrough.date} format="DD.MM.YYYYг. HH:mm" />
								</div>
								<div className="h-9 w-9">
									{walkthrough.numCorrectAnswers / walkthrough.numQuestions <=
										0.3 && (
										<div className="bg-bad bg-cover h-[40px] w-[40px] bg-center"></div>
									)}
									{walkthrough.numCorrectAnswers / walkthrough.numQuestions >
										0.3 &&
										walkthrough.numCorrectAnswers / walkthrough.numQuestions <
											0.7 && (
											<div className="bg-norm bg-cover h-[40px] w-[40px] bg-center"></div>
										)}
									{walkthrough.numCorrectAnswers / walkthrough.numQuestions >=
										0.7 && (
										<div className="bg-good bg-cover h-[40px] w-[40px] bg-center"></div>
									)}
								</div>
								<p className="text-primary">
									Верно {walkthrough.numCorrectAnswers} из
									{walkthrough.numQuestions}
								</p>
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	)
}
