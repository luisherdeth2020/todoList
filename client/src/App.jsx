// import reactLogo from './assets/react.svg';
import { useEffect, useState } from 'react';

const API_BASE = 'http://localhost:9000';
function App() {
	const [todos, setTodos] = useState([]);
	const [popupActive, setPopupActive] = useState(false);
	const [newTodo, setNewTodo] = useState('');

	useEffect(() => {
		getTodos();
	}, []);
	const getTodos = async () => {
		try {
			const res = await fetch(API_BASE + '/api/todos');
			const data = await res.json();
			setTodos(data);
			// console.log(data);
		} catch (err) {
			console.error('Error: ', err);
		}
	};
	const completeTodo = async (id) => {
		const res = await fetch(API_BASE + '/api/todos/complete/' + id);
		const data = await res.json();
		setTodos((todos) =>
			todos.map((todo) => {
				if (todo._id === data._id) {
					todo.complete = data.complete;
				}
				return todo;
			})
		);
	};
	const deleteTodo = async (id) => {
		await fetch(API_BASE + '/api/todos/delete/' + id, { method: 'DELETE' });

		const res = await fetch(API_BASE + '/api/todos');
		const data = await res.json();

		setTodos(data);
	};
	return (
		<div className="App">
			<h1>Welcome, Luis</h1>
			<h4>Your Tasks</h4>
			<div className="todos">
				{todos.map((todo) => (
					<div
						className={'todo ' + (todo.complete ? 'is-complete' : '')}
						key={todo._id}
						onClick={() => completeTodo(todo._id)}
					>
						<div className="checkbox"></div>
						<div className="text">{todo.text}</div>
						<div className="delete-todo" onClick={() => deleteTodo(todo._id)}>
							x
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default App;
