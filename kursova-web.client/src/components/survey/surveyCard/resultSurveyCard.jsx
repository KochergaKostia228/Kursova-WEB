import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ResultSurveyCard({ survey }) {
    

    const SumVotes = () => {
        const votes = 0
        survey.candidates.map(candidate =>
            votes += candidate.votes
        )

        return votes
    }


    return (
        <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
                <h5 className="card-title">{survey.name}</h5>
                {survey.status === 2
                    ? <span className="badge bg-success">Complete</span>
                    : <span className="badge bg-danger">Overdue</span>
                }
                <p className="card-text">{survey.description}</p>
                    {survey.candidates.length === 0
                        ? <h5>Not Candidate</h5>
                        : survey.candidates.map(candidate =>
                            <div key={candidate.id}>
                                <label className="form-check-label">
                                    {candidate.name}
                                </label>
                                <div className="progress" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                    <div className="progress-bar w-75" style={{width: `${candidate.votes / SumVotes * 100}%`} }>{candidate.votes }</div>
                                </div>
                                    
                            </div>
                        )
                    }  
                <br></br>
            </div>
        </div>
    );
}

export default ResultSurveyCard;