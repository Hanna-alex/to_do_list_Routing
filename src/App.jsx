import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TodoList from './components/TodoList';
import TaskPage from './components/TaskPage';
import NotFound from './components/NotFound';

export const App = () => {
	return (
		<Routes>
			<Route path='/' element={<TodoList />} />
			<Route path='/task/:id' element={<TaskPage />} />
			<Route path='/404' element={<NotFound />} />
			<Route path='*' element={<NotFound />} />
		</Routes>
	);
};
