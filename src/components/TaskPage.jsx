import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ModalLoader } from '../components/ModalLoader';
import { Modal } from './Modal';
import { Button } from './elems/Button';
import styles from './taskPage.module.css';

const TaskPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [task, setTask] = useState('');
	const [editing, setEditing] = useState(false);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		fetch(`http://localhost:3005/todos/${id}`)
			.then((response) => response.json())
			.then((task) => {
				setTask(task);
				setTitle(task.title);
				setDescription(task.description);
			})
			.catch((error) => console.error('Error fetching task:', error))
			.finally(() => setIsLoading(false));
	}, [id]);

	const saveTask = () => {
		setIsUpdating(true);
		fetch(`http://localhost:3005/todos/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ ...task, title, description }),
		})
			.then((response) => response.json())
			.then((data) => {
				setTask(data);
				setDescription(description);
				setEditing(false);
			})
			.catch((error) => console.error('Error saving task:', error))
			.finally(() => setIsUpdating(false));
	};

	const deleteTask = () => {
		fetch(`http://localhost:3005/todos/${id}`, {
			method: 'DELETE',
		})
			.then(() => navigate('/'))
			.catch((error) => console.error('Error deleting task:', error));
	};
	const cancelEdit = () => {
		setIsUpdating(false);
	};

	const isAnyLoading = isLoading || isUpdating;

	return (
		<div className={styles.container}>
			<Button btnFn={() => navigate(-1)} classbtn={styles.buttunBack}>
				Назад
			</Button>

			{isAnyLoading && <ModalLoader />}

			{editing ? (
				<Modal
					title={title}
					setTitle={setTitle}
					saveTask={saveTask}
					cancelEdit={cancelEdit}
					description={description}
					setDescription={setDescription}
				/>
			) : (
				''
			)}

			<div className={styles.task}>
				<h1 className={styles.title}>{task.title}</h1>
				<p className={styles.description}>{task.description}</p>
				<Button btnFn={() => setEditing(true)} classbtn={styles.buttonChange}>
					Редактировать
				</Button>
				<Button btnFn={deleteTask} classbtn={styles.buttonDelete}>
					Удалить
				</Button>
			</div>
		</div>
	);
};

export default TaskPage;
