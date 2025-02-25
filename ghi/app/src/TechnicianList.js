import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function TechnicianList() {
  const [technicians, setTechniciansInfo] = useState([]);

  const fetchTechniciansInfo = async () => {
    const techniciansUrl = 'http://localhost:8080/api/technicians/';
    const response = await fetch(techniciansUrl);

    if (response.ok) {
      const data = await response.json();
      setTechniciansInfo(data.technicians);
    }
  };

  useEffect(() => {
    fetchTechniciansInfo();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Technicians</h1>
        <NavLink to="/technicians/add" className="btn btn-success">
          Add Technician
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
            {technicians?.map(technician => (
              <tr key={technician.id}>
                <td>{technician.employee_id}</td>
                <td>{technician.first_name}</td>
                <td>{technician.last_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TechnicianList;
