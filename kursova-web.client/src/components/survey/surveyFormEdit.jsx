import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../../../node_modules/axios/index";
import CandidateList from "../candidate/candidateList";

function SurveyFormEdit() {
    const router = useNavigate()
    const params = useParams()
    const [survey, setSurvey] = useState({
        name: '',
        description: '',
        endDate: '',
        candidates: []
    });
    const [responseMessage, setResponseMessage] = useState('');

    useEffect(() => {
        previevToken()
        GetSurveyById()
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

    const GetSurveyById = async (e) => {
        const token = localStorage.getItem('token');

        try {

            const response = await axios.get(`https://localhost:7262/api/v1/survey/${params.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log(response.data)

            if (response.data.success) {
                setSurvey(response.data.data)
            }


        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }

    const RemoveCandidate = (candidate) => {
        setSurvey({ ...survey, candidates: survey.candidates.filter(c => c.id !== candidate.id) })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            fetch(`https://localhost:7262/api/v1/survey/edit/${params.id}`, {
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
        <h1>Edit Survey</h1>
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
            <div className="d-flex justify-content-evenly">
                <button type="submit" className="btn btn-primary">Edit</button>
                <button onClick={() => router(`/candidate/create/${params.id}`)} className="btn btn-secondary">Add candidate</button>
            </div>
            <CandidateList survey={survey} remove={RemoveCandidate} />
        </form>
        {responseMessage && <p style={{ color: 'red' }}>{responseMessage}</p>}
    </div>
}

export default SurveyFormEdit;