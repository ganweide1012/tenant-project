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
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

// Material Dashboard Component
import MDAvatar from "components/MDAvatar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// import Edit from "./edit-form";
import Styles from "./style";

const useStyles = makeStyles(Styles);
const baseUrl = "http://127.0.0.1:8000/api/tenants/";

export default function Tables() {
  const tableHead = [
    "Logo",
    "First Name",
    "Last Name",
    "Country",
    "Email",
    "Phone",
    "Company",
    "Description",
  ];
  const [datas, setDatas] = useState([]);
  const [nextUrl, setNextUrl] = useState();
  const [previousUrl, setPreviousUrl] = useState();
  const classes = useStyles();

  // Dialog's useState
  const [editor, setEditor] = useState(false);
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState([]);
  const [logoTxtImg, setLogoTxtImg] = useState([]);
  const [logoTxt, setLogoTxt] = useState("");
  const [refreshData, setRefreshData] = useState();
  const [row, setRow] = useState({});
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    try {
      Axios.get(baseUrl).then((res) => {
        setNextUrl(res.data.next);
        setPreviousUrl(res.data.previous);
        setDatas(res.data.results);
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
    setFirstName("");
    setLastName("");
    setCountry("");
    setEmail("");
    setPhone("");
    setCompanyName("");
    setDescription("");
    setLogo("");
    setLogoTxtImg("");
    setLogoTxt("");
  };

  const handleClick = async (prop) => {
    setRow(prop);
    setEditor(true);
    setDisabled(true);
    try {
      const { data } = await Axios.get(`http://127.0.0.1:8000/api/tenants/${prop.tenantId}/`);
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setCountry(data.country);
      setEmail(data.email);
      setPhone(data.phone);
      setCompanyName(data.companyName);
      setDescription(data.description);
      setLogo(data.logo);
      setLogoTxtImg(data.logoTxtImg);
      setLogoTxt(data.logoTxt);
    } catch (error) {
      console.log("error", error);
    }
  };

  const CreateUser = async () => {
    const Text = new FormData();
    Text.append("firstName", firstName);
    Text.append("lastName", lastName);
    Text.append("country", country);
    Text.append("email", email);
    Text.append("phone", phone);
    Text.append("companyName", companyName);
    Text.append("description", description);
    if (logo) Text.append("logo", logo);
    if (logoTxtImg) Text.append("logoTxtImg", logoTxtImg);
    Text.append("logoTxt", logoTxt);

    try {
      const response = await Axios({
        method: "POST",
        url: baseUrl,
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

  const UpdateTenant = async () => {
    const Text = new FormData();
    Text.append("firstName", firstName);
    Text.append("lastName", lastName);
    Text.append("country", country);
    Text.append("email", email);
    Text.append("phone", phone);
    Text.append("companyName", companyName);
    Text.append("description", description);
    if (logo) Text.append("logo", logo);
    if (logoTxtImg) Text.append("logoTxtImg", logoTxtImg);
    Text.append("logoTxt", logoTxt);

    try {
      const response = await Axios({
        method: "PUT",
        url: `http://127.0.0.1:8000/api/tenants/${row.tenantId}/`,
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
                  Tenants&apos; Table
                </MDTypography>
                <MDBox>
                  <Button
                    variant="contained"
                    style={{ color: "white", backgroundColor: green[500] }}
                    onClick={openDialog}
                  >
                    Create New Tenant
                  </Button>
                </MDBox>
              </MDBox>
              <Dialog
                open={open}
                onClose={CreateUser}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">Tenant Creator</DialogTitle>
                <DialogContent>
                  <TextField
                    onChange={(e) => setFirstName(e.target.value)}
                    autoFocus
                    margin="dense"
                    label="FirstName"
                    type="string"
                    fullWidth
                    variant="standard"
                    value={firstName}
                  />
                  <TextField
                    onChange={(e) => setLastName(e.target.value)}
                    margin="dense"
                    label="LastName"
                    type="string"
                    fullWidth
                    variant="standard"
                    value={lastName}
                  />
                  <FormControl fullWidth>
                    <InputLabel id="selectCountry">Select A Plan</InputLabel>
                    <Select
                      labelId="selectCountry"
                      id="dropdown-country"
                      variant="standard"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    >
                      <MenuItem>Malaysia</MenuItem>
                      <MenuItem>Malaysia</MenuItem>
                      <MenuItem>Malaysia</MenuItem>
                      <MenuItem>Malaysia</MenuItem>
                      <MenuItem>Malaysia</MenuItem>
                      <MenuItem>Malaysia</MenuItem>
                      <MenuItem>Malaysia</MenuItem>
                    </Select>
                  </FormControl>
                  {/* <TextField
                    onChange={(e) => setCountry(e.target.value)}
                    margin="dense"
                    label="Country"
                    type="string"
                    fullWidth
                    variant="standard"
                    value={country}
                  /> */}
                  <TextField
                    onChange={(e) => setEmail(e.target.value)}
                    margin="dense"
                    label="Email"
                    type="email"
                    fullWidth
                    variant="standard"
                    value={email}
                  />
                  <TextField
                    onChange={(e) => setPhone(e.target.value)}
                    margin="dense"
                    label="Phone"
                    type="string"
                    fullWidth
                    variant="standard"
                    value={phone}
                  />
                  <TextField
                    onChange={(e) => setCompanyName(e.target.value)}
                    margin="dense"
                    label="Company Name"
                    type="string"
                    fullWidth
                    variant="standard"
                    value={companyName}
                  />
                  <TextField
                    onChange={(e) => setDescription(e.target.value)}
                    margin="dense"
                    label="Description"
                    type="string"
                    fullWidth
                    variant="standard"
                    value={description}
                  />
                  <input
                    type="file"
                    name="logo"
                    accept="image/jpeg,image/png,image/gif"
                    onChange={(e) => setLogo(e.target.files[0])}
                  />
                  <input
                    type="file"
                    name="logo"
                    accept="image/jpeg,image/png,image/gif"
                    onChange={(e) => setLogoTxtImg(e.target.files[0])}
                  />
                  <TextField
                    onChange={(e) => setLogoTxt(e.target.value)}
                    margin="dense"
                    label="Logo Text"
                    type="string"
                    fullWidth
                    variant="standard"
                    value={logoTxt}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={CreateUser}>Create</Button>
                </DialogActions>
              </Dialog>
              <MDBox pt={3}>
                <Table>
                  <TableHead>
                    <TableRow className={classes.tableHeadRow}>
                      {tableHead.map((prop) => (
                        <TableCell
                          className={classes.tableCell + classes.tableHeadCell}
                          key={datas.tenantId}
                        >
                          {prop}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {datas.map((prop) => (
                      <TableRow key={prop.tenantId} onClick={() => handleClick(prop)}>
                        <TableCell>
                          <Tooltip
                            key={prop.companyName}
                            title={prop.companyName}
                            placeholder="bottom"
                          >
                            <MDAvatar
                              src={prop.logo ? `http://127.0.0.1:8000/api${prop.logo}/` : ""}
                              alt="companyLogo"
                              size="xs"
                              sx={{
                                border: ({ borders: { borderWidth }, palette: { white } }) =>
                                  `${borderWidth[2]} solid ${white.main}`,
                                cursor: "pointer",
                                position: "relative",

                                "&:not(:first-of-type)": {
                                  ml: -1.25,
                                },

                                "&:hover, &:focus": {
                                  zIndex: "10",
                                },
                              }}
                            />
                          </Tooltip>
                        </TableCell>
                        <TableCell>{prop.firstName}</TableCell>
                        <TableCell>{prop.lastName}</TableCell>
                        <TableCell>{prop.country}</TableCell>
                        <TableCell>{prop.email}</TableCell>
                        <TableCell>{prop.phone}</TableCell>
                        <TableCell>{prop.companyName}</TableCell>
                        <TableCell>{prop.description}</TableCell>
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
          <Dialog
            open={editor}
            onClose={UpdateTenant}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <MDBox display="flex" justifyContent="space-between" alignItems="center">
              <div>
                <DialogTitle id="alert-dialog-title">Tenant Editor</DialogTitle>
              </div>
              <div>
                <Button onClick={() => handleEdit()}>Edit Mode</Button>
              </div>
            </MDBox>
            <DialogContent>
              <TextField
                onChange={(e) => setFirstName(e.target.value)}
                name="name"
                autoFocus
                margin="dense"
                label="FirstName"
                type="string"
                fullWidth
                variant="standard"
                value={firstName}
                disabled={disabled}
              />
              <TextField
                onChange={(e) => setLastName(e.target.value)}
                name="name"
                autoFocus
                margin="dense"
                label="LastName"
                type="string"
                fullWidth
                variant="standard"
                value={lastName}
                disabled={disabled}
              />
              <TextField
                onChange={(e) => setCountry(e.target.value)}
                name="name"
                autoFocus
                margin="dense"
                label="Country"
                type="string"
                fullWidth
                variant="standard"
                value={country}
                disabled={disabled}
              />
              <TextField
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                margin="dense"
                label="Email"
                type="email"
                fullWidth
                variant="standard"
                value={email}
                disabled={disabled}
              />
              <TextField
                onChange={(e) => setPhone(e.target.value)}
                autoFocus
                margin="dense"
                label="Phone"
                type="string"
                fullWidth
                variant="standard"
                value={phone}
                disabled={disabled}
              />
              <TextField
                onChange={(e) => setCompanyName(e.target.value)}
                autoFocus
                margin="dense"
                label="Company Name"
                type="string"
                fullWidth
                variant="standard"
                value={companyName}
                disabled={disabled}
              />
              <TextField
                onChange={(e) => setDescription(e.target.value)}
                autoFocus
                margin="dense"
                label="Description"
                type="string"
                fullWidth
                variant="standard"
                value={description}
                disabled={disabled}
              />
              <input
                type="file"
                name="logo"
                accept="image/jpeg,image/png,image/gif"
                onChange={(e) => setLogo(e.target.files[0])}
                disabled={disabled}
              />
              <input
                type="file"
                name="logo"
                accept="image/jpeg,image/png,image/gif"
                onChange={(e) => setLogoTxtImg(e.target.files[0])}
                disabled={disabled}
              />
              <TextField
                onChange={(e) => setLogoTxt(e.target.value)}
                autoFocus
                margin="dense"
                label="Logo Text"
                type="string"
                fullWidth
                variant="standard"
                value={logoTxt}
                disabled={disabled}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={UpdateTenant}>Save</Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
