/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Subscription from "layouts/subscription";
import Branch from "layouts/branch";
import Program from "layouts/program";
import Customer from "layouts/customer";
import Participation from "layouts/participation";
import SurveyEditor from "layouts/surveyeditor";
import Survey from "layouts/survey";
import NEWSurveyEditor from "layouts/newsurveyeditor";
import NEWSurvey from "layouts/newsurvey";
import SignOut from "layouts/authentication/sign-out";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// @mui icons
import Icon from "@mui/material/Icon";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import MediationIcon from "@mui/icons-material/Mediation";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PostAddIcon from "@mui/icons-material/PostAdd";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import ModeIcon from "@mui/icons-material/Mode";

const routes = [
  {
    type: "collapse",
    name: "Tenants",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Subscription",
    key: "subscription",
    icon: (
      <Icon fontSize="small">
        <ControlPointIcon />
      </Icon>
    ),
    route: "/subscription",
    component: <Subscription />,
  },
  {
    type: "collapse",
    name: "Branch",
    key: "branch",
    icon: (
      <Icon fontSize="small">
        <MediationIcon />
      </Icon>
    ),
    route: "/branch",
    component: <Branch />,
  },
  {
    type: "collapse",
    name: "Program",
    key: "program",
    icon: (
      <Icon fontSize="small">
        <ListAltIcon />
      </Icon>
    ),
    route: "/program",
    component: <Program />,
  },
  {
    type: "collapse",
    name: "Customer",
    key: "customer",
    icon: <Icon fontSize="small">people</Icon>,
    route: "/customer",
    component: <Customer />,
  },
  {
    type: "collapse",
    name: "Participation",
    key: "participation",
    icon: (
      <Icon fontSize="small">
        <PostAddIcon />
      </Icon>
    ),
    route: "/participation",
    component: <Participation />,
  },
  {
    type: "collapse",
    name: "Survey Editor",
    key: "surveyeditor",
    icon: (
      <Icon fontSize="small">
        <ModeIcon />
      </Icon>
    ),
    route: "/surveyeditor",
    component: <SurveyEditor />,
  },
  {
    type: "collapse",
    name: "Survey",
    key: "survey",
    icon: (
      <Icon fontSize="small">
        <NoteAltIcon />
      </Icon>
    ),
    route: "/survey",
    component: <Survey />,
  },
  {
    type: "collapse",
    name: "NEWSurvey Editor",
    key: "newsurveyeditor",
    icon: (
      <Icon fontSize="small">
        <ModeIcon />
      </Icon>
    ),
    route: "/newsurveyeditor",
    component: <NEWSurveyEditor />,
  },
  {
    type: "collapse",
    name: "NEWSurvey",
    key: "newsurvey",
    icon: (
      <Icon fontSize="small">
        <NoteAltIcon />
      </Icon>
    ),
    route: "/newsurvey",
    component: <NEWSurvey />,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
  {
    type: "collapse",
    name: "Sign Out",
    key: "sign-out",
    icon: <Icon fontSize="small">logout</Icon>,
    route: "/authentication/sign-out",
    component: <SignOut />,
    protected: true,
  },
];

export default routes;
