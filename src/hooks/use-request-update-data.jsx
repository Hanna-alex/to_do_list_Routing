import { useState } from 'react';
import { sortTodos } from '../functions/sortTodos';

export const useRequestUpData = (
	editingTodoValue,
	setEditingTodoId,
	setEditingTodoValue,
	todosList,
	setDataTodos,
	setTodosList,
	isSortOn
) => {
	const [updating, setUpdating] = useState(false);

	const requestSaveEditedTask = (editingTodoId) => {
		setUpdating(true);

		const updatedTodos = todosList.map((todo) => {
			if (todo.id === editingTodoId) {
				return { ...todo, title: editingTodoValue };
			}
			return todo;
		});

		fetch(`http://localhost:3005/todos/${editingTodoId}`, {
			method: 'PATCH',
			headers: {
				'content-Type': 'application/json',
			},
			body: JSON.stringify({ title: editingTodoValue }),
		})
			.then(() => {
				setDataTodos(updatedTodos);
				setTodosList(sortTodos(isSortOn, updatedTodos));
				setEditingTodoId(null);
				setEditingTodoValue('');
			})
			.catch((error) => console.error(error))
			.finally(() => setUpdating(false));
	};

	return {
		updating,
		requestSaveEditedTask,
	};
};
