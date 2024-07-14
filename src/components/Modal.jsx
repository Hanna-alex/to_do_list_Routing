import React from 'react';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import { Button } from './elems/Button';

export const Modal = ({
	title,
	setTitle,
	saveTask,
	cancelEdit,
	description,
	setDescription,
}) => {
	return (
		<div className={styles.modal}>
			<form className={styles.changeFormTask}>
				<h2 className={styles.changeFormTaskTitle}>Изменить задачу:</h2>

				<input
					type='text'
					value={title}
					className={styles.changeInput}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<textarea
					value={description}
					className={styles.changeDescription}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<Button btnFn={() => saveTask()} classbtn={styles.changeFormButton}>
					Сохранить
				</Button>
				<Button btnFn={cancelEdit} classbtn={styles.changeFormButton}>
					Отмена
				</Button>
			</form>
		</div>
	);
};

Modal.propTypes = {
	value: PropTypes.string,
	setValue: PropTypes.func,
	saveTaskFn: PropTypes.func,
	editingTaskId: PropTypes.number,
	cancelFn: PropTypes.func,
};
