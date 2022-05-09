import React, { useState, useEffect } from "react";
import Card from "../ui/Card";
import classes from "./userslist.module.css";
import Button from "../ui/Button";
import ReactDOM from "react-dom";
import MaterialTable from "material-table";
import tableIcons from "../tableicons";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import { alpha } from "@material-ui/core/styles";

const UserList = (props) => {

  const [rowsdata, setRowsData] = useState([]);

  const eventsdetails = JSON.parse(localStorage.getItem("events"));

  useEffect(() => {}, [rowsdata]);


  return (
    <Card className={classes.users}>
    
      <MaterialTable
        title="Multiple Actions Preview"
        icons={tableIcons}
        editable={{
          onRowDelete: (selectedrow) =>
            new Promise((resolve, reject) => {
              icon: () => <DeleteOutline />;
              const index = selectedrow.tableData.id;
              console.log(index);
              const updatedrows = [...eventsdetails];
              updatedrows.splice(index, 1);
              setRowsData([...rowsdata, ...updatedrows]);
              localStorage.setItem("events", JSON.stringify(updatedrows));
              resolve();
            }),
          onRowUpdate: (updatedrow, oldrow) =>
            new Promise((resolve, reject) => {
              const index = oldrow.tableData.id;
              console.log(index);
              const updatedrows = [...eventsdetails];
              updatedrows[index] = updatedrow;
              console.log(updatedrows);
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
        ]}
        data={eventsdetails ? eventsdetails : []}
        // actions={[
        //   (rowData) => ({
        //     icon: () => <DeleteOutline />,
        //     tooltip: "Delete User",
        //     onClick: () => handledeleteevent(rowData),
        //   }),
        // ]}
      />
    </Card>
  );
};

export default UserList;
