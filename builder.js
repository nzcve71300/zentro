let itemId = 0;

function addItem() {
  const tbody = document.getElementById("items");
  const row = document.createElement("tr");
  row.id = `item-${itemId++}`;
  row.innerHTML = `
    <td><input type="text" placeholder="Item description" onchange="calculateTotal()" /></td>
    <td><input type="number" placeholder="Qty" min="1" value="1" onchange="calculateTotal()" /></td>
    <td><input type="number" placeholder="Price" min="0" step="0.01" value="0" onchange="calculateTotal()" /></td>
    <td class="item-total">R0.00</td>
    <td><button onclick="removeItem('${row.id}')" style="background:none;color:#f66;border:none;font-weight:bold;cursor:pointer">x</button></td>
  `;
  tbody.appendChild(row);
  calculateTotal();
}

function removeItem(id) {
  const row = document.getElementById(id);
  if (row) row.remove();
  calculateTotal();
}

function calculateTotal() {
  const rows = document.querySelectorAll("#items tr");
  let subtotal = 0;

  rows.forEach(row => {
    const qty = parseFloat(row.children[1].children[0].value) || 0;
    const price = parseFloat(row.children[2].children[0].value) || 0;
    const total = qty * price;
    row.querySelector(".item-total").textContent = `R${total.toFixed(2)}`;
    subtotal += total;
  });

  document.getElementById("subtotal").textContent = `R${subtotal.toFixed(2)}`;
}

function downloadHTML() {
  const from = document.querySelector('input[placeholder="Your business name"]').value;
  const to = document.querySelector('input[placeholder="Client name"]').value;
  const rows = document.querySelectorAll("#items tr");

  let html = `
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Zentro Invoice</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; color: #000; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border-bottom: 1px solid #ccc; padding: 8px; text-align: left; }
          h2 { color: #0ABAB5; }
        </style>
      </head>
      <body>
        <h2>Zentro Invoice</h2>
        <p><strong>From:</strong> ${from}</p>
        <p><strong>To:</strong> ${to}</p>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>`;

  let subtotal = 0;
  rows.forEach(row => {
    const desc = row.children[0].children[0].value;
    const qty = parseFloat(row.children[1].children[0].value) || 0;
    const price = parseFloat(row.children[2].children[0].value) || 0;
    const total = qty * price;
    subtotal += total;

    html += `
      <tr>
        <td>${desc}</td>
        <td>${qty}</td>
        <td>R${price.toFixed(2)}</td>
        <td>R${total.toFixed(2)}</td>
      </tr>`;
  });

  html += `
          </tbody>
        </table>
        <p style="text-align: right; margin-top: 20px;"><strong>Subtotal:</strong> R${subtotal.toFixed(2)}</p>
      </body>
    </html>`;

  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `zentro-invoice-${Date.now()}.html`;
  link.click();
  URL.revokeObjectURL(url);
}