import React, { useState, useEffect } from 'react';

function SalesList() {
  const [sales, setSalesInfo] = useState([]);
  const [salespeople, setSalesPeopleInfo] = useState([]);
  const [selectedSalesperson, setSelectedSalesperson] = useState('');

  const fetchSalesInfo = async () => {
    const salesUrl = 'http://localhost:8090/api/sales/';

    const response = await fetch(salesUrl);

    if (response.ok) {
      const data = await response.json();
      setSalesInfo(data.sales);
    }
  };

  const fetchSalesPeopleInfo = async () => {
    const salespeopleUrl = 'http://localhost:8090/api/salespeople/';

    const response = await fetch(salespeopleUrl);

    if (response.ok) {
      const data = await response.json();
      setSalesPeopleInfo(data.salespeople);
    }
  };

  useEffect(() => {
    fetchSalesInfo();
    fetchSalesPeopleInfo();
  }, []);

  const onChange = (event) => {
    const value = event.target.value;
    setSelectedSalesperson(value);
  };

  const filteredSales = selectedSalesperson
    ? sales.filter((sale) => sale.salesperson.id === parseInt(selectedSalesperson))
    : sales;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Sales</h1>
      </div>
      <div className="shadow p-4">
        <div className="mb-3">
          <select
            className="form-select"
            value={selectedSalesperson}
            onChange={onChange}
          >
            <option value="">Choose a Salesperson</option>
            {salespeople.map((salesperson) => {
              return (
                <option key={salesperson.id} value={salesperson.id}>
                  {salesperson.first_name} {salesperson.last_name}
                </option>
              );
            })}
          </select>
        </div>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Salesperson Name</th>
              <th>Customer</th>
              <th>VIN</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.map((sale) => (
              <tr key={sale.id}>
                <td>{sale.salesperson.employee_id}</td>
                <td>
                  {sale.salesperson.first_name} {sale.salesperson.last_name}
                </td>
                <td>
                  {sale.customer.first_name} {sale.customer.last_name}
                </td>
                <td>{sale.automobile.vin}</td>
                <td>{sale.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SalesList;
