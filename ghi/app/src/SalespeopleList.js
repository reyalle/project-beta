import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function SalesPeopleList() {
  const [salespeople, setSalesPeopleInfo] = useState([]);

  const fetchSalesPeopleInfo = async () => {
    const salespeopleUrl = 'http://localhost:8090/api/salespeople/';

    const response = await fetch(salespeopleUrl);

    if (response.ok) {
      const data = await response.json();
      setSalesPeopleInfo(data.salespeople);
    }
  };

  useEffect(() => {
    fetchSalesPeopleInfo();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Sales Team</h1>
        <NavLink to="/salespeople/add" className="btn btn-success">
          Add Salesperson
        </NavLink>
      </div>
      <div className="shadow p-4">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>
            {salespeople.map((salesperson) => (
              <tr key={salesperson.id}>
                <td>{salesperson.employee_id}</td>
                <td>{salesperson.first_name}</td>
                <td>{salesperson.last_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SalesPeopleList;
