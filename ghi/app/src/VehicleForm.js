import React, {useState, useEffect} from 'react';

function ModelsForm() {

    const [manufacturers, setManufacturers] = useState([])

    const[name, setName] = useState('');
    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }

    const[pictureUrl, setPictureUrl] = useState('');
    const handlePictureUrlChange = (event) => {
        const value = event.target.value;
        setPictureUrl(value);
    }

    const[manufacturerId, setManufacturerId] = useState('');
    const handleManufacturerIdChange = (event) => {
        const value = event.target.value;
        setManufacturerId(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {};
        data.name = name;
        data.picture_url = pictureUrl
        data.manufacturer_id = parseInt(manufacturerId)

        const modelUrl = 'http://localhost:8100/api/models/';

        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(modelUrl, fetchConfig);
        if (response.ok) {
            setName('');
            setPictureUrl('');
            setManufacturerId('');
        }
    }

    const fetchManufacturerInfo = async () => {
        const manufacturerUrl = 'http://localhost:8100/api/manufacturers';

        const response = await fetch(manufacturerUrl)

        if(response.ok){
            const data = await response.json();
            setManufacturers(data.manufacturers)
        }
    }

    useEffect(() => {
        fetchManufacturerInfo();
    }, []);

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                <h1>Create a Vehicle Model</h1>
                <form onSubmit={handleSubmit} id="create-vehicle-form">
                    <div className="form-floating mb-3">
                    <input value={name} onChange={handleNameChange} placeholder="name" required type="text" name="name" id="name" className="form-control" />
                    <label htmlFor="manufacturer">Model Name</label>
                    </div>
                    <div className="form-floating mb-3">
                    <input value={pictureUrl} onChange={handlePictureUrlChange} placeholder="picture url" required type="text" name="picture url" id="picture url" className="form-control" />
                    <label htmlFor="manufacturer">Picture Url</label>
                    </div>
                    <div className="mb-3">
                        <select className="form-select" value={manufacturerId} onChange={handleManufacturerIdChange} >
                        <option value=''>Choose a Manufacturer</option>
                        {manufacturers.map(manufacturer => {
                            return (
                                <option key={manufacturer.id} value={manufacturer.id}>
                                    { manufacturer.id } { manufacturer.name }
                                </option>
                            )
                        })}
                        </select>
                    </div>
                    <button className="btn btn-primary">Create</button>
                </form>
                </div>
            </div>
        </div>
    );
}

export default ModelsForm;
