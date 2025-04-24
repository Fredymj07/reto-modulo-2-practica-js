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

   console.log('Nueva categoría:', { name: categoryName });

   // Aquí puedes agregar la lógica para enviar los datos al servidor
   categoryModal.style.display = 'none';
   categoryForm.reset();
});
