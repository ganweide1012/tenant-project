// React Imports
import React from "react";
import "survey-core/defaultV2.min.css";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";

// Material Dashboard Component
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

export default function Tables() {
  const surveyJson = {
    elements: [
      {
        name: "FirstName",
        title: "Enter your first name:",
        type: "text",
      },
      {
        name: "LastName",
        title: "Enter your last name:",
        type: "text",
      },
    ],
  };
  const survey = new Model(surveyJson);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Survey model={survey} />
      <Footer />
    </DashboardLayout>
  );
}
