import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function CustomerList() {
  const [customers, setCustomersInfo] = useState([]);

  const fetchCustomersInfo = async () => {
    const customersUrl = 'http://localhost:8090/api/customers/';

    const response = await fetch(customersUrl);

    if (response.ok) {
      const data = await response.json();
      setCustomersInfo(data.customer);
    }
  };

  useEffect(() => {
    fetchCustomersInfo();
  }, []);

  return (
    <div className="container mt-4">
      <div className="shadow p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1>Customers</h1>
          <NavLink to="/customers/add" className="btn btn-success">
            Add Customer
          </NavLink>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => {
              return (
                <tr key={customer.id}>
                  <td>{customer.first_name}</td>
                  <td>{customer.last_name}</td>
                  <td>{customer.address}</td>
                  <td>{customer.phone_number}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CustomerList;
