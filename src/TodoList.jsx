import { useEffect, useState, useMemo } from 'react';
import styles from './todoList.module.css';
import { ModalLoader } from './components/ModalLoader';
import { AddFormTask } from './components/AddFormTask';
import { Modal } from './components/Modal';
import { SearchForm } from './components/SearchForm';
import { Button } from './components/Button';
import { sortTodos } from './functions/sortTodos.js';
import { filterTodos } from './functions/filterTodos.js';
import {
	useRequestAdd,
	useRequestDeleteData,
	useRequestUpData,
	useRequestGetData,
	useRequestIsSorted,
} from './hooks';

export const TodoList = () => {
	const [todo, setTodo] = useState('');
	const [editingTodoId, setEditingTodoId] = useState(null);
	const [editingTodoValue, setEditingTodoValue] = useState('');
	const [openModal, setOpenModal] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const { isSortOn, clickOnSortedBtn } = useRequestIsSorted();
	const { isLoading, dataTodos, todosList, setTodosList, setDataTodos } =
		useRequestGetData();
	const { isAdding, errorMessage, requestAddTodo } = useRequestAdd(
		todosList,
		todo,
		setTodo,
		setTodosList,
		setDataTodos,
		dataTodos,
		isSortOn
	);
	const { isDeleting, deleteTask } = useRequestDeleteData(
		dataTodos,
		setDataTodos,
		setTodosList,
		isSortOn
	);
	const { updating, requestSaveEditedTask } = useRequestUpData(
		editingTodoValue,
		setEditingTodoId,
		setEditingTodoValue,
		todosList,
		setDataTodos,
		setTodosList,
		isSortOn
	);

	const inputNewTodo = ({ target }) => {
		const newValue = target.value;
		setTodo(newValue);
	};

	const cancelEdit = () => {
		setEditingTodoId(null);
		setEditingTodoValue('');
		setOpenModal(false);
	};

	const openEditModal = (id, title) => {
		setEditingTodoId(id);
		setEditingTodoValue(title);
		setOpenModal(true);
	};

	const filteredTodos = useMemo(
		() => filterTodos(searchTerm, dataTodos),
		[searchTerm, dataTodos]
	);

	useEffect(() => {
		setTodosList(sortTodos(isSortOn, filteredTodos));
	}, [filteredTodos, isSortOn, setTodosList]);

	const isAnyLoading = isLoading || isAdding || updating || isDeleting;

	return (
		<>
			<SearchForm onChange={(e) => setSearchTerm(e.target.value)} />
			<AddFormTask
				errorMessage={errorMessage}
				value={todo}
				onChange={inputNewTodo}
				btnFn={requestAddTodo}
			/>
			<button
				className={styles.sortButton}
				data-sort={isSortOn}
				onClick={clickOnSortedBtn}
			>
				{isSortOn ? 'Не сортировать' : 'Сортировать'}
			</button>

			{isAnyLoading && <ModalLoader />}

			<ul className={styles.todoList}>
				{todosList.length === 0 ? (
					<span>Список пуст</span>
				) : (
					todosList.map(({ id, title, completed }) => (
						<li
							className={`${styles.task} ${completed ? styles.taskDone : ''}`}
							key={id}
							data-completed={completed}
							value={title}
							id={id}
						>
							{title}

							<div className={styles.buttonsGroup}>
								<Button
									btnFn={() => openEditModal(id, title)}
									classbtn={styles.buttonChange}
								>
									Изменить
								</Button>
								<Button
									btnFn={() => {
										deleteTask(id);
									}}
									classbtn={styles.buttonDelete}
								>
									Удалить
								</Button>
							</div>
						</li>
					))
				)}
			</ul>

			{openModal ? (
				<Modal
					value={editingTodoValue}
					setValue={setEditingTodoValue}
					saveTaskFn={() => requestSaveEditedTask(editingTodoId)}
					editingTodoId={editingTodoId}
					cancelFn={cancelEdit}
				/>
			) : null}

			{isDeleting && <ModalLoader />}
		</>
	);
};

// json-server --watch src/todos.json --port 3005 --delay 1500
// cd ./to_do_list_routing
