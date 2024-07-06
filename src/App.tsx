import { useState } from 'react'
import { TodoForm } from '@/components/todoForm/TodoForm'
import { TodoList } from './components/todoList/TodoList'

export type TodoItem = {
	text: string
}

const data: TodoItem[] = [
	{
		text: 'Тестовое задание',
	},
	{
		text: 'Прекрасный код',
	},
	{
		text: 'Покрытие тестами',
	},
]

function App() {
	const [todos, setTodos] = useState(data)

	const addTodo = (todo: TodoItem): void => {
		setTodos([...todos, todo])
	}

	return (
		<>
			<TodoForm addTodo={addTodo} />
			<TodoList
				todos={todos}
				setTodos={setTodos}
			/>
		</>
	)
}

export default App
