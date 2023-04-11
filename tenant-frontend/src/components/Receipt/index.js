// React Imports
import jsPDF from "jspdf";
import Axios from "axios";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

// Material UI components
import { IconButton } from "@mui/material";
import ReceiptIcon from "@mui/icons-material/Receipt";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";

// Material Dashboard components
import Logo from "assets/images/companyLogo.png";
import "./style.css";

export default function Receipt(receiptData) {
  const [receipt, setReceipt] = useState(false);
  const [user, setUser] = useState([]);
  const [email, setEmail] = useState([]);
  const [phone, setPhone] = useState([]);
  const [participationDate, setParticipationDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(new Date().toISOString().split("T")[0]);
  const [tableRows, setTableRows] = useState([]);
  const handleDownload = () => {
    try {
      // eslint-disable-next-line new-cap
      const doc = new jsPDF();
      const companyName = "Material Inc.";

      doc.addImage(Logo, "PNG", 15, 15, 30, 30);
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text(companyName, 55, 30);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text("Wei De", 55, 37);
      doc.text("ganweide1012@gmail.com", 55, 42);
      doc.text("0163506506", 55, 47);

      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text("Invoice", 15, 80);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`Invoice Date: ${participationDate}`, 15, 90);
      doc.text(`Due Date: ${endDate}`, 15, 95);

      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Bill To", 15, 110);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(user, 15, 120);
      doc.text(email, 15, 125);
      doc.text(phone, 15, 130);

      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Program", 110, 110);
      tableRows.map((row, index) => {
        const { program, programDuration, price } = row;
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text(`${index + 1}. ${program}`, 110, 120 + index * 20);
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text(`Program Duration: ${programDuration}`, 110, 125 + index * 20);
        doc.text(`Amount: $${price}`, 110, 130 + index * 20);

        return {
          program,
          programDuration,
          price,
        };
      });
      doc.save("invoice.pdf");
    } catch (error) {
      console.error("Error generating PDF", error);
    }
  };

  const handleReceipt = async (prop) => {
    setReceipt(true);
    try {
      const { data } = await Axios.get(
        `http://127.0.0.1:8000/api/participation/${prop.receiptData.id}/`
      );
      setUser(data.customer);
      setParticipationDate(data.participationDate);
      setEndDate(data.endDate);
      const customerData = await Axios.get(`http://127.0.0.1:8000/api/customer/${data.customer}`);
      setEmail(customerData.data.email);
      setPhone(customerData.data.phone);

      const newRowData = {
        id: uuidv4(),
        program: data.program,
        programDuration: data.programDuration,
        price: data.price,
      };
      setTableRows([newRowData]);
    } catch (error) {
      console.log("receipt error", error);
    }
  };

  const handleAddRow = () => {
    const newRowData = {
      id: uuidv4(),
      program: "",
      programDuration: "",
      price: "",
    };

    setTableRows([...tableRows, newRowData]);
  };

  const handleRowChange = (id, field, value) => {
    const rows = [...tableRows];
    const index = rows.findIndex((row) => row.id === id);
    rows[index][field] = value;
    setTableRows(rows);
  };

  const handleDeleteRow = (id) => {
    const newTableRows = tableRows.filter((row) => row.id !== id);
    setTableRows(newTableRows);
  };

  return (
    <IconButton>
      <ReceiptIcon onClick={() => handleReceipt(receiptData)} />
      <Dialog
        open={receipt}
        onClose={() => {
          console.log("Dialog Closed");
          setReceipt(false);
        }}
        maxWidth="xl"
      >
        <div className="receipt-form">
          <div className="title">
            <h1>Receipt</h1>
            <h6>{new Date().toLocaleString()}</h6>
          </div>
          <div className="informations">
            <div className="container">
              <div className="companyInfo">
                <img src={Logo} alt="Company Logo" width="70" height="70" />
                <h1>Material Inc.</h1>
                <div>
                  <li>Wei De</li>
                  <li>ganweide1012@gmail.com</li>
                  <li>0163506506</li>
                </div>
              </div>
              <div className="customerInfo">
                <div className="label">Bill To:</div>
                <div>
                  <li>{user}</li>
                  <li>{email}</li>
                  <li>{phone}</li>
                </div>
              </div>
            </div>
            <div className="otherInfo">
              <div className="row">
                <div className="label">Invoice Date:</div>
                <div className="value">{participationDate}</div>
              </div>
              <div className="row">
                <div className="label">Due Date:</div>
                <div className="value">{endDate}</div>
              </div>
            </div>
          </div>
          <table className="table">
            <thead className="tableHead">
              <th className="heading1">Program</th>
              <th className="headings">Program Duration</th>
              <th className="headings">Price</th>
            </thead>
            <tbody className="tableBody">
              {tableRows.map((row) => (
                <tr key={row.id}>
                  <td className="programRow">
                    <TextField
                      onChange={(e) => handleRowChange(row.id, "program", e.target.value)}
                      margin="dense"
                      type="text"
                      fullWidth
                      variant="standard"
                      InputLabelProps={{ shrink: true }}
                      value={row.program}
                    />
                  </td>
                  <td>
                    <TextField
                      onChange={(e) => handleRowChange(row.id, "programDuration", e.target.value)}
                      margin="dense"
                      type="text"
                      fullWidth
                      variant="standard"
                      InputLabelProps={{ shrink: true }}
                      value={row.programDuration}
                    />
                  </td>
                  <td>
                    <TextField
                      onChange={(e) => handleRowChange(row.id, "price", e.target.value)}
                      margin="dense"
                      type="text"
                      fullWidth
                      variant="standard"
                      InputLabelProps={{ shrink: true }}
                      value={row.price}
                    />
                  </td>
                  <td>
                    <button type="button" onClick={() => handleDeleteRow(row.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <button type="button" onClick={() => handleAddRow()}>
              Add Row
            </button>
          </table>
          <button type="button" onClick={() => handleDownload()}>
            Download As PDF
          </button>
        </div>
      </Dialog>
    </IconButton>
  );
}
