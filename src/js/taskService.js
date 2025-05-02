const apiUrl = 'http://localhost:3000';

/**
 * Función para cargar los usuarios
 * y llenar el select de usuarios
 */
async function loadUsers() {
   try {
		const response = await fetch(`${apiUrl}/api/v1/users`);
		const listUsers = await response.json();

		const userSelect = document.getElementById('userSelect');
		userSelect.innerHTML = '';

		const optionDefault = document.createElement('option');
      optionDefault.value = '';
      optionDefault.textContent = '- Seleccione -';
      optionDefault.disabled = true;
      optionDefault.selected = true;
      userSelect.appendChild(optionDefault);

		for (const user of listUsers) {
			const userOption = document.createElement('option');
			userOption.value = user._id;
			userOption.textContent = user.name;
			userSelect.appendChild(userOption);
		}
	} catch (error) {
		console.error('Error fetching users:', error);
	}
}

/**
 * Función para cargar los estados
 * y llenar el select de estados
 */
async function loadStages() {
	try {
		const response = await fetch(`${apiUrl}/api/v1/stages`);
		const listStages = await response.json();

		const stageSelect = document.getElementById('stageSelect');
		stageSelect.innerHTML = '';

		const optionDefault = document.createElement('option');
      optionDefault.value = '';
      optionDefault.textContent = '- Seleccione -';
      optionDefault.disabled = true;
      optionDefault.selected = true;
      stageSelect.appendChild(optionDefault);

		for (const stage of listStages) {
			const stageOption = document.createElement('option');
			stageOption.value = stage;
			stageOption.textContent = stage;
			stageSelect.appendChild(stageOption);
		}
	} catch (error) {
		console.error('Error fetching stages:', error);
	}
}

/**
 * Función para cargar las prioridades
 * y llenar el select de prioridades
 */
async function loadPriorities() {
	try {
		const response = await fetch(`${apiUrl}/api/v1/priorities`);
		const listPriorities = await response.json();

		const prioritySelect = document.getElementById('prioritySelect');
		prioritySelect.innerHTML = '';

		const optionDefault = document.createElement('option');
      optionDefault.value = '';
      optionDefault.textContent = '- Seleccione -';
      optionDefault.disabled = true;
      optionDefault.selected = true;
      prioritySelect.appendChild(optionDefault);

		for (const priority of listPriorities) {
			const priorityOption = document.createElement('option');
			priorityOption.value = priority;
			priorityOption.textContent = priority;
			prioritySelect.appendChild(priorityOption);
		}
	} catch (error) {
		console.error('Error fetching priorities:', error);
	}
}

/**
 * Función para cargar las categorias
 * y llenar el select de categorias
 */
async function loadCategories() {
	try {
		const response = await fetch(`${apiUrl}/api/v1/categories`);
		const listCategories = await response.json();

		const categorySelect = document.getElementById('categorySelect');
		categorySelect.innerHTML = '';

		const optionDefault = document.createElement('option');
      optionDefault.value = '';
      optionDefault.textContent = '- Seleccione -';
      optionDefault.disabled = true;
      optionDefault.selected = true;
      categorySelect.appendChild(optionDefault);

		for (const category of listCategories) {
			const categoryOption = document.createElement('option');
			categoryOption.value = category._id;
			categoryOption.textContent = category.name;
			categorySelect.appendChild(categoryOption);
		}
	} catch (error) {
		console.error('Error fetching categories:', error);
	}
}

/**
 * Función para obtener todas las tareas
 */
async function getTasks() {
	try {
		const response = await fetch(`${apiUrl}/api/v1/tasks`);
		const tasks = await response.json();

		const tasksList = document.getElementById('tasksList');
		tasksList.innerHTML = '';

		tasks.forEach(async task => {
			const userResponse = await fetch(`${apiUrl}/api/v1/user?id=${task.userId}`);
			const userData = await userResponse.json();

			const categoryResponse = await fetch(`${apiUrl}/api/v1/category?id=${task.categoryId}`);
			const categoryData = await categoryResponse.json();

			let tr = document.createElement('tr');

			let tdTitle = document.createElement('td');
			tdTitle.textContent = task.title;

			let tdDescription = document.createElement('td');
			tdDescription.textContent = task.description;

			let tdStage = document.createElement('td');
			tdStage.textContent = task.stage;

			let tdPriority = document.createElement('td');
			tdPriority.textContent = task.priority;

			let tdUser = document.createElement('td');
			tdUser.textContent = userData.name;

			let tdCategory = document.createElement('td');
			tdCategory.textContent = categoryData.name;

			tr.appendChild(tdTitle);
			tr.appendChild(tdDescription);
			tr.appendChild(tdStage);
			tr.appendChild(tdPriority);
			tr.appendChild(tdUser);
			tr.appendChild(tdCategory);

			tasksList.appendChild(tr);
		});
	} catch (error) {
		console.error('Error fetching tasks:', error);
	}
}

