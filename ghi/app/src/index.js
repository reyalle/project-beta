import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


async function loadSalesPeople() {
  const response = await fetch('http://localhost:8090/api/salespeople/');
  if (response.ok) {
    const data = await response.json();
    root.render(
      <React.StrictMode>
        <App salespeople={data.salespeople} />
      </React.StrictMode>
    )
  } else {
    console.error(response)
  }
}

loadSalesPeople();

async function loadCustomers() {
  const response = await fetch ('http://localhost:8090/api/customers/');
  if (response.ok) {
    const data = await response.json();
    root.render(
      <React.StrictMode>
        <App customer={data.customer} />
      </React.StrictMode>
    )
  } else {
    console.error(response)
  }
}

loadCustomers();

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


async function loadSalesPeople() {
  const response = await fetch('http://localhost:8090/api/salespeople/');
  if (response.ok) {
    const data = await response.json();
    root.render(
      <React.StrictMode>
        <App salespeople={data.salespeople} />
      </React.StrictMode>
    )
  } else {
    console.error(response)
  }
}

loadSalesPeople();

async function loadCustomers() {
  const response = await fetch ('http://localhost:8090/api/customers/');
  if (response.ok) {
    const data = await response.json();
    root.render(
      <React.StrictMode>
        <App customer={data.customer} />
      </React.StrictMode>
    )
  } else {
    console.error(response)
  }
}

loadCustomers();

async function loadAutomobiles() {
  const response = await fetch ('http://localhost:8100/api/automobiles/');
  if (response.ok) {
    const data = await response.json();
    root.render(
      <React.StrictMode>
        <App autos={data.autos} />
      </React.StrictMode>
    )
  } else {
    console.error(response)
  }
}

loadAutomobiles();

async function loadManufacturers() {
  const response = await fetch ('http://localhost:8100/api/manufacturers/');
  if (response.ok) {
    const data = await response.json();
    root.render(
      <React.StrictMode>
        <App manufacturers={data.manufacturers} />
      </React.StrictMode>
    )
  } else {
    console.error(response)
  }
}

loadManufacturers();
