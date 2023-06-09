import {React, useState, useEffect} from 'react'


function ServiceHistory() {
  const [appointments, setAppointmentsInfo] = useState([])
  const [vinSearchFilter, setVinSearchFilter] = useState('')

  const handleVinSearchChange = async (event) => {
    const value = event.target.value
    setVinSearchFilter(value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setVinSearchFilter('')
    fetchAppointmentsInfo()
  }

  const fetchAppointmentsInfo = async () => {
      const appointmentsUrl = 'http://localhost:8080/api/appointments/';

      const response = await fetch(appointmentsUrl)

      if(response.ok) {
        const data = await response.json()
        setAppointmentsInfo(data.appointments)
      }
  }

  useEffect(() => {
      fetchAppointmentsInfo();
  }, [])

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

  const filteredAppointments = appointments.filter((appointment) =>
    appointment.vin.includes(vinSearchFilter)
  )
  const sortedAppointments = filteredAppointments.sort((a, b) => {
    return new Date(b.date_time) - new Date(a.date_time)
  })

  return(
    <>
      <div className='container-fluid'>
        <h1>Service History</h1>
        <form onSubmit={handleSubmit} id="create-apointment-search">
            <div className='form-floating mb-3'>
              <input onChange={handleVinSearchChange} value={vinSearchFilter} placeholder='vin_filter' required type='text' name='vin_filter' className='form-control' />
              <label htmlFor='vin_filter'>Search By VIN</label>
            </div>
          </form>
        <table className="table table-striped">
          <thead>
          <tr>
              <th>VIN</th>
              <th>Is VIP?</th>
              <th>Customer</th>
              <th>Date & Time</th>
              <th>Technician</th>
              <th>Reason</th>
              <th>Status</th>
          </tr>
          </thead>
          <tbody>
            {sortedAppointments.map((appointment) => {
              return (
                <tr key={appointment.id}>
                  <td>{ appointment.vin }</td>
                  <td>{ appointment.sold ? "Yes": "No"}</td>
                  <td>{ appointment.customer }</td>
                  <td>{ formatDateTime(appointment.date_time) }</td>
                  <td>{ appointment.technician.first_name } { appointment.technician.last_name }</td>
                  <td>{ appointment.reason }</td>
                  <td>{ appointment.status }</td>
                </tr>
              )
          })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ServiceHistory
