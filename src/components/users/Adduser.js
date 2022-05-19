import React, { useState, useEffect, useContext } from "react";
import Card from "../ui/Card";
import classes from "./Adduser.module.css";
import Button from "../ui/Button";
import Errormodel from "../ui/Errormodel";
import ReactDOM from "react-dom";
import { v4 } from "uuid";
import Wrapper from "../Helper/Wrapper";
import { format } from "date-fns";

import MaterialTable from "material-table";
import UserList from "./userslist";

const AddUser = (props) => {
  const [enteredEventName, setenteredEventName] = useState("");
  const [enteredstartDate, setenteredstartDate] = useState("");
  const [enteredEndDate, setenteredEndDate] = useState("");
  const [enteredstarttime, setenteredstarttime] = useState("");
  const [enteredendtime, setenteredendtime] = useState("");
  const [eventheld, setevent] = useState([]);
  const [enteredstatus, setstatus] = useState("");
  const [error, seterror] = useState();
  console.log("data", props.data);

  const addUserHandler = (event) => {
    event.preventDefault();
    if (
      enteredEventName.trim().length === 0 ||
      enteredendtime.length === 0 ||
      enteredstarttime.length === 0 ||
      enteredstartDate.length === 0 ||
      enteredEndDate.length === 0
    ) {
      seterror({
        title: "Invalid input",
        message: "Please enter  Valid inputs (non-empty values)",
      });

      return;
    }
    const eventinput = {
      id: v4(),
      event: enteredEventName,
      startdate: enteredstartDate,
      enddate: enteredEndDate,
      starttime: enteredstarttime,
      endtime: enteredendtime,
      eventstatus: enteredstatus,
    };

    const details = JSON.parse(localStorage.getItem("events") || "[]");
    details.push(eventinput);
    localStorage.setItem("events", JSON.stringify(details));

    setevent([...eventheld, eventinput]);
    setenteredstartDate("");
    setenteredstarttime("");
    setenteredEndDate("");
    setenteredendtime("");
    setenteredEventName("");

    window.location.reload();
  };
  const eventChangeHandler = (event) => {
    setenteredEventName(event.target.value);
  };
  const startdateChangeHandler = (event) => {
    setenteredstartDate(event.target.value);
  };
  const enddateChangeHandler = (event) => {
    setenteredEndDate(event.target.value);
  };
  const starttimeChangeHandler = (event) => {
    setenteredstarttime(event.target.value);
  };
  const endtimeChangeHandler = (event) => {
    setenteredendtime(event.target.value);
  };
  useEffect(() => {
    if (
      moment(new Date(enteredstartDate)).format("YYYY-MM-DD") <=
        moment(new Date()).format("YYYY-MM-DD") &&
      moment(new Date(enteredEndDate)).format("YYYY-MM-DD") >=
        moment(new Date()).format("YYYY-MM-DD")
    ) {
      setstatus("Inprogress");
    } else if (new Date(enteredstartDate) > new Date(enteredEndDate)) {
      setenteredEndDate(enteredstartDate);
    } else if (
      moment(new Date(enteredstartDate)).format("YYYY-MM-DD") <
        moment(new Date()).format("YYYY-MM-DD") &&
      moment(new Date(enteredEndDate)).format("YYYY-MM-DD") <
        moment(new Date()).format("YYYY-MM-DD")
    ) {
      setstatus("Event Completed");
    } else if (
      moment(new Date(enteredstartDate)).format("YYYY-MM-DD") >
        moment(new Date()).format("YYYY-MM-DD") &&
      moment(new Date(enteredEndDate)).format("YYYY-MM-DD") >
        moment(new Date()).format("YYYY-MM-DD")
    ) {
      setstatus("Upcoming Event");
    }
  }, [enteredstartDate, enteredEndDate]);

  const Errorhandler = () => {
    seterror(null);
  };
  console.log("status", enteredstatus);
  return (
    <Wrapper>
      {error && (
        <Errormodel
          key="1"
          title={error.title}
          message={error.message}
          onOk={Errorhandler}
        />
      )}
      <Card key="2" className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="eventname">Event Name</label>
          <input
            id="eventname"
            type="text"
            name="enteredEventName"
            className="form-control"
            value={enteredEventName}
            onChange={eventChangeHandler}
          />
          <label htmlFor="startDate">Start Date</label>
          <input
            id="startDate"
            type="date"
            className="form-control"
            name="enteredstartDate"
            value={enteredstartDate}
            onChange={startdateChangeHandler}
          />
          <label htmlFor="endDate">End Date</label>
          <input
            id="endDate"
            type="date"
            name="enteredEndDate"
            className="form-control"
            min={enteredstartDate}
            value={enteredEndDate}
            onChange={enddateChangeHandler}
          />

          <label htmlFor="starttime">start time</label>
          <input
            id="starttime"
            type="time"
            className="form-control"
            name="enteredstarttime"
            value={enteredstarttime}
            onChange={starttimeChangeHandler}
          />
          <label htmlFor="end time">end time</label>
          <input
            id="end time"
            type="time"
            name="enteredendtime"
            min={enteredstarttime}
            className="form-control"
            value={enteredendtime}
            onChange={endtimeChangeHandler}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};
export default AddUser;
