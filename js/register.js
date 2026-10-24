const STORAGE_KEY = "quPhotoRegistrations";
 
const form = document.querySelector("#order-form");
const tbody = document.querySelector("#orders-body");
const message = document.querySelector("#message");
const clearButton = document.querySelector("#clear-orders");
 
function loadOrders() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (error) {
    return [];
  }
}
 
function saveOrders(orders) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}
 
function addCell(row, text) {
  const cell = document.createElement("td");
  cell.textContent = text;
  row.appendChild(cell);
}
 
function render() {
  const orders = loadOrders();
  tbody.innerHTML = "";
 
  if (orders.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 6;
    cell.textContent = "No registrations saved yet.";
    row.appendChild(cell);
    tbody.appendChild(row);
    return;
  }
 
  orders.forEach(function (order) {
    const row = document.createElement("tr");
    addCell(row, order.name);
    addCell(row, order.rollno);
    addCell(row, order.email);
    addCell(row, order.phone);
    addCell(row, order.item);
    addCell(row, order.extras.length ? order.extras.join(", ") : "none");
    tbody.appendChild(row);
  });
}
 
form.addEventListener("submit", function (event) {
  event.preventDefault(); // stop default page reload
 
  const data = new FormData(form);
  const order = {
    name: data.get("name").trim(),
    rollno: data.get("rollno").trim(),
    email: data.get("email").trim(),
    phone: data.get("phone"),
    item: data.get("item"),
    extras: data.getAll("extras"),
    notes: data.get("notes").trim()
  };
 
  const orders = loadOrders();
  orders.push(order);
  saveOrders(orders);
 
  form.reset();
  message.textContent = "Thank you, " + order.name + "! Your registration has been saved.";
  render();
});
 
clearButton.addEventListener("click", function () {
  localStorage.removeItem(STORAGE_KEY);
  message.textContent = "All saved registrations were cleared.";
  render();
});
 
render();