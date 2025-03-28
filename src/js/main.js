import { TaskStatus } from './task-status.enum.js';
import { Task } from './task.js';

const tasks = [
	new Task(1, 'Task 1', 'Description 1', TaskStatus.PENDING),
	new Task(2, 'Task 2', 'Description 2', TaskStatus.PENDING),
	new Task(3, 'Task 3', 'Description 3', TaskStatus.PENDING),
	new Task(4, 'Task 4', 'Description 4', TaskStatus.PENDING),
];
let taskList = document.getElementById('taskList');

/**
 * Función para crear una nueva tarea
 */
function createTask() {
	let newTask = new Task();
	newTask.id = tasks.length + 1;
	newTask.title = document.getElementById('title').value;
	newTask.description = document.getElementById('description').value;
	newTask.status = TaskStatus.PENDING;
	console.log(tasks);
	tasks.push(newTask);
}

/**
 * Función para obtener todas las tareas
 */
function getTasks() {
	taskList.innerHTML = '';

	for (let task of tasks) {
		let card = document.createElement('div');
		card.className = 'task-card';
		let radioButton = document.createElement('input');

		card.innerHTML = `
         <h3>${task.title}</h3>
         <p><strong>ID:</strong> ${task.id}</p>
         <p><strong>Description:</strong> ${task.description}</p>
         <p><strong>Status:</strong> ${task.status}</p>
      `;

		if (task.status === TaskStatus.COMPLETED) {
			card.style.backgroundColor = 'lightgreen';
		} else {
			// Crear un radio button
			radioButton.type = 'radio';
			radioButton.name = 'taskSelection';
			radioButton.value = task.id;

			// Crear una etiqueta para el radio button
			let radioLabel = document.createElement('label');
			radioLabel.textContent = 'Completar';
			radioLabel.style.marginLeft = '8px';

			// Crear un contenedor para el radio button y la etiqueta
			let radioContainer = document.createElement('div');
			radioContainer.style.marginTop = '10px';
			radioContainer.appendChild(radioButton);
			radioContainer.appendChild(radioLabel);

			// Agregar el contenedor del radio button a la tarjeta
			card.appendChild(radioContainer);
		}

		radioButton.addEventListener('change', () => {
			if (radioButton.checked) {
				task.status = TaskStatus.COMPLETED; // Cambiar el estado de la tarea
				getTasks(); // Vuelve a renderizar las tareas para reflejar el cambio
			}
		});

		taskList.appendChild(card);
	}
}

/**
 * Función para obtener las tareas completadas
 */
function getCompletedTasks() {
	taskList.innerHTML = '';
   const completedTasks = tasks.filter(task => task.status === TaskStatus.COMPLETED);

   if (completedTasks.length === 0) {
      let message = document.createElement('p');
      message.textContent = 'No hay tareas completadas';
      message.style.color = 'red';
      taskList.appendChild(message);
   }

	for (let task of tasks) {
		if (task.status === TaskStatus.COMPLETED) {
			let card = document.createElement('div');
			card.className = 'task-card';
			card.style.backgroundColor = 'lightgreen';

			card.innerHTML = `
            <h3>${task.title}</h3>
				<p><strong>ID:</strong> ${task.id}</p>
            <p><strong>Description:</strong> ${task.description}</p>
            <p><strong>Status:</strong> ${task.status}</p>
         `;

			taskList.appendChild(card);
		}
	}
}

/**
 * Función para obtener las tareas pendientes
 */
function getPendingTasks() {
	taskList.innerHTML = '';

	for (let task of tasks) {
      let card = document.createElement('div');
      card.className = 'task-card';

		if (task.status === TaskStatus.PENDING) {
			card.innerHTML = `
            <h3>${task.title}</h3>
				<p><strong>ID:</strong> ${task.id}</p>
            <p><strong>Description:</strong> ${task.description}</p>
            <p><strong>Status:</strong> ${task.status}</p>
         `;

			taskList.appendChild(card);
		}
		console.log(task);
	}
}

function deleteTask() {
   const taskId = document.getElementById('id').value;
   const taskIndex = tasks.findIndex(task => task.id === parseInt(taskId));
   console.log(taskIndex);
   tasks.splice(taskIndex, 1);
   getTasks();
   taskId.value = '';
}

/**
 * Llamadas a las funciones desde el html
 */
window.createTask = createTask;
window.getTasks = getTasks;
window.getCompletedTasks = getCompletedTasks;
window.getPendingTasks = getPendingTasks;
window.deleteTask = deleteTask;
