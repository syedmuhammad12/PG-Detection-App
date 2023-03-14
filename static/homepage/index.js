const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const themeToggler = document.querySelector('.theme-toggler');
const search = document.querySelector('.input-group input'),
  table_rows = document.querySelectorAll('tbody tr'),
  table_headings = document.querySelectorAll('thead th');

// show sidebar
menuBtn.addEventListener('click', () => {
  sideMenu.style.display = 'block';
})

// close sidebar
closeBtn.addEventListener('click', () => {
  sideMenu.style.display = 'none';
})

// change theme
themeToggler.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme-variables');

  themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
  themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');
})

// Events
const tabs = document.querySelectorAll("[data-tab-target]");
const tabContents = document.querySelectorAll("[data-tab-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.tabTarget);
    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("active-tab");
    });
    tabs.forEach((tab) => {
      tab.classList.remove("activ");
    });
    tab.classList.add("activ");
    target.classList.add("active-tab");
  });
});

// search
search.addEventListener('input', searchTable);

function searchTable() {
  table_rows.forEach((row, i) => {
    let table_data = row.textContent.toLowerCase(),
      search_data = search.value.toLowerCase();

    row.classList.toggle('hide', table_data.indexOf(search_data) < 0);
    row.style.setProperty('--delay', i / 25 + 's');
  })
  document.querySelectorAll('tbody tr:not(.hide)').forEach((visible_row, i) => {
    visible_row.style.backgroundColor = (i % 2 == 0) ? 'transparent' : 'var(--color-white)';
  });
}

// table headeings

// table_headings.forEach((head, i) => {
//   let sort_asc = true;
//   head.onClick = () => {
//     table_headings.forEach(head => head.classList.remove('active'));
//     head.classList.add('active');

//     document.querySelectorAll('td').forEach(td => td.classList.remove('active'))
//     table_rows.forEach(row => {
//       row.querySelectorAll('td')[i].classList.add('active')
//     })
//     head.classList.toggle('asc', sort_asc);
//     sort_asc = head.classList.contains('asc') ? false : true;
//   }
// })

// converting html to pdf
const pdf_btn = document.querySelector('#toPDF');
const customers_table = document.querySelector('#customers_table');

const toPDF = function (customers_table) {
  const html_code = `
    <link rel="stylesheet" href="./reports.css">
    <div class="table">${customers_table.innerHTML}</div>
  `;

  const new_window = window.open();
  new_window.document.write(html_code);

  setTimeout(() => {
    new_window.print();
    new_window.close();
  }, 200);
}

pdf_btn.onclick = () => {
  toPDF(customers_table);
}

// converting html to json
const json_btn = document.querySelector('#toJSON');

const toJSON = function (table) {
  let table_data = [],
    t_head = [],

    t_headings = table.querySelectorAll('th'),
    t_rows = table.querySelectorAll('tbody tr');

  for (let t_heading of t_headings) {
    let actual_head = t_heading.textContent.trim();

    t_head.push(actual_head.trim().toLowerCase());

  }
  t_rows.forEach(row => {
    const row_object = {},
      t_cells = row.querySelectorAll('td');
    t_cells.forEach((t_cell, cell_index) => {
      // const img = t_cell.querySelector('span');
      // if(img){
      //   row_object['customer image']
      // }
      row_object[t_head[cell_index]] = t_cell.textContent.trim();

    })

    table_data.push(row_object);

  })

  return JSON.stringify(table_data, null, 4);

}

json_btn.onclick = () => {
  const json = toJSON(customers_table);
  downloadFile(json, 'json', 'inspection report.json')
}

// converting html to excel

const excel_btn = document.querySelector('#toEXCEL');

const toExcel = function (table) {
  const t_rows = table.querySelectorAll('tr');
  return [...t_rows].map(row => {
    const cells = row.querySelectorAll('th, td');
    return [...cells].map(cell => cell.textContent.trim()).join('\t');
  }).join('\n');
}

excel_btn.onclick = () => {
  const excel = toExcel(customers_table);
  downloadFile(excel, 'excel', 'inspection report.xls')
}

// converting html to csv

const csv_btn = document.querySelector('#toCSV');

const toCSV = function (table) {
  const t_rows = table.querySelectorAll('tr');
  return [...t_rows].map(row => {
    const cells = row.querySelectorAll('th, td');
    return [...cells].map(cell => cell.textContent.trim()).join(',');
  }).join('\n');
}

csv_btn.onclick = () => {
  const csv = toCSV(customers_table);
  downloadFile(csv, 'csv', 'inspection report.csv')
}

// downloading main

const downloadFile = function (data, fileType, fileName) {
  const a = document.createElement('a');
  a.download = fileName;
  const mime_types = {
    'json': 'application/json',
    'excel': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'csv': 'text/csv'
  }
  a.href = `
    data:${mime_types[fileType]};charset=utf-8,${encodeURIComponent(data)}
  `;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

// html table print

const print_btn = document.querySelector('#toPRINT');

const toPRINT = function (customers_table) {
  const html_code = `
    <link rel="stylesheet" href="./reports.css">
    <div class="table">${customers_table.outerHTML}</div>
  `;

  const new_window = window.open();
  new_window.document.write(html_code);

  setTimeout(() => {
    new_window.print();
    new_window.close();
  }, 200);
}

print_btn.onclick = () => {
  toPDF(customers_table);
}

