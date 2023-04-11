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
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

// Material Dashboard Component
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Styles from "./style";

const useStyles = makeStyles(Styles);
const baseUrl = "http://127.0.0.1:8000/api/subscription/";

export default function Tables() {
  const tableHead = ["Tenant ID", "Plan", "Start Date", "End Date", "Terms In Month"];
  const [datas, setDatas] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [nextUrl, setNextUrl] = useState();
  const [previousUrl, setPreviousUrl] = useState();
  const classes = useStyles();

  // Dialog's useState
  const [open, setOpen] = useState(false);
  const [tenantId, setTenantId] = useState({});
  const [plan, setPlan] = useState("");
  const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]);
  const [endDate, setEndDate] = useState("");
  const [termsInMonth, setTermsInMonth] = useState("1");
  const [refreshData, setRefreshData] = useState();

  useEffect(() => {
    try {
      Axios.get(baseUrl).then((res) => {
        setNextUrl(res.data.next);
        setPreviousUrl(res.data.previous);
        setDatas(res.data.results);
      });
      Axios.get("http://127.0.0.1:8000/api/tenantId/").then((res) => {
        setTenants(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [refreshData]);

  const paginationHandler = (url) => {
    try {
      Axios.get(url).then((res) => {
        setNextUrl(res.data.next);
        setPreviousUrl(res.data.previous);
        setDatas(res.data.results);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const openDialog = async () => {
    setOpen(true);
    setTenantId("");
    setPlan("");
    setStartDate("");
    setEndDate("");
    setTermsInMonth("");
  };

  const CreateSubscription = async () => {
    const Text = new FormData();
    Text.append("tenantId", tenantId);
    Text.append("plan", plan);
    Text.append("startDate", startDate);
    Text.append("endDate", endDate);
    Text.append("termsInMonth", termsInMonth);

    try {
      const response = await Axios({
        method: "POST",
        url: "http://127.0.0.1:8000/api/subscription/",
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

  // useEffect(() => {
  //   if (startDate && endDate) {
  //     const start = new Date(startDate);
  //     const end = new Date(endDate);
  //     const months = (end.getFullYear() - start.getFullYear()) * 12;
  //     setTermsInMonth(months + end.getMonth() - start.getMonth());
  //   }
  // }, [startDate, endDate]);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleTermsInMonthsChange = (event) => {
    setTermsInMonth(event.target.value);
    const end = parseInt(event.target.value, 10);
    const startDateObj = new Date(startDate);
    startDateObj.setMonth(startDateObj.getMonth() + end);
    const finalDateStr = startDateObj.toISOString().split("T")[0];
    setEndDate(finalDateStr);
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
                  Subscriptions Table
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
              <Dialog open={open} onClose={CreateSubscription}>
                <DialogTitle>Subscription Plans</DialogTitle>
                <DialogContent>
                  <FormControl fullWidth>
                    <InputLabel id="selectTenant">Select A Tenant</InputLabel>
                    <Select
                      labelId="selectTenant"
                      id="dropdown"
                      variant="standard"
                      value={tenantId}
                      onChange={(e) => setTenantId(e.target.value)}
                    >
                      {tenants.map((prop) => (
                        <MenuItem key={prop.tenantId} value={prop.tenantId}>
                          {prop.tenantId}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel id="selectPlan">Select A Plan</InputLabel>
                    <Select
                      labelId="selectPlan"
                      id="dropdown-plan"
                      variant="standard"
                      value={plan}
                      onChange={(e) => setPlan(e.target.value)}
                    >
                      <MenuItem value="Plan A">Plan A</MenuItem>
                      <MenuItem value="Plan B">Plan B</MenuItem>
                      <MenuItem value="Plan C">Plan C</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    margin="dense"
                    label="Start Date"
                    type="date"
                    fullWidth
                    variant="standard"
                    value={startDate}
                    onChange={handleStartDateChange}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ inputProps: { min: new Date().toISOString().split("T")[0] } }}
                  />
                  <FormControl fullWidth>
                    <InputLabel id="selectMonth">Select Months</InputLabel>
                    <Select
                      labelId="selectMonth"
                      id="dropdown-plan"
                      variant="standard"
                      value={termsInMonth}
                      onChange={handleTermsInMonthsChange}
                      disabled={!startDate}
                    >
                      <MenuItem value="1">1</MenuItem>
                      <MenuItem value="3">3</MenuItem>
                      <MenuItem value="6">6</MenuItem>
                      <MenuItem value="9">9</MenuItem>
                      <MenuItem value="12">12</MenuItem>
                    </Select>
                  </FormControl>
                  {/* <TextField
                    disabled
                    margin="dense"
                    label="Terms In Months"
                    type="number"
                    fullWidth
                    variant="standard"
                    value={termsInMonth}
                  /> */}
                  <TextField
                    disabled
                    margin="dense"
                    label="Final Date"
                    type="date"
                    fullWidth
                    variant="standard"
                    value={endDate}
                    InputLabelProps={{ shrink: true }}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={CreateSubscription}>Create</Button>
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
                        <TableCell>{prop.tenantId}</TableCell>
                        <TableCell>{prop.plan}</TableCell>
                        <TableCell>{prop.startDate}</TableCell>
                        <TableCell>{prop.endDate}</TableCell>
                        <TableCell>{prop.termsInMonth}</TableCell>
                      </TableRow>
                    ))}
                    <MDBox mt={1} mb={1} ml={1}>
                      {previousUrl && (
                        <Button variant="contained" onClick={() => paginationHandler(previousUrl)}>
                          <MDTypography color="white" variant="h7">
                            Previous
                          </MDTypography>
                        </Button>
                      )}
                      {nextUrl && (
                        <Button variant="contained" onClick={() => paginationHandler(nextUrl)}>
                          <MDTypography color="white" variant="h7">
                            Next
                          </MDTypography>
                        </Button>
                      )}
                    </MDBox>
                  </TableBody>
                </Table>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
