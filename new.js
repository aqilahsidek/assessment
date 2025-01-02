<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSV Table</title>
  <style>
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 8px;
    }
    th {
      background-color: #f4f4f4;
      text-align: left;
    }
  </style>
</head>
<body>
  <h1>CSV Tables</h1>
  <h2>Table 1: CSV Data</h2>
  <table id="csvTable1"></table>

  <h2>Table 2: Calculated Values</h2>
  <table id="table2">
    <thead>
      <tr>
        <th>Category</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>

  <script>
    // Your corrected JavaScript
    async function readCSV(filePath) {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error('Failed to load the CSV file');
      }
      const csvText = await response.text();
      const rows = csvText.trim().split('\n').map(row => row.split(','));
      const headers = rows[0];
      const data = rows.slice(1);

      generateTable('csvTable1', headers, data);
      setTimeout(() => generateCalculatedTable(), 100);
    }

    function generateTable(tableId, headers, data) {
      const table = document.getElementById(tableId);
      let headerRow = '<thead><tr>';
      headers.forEach(header => {
        headerRow += `<th>${header}</th>`;
      });
      headerRow += '</tr></thead>';
      table.innerHTML = headerRow + '<tbody></tbody>';

      const tbody = table.querySelector('tbody');
      data.forEach(row => {
        let tableRow = '<tr>';
        row.forEach(cell => {
          tableRow += `<td>${cell}</td>`;
        });
        tableRow += '</tr>';
        tbody.innerHTML += tableRow;
      });
    }

    function generateCalculatedTable() {
      const rows = document.querySelectorAll('#csvTable1 tbody tr');
      const getValue = index => {
        const cell = rows[index]?.cells[1];
        return cell ? parseFloat(cell.textContent) : 0;
      };

      const A5 = getValue(5);
      const A20 = getValue(20);
      const A15 = getValue(15);
      const A7 = getValue(7);
      const A13 = getValue(13);
      const A12 = getValue(12);

      const alpha = A5 + A20;
      const beta = A7 !== 0 ? A15 / A7 : 0;
      const charlie = A13 * A12;

      const table2Body = document.querySelector('#table2 tbody');
      const rowsToAdd = [
        { category: 'Alpha', value: alpha },
        { category: 'Beta', value: beta },
        { category: 'Charlie', value: charlie }
      ];

      rowsToAdd.forEach(row => {
        const tableRow = document.createElement('tr');
        tableRow.innerHTML = `
          <td>${row.category}</td>
          <td>${row.value}</td>
        `;
        table2Body.appendChild(tableRow);
      });
    }

    // Call the function with corrected URL
    readCSV('https://raw.githubusercontent.com/aqilahsidek/assessment/51c6e0a2344169a13d134cdd667fddcdbe025946/Table_Input.csv');
  </script>
</body>
</html>
