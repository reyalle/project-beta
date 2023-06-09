import React, {useState, useEffect} from 'react';

function AutomobileList() {

    const [autos, setAutos] = useState([]);

    const fetchAutoData = async () => {
        const autoUrl = 'http://localhost:8100/api/automobiles/';

        const response = await fetch(autoUrl);

        if (response.ok) {
        const data = await response.json();
        setAutos(data.autos)
        }
    }

    useEffect(() => {
        fetchAutoData();
    }, []);

    return (
    <table className="table table-striped">
        <thead>
        <tr>
            <th>VIN</th>
            <th>Color</th>
            <th>Year</th>
            <th>Model</th>
            <th>Manufacturer</th>
            <th>Sold</th>
        </tr>
        </thead>
        <tbody>
        {autos.map(auto => {
            return (
            <tr key={auto.id}>
                <td>{ auto.vin }</td>
                <td>{ auto.color }</td>
                <td>{ auto.year }</td>
                <td>{ auto.model.name }</td>
                <td>{ auto.model.manufacturer.name }</td>
                <td>{ auto.sold ? "Yes":"No"}</td>
            </tr>
            );
        })}
        </tbody>
    </table>
    );
}

export default AutomobileList;
