function SalesPeopleList(props) {
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
        {props.salespeople?.map(salespeople => {
            return (
            <tr key={salespeople.id}>
                <td>{ salespeople.employee_id }</td>
                <td>{ salespeople.first_name }</td>
                <td>{ salespeople.last_name }</td>
            </tr>
            );
        })}
        </tbody>
    </table>
    );
}

export default SalesPeopleList;
