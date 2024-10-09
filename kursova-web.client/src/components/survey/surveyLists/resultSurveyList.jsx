import ResultSurveyCard from "../surveyCard/resultSurveyCard";

function ResultSurveyList({ surveys }) {

    return (
        <div>
            {surveys.length === 0
                ? <h1 style={{ textAlign: "center" }}>Not surveys!</h1>
                : surveys.map(survey =>
                    <ResultSurveyCard survey={survey} key={survey.id} />
                )
            }
            
        </div>
    );
}

export default ResultSurveyList;