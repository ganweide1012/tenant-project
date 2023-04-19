/* eslint-disable react/prop-types */
// React Imports
import Axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  useSortable,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Material UI components
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";

// Material Dashboard Component
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

const baseUrl = "http://127.0.0.1:8000/api/survey/";

function SortableList({ items }) {
  return (
    <div>
      {items.map((item) => (
        <Item key={item} id={item.id}>
          {item.labelName}
        </Item>
      ))}
    </div>
  );
}

function Item({ id, children }) {
  const { isDragging, listeners, setNodeRef, transform, transition } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grabbing",
    userSelect: "none",
    opacity: isDragging ? 0.5 : 1,
    width: "100%",
    padding: "8px",
    borderRadius: "4px",
    marginBottom: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
    backgroundColor: isDragging ? "#f0f0f0" : "white",
  };

  style.transition += ", background-color 150ms ease-in-out, box-shadow 150ms ease-in-out";

  return (
    <div key={id} ref={setNodeRef} style={style} {...listeners}>
      {children}
    </div>
  );
}

export default function Tables() {
  const [datas, setDatas] = useState([]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event) => {
    const { active } = event;
    const { offsetHeight, offsetWidth } = active.data.current;
    event.active.data.current.dimensions = {
      height: offsetHeight,
      width: offsetWidth,
    };
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over) {
      const oldIndex = datas.findIndex((item) => item.id === active.id);
      const newIndex = datas.findIndex((item) => item.id === over.id);
      const newDatas = arrayMove(datas, oldIndex, newIndex);
      // console.log("oldIndex", oldIndex);
      // console.log("newIndex", newIndex);
      // console.log("newDatas", newDatas);
      setDatas(newDatas);
    }

    active.data.current.dimensions = null;
  };

  const { register, handleSubmit, reset } = useForm();
  const [refreshData, setRefreshData] = useState();
  const [options, setOptions] = useState(false);
  const handleTypeChange = (event) => {
    if (event.target.value === "Dropdown") {
      setOptions(true);
    } else {
      setOptions(false);
    }
  };
  const onSubmit = async (data) => {
    const Text = new FormData();
    Text.append("labelName", data.name);
    Text.append("labelType", data.type);
    Text.append("options", data.choices || "");

    try {
      const response = await Axios({
        method: "POST",
        url: "http://127.0.0.1:8000/api/survey/",
        data: Text,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setRefreshData(response.data);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      Axios.get(baseUrl).then((res) => {
        setDatas(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [refreshData]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={3} mt={6} display="flex" flexDirection="row">
        <Card style={{ width: "50%", flexGrow: 1, marginRight: 10 }}>
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
              Input Creator
            </MDTypography>
          </MDBox>
          <MDTypography variant="subtitle2" ml={2} mr={2} mt={2} mb={2}>
            This form allows you to create and update inputs. The Generate Form button will create a
            new form with the updates.
          </MDTypography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <MDBox mt={2} mb={2} ml={2} mr={2}>
              <TextField
                label="Name: "
                variant="outlined"
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...register("name")}
              />
            </MDBox>
            <MDBox mb={2} ml={2} mr={2}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="typelabel">Type: </InputLabel>
                <Select
                  labelId="typelabel"
                  id="selecttype"
                  label="Type:"
                  {...register("type")}
                  onChange={handleTypeChange}
                >
                  <MenuItem value="Text">Text</MenuItem>
                  <MenuItem value="Password">Password</MenuItem>
                  <MenuItem value="Dropdown">Dropdown</MenuItem>
                  <MenuItem value="Checkbox">Checkbox</MenuItem>
                  <MenuItem value="Radio">Radio</MenuItem>
                  <MenuItem value="Number">Number</MenuItem>
                  <MenuItem value="Textarea">Textarea</MenuItem>
                  <MenuItem value="Email">Email</MenuItem>
                  <MenuItem value="Range">Range</MenuItem>
                  <MenuItem value="Search">Search</MenuItem>
                  <MenuItem value="Tel">Tel</MenuItem>
                  <MenuItem value="url">url</MenuItem>
                  <MenuItem value="Time">Time</MenuItem>
                  <MenuItem value="datetime">datetime</MenuItem>
                  <MenuItem value="datetime-local">datetime-local</MenuItem>
                  <MenuItem value="week">week</MenuItem>
                  <MenuItem value="month">month</MenuItem>
                  <MenuItem value="validate">validate</MenuItem>
                </Select>
                {options && (
                  <MDBox mt={2} mb={2}>
                    <TextField
                      label="Options: "
                      variant="outlined"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      {...register("choices", {
                        setValueAs: (value) => {
                          if (!value || typeof value !== "string") return [];
                          return value.split(";").map((option) => option.trim());
                        },
                      })}
                    />
                  </MDBox>
                )}
              </FormControl>
            </MDBox>
            <MDBox mb={2} mr={2} display="flex" justifyContent="flex-end">
              <Button type="submit">CREATE</Button>
            </MDBox>
          </form>
        </Card>
        <Card style={{ width: "50%", flexGrow: 1, marginLeft: 10 }}>
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
              Layout
            </MDTypography>
          </MDBox>
          <MDTypography variant="subtitle2" ml={2} mr={2} mt={2} mb={2}>
            You can start adding fields with Input Creator.
          </MDTypography>
          <MDBox mt={2} mb={2} ml={2} mr={2}>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <SortableContext items={datas} strategy={verticalListSortingStrategy}>
                <SortableList items={datas} />
              </SortableContext>
            </DndContext>
          </MDBox>
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
