import React, {useState, useEffect} from 'react';


function TechnicianList() {
  const [ technicians, setTechniciansInfo] = useState([])

  const fetchTechniciansInfo = async () => {
    const techniciansUrl = 'http://localhost:8080/api/technicians'
    const response = await fetch(techniciansUrl);

    if (response.ok) {
      const data = await response.json()
      setTechniciansInfo(data.technicians)
    }
  }

  useEffect(() => {
    fetchTechniciansInfo();
  }, []);

  return (
  <table className="table table-striped">
      <thead>
      <tr>
          <th>Employee ID</th>
          <th>First Name</th>
          <th>Last Name</th>
      </tr>
      </thead>
      <tbody>
      {technicians?.map(technician => {
          return (
          <tr key={technician.id}>
              <td>{ technician.employee_id }</td>
              <td>{ technician.first_name }</td>
              <td>{ technician.last_name }</td>
          </tr>
          );
      })}
      </tbody>
  </table>
  );
}

export default TechnicianList;
