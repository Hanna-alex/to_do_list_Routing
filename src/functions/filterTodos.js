export const filterTodos = (term, todos) => {
	if (!term) return todos;
	return (todos.filter(({ title }) =>
		title.toLowerCase().includes(term.toLowerCase())
	)
	);
};
