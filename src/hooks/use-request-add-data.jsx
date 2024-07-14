import { useState } from 'react';
import { sortTodos } from '../functions/sortTodos';

export const useRequestAdd = (
	todosList,
	todo,
	setTodo,
	setTodosList,
	setDataTodos,
	dataTodos,
	isSortOn
) => {
	const [errorMessage, setErrorMessage] = useState('');
	const [isAdding, setAdding] = useState(false);

	const requestAddTodo = (e) => {
		e.preventDefault();
		setAdding(true);
		setErrorMessage('');

		if (!todo) {
			setErrorMessage('Введите задачу');
			setAdding(false);
		} else if (todosList.some((existingTodo) => existingTodo.title === todo)) {
			setErrorMessage('Такая задача уже существует');
			setAdding(false);
		} else {
			fetch('http://localhost:3005/todos', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ title: todo, completed: false }),
			})
				.then((response) => response.json())
				.then((newTask) => {
					const updatedTodos = [...dataTodos, newTask];
					setDataTodos(updatedTodos);
					setTodosList(sortTodos(isSortOn, updatedTodos));
					setTodo('');
				})
				.catch((error) => console.error(error))
				.finally(() => setAdding(false));
		}
	};

	return {
		isAdding,
		errorMessage,
		requestAddTodo,
	};
};
