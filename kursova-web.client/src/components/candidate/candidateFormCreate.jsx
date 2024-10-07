import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function CandidateFormCreate() {

    const router = useNavigate()
    const params = useParams()
    const [candidate, setCandidate] = useState({
        name: '',
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
            fetch(`https://localhost:7262/api/v1/candidate/create/${params.id}`, {
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
                        router(`/survey/edit/${params.id}`)
                    }
                })


        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }


    return <div>
        <h1>Create Candidate</h1>
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
            <button type="submit" className="btn btn-primary">Create</button>
        </form>
        {responseMessage && <p style={{ color: 'red' }}>{responseMessage}</p>}
    </div>
}

export default CandidateFormCreate;