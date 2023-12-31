import React, {useState, useEffect} from 'react';

function SalespersonHistory() {
    const [sales, setSalesInfo] = useState([]);
    const [salespeople, setSalesPeopleInfo] = useState([]);
    const [selectedSalesperson, setSelectedSalesperson] = useState('');

    const onChange = (event) => {
        const value = event.target.value;
        setSelectedSalesperson(value);
    }

    const fetchSalesPeopleInfo = async () => {
        const salespeopleUrl = 'http://localhost:8090/api/salespeople/';

        const response = await fetch(salespeopleUrl);

        if(response.ok) {
            const data = await response.json();
            setSalesPeopleInfo(data.salespeople)
        }
    }

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
        fetchSalesPeopleInfo();
        setSelectedSalesperson();
    }, []);

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Salesperson History</h1>
                    <div className="mb-3">
                        <select className="form-select" value={selectedSalesperson} onChange={onChange}>
                        <option value=''>Choose a Salesperson</option>
                        {salespeople.map(salesperson => {
                            return (
                                <option key={salesperson.id} value={salesperson.id}>
                                    { salesperson.first_name } { salesperson.last_name }
                                </option>
                            )
                        })}
                        </select>
                    </div>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>Salesperson</th>
                            <th>Customer</th>
                            <th>VIN</th>
                            <th>Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        {sales.filter(sale => selectedSalesperson == sale.salesperson.id).map(sale => {
                            return (
                            <tr key={sale.id}>
                                <td>{ sale.salesperson.first_name } {sale.salesperson.last_name}</td>
                                <td>{ sale.customer.first_name } { sale.customer.last_name}</td>
                                <td>{ sale.automobile.vin }</td>
                                <td>{ sale.price }</td>
                            </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default SalespersonHistory;
