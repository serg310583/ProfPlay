import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	allTests: [
		{
			id: '56eaa6fd-0cd9-4d4e-8a58-15b33fdcd7a5',
			title: 'Тест Дж. Холланда',
			subtitle: '(модификация Резапкиной)',
			link: '/?id=3',
			recommendations: [
				'Определение профессионального типа личности',
				'Подходящие сферы деятельности',
				'Подборка рекомендованных профессий',
			],
		},
		{
			id: '1b580385-8d6c-4532-b3bf-4ed105afa732',
			title: 'Тест мотивов выбора профессии Р.В. Овчаровой',
			link: '/?id=2',
			recommendations: [
				'Подходящие мотивации',
				'Самоопределение',
				'Степень влияния факторов на выбор профессии',
			],
		},
		{
			id: '944c919d-3294-4048-b342-c8408667d9d3',
			title: 'Тест Климова',
			link: '/?id=1',
			recommendations: [
				'Профориентационный опрос',
				'Склонности к сферам деятельности',
				'Подборка рекомендованных профессий',
			],
		},
	],
}

const testsSlice = createSlice({
	name: 'tests',
	initialState,
	reducers: {
		addTest: (state, action) => {
			state.allTests.push(action.payload)
		},
		removeTest: (state, action) => {
			state.allTests = state.allTests.filter(
				(test) => test.id !== action.payload
			)
		},
		updateTest: (state, action) => {
			const { id, title, subtitle, link } = action.payload
			const existingTest = state.allTests.find((test) => test.id === id)
			if (existingTest) {
				existingTest.title = title
				existingTest.subtitle = subtitle
				existingTest.link = link
			}
		},
	},
})
export const selectAllTests = (state) => state.tests.allTests
export const { addTest, removeTest, updateTest } = testsSlice.actions
export default testsSlice.reducer
