import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarSquare</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto"> {/* Align both the icons and dropdowns to the left */}
            {/* Inventory Dropdown */}
            <li className="nav-item dropdown">
              <NavLink className="nav-link dropdown-toggle" to="#" id="inventoryDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Inventory
              </NavLink>
              <ul className="dropdown-menu" aria-labelledby="inventoryDropdown">
                <li><NavLink className="dropdown-item" to="/manufacturers/">Makes</NavLink></li>
                <li><NavLink className="dropdown-item" to="/models/">Models</NavLink></li>
                <li><NavLink className="dropdown-item" to="/automobiles/">Inventory</NavLink></li>
              </ul>
            </li>

            {/* Sales Dropdown */}
            <li className="nav-item dropdown">
              <NavLink className="nav-link dropdown-toggle" to="#" id="salesDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Sales
              </NavLink>
              <ul className="dropdown-menu" aria-labelledby="salesDropdown">
                <li><NavLink className="dropdown-item" to="/salespeople/">Salespeople</NavLink></li>
                <li><NavLink className="dropdown-item" to="/salespeople/add">Add a Salesperson</NavLink></li>
                <li><NavLink className="dropdown-item" to="/sales/">Sales</NavLink></li>
                <li><NavLink className="dropdown-item" to="/customers/">Customers</NavLink></li>
                <li><NavLink className="dropdown-item" to="/sales/add">Record a Sale</NavLink></li>
              </ul>
            </li>

            {/* Technicians Dropdown */}
            <li className="nav-item dropdown">
              <NavLink className="nav-link dropdown-toggle" to="#" id="techniciansDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Service
              </NavLink>
              <ul className="dropdown-menu" aria-labelledby="techniciansDropdown">
                <li><NavLink className="dropdown-item" to="/technicians/">Technicians</NavLink></li>
                <li><NavLink className="dropdown-item" to="/appointments/">Service Appointments</NavLink></li>
                <li><NavLink className="dropdown-item" to="/appointments/history">Service History</NavLink></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
