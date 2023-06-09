import {React, useState, useEffect} from 'react'


function AppointmentsList() {
  const [appointments, setAppointmentsInfo] = useState([])
  const formatDateTime = (date_time) => {
    const options = {
      month: 'numeric',
      day: 'numeric',
      year: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone: 'UTC',
    };
    return new Date(date_time).toLocaleString("en-US", options);
  }
  const sortAppointments = appointments.sort((a, b) => {
    return new Date(a.date_time) - new Date(b.date_time)
  })

  const handleServiceCancel = async (id) => {
    const updateDataCancel = {
      status: 'Cancelled'
    }

    const response = await fetch(`http://localhost:8080/api/appointments/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updateDataCancel)
    })
    if (response.ok) {
      fetchAppointmentsInfo();
    }
  }

  const handleServiceComplete = async (id) => {
    const updateDataComplete = {
      status: 'Complete'
    }

    const response = await fetch(`http://localhost:8080/api/appointments/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updateDataComplete)
    })
    if (response.ok) {
      fetchAppointmentsInfo();
    }
  }

  const fetchAppointmentsInfo = async () => {
      const appointmentsUrl = 'http://localhost:8080/api/appointments/';
      const response = await fetch(appointmentsUrl)

      if(response.ok) {
          const data = await response.json();
          const scheduledAppointments = data.appointments.filter(appointment => appointment.status === 'Scheduled');
          setAppointmentsInfo(scheduledAppointments)
      }
  }

  useEffect(() => {
      fetchAppointmentsInfo();
  }, [])

  return(
    <div className='container-fluid'>
      <h2>Service Appointments</h2>
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
        {sortAppointments.map(appointment => {
            return (
            <tr key={appointment.id}>
                <td>{ appointment.vin }</td>
                <td>{ appointment.sold ? "Yes": "No"}</td>
                <td>{ appointment.customer }</td>
                <td>{ formatDateTime(appointment.date_time) }</td>
                <td>{ appointment.technician.first_name } { appointment.technician.last_name }</td>
                <td>{ appointment.reason }</td>
                <td>
                <button onClick={() => handleServiceCancel(appointment.id)} type="button" className="btn btn-outline-danger">Cancel</button>
                <button onClick={() => handleServiceComplete(appointment.id)} type="button" class="btn btn-outline-success">Complete</button>

                </td>
            </tr>
            );
        })}
        </tbody>
      </table>
    </div>
  )
}

export default AppointmentsList
