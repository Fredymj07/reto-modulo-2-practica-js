const apiUrl = 'http://localhost:3000';

/**
 * Función para obtener todas las tareas
 */
async function getTasks() {
	try {
		const response = await fetch(`${apiUrl}/api/v1/tasks`);
		const tasks = await response.json();

		const tasksList = document.getElementById('tasksList');
		tasksList.innerHTML = '';

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
		console.error('Error fetching tasks:', error);
	}
}

async function loadUsers() {
   try {
		const response = await fetch(`${apiUrl}/api/v1/users`);
		const listUsers = await response.json();

		const usersSelect = document.getElementById('usersSelect');
		usersSelect.innerHTML = '';

		const optionDefault = document.createElement('option');
      optionDefault.value = '';
      optionDefault.textContent = '- Seleccione -';
      optionDefault.disabled = true;
      optionDefault.selected = true;
      usersSelect.appendChild(optionDefault);

		for (const user of listUsers) {
			const userOption = document.createElement('option');
			userOption.value = user._id;
			userOption.textContent = user.name;
			usersSelect.appendChild(userOption);
		}
	} catch (error) {
		console.error('Error fetching users:', error);
	}
}

async function filterTaskByUser() {
	const userId = document.getElementById('usersSelect').value;

	if (!userId) {
		return;
	}

	try {
		const response = await fetch(`${apiUrl}/api/v1/tasksByUser?id=${userId}`)
		const tasks = await response.json();

		const tasksList = document.getElementById('tasksList');
		tasksList.innerHTML = '';

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
			const categoryResponse = await fetch(`${apiUrl}/api/v1/category?id=${task.categoryId}`);
			const categoryData = await categoryResponse.json();

			if (!categoryData) {
				console.log('Este usuario no tiene tareas creadas');
			}

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
		console.error('Error fetching tasks by user:', error);
	}
}

/**
 * Llamadas a las funciones desde el html
 */
window.addEventListener('DOMContentLoaded', getTasks);
window.addEventListener('DOMContentLoaded', loadUsers);
window.filterTaskByUser = filterTaskByUser;
