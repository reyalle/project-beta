import {React, useState, useEffect} from 'react'


function AppointmentsList() {
  const [appointments, setAppointmentsInfo] = useState([]);

  const fetchAppointmentsInfo = async () => {
      const appointmentsUrl = 'http://localhost:8080/api/appointments/';

      const response = await fetch(appointmentsUrl)

      if(response.ok) {
          const data = await response.json();
          setAppointmentsInfo(data.appointments)
      }
  }

  useEffect(() => {
      fetchAppointmentsInfo();
  }, []);

  const formatDateTime = (date_time) => {
    const options = {
      month: 'numeric',
      day: 'numeric',
      year: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    return new Date(date_time).toLocaleString("en-US", options);
  };

  return(
    <div className='container-fluid'>
      <table className="table table-striped">
        <thead>
        <tr>
            <th>VIN</th>
            <th>Is VIP?</th>
            <th>Customer</th>
            <th>Date & Time</th>
            <th>Technician</th>
            <th>Reason</th>
        </tr>
        </thead>
        <tbody>
        {appointments.map(appointment => {
            return (
            <tr key={appointment.id}>
                <td>{ appointment.vin }</td>
                <td>{ appointment.sold ? "Yes": "No"}</td>
                <td>{ appointment.customer }</td>
                <td>{ formatDateTime(appointment.date_time) }</td>
                <td>{ appointment.technician.first_name } { appointment.technician.last_name }</td>
                <td>{ appointment.reason }</td>
            </tr>
            );
        })}
        </tbody>
      </table>
    </div>
  )
}

export default AppointmentsList
