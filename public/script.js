const form = document.getElementById('createForm');
const list = document.getElementById('itemsList');

// Función para cargar la lista
async function loadItems() {
  const res = await fetch('/api/items');
  const items = await res.json();
  list.innerHTML = '';

  items.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span><strong>${item.nombre}</strong>: ${item.descripcion}</span>
      <div>
        <button onclick="editItem(${item.id}, '${item.nombre}', '${item.descripcion}')">Editar</button>
        <button onclick="deleteItem(${item.id})">Eliminar</button>
      </div>
    `;
    list.appendChild(li);
  });
}

// Crear nuevo item
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const descripcion = document.getElementById('descripcion').value;

  const response = await fetch('/api/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, descripcion })
  });

  if (response.ok) {
    form.reset();
    loadItems();
  } else {
    alert("Error al guardar en la base de datos");
  }
});

// Eliminar item
async function deleteItem(id) {
  if (confirm('¿Eliminar este registro?')) {
    await fetch(`/api/items/${id}`, { method: 'DELETE' });
    loadItems();
  }
}

// Editar item
async function editItem(id, oldNombre, oldDesc) {
  const nombre = prompt('Nuevo nombre:', oldNombre);
  const descripcion = prompt('Nueva descripción:', oldDesc);
  
  if (nombre) {
    await fetch(`/api/items/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, descripcion })
    });
    loadItems();
  }
}

loadItems();