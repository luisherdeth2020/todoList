// import reactLogo from './assets/react.svg';
import { useEffect, useState } from 'react';

const API_BASE = 'https://todolistapi.up.railway.app';
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

	const addTodo = async () => {
		const res = await fetch(API_BASE + '/api/new', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ text: newTodo }),
		});
		const data = await res.json();
		setTodos([...todos, data]);
		setPopupActive(false);
		setNewTodo("")
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
							X
						</div>
					</div>
				))}
			</div>
			<div className="addPopup" onClick={() => setPopupActive(true)}>
				+
			</div>
			{popupActive ? (
				<div className="popup">
					<div className="closePopup" onClick={() => setPopupActive(false)}>
						X
					</div>
					<div className="content">
						<h3>Add Task</h3>
						<input
							type="text"
							className="add-todo-input"
							onChange={(e) => setNewTodo(e.target.value)}
							value={newTodo}
						/>
						<div className="button" onClick={addTodo}>
							Create Task
						</div>
					</div>
				</div>
			) : (
				''
			)}
		</div>
	);
}

export default App;
