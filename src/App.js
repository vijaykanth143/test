import React, { useState } from "react";
import AddUser from "./components/users/Adduser";
import UserList from "./components/users/userslist";

function App() {
  const [usersList, setusersList] = useState([]);

  const Adduserhandler = (ename, sdate, edate, stime, etime) => {
    setusersList((prevState) => {
      return [
        ...prevState,
        {
          EventName: ename,
          StartDate: sdate,
          EndDate: edate,
          Starttime: stime,
          Endtime: etime,
          id: Math.random().toString(),
        },
      ];
    });
  };

  return (
    <>
      <AddUser />
      <UserList onAdduser={Adduserhandler} users={usersList} />
    </>
  );
}

export default App;
