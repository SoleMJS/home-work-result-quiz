import { Route, Routes } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { EditPage, MainPage, QuizPage } from './pages'

export const App = () => {
	return (
		<Routes>
			<Route path="/" element={<MainPage />} />
			<Route path="/quiz" element={<QuizPage />} />
			<Route path="/edit" element={<EditPage />} />
		</Routes>
	)
}