/**
 * Función para filtrar las tareas por usuario
 * y mostrar las tareas en la tabla
 */
async function filterTaskByUser() {
	const userId = document.getElementById('userSelect').value;

	try {
		const response = await fetch(`${apiUrl}/api/v1/tasksByUser?id=${userId}`)
		const tasks = await response.json();
		console.log(tasks.length);

		const tasksList = document.getElementById('tasksList');
		tasksList.innerHTML = '';

		const tasksByUser = document.getElementById('tasksByUser');
		tasksByUser.textContent = tasks.length > 0
			? `Tareas del usuario ${tasks.length}`
			: 'Tareas del usuario 0';

		if (tasks.length === 0) {
			const tr = document.createElement('tr');
			const tdEmpty = document.createElement('td');
			tdEmpty.colSpan = 6;
			tdEmpty.textContent = 'Este usuario no tiene tareas creadas.';
			tdEmpty.style.textAlign = 'center';
			tr.appendChild(tdEmpty);
			tasksList.appendChild(tr);
			return;
		}

		for (const task of tasks) {
			const response = await fetch(`${apiUrl}/api/v1/category?id=${task.categoryId}`);
			const dataCategory = await response.json();

			let tr = document.createElement('tr');

			let tdTitle = document.createElement('td');
			tdTitle.textContent = task.title;

			let tdDescription = document.createElement('td');
			tdDescription.textContent = task.description;

			let tdStage = document.createElement('td');
			tdStage.textContent = task.stage;

			let tdPriority = document.createElement('td');
			tdPriority.textContent = task.priority;

			let tdUser = document.createElement('td');
			tdUser.textContent = '';

			let tdCategory = document.createElement('td');
			tdCategory.textContent = dataCategory.name;

			tr.appendChild(tdTitle);
			tr.appendChild(tdDescription);
			tr.appendChild(tdStage);
			tr.appendChild(tdPriority);
			tr.appendChild(tdUser);
			tr.appendChild(tdCategory);

			tasksList.appendChild(tr);
		}
	} catch (error) {
		console.error('Error fetching tasks by user:', error);
	}
}

/**
 * Función para filtrar las tareas por categoria
 * y mostrar las tareas en la tabla
 */
async function filterTaskByCategory() {
	const categoryId = document.getElementById('categorySelect').value;

	if (!categoryId) {
		return;
	}

	try {
		const response = await fetch(`${apiUrl}/api/v1/tasksByCategory?id=${categoryId}`)
		const tasks = await response.json();

		const tasksList = document.getElementById('tasksList');
		tasksList.innerHTML = '';

		if (tasks.length === 0) {
			const tr = document.createElement('tr');
			const tdEmpty = document.createElement('td');
			tdEmpty.colSpan = 6;
			tdEmpty.textContent = 'Este usuario no tiene tareas creadas con la categoría seleccionada.';
			tdEmpty.style.textAlign = 'center';
			tr.appendChild(tdEmpty);
			tasksList.appendChild(tr);
			return;
		}

		tasks.forEach(async task => {
			const userResponse = await fetch(`${apiUrl}/api/v1/user?id=${task.userId}`);
			const userData = await userResponse.json();

			let tr = document.createElement('tr');

			let tdTitle = document.createElement('td');
			tdTitle.textContent = task.title;

			let tdDescription = document.createElement('td');
			tdDescription.textContent = task.description;

			let tdStage = document.createElement('td');
			tdStage.textContent = task.stage;

			let tdPriority = document.createElement('td');
			tdPriority.textContent = task.priority;

			let tdUser = document.createElement('td');
			tdUser.textContent = userData.name;

			let tdCategory = document.createElement('td');
			tdCategory.textContent = '';

			tr.appendChild(tdTitle);
			tr.appendChild(tdDescription);
			tr.appendChild(tdStage);
			tr.appendChild(tdPriority);
			tr.appendChild(tdUser);
			tr.appendChild(tdCategory);

			tasksList.appendChild(tr);
		});
	} catch (error) {
		console.error('Error fetching tasks by category:', error);
	}
}

/**
 * Función para filtrar las tareas por estado
 * y mostrar las tareas en la tabla
 */
