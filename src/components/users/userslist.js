import React, { useState, useEffect, useContext } from "react";
import Card from "../ui/Card";
import classes from "./userslist.module.css";

import ReactDOM from "react-dom";
import MaterialTable from "material-table";
import tableIcons from "../tableicons";
import AddUser from "./Adduser";

const UserList = (props) => {
  const [rowsdata, setRowsData] = useState([]);
  const [eventstatus, setstatus] = useState("");
  const eventsdetails = JSON.parse(localStorage.getItem("events"));

  useEffect(() => {}, [rowsdata]);

  useEffect(() => {
    eventsdetails &&
      eventsdetails.map((event) => {
        if (
          moment(new Date(event.startdate)).format("YYYY-MM-DD") >
          moment(new Date(event.enddate)).format("YYYY-MM-DD")
        ) {
          event.enddate = event.startdate;
        } else if (
          moment(new Date(event.startdate)).format("YYYY-MM-DD") <=
            moment(new Date()).format("YYYY-MM-DD") &&
          moment(new Date(event.enddate)).format("YYYY-MM-DD") >=
            moment(new Date()).format("YYYY-MM-DD")
        ) {
          event.eventstatus = "Inprogress";
        } else if (
          moment(new Date(event.startdate)).format("YYYY-MM-DD") <
            moment(new Date()).format("YYYY-MM-DD") &&
          moment(new Date(event.enddate)).format("YYYY-MM-DD") <
            moment(new Date()).format("YYYY-MM-DD")
        ) {
          event.eventstatus = "Event completed";
        } else if (
          moment(new Date(event.startdate)).format("YYYY-MM-DD") >
            moment(new Date()).format("YYYY-MM-DD") &&
          moment(new Date(event.enddate)).format("YYYY-MM-DD") >
            moment(new Date()).format("YYYY-MM-DD")
        ) {
          event.eventstatus = "U pcoming event";
        } else {
          setstatus("");
        }
      });
    localStorage.setItem("events", JSON.stringify(eventsdetails));
  }, [eventsdetails]);
  console.log(eventsdetails);
  // localStorage.setItem("events", JSON.stringify(eventsdetails));
  return (
    <>
      {" "}
      <AddUser data={eventsdetails} />
      <Card className={classes.users}>
        <MaterialTable
          title="Multiple Actions Preview"
          icons={tableIcons}
          editable={{
            onRowDelete: (selectedrow) =>
              new Promise((resolve, reject) => {
                const index = selectedrow.tableData.id;

                const updatedrows = [...eventsdetails];
                updatedrows.splice(index, 1);
                setRowsData([...rowsdata, ...updatedrows]);

                localStorage.setItem("events", JSON.stringify(updatedrows));
                resolve();
              }),
            onRowUpdate: (updatedrow, oldrow) =>
              new Promise((resolve, reject) => {
                const index = oldrow.tableData.id;

                const updatedrows = [...eventsdetails];

                updatedrows[index] = updatedrow;

                setRowsData([...rowsdata, ...updatedrows]);
                localStorage.setItem("events", JSON.stringify(updatedrows));
                resolve();
              }),
          }}
          columns={[
            { title: "Event Name", field: "event" },
            { title: "Start Date", field: "startdate" },
            { title: "End Date", field: "enddate" },
            {
              title: "Start Time",
              field: "starttime",
            },
            {
              title: "End Time",
              field: "endtime",
            },
            {
              title: "Status",
              field: "eventstatus",
            },
          ]}
          data={eventsdetails ? eventsdetails : []}
        />
      </Card>
    </>
  );
};

export default UserList;
