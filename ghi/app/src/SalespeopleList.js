import React, {useState, useEffect} from 'react';

function SalesPeopleList() {
    const [salespeople, setSalesPeopleInfo] = useState([]);

    const fetchSalesPeopleInfo = async () => {
        const salespeopleUrl = 'http://localhost:8090/api/salespeople/';

        const response = await fetch(salespeopleUrl);

        if(response.ok) {
            const data = await response.json();
            setSalesPeopleInfo(data.salespeople)
        }
    }

    useEffect(() => {
        fetchSalesPeopleInfo();
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
        {salespeople.map(salesperson => {
            return (
            <tr key={salesperson.id}>
                <td>{ salesperson.employee_id }</td>
                <td>{ salesperson.first_name }</td>
                <td>{ salesperson.last_name }</td>
            </tr>
            );
        })}
        </tbody>
    </table>
    );
}

export default SalesPeopleList;
