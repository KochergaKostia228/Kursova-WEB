import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../../../node_modules/axios/index";

function CandidateFormEdit() {
    const router = useNavigate()
    const params = useParams()
    const [candidate, setCandidate] = useState({
        name: '',
    });
    const [responseMessage, setResponseMessage] = useState('');

    useEffect(() => {
        previevToken()
        GetCandidateById()
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

    const GetCandidateById = async (e) => {
        const token = localStorage.getItem('token');

        try {

            const response = await axios.get(`https://localhost:7262/api/v1/candidate/${params.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log(response.data)

            if (response.data.success) {
                setCandidate(response.data.data)
            }


        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            fetch(`https://localhost:7262/api/v1/candidate/edit/${params.id}`, {
                method: 'post',
                body: JSON.stringify(candidate),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(r => r.json())
                .then(data => {
                    console.log("resonse", data)
                    console.log("searchForm", candidate)

                    if (data.success) {
                        router(`/survey/edit/${params.surveyId}`)
                    }
                })


        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }


    return <div>
        <h1>Edit Candidate</h1>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <div>
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={candidate.name}
                        onChange={(e) => setCandidate({ ...candidate, name: e.target.value })}
                        placeholder="Enter survey name"
                        required
                    />
                </div>
            </div>
            <button type="submit" className="btn btn-primary">Edit</button>
        </form>
        {responseMessage && <p style={{ color: 'red' }}>{responseMessage}</p>}
    </div>
}

export default CandidateFormEdit;