import './style.css';
import { employees as employeeData } from './data.js';

let employees = [...employeeData];
let editId = null;
let itemsPerPage = 10;
let sortBy = '';

const list = document.getElementById('employeeList');
const formContainer = document.getElementById('formContainer');
const form = document.getElementById('employeeForm');
const cancelBtn = document.getElementById('cancelBtn');
const searchInput = document.getElementById('searchInput');
const addBtn = document.getElementById('addBtn');
const filterSidebar = document.getElementById('filterSidebar');
const filterToggle = document.getElementById('filterToggle');
const filterForm = document.getElementById('filterForm');
const resetFilter = document.getElementById('resetFilter');
const sortSelect = document.getElementById('sortSelect');
const itemsPerPageSelect = document.getElementById('itemsPerPage');

function renderEmployees(data) {
  list.innerHTML = '';
  data.forEach(emp => {
    const card = document.createElement('div');
    card.className = 'employee-card';
    card.innerHTML = `
      <h3>${emp.firstName} ${emp.lastName}</h3>
      <p><strong>Email:</strong> ${emp.email}</p>
      <p><strong>Department:</strong> ${emp.department}</p>
      <p><strong>Role:</strong> ${emp.role}</p>
      <div class="edit-dlt">
      <button onclick="editEmployee(${emp.id})">Edit</button>
      <button onclick="deleteEmployee(${emp.id})">Delete</button>
      </div>
    `;
    list.appendChild(card);
  });
}

function showForm(edit = false) {
  form.reset();
  formContainer.classList.remove('hidden');
  form.querySelector('#formTitle').innerText = edit ? 'Edit Employee' : 'Add Employee';
}

function hideForm() {
  formContainer.classList.add('hidden');
  editId = null;
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const newEmp = {
    id: editId || Date.now(),
    firstName: form.firstName.value,
    lastName: form.lastName.value,
    email: form.email.value,
    department: form.department.value,
    role: form.role.value
  };

  if (editId) {
    const index = employees.findIndex(e => e.id === editId);
    employees[index] = newEmp;
  } else {
    employees.push(newEmp);
  }

  renderFilteredEmployees();
  hideForm();
});

cancelBtn.addEventListener('click', hideForm);
addBtn.addEventListener('click', () => showForm(false));

window.editEmployee = function (id) {
  const emp = employees.find(e => e.id === id);
  if (!emp) return;
  form.firstName.value = emp.firstName;
  form.lastName.value = emp.lastName;
  form.email.value = emp.email;
  form.department.value = emp.department;
  form.role.value = emp.role;
  editId = id;
  showForm(true);
};

window.deleteEmployee = function (id) {
  if (!confirm('Delete this employee?')) return;
  employees = employees.filter(e => e.id !== id);
  renderFilteredEmployees();
};

searchInput.addEventListener('input', e => {
  const term = e.target.value.toLowerCase();
  const filtered = employees.filter(emp =>
    `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(term) ||
    emp.email.toLowerCase().includes(term)
  );
  renderEmployees(filtered.slice(0, itemsPerPage));
});

filterToggle.addEventListener('click', () => {
  filterSidebar.classList.toggle('visible');
  filterSidebar.classList.toggle('hidden');
});

resetFilter.addEventListener('click', () => {
  filterForm.reset();
  applyFilters();
});

filterForm.addEventListener('submit', e => {
  e.preventDefault();
  applyFilters();
});

function applyFilters() {
  // Hide filter after applying
  filterSidebar.classList.remove('visible');
  filterSidebar.classList.add('hidden');

  const name = document.getElementById('filterName').value.trim().toLowerCase();
  const dept = document.getElementById('filterDept').value.trim().toLowerCase();
  const role = document.getElementById('filterRole').value.trim().toLowerCase();

  let filtered = employees.filter(emp => {
    const fullName = `${emp.firstName} ${emp.lastName}`.toLowerCase();
    return (
      (!name || fullName.includes(name)) &&
      (!dept || emp.department.toLowerCase().includes(dept)) &&
      (!role || emp.role.toLowerCase().includes(role))
    );
  });

  if (sortBy) {
    filtered.sort((a, b) => a[sortBy].toLowerCase().localeCompare(b[sortBy].toLowerCase()));
  }

  renderEmployees(filtered.slice(0, itemsPerPage));
}

function renderFilteredEmployees() {
  let filtered = [...employees];
  if (sortBy) {
    filtered.sort((a, b) => a[sortBy].toLowerCase().localeCompare(b[sortBy].toLowerCase()));
  }
  renderEmployees(filtered.slice(0, itemsPerPage));
}

sortSelect.addEventListener('change', e => {
  sortBy = e.target.value;
  renderFilteredEmployees();
});

itemsPerPageSelect.addEventListener('change', e => {
  itemsPerPage = parseInt(e.target.value);
  renderFilteredEmployees();
});

hideForm();
renderFilteredEmployees();
