import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';


function ManufacturerList() {
    const [manufacturers, setManufacturerInfo] = useState([]);

    const fetchManufacturerInfo = async () => {
        const manufacturerUrl = 'http://localhost:8100/api/manufacturers/';

        const response = await fetch(manufacturerUrl);

        if(response.ok) {
            const data = await response.json();
            setManufacturerInfo(data.manufacturers)
        }
    }

    useEffect(() => {
        fetchManufacturerInfo();
    }, []);

    return (
      <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
          <h1>Inventory</h1>
          <NavLink to="/manufacturers/add" className="btn btn-success">
              Add Make
          </NavLink>
      </div>
      <table className="table table-striped">
          <thead>
              <tr>
                  <th>Makes</th>
              </tr>
          </thead>
          <tbody>
              {manufacturers.map(manufacturer => (
                  <tr key={manufacturer.id}>
                      <td>{manufacturer.name}</td>
                  </tr>
              ))}
          </tbody>
      </table>
  </div>
    );
}

export default ManufacturerList;
