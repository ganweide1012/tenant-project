// React Imports
import Axios from "axios";
import React, { useState, useEffect } from "react";
import "survey-core/defaultV2.min.css";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";

// Material Dashboard Component
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

const baseUrl = "http://127.0.0.1:8000/api/survey/";

export default function Tables() {
  const [datas, setDatas] = useState([]);
  useEffect(() => {
    try {
      Axios.get(baseUrl).then((res) => {
        setDatas(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  console.log(datas);

  const surveyJson = {
    elements: datas.map((prop) => {
      const element = {
        name: prop.labelName,
        type: prop.labelType,
      };
      if (prop.labelType === "Dropdown") {
        element.choices = prop.options.split(",");
      }
      console.log(element);
      return element;
    }),
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
