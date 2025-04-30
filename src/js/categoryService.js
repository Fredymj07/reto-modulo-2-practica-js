const apiUrl = 'http://localhost:3000';

async function getCategories() {
   try {
      const response = await fetch(`${apiUrl}/api/v1/categories`);
      const categories = await response.json();

      const categoriesList = document.getElementById('categoriesList');
      categoriesList.innerHTML = '';

      for (const category in categories) {
         let tr = document.createElement('tr');

         let tdName = document.createElement('td');
         tdName.textContent = categories[category].name;

         tr.appendChild(tdName);

         categoriesList.appendChild(tr);
      }
   } catch (error) {
      console.error('Error fetching users:', error);
   }
}

async function addCategory() {
   try {
      const name = document.getElementById('name').value;

      const category = {
         name: name
      };

      const response = await fetch(`${apiUrl}/api/v1/category`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(category),
      });

      if (!response.ok) {
         throw new Error(`Error adding category: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Category added succesfully:', data);

      alert('Categoría creada correctamente');

      categoryModal.style.display = 'none';
      categoryForm.reset();
   } catch (error) {
      console.error('Error adding category:', error);
      alert('Hubo un error al crear la categoría. Por favor intente nuevamente.');
   }

   await getCategories();
}

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

// Abrir y cerrar el modal
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const categoryModal = document.getElementById('categoryModal');

openModalBtn.addEventListener('click', () => {
   categoryModal.style.display = 'flex';
});

closeModalBtn.addEventListener('click', () => {
   categoryModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
   if (event.target === categoryModal) {
      categoryModal.style.display = 'none';
   }
});

// Manejar el formulario
const categoryForm = document.getElementById('categoryForm');
categoryForm.addEventListener('submit', (event) => {
   event.preventDefault();

   const categoryName = document.getElementById('name').value;

   categoryForm.reset();
});

window.getCategories = getCategories;
window.addCategory = addCategory;
