import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function ModelList() {
    const [models, setModelsInfo] = useState([]);

    const fetchModelsInfo = async () => {
        const modelsUrl = 'http://localhost:8100/api/models/';

        const response = await fetch(modelsUrl);

        if (response.ok) {
            const data = await response.json();
            setModelsInfo(data.models);
        }
    };

    useEffect(() => {
        fetchModelsInfo();
    }, []);

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1>Inventory</h1>
                <NavLink to="/models/add" className="btn btn-success">
                    Add Model
                </NavLink>
            </div>
            <div className="shadow p-4">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Models</th>
                            <th>Manufacturer</th>
                            <th>Picture</th>
                        </tr>
                    </thead>
                    <tbody>
                        {models.map(model => (
                            <tr key={model.id}>
                                <td>{model.name}</td>
                                <td>{model.manufacturer.name}</td>
                                <td>
                                    <img src={model.picture_url} alt={model.name} className="img-fluid" style={{ maxWidth: "150px" }} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ModelList;
