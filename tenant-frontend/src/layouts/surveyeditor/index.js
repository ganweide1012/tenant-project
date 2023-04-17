// React Imports
import Axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

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

export default function Tables() {
  const { register, handleSubmit } = useForm();
  const [refreshData, setRefreshData] = useState();
  const [options, setOptions] = useState(false);
  const handleTypeChange = (event) => {
    if (event.target.value === "Select") {
      setOptions(true);
    } else {
      setOptions(false);
    }
  };
  const onSubmit = async (data) => {
    const Text = new FormData();
    Text.append("labelName", data.name);
    Text.append("labelType", data.type);
    Text.append("options", data.choices);

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
    } catch (error) {
      console.log(error);
    }
  };
  const [datas, setDatas] = useState([]);
  console.log("datas", datas);

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
                  <MenuItem value="Select">Select</MenuItem>
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
            {datas.map((prop) => (
              <TextField
                margin="dense"
                fullWidth
                variant="standard"
                disabled
                value={prop.labelName}
              />
            ))}
          </MDBox>
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
