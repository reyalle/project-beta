import React, {useState, useEffect} from 'react';


function SalesList(props) {
    const [sales, setSalesInfo] = useState([]);

    const fetchSaleInfo = async () => {
        const salesUrl = 'http://localhost:8090/api/sales/';

        const response = await fetch(salesUrl)

        if(response.ok) {
            const data = await response.json();
            setSalesInfo(data.sales)
        }
    }

    useEffect(() => {
        fetchSaleInfo();
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
        {sales.map(sale => {
            return (
            <tr key={sale.id}>
                <td>{ sale.salesperson.employee_id }</td>
                <td>{ sale.salesperson.first_name }</td>
                <td>{ sale.customer }</td>
                <td>{ sale.automobile.vin }</td>
                <td>{ sale.price }</td>
            </tr>
            );
        })}
        </tbody>
    </table>
    );
}

export default SalesList;
