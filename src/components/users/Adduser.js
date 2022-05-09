import React, { useState, useEffect } from "react";
import Card from "../ui/Card";
import classes from "./Adduser.module.css";
import Button from "../ui/Button";
import Errormodel from "../ui/Errormodel";
import ReactDOM from "react-dom";
import { v4 } from "uuid";
import Wrapper from "../Helper/Wrapper";
import { format } from "date-fns";
import MaterialTable from "material-table";

const AddUser = (props) => {
  const [enteredEventName, setenteredEventName] = useState("");
  const [enteredstartDate, setenteredstartDate] = useState();
  const [enteredEndDate, setenteredEndDate] = useState();
  const [enteredstarttime, setenteredstarttime] = useState("");
  const [enteredendtime, setenteredendtime] = useState("");
  const [eventheld, setevent] = useState([]);
  const [show, setshow] = useState(true);

  const [error, seterror] = useState();
  console.log("dsfgerg", enteredstartDate);
  useEffect(() => {}, [eventheld]);

  const addUserHandler = (event) => {
    event.preventDefault();
    if (enteredstartDate.length === 0 || enteredEventName.trim().length === 0) {
      seterror({
        title: "Invalid input",
        message: "Please enter a valid name and age (non-empty values)",
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
    };
    console.log(eventinput);

    const details = JSON.parse(localStorage.getItem("events") || "[]");
    details.push(eventinput);
    localStorage.setItem("events", JSON.stringify(details));

    setevent([...eventheld, eventinput]);
    setenteredstartDate("");
    setenteredstarttime("");
    setenteredEndDate("");
    setenteredendtime("");
    setenteredEventName("");
    setshow(false);
    console.log("evnt", eventheld);


    window.location.reload();
  };
  console.log(show);
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

  const Errorhandler = () => {
    seterror(null);
  };

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
            value={enteredEventName}
            onChange={eventChangeHandler}
          />
          <label htmlFor="startDate">Start Date</label>
          <input
            id="startDate"
            type="date"
            name="enteredstartDate"
            value={enteredstartDate}
            onChange={startdateChangeHandler}
          />
          <label htmlFor="endDate">End Date</label>
          <input
            id="endDate"
            type="date"
            name="enteredEndDate"
            min={enteredstartDate}
            value={enteredEndDate}
            onChange={enddateChangeHandler}
          />

          <label htmlFor="starttime">start time</label>
          <input
            id="starttime"
            type="time"
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
