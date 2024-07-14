export const sortTodos = (isSort, todos) => {

	if (!isSort) return todos;
	const sortedTodosArr = [...todos].sort((a, b) => a.title.localeCompare(b.title))

	return sortedTodosArr
};
