import Vue from "vue";
import Router from "vue-router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import InformationList from "./views/InformationList.vue";
import Patrol from "./views/Patrol.vue";
import InformationDetails from "./views/InformationDetails.vue";
import AskForLeave from "./views/AskForLeave.vue";
import EvaluatingList from "./views/EvaluatingList.vue";
import EvaluateDetails from "./views/EvaluateDetails.vue";
import AppraisalList from "./views/AppraisalList.vue";
import AddQuestionBank from "./views/AddQuestionBank.vue";
import InquireQuestionBank from "./views/InquireQuestionBank.vue";
import SelectFigure from "./views/SelectFigure.vue";
import InformList from "./views/InformList.vue";
import ReadStatistics from "./views/ReadStatistics.vue";
import AddInform from "./views/AddInform.vue";
import PublishOrganization from "./views/PublishOrganization.vue";
import AcceptOrganization from "./views/AcceptOrganization.vue";
import CompileInform from "./views/CompileInform.vue";
import ExamineInform from "./views/ExamineInform.vue";
import Entrance from "./views/Entrance.vue";
import Dome from "./views/dome.vue";
import HeadlineDetails from "./views/HeadlineDetails.vue";
import ConnectList from "./views/ConnectList.vue";
import MyConnect from "./views/MyConnect.vue";
import Successor from "./views/Successor.vue";
import ExamineAndApproveList from "./views/ExamineAndApproveList.vue";
import ExamineAndApproveDel from "./views/ExamineAndApproveDel.vue";
import TurnDown from "./views/TurnDown.vue";
import ExamineAndApproveEdit from "./views/ExamineAndApproveEdit.vue";
import ExamineAndApproveEditTwo from "./views/ExamineAndApproveEditTwo.vue";
import ApplyFor from "./views/ApplyFor.vue";
import NewApplyFor from "./views/NewApplyFor.vue";
import SelectApplyFor from "./views/SelectApplyFor.vue";
import Nominator from "./views/Nominator.vue";
import ChangeShift from "./views/ChangeShift.vue";
import TheApprovalIsPendingList from "./views/TheApprovalIsPendingList.vue";
import TheApprovalIsPendingDel from "./views/TheApprovalIsPendingDel.vue";
import TheApprovalIsPendingTurnDown from "./views/TheApprovalIsPendingTurnDown.vue";
Vue.use(Router);
Vue.use(ElementUI);
Vue.use(MintUI)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Dome",
      component: Dome
    },
    {
      path: "/InformationList",
      name: "InformationList",
      component: InformationList
    },
    {
      path: "/Patrol",
      name: "Patrol",
      component: Patrol
    },
    {
      path: "/InformationDetails",
      name: "InformationDetails",
      component: InformationDetails
    },
    {
      path: "/AskForLeave",
      name: "AskForLeave",
      component: AskForLeave
    },
    {
      path: "/EvaluatingList",
      name: "EvaluatingList",
      component: EvaluatingList
    },
    {
      path: "/EvaluateDetails",
      name: "EvaluateDetails",
      component: EvaluateDetails
    },
    {
      path: "/AppraisalList",
      name: "AppraisalList",
      component: AppraisalList
    },
    {
      path: "/AddQuestionBank",
      name: "AddQuestionBank",
      component: AddQuestionBank
    },
    {
      path: "/InquireQuestionBank",
      name: "InquireQuestionBank",
      component: InquireQuestionBank
    },
    {
      path: "/SelectFigure",
      name: "SelectFigure",
      component: SelectFigure
    },
    {
      path: "/InformList",
      name: "InformList",
      component: InformList
    },
    {
      path: "/ReadStatistics",
      name: "ReadStatistics",
      component: ReadStatistics
    },
    {
      path: "/AddInform",
      name: "AddInform",
      component: AddInform
    },
    {
      path: "/PublishOrganization",
      name: "PublishOrganization",
      component: PublishOrganization
    },
    {
      path: "/AcceptOrganization",
      name: "AcceptOrganization",
      component: AcceptOrganization
    },
    {
      path: "/CompileInform",
      name: "CompileInform",
      component: CompileInform
    },
    {
      path: "/ExamineInform",
      name: "ExamineInform",
      component: ExamineInform
    },
    {
      path: "/Entrance",
      name: "Entrance",
      component: Entrance
    },
    {
      path: "/HeadlineDetails",
      name: "HeadlineDetails",
      component: HeadlineDetails
    },
    {
      path: "/ConnectList",
      name: "ConnectList",
      component: ConnectList
    },
    {
      path: "/MyConnect",
      name: "MyConnect",
      component: MyConnect
    },
    {
      path: "/Successor",
      name: "Successor",
      component: Successor
    },
    {
      path: "/ExamineAndApproveList",
      name: "ExamineAndApproveList",
      component: ExamineAndApproveList
    },
    {
      path: "/ExamineAndApproveDel",
      name: "ExamineAndApproveDel",
      component: ExamineAndApproveDel
    },
    {
      path: "/TurnDown",
      name: "TurnDown",
      component: TurnDown
    },
    {
      path: "/ExamineAndApproveEdit",
      name: "ExamineAndApproveEdit",
      component: ExamineAndApproveEdit
    },
    {
      path: "/ExamineAndApproveEditTwo",
      name: "ExamineAndApproveEditTwo",
      component: ExamineAndApproveEditTwo
    },
    {
      path: "/ApplyFor",
      name: "ApplyFor",
      component: ApplyFor
    },
    {
      path: "/NewApplyFor",
      name: "NewApplyFor",
      component: NewApplyFor
    },
    {
      path: "/SelectApplyFor",
      name: "SelectApplyFor",
      component: SelectApplyFor
    },
    {
      path: "/Nominator",
      name: "Nominator",
      component: Nominator
    },
    {
      path: "/ChangeShift",
      name: "ChangeShift",
      component: ChangeShift
    },
    {
      path: "/TheApprovalIsPendingList",
      name: "TheApprovalIsPendingList",
      component: TheApprovalIsPendingList
    },
    {
      path: "/TheApprovalIsPendingDel",
      name: "TheApprovalIsPendingDel",
      component: TheApprovalIsPendingDel
    },
    {
      path: "/TheApprovalIsPendingTurnDown",
      name: "TheApprovalIsPendingTurnDown",
      component: TheApprovalIsPendingTurnDown
    }
    
  ]
});