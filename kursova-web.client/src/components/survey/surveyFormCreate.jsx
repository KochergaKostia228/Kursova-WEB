import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SurveyFormCreate() {
    const router = useNavigate()
    const [survey, setSurvey] = useState({
        name: '',
        description: '',
        endDate: '',
        candidates: []
    });
    const [responseMessage, setResponseMessage] = useState('');

    useEffect(() => {
        previevToken()
    }, [])

    const previevToken = () => {
        const token = localStorage.getItem('token');
        const roles = localStorage.getItem('roles');

        if (token === null) {
            router('/login')
        }

        if (roles !== "Admin") {
            router('/survey')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            fetch('https://localhost:7262/api/v1/survey/create', {
                method: 'post',
                body: JSON.stringify(survey),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(r => r.json())
                .then(data => {
                    console.log("resonse", data)
                    console.log("searchForm", survey)

                    if (data.success) {
                        router('/survey/createList')
                    }
                })


        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }


    return <div>
        <h1>Create Survey</h1>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <div>
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={survey.name}
                        onChange={(e) => setSurvey({ ...survey, name: e.target.value })}
                        placeholder="Enter survey name"
                        required
                    />
                </div>
                <div>
                    <label className="form-label">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        value={survey.description}
                        onChange={(e) => setSurvey({ ...survey, description: e.target.value })}
                        placeholder="Enter survey description"
                        required
                    />
                </div>
                <div>
                    <label className="form-label">Date end</label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        value={survey.endDate}
                        onChange={(e) => setSurvey({ ...survey, endDate: e.target.value })}
                        placeholder="Enter survey data end"
                        required
                    />
                </div>
            </div>
            <button type="submit" className="btn btn-primary">Create</button>
        </form>
        {responseMessage && <p style={{ color: 'red' }}>{responseMessage}</p>}
    </div>
}

export default SurveyFormCreate;