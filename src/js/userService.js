const apiUrl = 'http://localhost:3000';

async function getUsers() {
   try {
      const response = await fetch(`${apiUrl}/api/v1/users`);
      const users = await response.json();

      const usersList = document.getElementById('usersList');
      usersList.innerHTML = '';

      for (const user in users) {
         let tr = document.createElement('tr');

         let tdName = document.createElement('td');
         tdName.textContent = users[user].name;

         let tdEmail = document.createElement('td');
         tdEmail.textContent = users[user].email;

         tr.appendChild(tdName);
         tr.appendChild(tdEmail);

         usersList.appendChild(tr);
      }
   } catch (error) {
      console.error('Error fetching users:', error);
   }
}

async function addUser() {
   try {
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const user = {
         name: name,
         email: email
      };

      const response = await fetch(`${apiUrl}/api/v1/user`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(user),
      });

      if (!response.ok) {
         throw new Error(`Error adding to user: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('User added succesfully:', data);

      alert('Usuario creado correctamente');

      userModal.style.display = 'none';
      userForm.reset();
   } catch (error) {
      console.error('Error adding user:', error);
      alert('Hubo un error al crear el usuario. Por favor intente nuevamente.');
   }

   await getUsers();
}

// Abrir y cerrar el modal
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const userModal = document.getElementById('userModal');

openModalBtn.addEventListener('click', () => {
   userModal.style.display = 'flex';
});

closeModalBtn.addEventListener('click', () => {
   userModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
   if (event.target === userModal) {
      userModal.style.display = 'none';
   }
});

// Manejar el formulario
const userForm = document.getElementById('userForm');
userForm.addEventListener('submit', (event) => {
   event.preventDefault();

   const userName = document.getElementById('name').value;
   const userEmail = document.getElementById('email').value;

   console.log('Nuevo usuario:', { name: userName, email: userEmail });

   // Aquí puedes agregar la lógica para enviar los datos al servidor
   userModal.style.display = 'none';
   userForm.reset();
});

window.getUsers = getUsers;
window.addUser = addUser;
window.filterByUser = filterByUser;
