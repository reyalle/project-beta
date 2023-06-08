import React, {useState, useEffect} from 'react';


function ManufacturerList(props) {
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
    <table className="table table-striped">
        <thead>
        <tr>
            <th>Manufacturer</th>
        </tr>
        </thead>
        <tbody>
        {manufacturers.map(manufacturer => {
            return (
            <tr key={manufacturer.id}>
                <td>{ manufacturer.name }</td>
            </tr>
            );
        })}
        </tbody>
    </table>
    );
}

export default ManufacturerList;
