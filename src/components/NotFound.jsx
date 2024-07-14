import React from 'react';
import { Link } from 'react-router-dom';
import styles from './notFound.module.css';

const NotFound = () => {
	return (
		<div className={styles.notFound}>
			<h1 className={styles.title}>404 - Страница не найдена</h1>
			<Link to='/'>Вернуться на главную</Link>
		</div>
	);
};

export default NotFound;
