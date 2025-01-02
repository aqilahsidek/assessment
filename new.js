// Fetch and read the CSV file
async function readCSV(filePath) {
    const response = await fetch(filePath);
    //If fail, throw error
    if (!response.ok) {
        throw new Error('Failed to load the CSV file');
    }
    //Content of CSV file
    const csvText = await response.text();
    //Split to rows and columns
    const rows = csvText.trim().split('\n').map(row => row.split(','));
    
    //Extract first row as header and remaining as data
    const headers = rows[0];
    const data = rows.slice(1);

    //Generate first table using headers and data that is extracted
    generateTable('csvTable1', headers, data);
    
    //Delay second table to make sure first table is fully rendered 
    setTimeout(() => generateCalculatedTable(), 100); 
}

//Generate Table 1
function generateTable(tableId, headers, data) {
    //Get elements by ID
    const table = document.getElementById(tableId);

    //Build header
    let headerRow = '<tr>';
    headers.forEach(header => {
        headerRow += `<th>${header}</th>`;
    });
    headerRow += '</tr>';
    
    table.innerHTML = headerRow;
    
    //Iterate each data row
    data.forEach(row => {
        //New row
        let tableRow = '<tr>';
        //Add cell
        row.forEach(cell => {
            tableRow += `<td>${cell}</td>`;
        });
        tableRow += '</tr>';
        
        //Append row to table
        table.innerHTML += tableRow;
    });
}

//Extract values from Table 1 and generate Table 2
function generateCalculatedTable() {
    //Select all rows in Table 1
    const rows = document.querySelectorAll('#csvTable1 tbody tr');

    //Get the value from a specific row
    const getValue = index => {
        //Access the second cell in the row
        const cell = rows[index]?.cells[1]; 
        //Return value of the cell
        return cell ? parseFloat(cell.textContent) : 0;
    };

    // Extracting values from Table 1
    const A5 = getValue(5);
    const A20 = getValue(20);
    const A15 = getValue(15);
    const A7 = getValue(7);
    const A13 = getValue(13);
    const A12 = getValue(12);

    //Calculate and store in variable
    const alpha = A5 + A20;
    const beta = A15 / A7;
    const charlie = A13 * A12;

    //Add rows to Table 2
    const table2Body = document.querySelector('#table2 tbody');
    const rowsToAdd = [
        { category: 'Alpha', value: alpha },
        { category: 'Beta', value: beta },
        { category: 'Charlie', value: charlie }
    ];

    rowsToAdd.forEach(row => {
        const tableRow = document.createElement('tr');
        //Set the content as category and value
        tableRow.innerHTML = `
            <td>${row.category}</td>
            <td>${row.value}</td>
        `;
        //Append row to Table 2
        table2Body.appendChild(tableRow);
    });
}

//Call the function
readCSV('https://github.com/aqilahsidek/assessment/blob/51c6e0a2344169a13d134cdd667fddcdbe025946/Table_Input.csv');
