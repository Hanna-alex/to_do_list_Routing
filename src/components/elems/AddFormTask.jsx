import React from 'react';
import styles from './addFormTask.module.css';
import { Button } from './Button';

export const AddFormTask = ({
	errorMessage,
	newTitle,
	setNewTitle,
	newDescription,
	setNewDescription,
	addTask,
	cancelAddForm,
}) => {
	return (
		<div className={styles.overlay}>
			<form className={styles.addFormTask}>
				<h2 className={styles.title}>Добавить задачу:</h2>
				<label className={styles.label}>
					{errorMessage && (
						<label className={styles.error}>{errorMessage}</label>
					)}
					<input
						type='text'
						value={newTitle}
						onChange={(e) => setNewTitle(e.target.value)}
						placeholder='Напишите заголовок'
						className={styles.formInput}
					/>
				</label>

				<textarea
					value={newDescription}
					onChange={(e) => setNewDescription(e.target.value)}
					placeholder='Напишите описание'
					className={styles.description}
				/>
				<Button btnFn={(e) => addTask(e)} classbtn={styles.changeFormButton}>
					Добавить
				</Button>
				<Button btnFn={cancelAddForm} classbtn={styles.changeFormButton}>
					Отмена
				</Button>
			</form>
		</div>
	);
};
