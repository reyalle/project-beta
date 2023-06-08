import React, {useState} from 'react';

function ModelsForm() {

    const [models, setModels] = useState([]);

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
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {};
        data.name = name;
        data.picture_url = pictureUrl
        data.manufacturer_id = manufacturerId

        const modelUrl = 'http://localhost:8100/api/models';
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
    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                <h1>Create a Vehicle Model</h1>
                <form onSubmit={handleSubmit} id="create-location-form">
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
                        {models.map(model => {
                            return (
                                <option key={model.id} value={model.manufacturer.id}>
                                    { model.id } { model.name }
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
