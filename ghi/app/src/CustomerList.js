import React, {useState, useEffect} from 'react';

function CustomerList(props) {

    const [customers, setCustomersInfo] = useState([]);

    const fetchCustomersInfo = async () => {
        const customersUrl = 'http://localhost:8090/api/customers/';

        const response = await fetch(customersUrl);

        if(response.ok) {
            const data = await response.json();
            setCustomersInfo(data.customer)
        }
    }

    useEffect(() => {
        fetchCustomersInfo();
      }, []);

    return (
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
        {customers.map(customer => {
            return (
            <tr key={customer.id}>
                <td>{ customer.first_name }</td>
                <td>{ customer.last_name }</td>
                <td>{ customer.address }</td>
                <td>{ customer.phone_number }</td>
            </tr>
            );
        })}
        </tbody>
    </table>
    );
}

export default CustomerList;
