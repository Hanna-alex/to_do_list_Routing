import { useState, useEffect } from 'react';

export const useRequestGetData = () => {
	const [dataTodos, setDataTodos] = useState([]);
	const [todosList, setTodosList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		fetch('http://localhost:3005/todos')
			.then((response) => response.json())
			.then((todos) => {
				if (!todos || todos.length === 0) {
					setDataTodos([]);
					setTodosList([]);
				} else {
					setDataTodos(todos);
					setTodosList(todos);
				}
			})
			.catch((error) => console.error(error))
			.finally(() => setIsLoading(false));
	}, []);

	return {
		isLoading,
		dataTodos,
		todosList,
		setTodosList,
		setDataTodos,
	};
};
