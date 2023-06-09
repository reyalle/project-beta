import React, {useState, useEffect} from 'react';


function ModelList() {
    const [models, setModelsInfo] = useState([]);

    const fetchModelsInfo = async () => {
        const modelsUrl = 'http://localhost:8100/api/models/';

        const response = await fetch(modelsUrl);

        if(response.ok) {
            const data = await response.json();
            setModelsInfo(data.models)
        }
    }

    useEffect(() => {
        fetchModelsInfo();
    }, []);

    return (
        <div className="container-fluid">
            {/* <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4"> */}
                    <h1>Models</h1>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>Models</th>
                            <th>Manufacturer</th>
                            <th>Picture</th>
                        </tr>
                        </thead>
                        <tbody>
                        {models.map(model => {
                            return (
                            <tr key={model.id}>
                                <td>{ model.name }</td>
                                <td>{ model.manufacturer.name }</td>
<<<<<<< HEAD
                                <img src={model.picture_url} width="250" height="200" alt="vehicle pic"/>
=======
                                <td><img src={model.picture_url} width="50%" height="50%"/></td>
>>>>>>> ced00abba3944124c49cfab321e50da018b724a2
                            </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
        //     </div>
        // </div>
    );
}

export default ModelList;
