// React Imports
import Axios from "axios";
import React, { useState, useEffect } from "react";

// Material UI components
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { green } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

// Material Dashboard Component
import Receipt from "components/Receipt";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Styles from "./style";

const useStyles = makeStyles(Styles);
const baseUrl = "http://127.0.0.1:8000/api/participation/";

export default function Tables() {
  const [editor, setEditor] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [row, setRow] = useState({});
  const tableHead = [
    "Customer",
    "Program",
    "Price",
    "Participation Date",
    "Program Duration",
    "End Date",
    "Receipt",
  ];
  const [datas, setDatas] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [course, setCourse] = useState([]);
  const classes = useStyles();

  // Dialog's useState
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState("");
  const [program, setProgram] = useState({});
  const [price, setPrice] = useState("");
  const [participationDate, setParticipationDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [programStartDate, setProgramStartDate] = useState("");
  const [programEndDate, setProgramEndDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [programDuration, setProgramDuration] = useState("");
  const [refreshData, setRefreshData] = useState();

  useEffect(() => {
    try {
      Axios.get(baseUrl).then((res) => {
        setDatas(res.data);
      });
      Axios.get("http://127.0.0.1:8000/api/customer/").then((res) => {
        setCustomer(res.data);
      });
      Axios.get("http://127.0.0.1:8000/api/program/").then((res) => {
        setCourse(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [refreshData]);

  const openDialog = async () => {
    setOpen(true);
    setUser("");
    setProgram("");
    setProgramStartDate("");
    setPrice("");
    setParticipationDate("");
    setEndDate("");
    setProgramDuration("");
  };

  const CreateParticipation = async () => {
    const Text = new FormData();
    Text.append("customer", user);
    Text.append("program", program);
    Text.append("startDate", programStartDate);
    Text.append("price", price);
    Text.append("participationDate", participationDate);
    Text.append("programDuration", programDuration);
    Text.append("endDate", endDate);

    try {
      const response = await Axios({
        method: "POST",
        url: "http://127.0.0.1:8000/api/participation/",
        data: Text,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setRefreshData(response.data);
    } catch (error) {
      console.log(error);
    }

    setOpen(false);
  };

  const handleParticipationDateChange = (event) => {
    setParticipationDate(event.target.value);
    const end = parseInt(programDuration, 10);
    const startDateObj = new Date(event.target.value);
    startDateObj.setMonth(startDateObj.getMonth() + end);
    const finalDateStr = startDateObj.toISOString().split("T")[0];
    setEndDate(finalDateStr);

    const programEndDateObj = new Date(programEndDate);
    const participationDateObj = new Date(event.target.value);
    const programStartObj = new Date(programStartDate);
    if (participationDateObj > programEndDateObj) {
      alert("Program ended");
    }
    if (participationDateObj < programStartObj) {
      alert("Program has not started yet");
    }
  };

  const handleProgramDurationChange = (event) => {
    const duration = event.target.value;
    const start = participationDate;
    const startDateObj = new Date(start);
    startDateObj.setMonth(startDateObj.getMonth() + parseInt(duration, 10));
    const finalDateStr = startDateObj.toISOString().split("T")[0];

    setProgramDuration(duration);
    setEndDate(finalDateStr);
  };

  const handleProgramChange = (event) => {
    setProgram(event.target.value);
    const selectedProgram = course.find((prop) => prop.program === event.target.value);
    if (selectedProgram) {
      setProgramDuration(selectedProgram.programDuration);
      setPrice(selectedProgram.price);
      setProgramStartDate(selectedProgram.startDate);
      setProgramEndDate(selectedProgram.endDate);
    }
  };

  const handleClick = async (prop) => {
    setRow(prop);
    setEditor(true);
    setDisabled(true);
    try {
      const { data } = await Axios.get(`http://127.0.0.1:8000/api/participation/${prop.id}/`);
      setUser(data.customer);
      setProgram(data.program);
      setProgramStartDate(data.startDate);
      setPrice(data.price);
      setParticipationDate(data.participationDate);
      setProgramDuration(data.programDuration);
      setEndDate(data.endDate);
    } catch (error) {
      console.log("error", error);
    }
  };

  const DeleteParticipation = () => {
    try {
      Axios({
        method: "DELETE",
        url: `http://127.0.0.1:8000/api/participation/${row.id}/`,
      });
      setRefreshData("");
    } catch (error) {
      console.log(error);
    }
    setEditor(false);
  };

  const UpdateParticipation = async () => {
    const Text = new FormData();
    Text.append("customer", user);
    Text.append("program", program);
    Text.append("startDate", programStartDate);
    Text.append("price", price);
    Text.append("participationDate", participationDate);
    Text.append("programDuration", programDuration);
    Text.append("endDate", endDate);

    try {
      const response = await Axios({
        method: "PUT",
        url: `http://127.0.0.1:8000/api/participation/${row.id}/`,
        data: Text,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setRefreshData(response.data);
    } catch (error) {
      console.log(error);
    }
    setEditor(false);
  };

  const handleEdit = () => {
    setDisabled(!disabled);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={3} mt={6}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
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
                  Participations Table
                </MDTypography>
                <MDBox>
                  <Button
                    variant="contained"
                    style={{ color: "white", backgroundColor: green[500] }}
                    onClick={openDialog}
                  >
                    Create New Plan
                  </Button>
                </MDBox>
              </MDBox>
              <Dialog open={open} onClose={CreateParticipation}>
                <DialogTitle>Participation Form</DialogTitle>
                <DialogContent>
                  <FormControl fullWidth>
                    <InputLabel id="selectCustomer">Select A Customer</InputLabel>
                    <Select
                      labelId="selectCustomer"
                      id="dropdown"
                      variant="standard"
                      value={user}
                      onChange={(e) => setUser(e.target.value)}
                    >
                      {customer.map((prop) => (
                        <MenuItem key={prop.id} value={prop.name}>
                          {prop.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel id="selectProgram">Select A Program</InputLabel>
                    <Select
                      labelId="selectProgram"
                      id="dropdown-plan"
                      variant="standard"
                      value={program}
                      onChange={handleProgramChange}
                    >
                      {course.map((prop) => (
                        <MenuItem key={prop.id} value={prop.program}>
                          {prop.program}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    disabled
                    margin="dense"
                    label="Program Start Date"
                    type="date"
                    fullWidth
                    variant="standard"
                    value={programStartDate}
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    margin="dense"
                    label="Participation Date"
                    type="date"
                    fullWidth
                    variant="standard"
                    value={participationDate}
                    onChange={handleParticipationDateChange}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ inputProps: { min: new Date().toISOString().split("T")[0] } }}
                  />
                  <TextField
                    margin="dense"
                    label="Program Duration"
                    fullWidth
                    variant="standard"
                    disabled
                    value={programDuration}
                  />
                  <TextField
                    disabled
                    margin="dense"
                    label="End Date"
                    type="date"
                    fullWidth
                    variant="standard"
                    value={endDate}
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    margin="dense"
                    label="Price"
                    fullWidth
                    variant="standard"
                    disabled
                    value={price}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={CreateParticipation}>Create</Button>
                </DialogActions>
              </Dialog>
              <MDBox pt={3}>
                <Table>
                  <TableHead>
                    <TableRow className={classes.tableHeadRow}>
                      {tableHead.map((prop) => (
                        <TableCell
                          className={classes.tableCell + classes.tableHeadCell}
                          key={datas.id}
                        >
                          {prop}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {datas.map((prop) => (
                      <TableRow key={prop.id}>
                        <TableCell onClick={() => handleClick(prop)}>{prop.customer}</TableCell>
                        <TableCell onClick={() => handleClick(prop)}>{prop.program}</TableCell>
                        <TableCell onClick={() => handleClick(prop)}>{prop.price}</TableCell>
                        <TableCell onClick={() => handleClick(prop)}>
                          {prop.participationDate}
                        </TableCell>
                        <TableCell onClick={() => handleClick(prop)}>
                          {prop.programDuration}
                        </TableCell>
                        <TableCell onClick={() => handleClick(prop)}>{prop.endDate}</TableCell>
                        <TableCell>
                          <Receipt receiptData={prop} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </MDBox>
            </Card>
          </Grid>
          <Dialog
            open={editor}
            onClose={UpdateParticipation}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ pr: 2 }}
            >
              <DialogTitle id="alert-dialog-title">Branch Editor</DialogTitle>
              <Button onClick={() => handleEdit()}>Edit Mode</Button>
            </Stack>
            <DialogContent>
              <FormControl fullWidth>
                <InputLabel id="selectCustomer">Select A Customer</InputLabel>
                <Select
                  labelId="selectCustomer"
                  id="dropdown"
                  variant="standard"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                >
                  {customer.map((prop) => (
                    <MenuItem key={prop.id} value={prop.name}>
                      {prop.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="selectProgram">Select A Program</InputLabel>
                <Select
                  labelId="selectProgram"
                  id="dropdown-plan"
                  variant="standard"
                  value={program}
                  onChange={handleProgramChange}
                >
                  {course.map((prop) => (
                    <MenuItem key={prop.id} value={prop.program}>
                      {prop.program}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                disabled
                margin="dense"
                label="Program Start Date"
                type="date"
                fullWidth
                variant="standard"
                value={programStartDate}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                margin="dense"
                label="Participation Date"
                type="date"
                fullWidth
                variant="standard"
                value={participationDate}
                onChange={handleParticipationDateChange}
                InputLabelProps={{ shrink: true }}
                InputProps={{ inputProps: { min: new Date().toISOString().split("T")[0] } }}
              />
              <TextField
                onChange={handleProgramDurationChange}
                margin="dense"
                label="Program Duration"
                fullWidth
                variant="standard"
                disabled
                value={programDuration}
              />
              <TextField
                disabled
                margin="dense"
                label="End Date"
                type="date"
                fullWidth
                variant="standard"
                value={endDate}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                margin="dense"
                label="Price"
                fullWidth
                variant="standard"
                disabled
                value={price}
              />
            </DialogContent>
            <DialogActions>
              <Stack direction="row" spacing={2}>
                <Button onClick={UpdateParticipation}>Save</Button>
                <Button onClick={DeleteParticipation}>Delete</Button>
              </Stack>
            </DialogActions>
          </Dialog>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
