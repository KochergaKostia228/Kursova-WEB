import { useState } from "react";
import CandidateList from "../components/candidate/candidateList";
import SurveyFormCreate from "../components/survey/surveyFormCreate";
import axios from "../../../node_modules/axios/index";

function SurveyCreate() {

    return (
        <>
            <SurveyFormCreate />
        </>
    )
}

export default SurveyCreate;