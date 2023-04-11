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

// Material Dashboard Component
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Styles from "./style";

const useStyles = makeStyles(Styles);
const baseUrl = "http://127.0.0.1:8000/api/program/";

export default function Tables() {
  const tableHead = [
    "Listing",
    "Program",
    "Price",
    "Program Duration",
    "Program Start Date",
    "Program End Date",
  ];
  const [datas, setDatas] = useState([]);
  const classes = useStyles();

  // Dialog's useState
  const [editor, setEditor] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [row, setRow] = useState({});
  const [open, setOpen] = useState(false);
  const [program, setProgram] = useState("");
  const [price, setPrice] = useState("");
  const [programDuration, setProgramDuration] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [refreshData, setRefreshData] = useState();

  useEffect(() => {
    try {
      Axios.get(baseUrl).then((res) => {
        setDatas(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [refreshData]);

  const openDialog = async () => {
    setOpen(true);
    setProgram("");
    setPrice("");
    setProgramDuration("");
    setStartDate("");
    setEndDate("");
  };

  const CreateProgram = async () => {
    const Text = new FormData();
    Text.append("program", program);
    Text.append("price", price);
    Text.append("programDuration", programDuration);
    Text.append("startDate", startDate);
    Text.append("endDate", endDate);

    try {
      const response = await Axios({
        method: "POST",
        url: "http://127.0.0.1:8000/api/program/",
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

  const handleProgramDateChange = (event) => {
    const start = event.target.value;
    const duration = parseInt(programDuration, 10);
    const startDateObj = new Date(start);
    startDateObj.setMonth(startDateObj.getMonth() + duration);
    const finalDateStr = startDateObj.toISOString().split("T")[0];

    setStartDate(start);
    setEndDate(finalDateStr);
  };

  const handleProgramDurationChange = (event) => {
    const duration = event.target.value;
    const start = startDate;
    const startDateObj = new Date(start);
    startDateObj.setMonth(startDateObj.getMonth() + parseInt(duration, 10));
    const finalDateStr = startDateObj.toISOString().split("T")[0];

    setProgramDuration(duration);
    setEndDate(finalDateStr);
  };

  const handleClick = async (prop) => {
    setRow(prop);
    setEditor(true);
    setDisabled(true);
    try {
      const { data } = await Axios.get(`http://127.0.0.1:8000/api/program/${prop.id}/`);
      setProgram(data.program);
      setPrice(data.price);
      setStartDate(data.startDate);
      setProgramDuration(data.programDuration);
      setEndDate(data.endDate);
    } catch (error) {
      console.log("error", error);
    }
  };

  const DeleteProgram = () => {
    try {
      Axios({
        method: "DELETE",
        url: `http://127.0.0.1:8000/api/program/${row.id}/`,
      });
      setRefreshData();
    } catch (error) {
      console.log(error);
    }
    setEditor(false);
  };

  const UpdateProgram = async () => {
    const Text = new FormData();
    Text.append("program", program);
    Text.append("price", price);
    Text.append("startDate", startDate);
    Text.append("programDuration", programDuration);
    Text.append("endDate", endDate);

    try {
      const response = await Axios({
        method: "PUT",
        url: `http://127.0.0.1:8000/api/program/${row.id}/`,
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
                  Programs Table
                </MDTypography>
                <MDBox>
                  <Button
                    variant="contained"
                    style={{ color: "white", backgroundColor: green[500] }}
                    onClick={openDialog}
                  >
                    Create New Branch
                  </Button>
                </MDBox>
              </MDBox>
              <Dialog open={open} onClose={CreateProgram}>
                <DialogTitle>Create Branch</DialogTitle>
                <DialogContent>
                  <TextField
                    onChange={(e) => setProgram(e.target.value)}
                    margin="dense"
                    label="Program"
                    type="string"
                    fullWidth
                    variant="standard"
                    value={program}
                  />
                  <TextField
                    onChange={(e) => setPrice(e.target.value)}
                    margin="dense"
                    label="Price"
                    type="number"
                    fullWidth
                    variant="standard"
                    value={price}
                  />
                  <TextField
                    onChange={(e) => setProgramDuration(e.target.value)}
                    margin="dense"
                    label="Program Duration"
                    type="number"
                    fullWidth
                    variant="standard"
                    value={programDuration}
                  />
                  <TextField
                    margin="dense"
                    label="Program Start Date"
                    type="date"
                    fullWidth
                    variant="standard"
                    value={startDate}
                    onChange={handleProgramDateChange}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ inputProps: { min: new Date().toISOString().split("T")[0] } }}
                  />
                  <TextField
                    disabled
                    margin="dense"
                    label="Program End Date"
                    type="date"
                    fullWidth
                    variant="standard"
                    value={endDate}
                    InputLabelProps={{ shrink: true }}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={CreateProgram}>Create</Button>
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
                          align="center"
                        >
                          {prop}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {datas.map((prop, index) => (
                      <TableRow key={prop.id} onClick={() => handleClick(prop)}>
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">{prop.program}</TableCell>
                        <TableCell align="center">{prop.price}</TableCell>
                        <TableCell align="center">{prop.programDuration}</TableCell>
                        <TableCell align="center">{prop.startDate}</TableCell>
                        <TableCell align="center">{prop.endDate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </MDBox>
            </Card>
          </Grid>
          <Dialog
            open={editor}
            onClose={UpdateProgram}
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
              <TextField
                onChange={(e) => setProgram(e.target.value)}
                margin="dense"
                label="Program"
                type="string"
                fullWidth
                variant="standard"
                value={program}
              />
              <TextField
                onChange={(e) => setPrice(e.target.value)}
                margin="dense"
                label="Price"
                type="number"
                fullWidth
                variant="standard"
                value={price}
              />
              <TextField
                margin="dense"
                label="Program Start Date"
                type="date"
                fullWidth
                variant="standard"
                value={startDate}
                onChange={handleProgramDateChange}
                InputLabelProps={{ shrink: true }}
                InputProps={{ inputProps: { min: new Date().toISOString().split("T")[0] } }}
              />
              <TextField
                onChange={handleProgramDurationChange}
                margin="dense"
                label="Program Duration"
                type="number"
                fullWidth
                variant="standard"
                value={programDuration}
              />
              <TextField
                disabled
                margin="dense"
                label="Program End Date"
                type="date"
                fullWidth
                variant="standard"
                value={endDate}
                InputLabelProps={{ shrink: true }}
              />
            </DialogContent>
            <DialogActions>
              <Stack direction="row" spacing={2}>
                <Button onClick={UpdateProgram}>Save</Button>
                <Button onClick={DeleteProgram}>Delete</Button>
              </Stack>
            </DialogActions>
          </Dialog>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
