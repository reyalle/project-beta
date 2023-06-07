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


async function loadTechnichians() {
  const response = await fetch('http://localhose:8080/api/technicians');
  if (response.ok) {
    const data = await response.json();
    root.render(
      <React.StrictMode>
        <App technichians = {data.technichians} />
      </React.StrictMode>
    )
  } else {
    console.error(response)
  }
}

loadTechnichians();
