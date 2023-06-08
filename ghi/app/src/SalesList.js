import React, {useState, useEffect} from 'react';


function SalesList(props) {
    const [sales, setSalesInfo] = useState([]);

    const fetchSalesInfo = async () => {
        const salesUrl = 'http://localhost:8090/api/sales/';

        const response = await fetch(salesUrl)

        if(response.ok) {
            const data = await response.json();
            setSalesInfo(data.sales)
        }
    }

    useEffect(() => {
        fetchSalesInfo();
    }, []);


    return (
    <table className="table table-striped">
        <thead>
        <tr>
            <th>Employee ID</th>
            <th>Salesperson Name</th>
            <th>Customer</th>
            <th>VIN</th>
            <th>Price</th>
        </tr>
        </thead>
        <tbody>
        {sales.map(sale => {
            return (
            <tr key={sale.id}>
                {/* <td>{ sale.employee_id }</td>
                <td>{ sale.salesperson.first_name }</td>
                <td>{ sale.customer }</td>
                <td>{ sale.automobile.vin }</td> */}
                <td>{ sale.price }</td>
            </tr>
            );
        })}
        </tbody>
    </table>
    );
}

export default SalesList;