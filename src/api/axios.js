import axios from 'axios'

// Создание экземпляра axios для основного API
const api = axios.create({
	baseURL: 'https://api.opros.skroy.ru',
})

// Создание экземпляра axios для наград
const awardsApi = axios.create({
	baseURL: `https://api.achiever.skroy.ru`,
})
// Создание экземпляра axios для пользователя
const userApi = axios.create({
	baseURL: `https://api.users.skroy.ru`,
})
// Создание экземпляра axios для результатов

const interpretationApi = axios.create({
	baseURL: `https://api.profplay.skroy.ru`,
})

// Экспорт экземпляров как named exports
export { api, awardsApi, interpretationApi, userApi }
