import CandidateCreate from "../pages/candidateCreate";
import CandidateEdit from "../pages/candidateEdit";
import LoginPages from "../pages/loginPages";
import RegisterPages from "../pages/registerPages";
import SurveyCreate from "../pages/surveyCreate";
import SurveyCreateList from "../pages/surveyCreateList";
import SurveyEdit from "../pages/surveyEdit";
import SurveyResult from "../pages/surveyResult";
import SurveyShow from "../pages/surveyShow";

export const routes = [
    { path: "/login", component: LoginPages, exact: true },
    { path: "/register", component: RegisterPages, exact: true },
    { path: "/survey", component: SurveyShow, exact: true },
    { path: "/survey/resultList", component: SurveyResult, exact: true },
    { path: "/survey/createList", component: SurveyCreateList, exact: true },
    { path: "/survey/create", component: SurveyCreate, exact: true },
    { path: "/survey/edit/:id", component: SurveyEdit, exact: true },
    { path: "/candidate/edit/:surveyId/:id", component: CandidateEdit, exact: true },
    { path: "/candidate/create/:id", component: CandidateCreate, exact: true },
]