async function filterTaskByStage() {
	const stage = document.getElementById('stageSelect').value;

	try {
		const response = await fetch(`${apiUrl}/api/v1/tasksByStage?stage=${stage}`)
		const tasks = await response.json();

		const tasksList = document.getElementById('tasksList');
		tasksList.innerHTML = '';

		if (tasks.length === 0) {
			const tr = document.createElement('tr');
			const tdEmpty = document.createElement('td');
			tdEmpty.colSpan = 6;
			tdEmpty.textContent = 'No existen tareas creadas con el estado seleccionado.';
			tdEmpty.style.textAlign = 'center';
			tr.appendChild(tdEmpty);
			tasksList.appendChild(tr);
			return;
		}

		for (const task of tasks) {
			const userResponse = await fetch(`${apiUrl}/api/v1/user?id=${task.userId}`);
			const userData = await userResponse.json();

			const categoryResponse = await fetch(`${apiUrl}/api/v1/category?id=${task.categoryId}`);
			const categoryData = await categoryResponse.json();

			let tr = document.createElement('tr');

			let tdTitle = document.createElement('td');
			tdTitle.textContent = task.title;

			let tdDescription = document.createElement('td');
			tdDescription.textContent = task.description;

			let tdStage = document.createElement('td');
			tdStage.textContent = '';

			let tdPriority = document.createElement('td');
			tdPriority.textContent = task.priority;

			let tdUser = document.createElement('td');
			tdUser.textContent = userData.name;

			let tdCategory = document.createElement('td');
			tdCategory.textContent = categoryData.name;

			tr.appendChild(tdTitle);
			tr.appendChild(tdDescription);
			tr.appendChild(tdStage);
			tr.appendChild(tdPriority);
			tr.appendChild(tdUser);
			tr.appendChild(tdCategory);

			tasksList.appendChild(tr);
		}
	} catch (error) {
		console.error('Error fetching tasks by stage:', error);
	}
}

/**
 * Función para filtrar las tareas por prioridad
 * y mostrar las tareas en la tabla
 */
async function filterTaskByPriority() {
	const priority = document.getElementById('prioritySelect').value;

	try {
		const response = await fetch(`${apiUrl}/api/v1/tasksByPriority?priority=${priority}`);
		const tasks = await response.json();

		const tasksList = document.getElementById('tasksList');
		tasksList.innerHTML = '';

		if (tasks.length === 0) {
			const tr = document.createElement('tr');
			const tdEmpty = document.createElement('td');
			tdEmpty.colSpan = 6;
			tdEmpty.textContent = 'No existen tareas creadas con la prioridad seleccionada.';
			tdEmpty.style.textAlign = 'center';
			tr.appendChild(tdEmpty);
			tasksList.appendChild(tr);
			return;
		}

		for (const task of tasks) {
			const userResponse = await fetch(`${apiUrl}/api/v1/user?id=${task.userId}`);
			const userData = await userResponse.json();

			const categoryResponse = await fetch(`${apiUrl}/api/v1/category?id=${task.categoryId}`);
			const categoryData = await categoryResponse.json();

			let tr = document.createElement('tr');

			let tdTitle = document.createElement('td');
			tdTitle.textContent = task.title;

			let tdDescription = document.createElement('td');
			tdDescription.textContent = task.description;

			let tdStage = document.createElement('td');
			tdStage.textContent = task.stage;

			let tdPriority = document.createElement('td');
			tdPriority.textContent = '';

			let tdUser = document.createElement('td');
			tdUser.textContent = userData.name;

			let tdCategory = document.createElement('td');
			tdCategory.textContent = categoryData.name;

			tr.appendChild(tdTitle);
			tr.appendChild(tdDescription);
			tr.appendChild(tdStage);
			tr.appendChild(tdPriority);
			tr.appendChild(tdUser);
			tr.appendChild(tdCategory);

			tasksList.appendChild(tr);
		}
	} catch (error) {
		console.error('Error fetching tasks by priority:', error);
	}
}

/**
 * Función para limpiar los filtros
 * y mostrar todas las tareas en la tabla
 */
async function cleanFilters() {
	getTasks();

	const userSelect = document.getElementById('userSelect');
	const stageSelect = document.getElementById('stageSelect');
	const prioritySelect = document.getElementById('prioritySelect');
	const categorySelect = document.getElementById('categorySelect');
	userSelect.value = '';
	stageSelect.value = '';
	prioritySelect.value = '';
	categorySelect.value = '';
}

/**
 * Llamadas a las funciones desde el html
 */
window.addEventListener('DOMContentLoaded', getTasks);
window.addEventListener('DOMContentLoaded', loadUsers);
window.addEventListener('DOMContentLoaded', loadStages);
window.addEventListener('DOMContentLoaded', loadPriorities);
window.addEventListener('DOMContentLoaded', loadCategories);
window.filterTaskByUser = filterTaskByUser;
window.filterTaskByStage = filterTaskByStage;
window.filterTaskByPriority = filterTaskByPriority;
window.filterTaskByCategory = filterTaskByCategory;
window.cleanFilters = cleanFilters;
