import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './todoList.module.css';
import { ModalLoader } from './ModalLoader';
import { AddFormTask } from './elems/AddFormTask';
import { SearchTask } from './SearchForm';
import { Button } from './elems/Button';

const truncateText = (text, maxLength = 30) => {
	if (text.length > maxLength) {
		return text.slice(0, maxLength) + '...';
	}
	return text;
};

const TodoList = () => {
	const [tasks, setTasks] = useState([]);
	const [newTask, setNewTask] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const [isSortOn, setIsSortOn] = useState(false);
	const [isAnyLoading, setIsAnyLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		setIsAnyLoading(true);
		fetch('http://localhost:3005/todos')
			.then((response) => response.json())
			.then((data) => setTasks(data))
			.catch((error) => console.error('Error fetching tasks:', error))
			.finally(() => setIsAnyLoading(false));
	}, []);

	const addTask = (e) => {
		e.preventDefault();
		setNewTask(newTask.trim());

		setIsAnyLoading(true);
		if (!newTask) {
			setErrorMessage('Введите задачу');
			setIsAnyLoading(false);
		} else if (tasks.some((existingTask) => existingTask.title === newTask)) {
			setErrorMessage('Такая задача уже существует');
			setIsAnyLoading(false);
		} else {
			fetch('http://localhost:3005/todos', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					title: newTask,
					description: '',
					completed: false,
				}),
			})
				.then((response) => response.json())
				.then((data) => setTasks([...tasks, data]))
				.catch((error) => console.error('Error adding task:', error))
				.finally(() => setIsAnyLoading(false));
			setNewTask('');
			setErrorMessage('');
		}
	};

	const filteredTasks = tasks.filter((task) =>
		task.title.toLowerCase().includes(searchTerm.toLowerCase())
	);
	const sortedTasks = isSortOn
		? [...filteredTasks].sort((a, b) => a.title.localeCompare(b.title))
		: filteredTasks;

	return (
		<div className={styles.container}>
			{isAnyLoading && <ModalLoader />}

			<AddFormTask
				errorMessage={errorMessage}
				newTask={newTask}
				setNewTask={setNewTask}
				addTask={addTask}
			/>
			<SearchTask searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

			<Button classbtn={styles.sortButton} btnFn={() => setIsSortOn(!isSortOn)}>
				{isSortOn ? 'Не сортировать' : 'Сортировать'}
			</Button>
			<ul className={styles.todoList}>
				{sortedTasks.map((task) => (
					<li key={task.id} className={styles.task}>
						<Link className={styles.link} to={`/task/${task.id}`}>
							{truncateText(task.title)}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default TodoList;
