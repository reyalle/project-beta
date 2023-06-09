import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function AppointmentForm() {
  const [vin, setVin] = useState('')
  const [customer, setCustomer] = useState('')
  const [date_time, setDateTime] = useState([])
  const [technicians, setTechnicianInfo] = useState([])
  const [technician, setTechnician] = useState('')
  const [reason, setReason] = useState('')
  const navigate = useNavigate()

  const handleVinChange = (event) => {
    const value = event.target.value
    setVin(value)
  }
    const handleCustomerChange = (event) => {
    const value = event.target.value
    setCustomer(value)
  }
    const handleDateTimeChange = (event) => {
    const value = event.target.value
    setDateTime(value)
  }
    const handleTechnicianChange = (event) => {
    const value = event.target.value
    setTechnician(value)
  }
    const handleReasonChange = (event) => {
    const value = event.target.value
    setReason(value)
  }
  const handleSubmit = async (event) => {
    event.preventDefault()

    const data = {}

    data.vin = vin
    data.customer = customer
    data.date_time = date_time
    data.technician = technician
    data.reason = reason

    const appointmentUrl = 'http://localhost:8080/api/appointments/'

    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'applications/json'
      },
    }

    const response = await fetch(appointmentUrl, fetchConfig)
    if (response.ok) {

      setVin('')
      setCustomer('')
      setDateTime([])
      setTechnician([])
      setReason('')
      navigate('/appointments')
    }
  }

  const fetchTechnicianInfo = async () => {
    const techniciansUrl = 'http://localhost:8080/api/technicians/';
    const response = await fetch(techniciansUrl)

    if(response.ok) {
        const data = await response.json();
        setTechnicianInfo(data.technicians)
    }
  }

  useEffect(() => {
    fetchTechnicianInfo();
  }, []);

  return(
    <div className="row">
      <div className="offset-3 col-6">
        <div className='shadow p-4 mt-4'>
          <h1>Add Appointment</h1>
          <form onSubmit={handleSubmit} id="add-appointment-form">
            <div className='form-floating mb-3'>
              <input onChange={handleVinChange} value={vin} placeholder='vin' required type='text' name='vin' className='form-control' />
              <label htmlFor='vin'>Enter Vin</label>
            </div>
            <div className='form-floating mb-3'>
              <input onChange={handleCustomerChange} value={customer} placeholder='customer' required type='text' name='customer' className='form-control' />
              <label htmlFor='customer'>Customer Name</label>
            </div>
            <div className='form-floating mb-3'>
              <input onChange={handleDateTimeChange} value={date_time} placeholder='Employee ID' required type='datetime-local' name='date_time' className='form-control' />
              <label htmlFor='date_time'>Schedule Time</label>
            </div>
            <div className="mb-3">
                <select onChange={handleTechnicianChange} value={technician} required name="technician" id="technician" className="form-select">
                    <option>Assign Technician</option>
                    {technicians.map(technician => {
                      return (
                        <option key={technician.employee_id} value={technician.employee_id}>
                          {technician.first_name} {technician.last_name}
                        </option>
                      )
                    })}
                </select>
              </div>
              <div className='form-floating mb-3'>
              <input onChange={handleReasonChange} value={reason} placeholder='reason' required type='text' name='reason' className='form-control' />
              <label htmlFor='reason'>Reason for Service</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AppointmentForm
