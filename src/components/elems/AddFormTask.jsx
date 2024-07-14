import React from 'react';
import styles from './addFormTask.module.css';
import { Button } from './Button';

export const AddFormTask = ({ errorMessage, newTask, setNewTask, addTask }) => {
	return (
		<form className={styles.addFormTask}>
			{errorMessage ? (
				<label className={styles.error}>{errorMessage}</label>
			) : (
				''
			)}
			<input
				type='text'
				value={newTask}
				onChange={(e) => setNewTask(e.target.value)}
				placeholder='Добавить новую задачу'
				className={styles.formInput}
			/>

			<Button btnFn={addTask} classbtn={styles.formButton}>
				Добавить новую задачу
			</Button>
		</form>
	);
};
