import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function EditSurveyCard({ survey, remove }) {
    const router = useNavigate()
    const [candidated, setCandidated] = useState({
        name: ""
    })

    const DeleteSurvey = async () => {
        const token = localStorage.getItem('token');

        const response = await axios.delete(`https://localhost:7262/api/v1/survey/delete/${survey.id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        console.log(response.data)

        if (response.data.success) {
            remove(survey)
        }
    }

    const ActivateSurvey = async () => {
        const token = localStorage.getItem('token');

        const response = await axios.get(`https://localhost:7262/api/v1/survey/activate/${survey.id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        console.log(response.data)

        if (response.data.success) {
            remove(survey)
        }
    }

    return (
        <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
                <h5 className="card-title">{survey.name}</h5>
                <span className="badge bg-light text-black">Not Activate</span>
                <p className="card-text">{survey.description}</p>
                    {survey.candidates.length === 0
                        ? <h5>Not Candidate</h5>
                        : survey.candidates.map(candidate =>
                                    <div key={candidate.id} className="form-check">
                                        <input className="form-check-input"
                                            type="radio"
                                            name="flexRadioDefault"
                                            value={candidate.name}
                                            checked={candidated.name === candidate.name}
                                            onChange={(e) => setCandidated({ ...candidated, name: e.target.value })}
                                        />
                                        <label className="form-check-label">
                                            {candidate.name}
                                        </label>
                                        
                                    </div>
                                )
                            }  
                      <div>
                        <button onClick={ActivateSurvey} className="btn btn-primary">Activade</button>
                        <button onClick={() => router(`/survey/edit/${survey.id}`)} className="btn btn-secondary">Edit</button>
                        <button onClick={DeleteSurvey} className="btn btn-secondary">Delete</button>
                    </div>
            </div>
        </div>
    );
}

export default EditSurveyCard;