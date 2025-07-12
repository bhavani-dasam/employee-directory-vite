<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Employee Directory (Freemarker View)</title>
  <link rel="stylesheet" href="/src/style.css" />
</head>
<body>
  <header class="toolbar-header bordered-top">
    <h1>Employee Directory</h1>
    <div class="top-actions">
      <input type="text" id="searchInput" placeholder="Search by name or email" />
      <button id="filterToggle">Filter</button>
    </div>
  </header>

  <div id="toolbar">
    <div>
      Sort:
      <select id="sortSelect">
        <option value="">--Select--</option>
        <option value="firstName">First Name</option>
        <option value="department">Department</option>
      </select>
      Show:
      <select id="itemsPerPage">
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
    <div>
      <button id="addBtn">Add Employee</button>
    </div>
  </div>

  <!-- Freemarker employee list rendering simulation -->
  <#assign employees = mockEmployeeList>
  <div id="employee-list-container">
    <#list employees as emp>
      <div class="employee-card" data-id="${emp.id}">
        <h3>${emp.firstName} ${emp.lastName}</h3>
        <p><strong>Email:</strong> ${emp.email}</p>
        <p><strong>Department:</strong> ${emp.department}</p>
        <p><strong>Role:</strong> ${emp.role}</p>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </div>
    </#list>
  </div>

  <footer id="footer">© 2025 Employee Directory App. All rights reserved.</footer>
</body>
</html>

