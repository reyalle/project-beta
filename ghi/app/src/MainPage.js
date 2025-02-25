import React, { useState, useEffect } from 'react';

function MainPage() {
  const [salesCount, setSalesCount] = useState(0);
  const [appointmentsCount, setAppointmentsCount] = useState(0);
  const [vehiclesCount, setVehiclesCount] = useState(0);

  // Fetch sales data
  const fetchSalesData = async () => {
    const salesUrl = 'http://localhost:8090/api/sales/';
    const response = await fetch(salesUrl);
    if (response.ok) {
      const data = await response.json();
      setSalesCount(data.sales.length);
    }
  };

  // Fetch appointments data
  const fetchAppointmentsData = async () => {
    const appointmentsUrl = 'http://localhost:8080/api/appointments/';
    const response = await fetch(appointmentsUrl);
    if (response.ok) {
      const data = await response.json();
      setAppointmentsCount(data.appointments.length);
    }
  };

  // Fetch vehicle inventory data
  const fetchVehiclesData = async () => {
    const vehiclesUrl = 'http://localhost:8100/api/automobiles/';
    const response = await fetch(vehiclesUrl);
    if (response.ok) {
      const data = await response.json();
      setVehiclesCount(data.automobiles.length);
    }
  };

  useEffect(() => {
    fetchSalesData();
    fetchAppointmentsData();
    fetchVehiclesData();
  }, []);

  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">Welcome To CarSquare!</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          The premiere solution for managing your inventory, recording sales, and tracking service appointments.
        </p>
      </div>

      {/* Analytics Dashboard */}
      <div className="container mt-5">
        <h2 className="mb-4">Your Numbers at a Glance</h2>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 justify-content-center">
          {/* Sales Count */}
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Total Sales</h5>
                <p className="card-text">{salesCount}</p>
              </div>
            </div>
          </div>

          {/* Appointments Count */}
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Total Appointments</h5>
                <p className="card-text">{appointmentsCount}</p>
              </div>
            </div>
          </div>

          {/* Vehicles in Inventory */}
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Vehicles in Inventory</h5>
                <p className="card-text">4</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default MainPage;
