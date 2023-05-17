/* eslint-disable react/prop-types */
// React Imports
import Axios from "axios";
import React, { useState, useEffect } from "react";

// Draggable, Droppable imports
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { DndContext } from "@dnd-kit/core";

// Material UI components
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Unstable_Grid2";

// Material Dashboard Component
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Drop from "./Droppable";
import Drag from "./Draggable";

const baseUrl = "http://127.0.0.1:8000/api/survey/";

// Drawer Set Up
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
  position: "relative",
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
  const [datas, setDatas] = useState([]);
  // const [dropDatas, setDropDatas] = useState([]);
  const [sectionCount, setSectionCount] = useState(1);
  // const [sectionDropDatas, setSectionDropDatas] = useState([]);
  // const [grids, setGrids] = useState([{ id: 1, xs: 12, sec: 1 }]);
  const [hovered, setHovered] = useState(Array(sectionCount).fill(false));
  const [sortedDivs, setSortedDivs] = useState([]);

  useEffect(() => {
    const newSortedDivs = Array.from({ length: sectionCount }, (_, i) => `droppable-${i}`);
    setSortedDivs(newSortedDivs);
  }, [sectionCount]);

  // useEffect(() => {
  //   const filteredData = dropDatas.filter((data) => data.labelSection === sectionCount - 1);
  //   setSectionDropDatas((prevSectionDropDatas) => [...prevSectionDropDatas, filteredData]);
  // }, [sectionCount, dropDatas]);

  // console.log(sectionDropDatas);

  useEffect(() => {
    try {
      Axios.get(baseUrl).then((res) => {
        setDatas(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  // useEffect(() => {
  //   try {
  //     Axios.get("http://localhost:8000/api/section/").then((res) => {
  //       setDropDatas(res.data);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

  // Drop Datas Saving
  // const handleSave = () => {
  //   const section = Object.keys(isDropped).map((key) => parseInt(key.split("-")[1], 10));
  //   const labelSection = section[0];
  //   const postData = Object.values(isPut).map((data) => ({
  //     labelName: data.data,
  //     labelType: data.type,
  //     labelSection,
  //   }));
  //   postData.forEach((data) => {
  //     Axios.post("http://localhost:8000/api/section/", data)
  //       .then((response) => {
  //         console.log("POST request successful", response.data);
  //       })
  //       .catch((error) => {
  //         console.error("Error in POST request", error);
  //       });
  //   });
  // };

  // Drawer Button
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Droppable
  const [isDropped, setIsDropped] = useState({});
  const [isPut, setIsPut] = useState({});
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && over.id.startsWith("droppable")) {
      setIsPut(active.data.current);
      setIsDropped((prev) => {
        const newIsDropped = { ...prev };
        console.log(newIsDropped);
        if (newIsDropped[over.id]) {
          newIsDropped[over.id] = active.data.current.data;
        } else {
          newIsDropped[over.id] = active.data.current.data;
        }
        return newIsDropped;
      });
    }
  };

  useEffect(() => {
    console.log("isDropped", isDropped);
    console.log("isPut", isPut);
    console.log("sortedDivs", sortedDivs);
  }, [isPut, isDropped, sortedDivs]);

  /// DROP AREA SETTINGS
  // Context Menu
  const [contextMenu, setContextMenu] = React.useState(null);
  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : null
    );
  };
  const handleClose = () => {
    setContextMenu(null);
  };
  const handleDelete = () => {
    console.log(isDropped);
  };
  // Drop Area Mouse Hovering
  const handleMouseEnter = (index) => {
    const updatedHovered = Array(sectionCount).fill(false);
    updatedHovered[index] = true;
    setHovered(updatedHovered);
  };
  const handleMouseLeave = () => {
    setHovered(Array(sectionCount).fill(false));
  };

  /// SECTION SETTINGS
  // New Section
  const handleCreateSection = () => {
    setSectionCount((prevSectionCount) => prevSectionCount + 1);
  };
  // Section Title
  const [titles, setTitles] = useState(Array.from(Array(sortedDivs.length), () => "Title"));
  const handleEditTitle = (index) => {
    const newTitles = Array.from(titles);
    const newTitle = prompt("Enter the new title");
    if (newTitle) {
      newTitles[index] = newTitle;
      setTitles((prev) => ({
        ...prev,
        [`droppable-${index}`]: newTitles[index],
      }));
    }
  };
  // Section Sortable
  const handleSortEnd = (event) => {
    const { draggableId, source, destination } = event;
    if (!destination) return;

    const sourceDroppableId = source.droppableId;
    const destinationDroppableId = destination.droppableId;
    const sourceData = isDropped[sourceDroppableId];
    const destinationData = isDropped[destinationDroppableId];
    const sourceTitle = titles[sourceDroppableId];
    const destinationTitle = titles[destinationDroppableId];

    // Update the data in both the source and destination droppables
    setIsDropped((prev) => ({
      ...prev,
      [sourceDroppableId]: destinationData,
      [destinationDroppableId]: sourceData,
    }));

    setTitles((prev) => ({
      ...prev,
      [sourceDroppableId]: destinationTitle,
      [destinationDroppableId]: sourceTitle,
    }));

    // Update the sortedDivs array if necessary
    if (sourceDroppableId && destinationDroppableId && draggableId && sortedDivs) {
      const sourceIndex = sortedDivs.findIndex((id) => id === draggableId);
      const destinationIndex = sortedDivs.findIndex((id) => id === destination.draggableId);

      if (sourceIndex !== -1 && destinationIndex !== -1) {
        const newSortedDivs = Array.from(sortedDivs);

        // Swap the positions of the draggableIds in the sortedDivs array
        const [removed] = newSortedDivs.splice(sourceIndex, 1);
        newSortedDivs.splice(destinationIndex, 0, removed);

        setSortedDivs(newSortedDivs);
      }
    }

    if (sourceDroppableId && destinationDroppableId && draggableId && sortedDivs) {
      const sourceIndex = sortedDivs.findIndex((id) => id === draggableId);
      const destinationIndex = sortedDivs.findIndex((id) => id === destination.draggableId);

      if (sourceIndex !== -1 && destinationIndex !== -1) {
        const newTitles = Array.from(titles);
        const [removedTitle] = newTitles.splice(sourceIndex, 1);
        newTitles.splice(destinationIndex, 0, removedTitle);
        setTitles(newTitles);
      }
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
                  <Drag key={data.id} id={data.id} data={data.labelName} type={data.labelType}>
                    {data.labelName}
                  </Drag>
                </MDBox>
              ))}
            </Drawer>
            <Card
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                marginBottom: 10,
              }}
            >
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
              <Main open={open}>
                <MDTypography variant="subtitle2" ml={2} mr={2} mt={2} mb={2}>
                  You can start adding fields with Input Creator. Right-click to delete
                </MDTypography>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <MDBox mb={2} mr={2} display="flex" justifyContent="flex-start">
                    <Button type="button" onClick={handleCreateSection}>
                      Create New Section
                    </Button>
                  </MDBox>
                  {/* <MDBox mb={2} ml={2} display="flex" justifyContent="flex-end">
                    <Button type="button" onClick={handleSave}>
                      Save
                    </Button>
                  </MDBox> */}
                </div>
              </Main>
            </Card>
            <DragDropContext onDragEnd={handleSortEnd}>
              {sortedDivs.map((divId, index) => (
                <Droppable droppableId={divId} key={divId}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      style={{ marginBottom: "10px" }}
                    >
                      <Draggable
                        draggableId={divId}
                        index={index}
                        shouldAnimateDragMovement={false}
                      >
                        {(provide) => (
                          <div
                            ref={provide.innerRef}
                            {...provide.draggableProps}
                            {...provide.dragHandleProps}
                          >
                            <Card>
                              <div
                                onContextMenu={handleContextMenu}
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={handleMouseLeave}
                                style={{ cursor: "grab" }}
                              >
                                <MDBox
                                  mt={2}
                                  ml={2}
                                  mb={2}
                                  display="flex"
                                  flexDirection="row"
                                  justifyContent="space-between"
                                >
                                  <div>{titles[`droppable-${index}`]}</div>
                                  <Button
                                    type="button"
                                    style={{
                                      display: "flex",
                                      justifyContent: "flex-end",
                                    }}
                                    onClick={() => handleEditTitle(index)}
                                  >
                                    Edit Title
                                  </Button>
                                </MDBox>
                                <div style={{ width: "100%" }}>
                                  <Drop id={divId} hovered={hovered[index]}>
                                    <Grid container spacing={2}>
                                      <Grid item xs={12}>
                                        {isDropped[`droppable-${index}`] ? (
                                          <div>{isDropped[`droppable-${index}`]}</div>
                                        ) : (
                                          "Drop here"
                                        )}
                                      </Grid>
                                      <Menu
                                        open={contextMenu !== null}
                                        onClose={handleClose}
                                        anchorReference="anchorPosition"
                                        anchorPosition={
                                          contextMenu !== null
                                            ? {
                                                top: contextMenu.mouseY,
                                                left: contextMenu.mouseX,
                                              }
                                            : undefined
                                        }
                                      >
                                        <MenuItem onClick={handleDelete}>Delete</MenuItem>
                                      </Menu>
                                    </Grid>
                                  </Drop>
                                </div>
                              </div>
                            </Card>
                          </div>
                        )}
                      </Draggable>
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
            </DragDropContext>
          </DndContext>
        </MDBox>
        <Footer />
      </DashboardLayout>
    </AppBar>
  );
}
