import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


async function loadSalesPerson() {
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
