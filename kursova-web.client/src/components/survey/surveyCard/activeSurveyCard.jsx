import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ActiveSurveyCard({ survey, remove }) {
    const router = useNavigate()
    const token = localStorage.getItem('token');
    const [candidated, setCandidated] = useState({
        id: 0,
        name: ""
    })

    const VoteSurvey = async (e) => {
        e.preventDefault()

        console.log("candidate", candidated)

        try {
            fetch(`https://localhost:7262/api/v1/survey/vote/${survey.id}`, {
                method: 'post',
                body: JSON.stringify(candidated),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(r => r.json())
                .then(data => {
                    console.log("resonse", data)

                    if (data.success) {
                        remove(survey)
                    }
                })


        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }



    return (
        <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
                <h5 className="card-title">{survey.name}</h5>
                <span className="badge bg-warning text-black">Activate</span>
                <p className="card-text">{survey.description}</p>
                <form onSubmit={VoteSurvey}>
                    {survey.candidates.length === 0
                        ? <h5>Not Candidate</h5>
                        : survey.candidates.map(candidate =>
                                <div key={candidate.id} className="form-check">
                                    <input className="form-check-input"
                                        type="radio"
                                        name="flexRadioDefault"
                                        value={candidate.name}
                                        checked={candidated.name === candidate.name}
                                        onChange={(e) => setCandidated({ ...candidated, id: candidate.id, name: e.target.value })}
                                    />
                                    <label className="form-check-label">
                                        {candidate.name}
                                    </label>
                                </div>
                            )
                        }  
                    <br></br>
                    {survey.status === 1
                        ? <button type="submit" className="btn btn-primary">Vote</button>
                        : <p></p>
                    }
                </form>
            </div>
        </div>
    );
}

export default ActiveSurveyCard;