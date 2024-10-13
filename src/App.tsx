import { useState } from 'react'
import { TodoForm } from '@/components/todoForm/TodoForm'
import { TodoList } from './components/todoList/TodoList'

export type TodoItem = {
	text: string,
	checked: boolean,
}

const data: TodoItem[] = [
	{
		text: 'Тестовое задание',
		checked: false
	},
	{
		text: 'Прекрасный код',
		checked: false
	},
	{
		text: 'Покрытие тестами',
		checked: false
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
