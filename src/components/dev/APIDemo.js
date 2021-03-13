import React, { useState, useEffect } from "react";

import DummyAPI from "../../api/DummyAPI";

const dataStyle = {
  border: "1px solid black",
  width: "400px",
  padding: "4px",
  marginTop: "4px",
};

const {
  fetchUsersAsync,
} = DummyAPI();

const APIDemo = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const users = await fetchUsersAsync();
        setUsers(users);
        setRandomUser(users);
      } catch (e) {
        console.log("error fetching users");
        console.log(e);
      }
    };
    getUsers();
  }, []);

  


  // Set the "current user" to a random user from the
  // list of all the users fetched from the json-server
  const setRandomUser = (data) => {
    const randomUser =
      data.length > 0
        ? data[Math.floor(Math.random() * Math.floor(data.length))]
        : null;
    setUser(randomUser);
  };

  // The list item in users list on the "home" page
  const userItem = (user) => {
    return (
      <div key={user.id} style={dataStyle}>
        <h4>
          {user.fName} {user.lName}
        </h4>
        <p key={user.id}>{user.id}</p>
      </div>
    );
  };

  return (
    <div>
      <div style={dataStyle}>
        <h4>
          Below is a Json server API demo usage [Component from:
          src/components/dev/APIDemo]
        </h4>
      </div>
      <h4>
        Current user (random): {user?.fName} {user?.lName}
      </h4>
      {users && users.length > 0 ? (
        <h4>Users from json server</h4>
      ) : (
        <h4>No users found</h4>
      )}
      {users?.map((user) => {
        return userItem(user);
      })}
    </div>
  );
};

export default APIDemo;
