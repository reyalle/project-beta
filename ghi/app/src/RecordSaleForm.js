import React, {useState, useEffect} from 'react';

function RecordSaleForm() {

    const[vin, setVin] = useState('');
    const handleVinChange = (event) => {
        const value = event.target.value;
        setVin(value);
    }

    const[salesperson, setSalesPerson] = useState('');
    const handleSalesPersonChange = (event) => {
        const value = event.target.value;
        setSalesPerson(value);
    }

    const[customers, setCustomer] = useState('');
    const handleCustomerChange = (event) => {
        const value = event.target.value;
        setCustomer(value);
    }

    const[price, setPrice] = useState('');
    const handlePriceChange = (event) => {
        const value = event.target.value;
        setPrice(value);
    }

    const [autos, setAutos] = useState([]);
    const [salespeople, setSalesPeopleInfo] = useState([]);
    const [customer, setCustomersInfo] = useState([]);
    const [sold, setSold] = useState('')
    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {};

        data.vin = vin;
        data.salesperson = salesperson;
        data.customer = customer;
        data.price = price;
        data.sold = sold;

        const salesUrl = 'http://localhost:8090/api/sales/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(salesUrl, fetchConfig);
        if (response.ok) {
            const data = await response.json();
            console.log(data)

            setVin('');
            setSalesPerson('');
            setCustomer('');
            setPrice('');
            setSold('true');
        }
    }

    const fetchAutoData = async () => {
        const autoUrl = 'http://localhost:8100/api/automobiles/';

        const response = await fetch(autoUrl);

        if (response.ok) {
        const data = await response.json();
        setAutos(data.autos)
        }
    }

    const fetchSalesPeopleInfo = async () => {
        const salespeopleUrl = 'http://localhost:8090/api/salespeople/';

        const response = await fetch(salespeopleUrl);

        if(response.ok) {
            const data = await response.json();
            setSalesPeopleInfo(data.salespeople)
        }
    }

    const fetchCustomersInfo = async () => {
        const customersUrl = 'http://localhost:8090/api/customers/';

        const response = await fetch(customersUrl)

        if(response.ok) {
            const data = await response.json();
            setCustomersInfo(data.customer)
        }
    }

    useEffect(() => {
      fetchAutoData();
      fetchSalesPeopleInfo();
      fetchCustomersInfo();
    }, []);

    return (
        <div className="row">
        <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
            <h1>Record a New Sale</h1>
            <form onSubmit={handleSubmit} id="record-sale-form">
                <div className="mb-3">
                    <select value={vin} onChange={handleVinChange} required name="vin" id="vin" className="form-select">
                    <option value="">Choose an automobile VIN</option>
                    {autos.filter(auto => !auto.sold).map(auto => {
                        return (
                            <option key={auto.id} value={auto.id}>
                                {auto.vin}
                            </option>
                        )
                    })}
                    </select>
                </div>
                <div className="mb-3">
                    <select value={salesperson} onChange={handleSalesPersonChange} required name="salesperson" id="salesperson" className="form-select">
                    <option value="">Choose a Salesperson</option>
                    {salespeople.map(salesperson => {
                        return (
                            <option key={salesperson.employee_id} value={salesperson.employee_id}>
                                {salesperson.employee_id}
                            </option>
                        )
                    })}
                    </select>
                </div>
                <div className="mb-3">
                    <select value={customers} onChange={handleCustomerChange} required name="customer" id="customer" className="form-select">
                    <option value="">Choose a Customer ID</option>
                    {customer.map(customers => {
                        return (
                            <option key={customers.id} value={customers.id}>
                                {customers.first_name} {customers.last_name}
                            </option>
                        )
                    })}
                    </select>
                </div>
                <div className="form-floating mb-3">
                    <input value={price} onChange={handlePriceChange} placeholder="price" required type="text" name="price" id="price" className="form-control" />
                    <label htmlFor="price">Price</label>
                </div>
                <button className="btn btn-primary">Create</button>
            </form>
            </div>
        </div>
    </div>
    );
}

export default RecordSaleForm;
