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
import { Stack } from "@mui/material";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
// import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

// Material Dashboard Component
import MDAvatar from "components/MDAvatar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Styles from "./style";

const useStyles = makeStyles(Styles);
const baseUrl = "http://127.0.0.1:8000/api/branch/";

export default function Tables() {
  const tableHead = [
    "Image",
    "Tenant ID",
    "Name",
    "Email",
    "Main Branch",
    "Address",
    "State",
    "Country",
    "Postcode",
    "Phone",
    "Active",
  ];
  const [datas, setDatas] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [nextUrl, setNextUrl] = useState();
  const [previousUrl, setPreviousUrl] = useState();
  const classes = useStyles();

  // Dialog's useState
  const [editor, setEditor] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [row, setRow] = useState({});
  const [open, setOpen] = useState(false);
  const [tenantId, setTenantId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mainBranch, setMainBranch] = useState(false);
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [postcode, setPostcode] = useState("");
  const [phone, setPhone] = useState("");
  const [active, setActive] = useState(false);
  const [imageUrl, setImageUrl] = useState([]);
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
    setName("");
    setEmail("");
    setMainBranch(false);
    setAddress("");
    setState("");
    setCountry("");
    setPostcode("");
    setPhone("");
    setImageUrl("");
    setActive(false);
  };

  const CreateBranch = async () => {
    const Text = new FormData();
    Text.append("tenantId", tenantId);
    Text.append("name", name);
    if (imageUrl) Text.append("imageUrl", imageUrl);
    Text.append("email", email);
    Text.append("isMainBranch", mainBranch);
    Text.append("address", address);
    Text.append("state", state);
    Text.append("country", country);
    Text.append("postcode", postcode);
    Text.append("phone", phone);
    Text.append("isActive", active);

    try {
      const response = await Axios({
        method: "POST",
        url: "http://127.0.0.1:8000/api/branch/",
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

  const handleClick = async (prop) => {
    setRow(prop);
    setEditor(true);
    setDisabled(true);
    try {
      const { data } = await Axios.get(`http://127.0.0.1:8000/api/branch/${prop.id}/`);
      setTenantId(data.tenantId);
      setName(data.name);
      setEmail(data.email);
      setMainBranch(data.isMainBranch);
      setAddress(data.address);
      setState(data.state);
      setCountry(data.country);
      setPostcode(data.postcode);
      setPhone(data.phone);
      setImageUrl(data.imageUrl);
      setActive(data.isActive);
    } catch (error) {
      console.log("error", error);
    }
  };

  const DeleteBranch = () => {
    try {
      Axios({
        method: "DELETE",
        url: `http://127.0.0.1:8000/api/branch/${row.id}/`,
      });
      setRefreshData();
    } catch (error) {
      console.log(error);
    }
    setEditor(false);
  };

  const UpdateBranch = async () => {
    const Text = new FormData();
    Text.append("tenantId", tenantId);
    Text.append("name", name);
    if (imageUrl) Text.append("imageUrl", imageUrl);
    Text.append("email", email);
    Text.append("isMainBranch", mainBranch);
    Text.append("address", address);
    Text.append("state", state);
    Text.append("country", country);
    Text.append("postcode", postcode);
    Text.append("phone", phone);
    Text.append("isActive", active);

    try {
      const response = await Axios({
        method: "PUT",
        url: `http://127.0.0.1:8000/api/branch/${row.id}/`,
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
                  Subscriptions Table
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
              <Dialog open={open} onClose={CreateBranch}>
                <DialogTitle>Create Branch</DialogTitle>
                <DialogContent>
                  <FormControl fullWidth>
                    <InputLabel id="selectTenantLabel">Select a Tenant:</InputLabel>
                    <Select
                      labelId="selectTenantLabel"
                      id="selectTenant"
                      value={tenantId}
                      onChange={(e) => setTenantId(e.target.value)}
                    >
                      {tenants.map((tenant) => (
                        <MenuItem key={tenant.id} value={tenant.tenantId}>
                          {tenant.tenantId}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    onChange={(e) => setName(e.target.value)}
                    margin="dense"
                    label="Name"
                    type="string"
                    fullWidth
                    variant="standard"
                    value={name}
                  />
                  <TextField
                    onChange={(e) => setEmail(e.target.value)}
                    margin="dense"
                    label="Email"
                    type="email"
                    fullWidth
                    variant="standard"
                    value={email}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={mainBranch}
                        onChange={(e) => setMainBranch(e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Main Branch"
                    labelPlacement="start"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={active}
                        onChange={(e) => setActive(e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Active"
                    labelPlacement="start"
                  />
                  <input
                    type="file"
                    name="imageUrl"
                    accept="image/jpeg,image/png,image/gif"
                    onChange={(e) => setImageUrl(e.target.files[0])}
                    defaultValue={imageUrl}
                  />
                  <TextField
                    onChange={(e) => setAddress(e.target.value)}
                    margin="dense"
                    label="Address"
                    type="string"
                    fullWidth
                    variant="standard"
                    value={address}
                  />
                  <TextField
                    onChange={(e) => setState(e.target.value)}
                    margin="dense"
                    label="State"
                    type="string"
                    fullWidth
                    variant="standard"
                    value={state}
                  />
                  <TextField
                    onChange={(e) => setCountry(e.target.value)}
                    margin="dense"
                    label="Country"
                    type="string"
                    fullWidth
                    variant="standard"
                    value={country}
                  />
                  <TextField
                    onChange={(e) => setPostcode(e.target.value)}
                    margin="dense"
                    label="Postcode"
                    type="string"
                    fullWidth
                    variant="standard"
                    value={postcode}
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
                </DialogContent>
                <DialogActions>
                  <Button onClick={CreateBranch}>Create</Button>
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
                    {datas.map((prop) => (
                      <TableRow key={prop.id} onClick={() => handleClick(prop)}>
                        <TableCell align="center">
                          <Tooltip key={prop.name} title={prop.name} placeholder="bottom">
                            <MDAvatar
                              src={
                                prop.imageUrl ? `http://127.0.0.1:8000/api${prop.imageUrl}/` : ""
                              }
                              alt="companyLogo"
                              size="xs"
                              sx={{
                                border: ({ borders: { borderWidth }, palette: { white } }) =>
                                  `${borderWidth[2]} solid ${white.main}`,
                                cursor: "pointer",
                                position: "relative",
                                margin: "auto",

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
                        <TableCell align="center">{prop.tenantId}</TableCell>
                        <TableCell align="center">{prop.name}</TableCell>
                        <TableCell align="center">{prop.email}</TableCell>
                        <TableCell align="center">{prop.isMainBranch ? "Yes" : "No"}</TableCell>
                        <TableCell align="center">{prop.address}</TableCell>
                        <TableCell align="center">{prop.state}</TableCell>
                        <TableCell align="center">{prop.country}</TableCell>
                        <TableCell align="center">{prop.postcode}</TableCell>
                        <TableCell align="center">{prop.phone}</TableCell>
                        <TableCell align="center">
                          {prop.isActive ? "Active" : "Inactive"}
                        </TableCell>
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
            onClose={UpdateBranch}
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
                <InputLabel id="selectTenantLabel">Select a Tenant:</InputLabel>
                <Select
                  labelId="selectTenantLabel"
                  id="selectTenant"
                  value={tenantId}
                  onChange={(e) => setTenantId(e.target.value)}
                  disabled={disabled}
                >
                  {tenants.map((tenant) => (
                    <MenuItem key={tenant.id} value={tenant.tenantId}>
                      {tenant.tenantId}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                onChange={(e) => setName(e.target.value)}
                margin="dense"
                label="Name"
                type="string"
                fullWidth
                variant="standard"
                value={name}
                disabled={disabled}
              />
              <TextField
                onChange={(e) => setEmail(e.target.value)}
                margin="dense"
                label="Email"
                type="email"
                fullWidth
                variant="standard"
                value={email}
                disabled={disabled}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={mainBranch}
                    onChange={(e) => setMainBranch(e.target.checked)}
                    color="primary"
                    disabled={disabled}
                  />
                }
                label="Main Branch"
                labelPlacement="start"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={active}
                    onChange={(e) => setActive(e.target.checked)}
                    color="primary"
                    disabled={disabled}
                  />
                }
                label="Active"
                labelPlacement="start"
              />
              <input
                type="file"
                name="imageUrl"
                accept="image/jpeg,image/png,image/gif"
                onChange={(e) => setImageUrl(e.target.files[0])}
                disabled={disabled}
              />
              <TextField
                onChange={(e) => setAddress(e.target.value)}
                margin="dense"
                label="Address"
                type="string"
                fullWidth
                variant="standard"
                value={address}
                disabled={disabled}
              />
              <TextField
                onChange={(e) => setState(e.target.value)}
                margin="dense"
                label="State"
                type="string"
                fullWidth
                variant="standard"
                value={state}
                disabled={disabled}
              />
              <TextField
                onChange={(e) => setCountry(e.target.value)}
                margin="dense"
                label="Country"
                type="string"
                fullWidth
                variant="standard"
                value={country}
                disabled={disabled}
              />
              <TextField
                onChange={(e) => setPostcode(e.target.value)}
                margin="dense"
                label="Postcode"
                type="string"
                fullWidth
                variant="standard"
                value={postcode}
                disabled={disabled}
              />
              <TextField
                onChange={(e) => setPhone(e.target.value)}
                margin="dense"
                label="Phone"
                type="string"
                fullWidth
                variant="standard"
                value={phone}
                disabled={disabled}
              />
            </DialogContent>
            <DialogActions>
              <Stack direction="row" spacing={2}>
                <Button onClick={UpdateBranch}>Save</Button>
                <Button onClick={DeleteBranch}>Delete</Button>
              </Stack>
            </DialogActions>
          </Dialog>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
