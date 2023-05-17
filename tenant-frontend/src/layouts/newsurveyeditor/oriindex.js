/* eslint-disable react/prop-types */
// React Imports
import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import Axios from "axios";
import React, { useState, useEffect } from "react";
import { DndContext } from "@dnd-kit/core";

// Material UI components
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";

// Material Dashboard Component
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Droppable from "./Droppable";
import Draggable from "./Draggable";

const baseUrl = "http://127.0.0.1:8000/api/survey/";

const drawerWidth = 300;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: "100%",
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export default function Tables() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [isDropped, setIsDropped] = useState({});
  const [datas, setDatas] = useState([]);
  const [dropDatas, setDropDatas] = useState([]);
  const [sectionCount, setSectionCount] = useState(1);
  const [isPut, setIsPut] = useState({});
  const [sectionDropDatas, setSectionDropDatas] = useState([]);

  useEffect(() => {
    const filteredData = dropDatas.filter((data) => data.labelSection === sectionCount - 1);
    setSectionDropDatas((prevSectionDropDatas) => [...prevSectionDropDatas, filteredData]);
  }, [sectionCount, dropDatas]);

  console.log(sectionDropDatas);

  useEffect(() => {
    try {
      Axios.get(baseUrl).then((res) => {
        setDatas(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    try {
      Axios.get("http://localhost:8000/api/section/").then((res) => {
        setDropDatas(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const section = Object.keys(isDropped).map((key) => parseInt(key.split("-")[1], 10));
    const labelSection = section[0];

    const postData = {
      labelName: isPut.data,
      labelType: isPut.type,
      labelSection,
    };

    console.log("postData", postData);
    Axios.post("http://localhost:8000/api/section/", postData)
      .then((response) => {
        console.log("response", response.data);
      })
      .catch((error) => {
        console.error("error", error.data);
      });
  }, [isPut]);

  const handleCreateSection = () => {
    setSectionCount(sectionCount + 1);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDragEnd = (event) => {
    const { over } = event;
    if (over && over.id.startsWith("droppable")) {
      setIsPut(event.active.data.current);
      setIsDropped((prev) => ({
        [over.id]: event.active.data.current.data,
        ...prev,
      }));
    }
  };

  return (
    <AppBar open={open}>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox mb={3} mt={6} display="flex" flexDirection="column">
          <DndContext onDragEnd={handleDragEnd}>
            <Drawer
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                  width: drawerWidth,
                  overflow: "hidden",
                },
              }}
              variant="persistent"
              anchor="right"
              open={open}
            >
              <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === "rtl" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
              </DrawerHeader>
              {/* Title */}
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
              {/* Explanation */}
              <MDTypography variant="subtitle2" ml={2} mr={2} mt={2} mb={2}>
                You can start adding fields
              </MDTypography>
              {/* Draggable Components */}
              {datas.map((data) => (
                <MDBox key={data.id} mt={2} mb={2} ml={2} mr={2} style={{ cursor: "pointer" }}>
                  <Draggable key={data.id} id={data.id} data={data.labelName} type={data.labelType}>
                    {data.labelName}
                  </Draggable>
                </MDBox>
              ))}
            </Drawer>
            {Array.from({ length: sectionCount }, (_, i) => (
              <Card
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: 10,
                }}
              >
                {/* Title */}
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
                    <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      edge="end"
                      onClick={handleDrawerOpen}
                      sx={{ ...(open && { display: "none" }) }}
                    >
                      <MenuIcon />
                    </IconButton>
                  </MDBox>
                ) : null}
                <Main open={open}>
                  {/* Explanation */}
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
                  {/* Droppable Component */}
                  <MDBox mt={2} mb={2} ml={2} mr={2} style={{ display: "flex" }}>
                    {Array.from({ length: 3 }).map((unused, index) => {
                      const droppableId = `droppable${index + 1}-${i}`;
                      const isDroppedValue = isDropped[droppableId];
                      const labelName =
                        sectionDropDatas[i + 1]?.[index]?.labelName ||
                        isDroppedValue ||
                        "Drop here";

                      return <Droppable id={droppableId}>{labelName}</Droppable>;
                    })}
                  </MDBox>
                </Main>
              </Card>
            ))}
          </DndContext>
        </MDBox>
        <Footer />
      </DashboardLayout>
    </AppBar>
  );
}
