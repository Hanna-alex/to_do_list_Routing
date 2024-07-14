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
	const [newTitle, setNewTitle] = useState('');
	const [newDescription, setNewDescription] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const [isSortOn, setIsSortOn] = useState(false);
	const [isAnyLoading, setIsAnyLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [updating, setUpdating] = useState(false);

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
		setNewTitle(newTitle.trim());
		setNewDescription(newDescription.trim());

		setIsAnyLoading(true);
		if (!newTitle) {
			setErrorMessage('Введите заголовок задачи');
			setIsAnyLoading(false);
		} else if (tasks.some((existingTask) => existingTask.title === newTitle)) {
			setErrorMessage('Такая задача уже существует');
			setIsAnyLoading(false);
		} else {
			fetch('http://localhost:3005/todos', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					title: newTitle,
					description: newDescription,
					completed: false,
				}),
			})
				.then((response) => response.json())
				.then((data) => setTasks([...tasks, data]))
				.catch((error) => console.error('Error adding task:', error))
				.finally(() => setIsAnyLoading(false));
			setNewTitle('');
			setNewDescription('');
			setErrorMessage('');
			setUpdating(false);
		}
	};

	const filteredTasks = tasks.filter((task) =>
		task.title.toLowerCase().includes(searchTerm.toLowerCase())
	);
	const sortedTasks = isSortOn
		? [...filteredTasks].sort((a, b) => a.title.localeCompare(b.title))
		: filteredTasks;

	const cancelAddForm = () => {
		setUpdating(false);
	};

	return (
		<div className={styles.container}>
			{isAnyLoading && <ModalLoader />}
			<div className={styles.menu}>
				<Button btnFn={() => setUpdating(true)} classbtn={styles.formButton}>
					Добавить новую задачу
				</Button>

				<SearchTask searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

				<Button
					classbtn={styles.sortButton}
					btnFn={() => setIsSortOn(!isSortOn)}
				>
					{isSortOn ? 'Не сортировать' : 'Сортировать'}
				</Button>
			</div>

			{updating ? (
				<AddFormTask
					errorMessage={errorMessage}
					newTitle={newTitle}
					setNewTitle={setNewTitle}
					newDescription={newDescription}
					setNewDescription={setNewDescription}
					addTask={addTask}
					cancelEdit={cancelAddForm}
				/>
			) : (
				''
			)}
			<ul className={styles.todoList}>
				{sortedTasks.length === 0 ? (
					<span>Список пуст</span>
				) : (
					sortedTasks.map((task) => (
						<li key={task.id} className={styles.task}>
							<Link className={styles.link} to={`/task/${task.id}`}>
								{truncateText(task.title)}
							</Link>
						</li>
					))
				)}
			</ul>
		</div>
	);
};

export default TodoList;
