import React, { useState } from "react";
import AddUser from "./components/users/Adduser";
import UserList from "./components/users/userslist";

function App() {
  const [usersList, setusersList] = useState([]);

  const addUserHandler = (ename, sdate, edate, stime, etime) => {
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
  console.log(usersList);
  return (
    <>
  
      <UserList />
    </>
  );
}

export default App;
