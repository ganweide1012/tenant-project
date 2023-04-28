/* eslint-disable react/prop-types */
// React Imports
import Axios from "axios";
import React, { useState, useEffect } from "react";
import { DndContext } from "@dnd-kit/core";

// Material UI components
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";

// Material Dashboard Component
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Droppable from "./Droppable";
import Draggable from "./Draggable";

const baseUrl = "http://127.0.0.1:8000/api/survey/";

export default function Tables() {
  const [sectionCount, setSectionCount] = useState(1);

  const handleCreateSection = () => {
    setSectionCount(sectionCount + 1);
  };

  const [isDropped, setIsDropped] = useState({});

  const [state, setState] = useState({ right: false });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleDragEnd = (event) => {
    const { over } = event;
    if (over && over.id.startsWith("droppable")) {
      setIsDropped((prev) => ({
        ...prev,
        [over.id]: true,
      }));
    }
  };

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

  const list = (anchor) => (
    <Box
      sx={{ width: "auto", overflowX: "hidden", overflowY: "hidden" }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <MDBox
        mx={2}
        mt={2}
        py={3}
        px={2}
        pt={3}
        variant="gradient"
        bgColor="info"
        borderRadius="lg"
        coloredShadow="info"
        display="flex"
        justifyContent="space-between"
      >
        <MDTypography variant="h3" color="white">
          Layout Editor
        </MDTypography>
      </MDBox>
      <MDTypography variant="subtitle2" ml={2} mr={2} mt={2} mb={2}>
        You can start adding fields with Input Creator.
      </MDTypography>
      {datas.map((data) => (
        <MDBox key={data.id} mt={2} mb={2} ml={2} mr={2} style={{ cursor: "pointer" }}>
          <Draggable id={data.id} setState={setState}>
            {data.labelName}
          </Draggable>
        </MDBox>
      ))}
    </Box>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={3} mt={6} display="flex" flexDirection="column">
        <DndContext onDragEnd={handleDragEnd}>
          {/* Start Droppable Area */}
          {Array.from({ length: sectionCount }, (_, i) => (
            <Card
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                marginBottom: 10,
              }}
            >
              {/* Start Title Container */}
              {i === 0 ? (
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  pt={3}
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                  display="flex"
                  justifyContent="space-between"
                >
                  <MDTypography variant="h3" color="white">
                    Survey Layout
                  </MDTypography>
                  {/* Drawer Start */}
                  <React.Fragment key="right">
                    <Button onClick={toggleDrawer("right", true)}>right</Button>
                    <Drawer
                      anchor="right"
                      open={state.right}
                      onClose={toggleDrawer("right", false)}
                      PaperProps={{ style: { width: "auto" } }}
                    >
                      {list("right")}
                    </Drawer>
                  </React.Fragment>
                  {/* Drawer End */}
                </MDBox>
              ) : null}
              {/* End Title Container */}
              {/* Start Body */}
              {i === 0 ? (
                <>
                  <MDTypography variant="subtitle2" ml={2} mr={2} mt={2} mb={2}>
                    You can start adding fields with Input Creator.
                  </MDTypography>
                  <MDBox mb={2} mr={2} display="flex" justifyContent="flex-start">
                    <Button type="button" onClick={handleCreateSection}>
                      Create New Section
                    </Button>
                  </MDBox>
                </>
              ) : null}
              <MDBox mt={2} mb={2} ml={2} mr={2} style={{ display: "flex" }}>
                <Droppable id={`droppable1-${i}`}>
                  {isDropped[`droppable1-${i}`] ? <div>Dragged!</div> : "Drop here"}
                </Droppable>
                <Droppable id={`droppable2-${i}`}>
                  {isDropped[`droppable2-${i}`] ? <div>Dragged!</div> : "Drop here"}
                </Droppable>
                <Droppable id={`droppable3-${i}`}>
                  {isDropped[`droppable3-${i}`] ? <div>Dragged!</div> : "Drop here"}
                </Droppable>
                {/* End Droppable Area */}
              </MDBox>
              {/* End Body */}
            </Card>
          ))}
        </DndContext>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
