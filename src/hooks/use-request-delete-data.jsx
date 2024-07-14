import { useState } from 'react';
import { sortTodos } from '../functions/sortTodos';

export const useRequestDeleteData = (
	dataTodos,
	setDataTodos,
	setTodosList,
	isSortOn
) => {
	const [isDeleting, setIsDeleting] = useState(false);

	const deleteTask = (id) => {
		setIsDeleting(true);

		fetch(`http://localhost:3005/todos/${id}`, {
			method: 'DELETE',
		})
			.then((rawResponse) => rawResponse.json())
			.then(() => {
				const updatedTodos = dataTodos.filter((todo) => todo.id !== id);
				setDataTodos(updatedTodos);
				setTodosList(sortTodos(isSortOn, updatedTodos));
			})
			.catch((error) => console.error(error))
			.finally(() => setIsDeleting(false));
	};

	return {
		isDeleting,
		deleteTask,
	};
};
