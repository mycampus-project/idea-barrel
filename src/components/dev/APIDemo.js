import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { DeleteForever } from "@material-ui/icons";

import DummyAPI from "../../api/DummyAPI";

const dataStyle = {
  border: "1px solid black",
  width: "400px",
  padding: "4px",
  marginTop: "4px",
};

const {
  fetchUsersAsync,
  deleteIdeaAsync,
  postIdeaAsync,
  fetchIdeasAsync,
} = DummyAPI();

const APIDemo = () => {
  const [users, setUsers] = useState([]);
  const [ideas, setIdeas] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUsers();
    fetchIdeas();
  }, []);

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

  const fetchIdeas = async () => {
    try {
      const ideas = await fetchIdeasAsync();
      setIdeas(ideas);
    } catch (e) {
      console.log("error fetching ideas");
      console.log(e);
    }
  };

  // An idea template to demonstrate post request to the json-server
  const postIdea = async () => {
    const post = {
      title: "An example new idea post",
      body: `The structure of these objects can be anything.\n
      Json-server accepts it as long as it's in JSON format.\n
      Any sort of id doesn't have to be provided as json-server also provides that automatically.`,
      votes: 0,
      catory: 404,
    };
    try {
      const postRequest = await postIdeaAsync(user.id, post);
      console.log(postRequest);
      window.location.reload();
    } catch (e) {
      console.log("error posting an idea");
      console.log(e);
    }
  };

  const deleteIdea = async (id) => {
    try {
      await deleteIdeaAsync(id);
      console.log("deleted");
      window.location.reload();
    } catch (e) {
      console.log("error deleting an idea");
      console.log(e);
    }
  };

  // Set the "current user" to a random user from the
  // list of all the users fetched from the json-server
  const setRandomUser = (data) => {
    const randomUser =
      data.length > 0
        ? data[Math.floor(Math.random() * Math.floor(data.length))]
        : null;
    setUser(randomUser);
  };

  // The list items you see in the idea list on the "home page"
  const ideaItem = (idea) => {
    return (
      <div key={idea.id} style={dataStyle}>
        <h4>{idea.data.title}</h4>
        <p>{idea.data.body}</p>
        <h4>Category: {idea.data.catory}</h4>
        <h4>Votes: {idea.data.votes}</h4>
        <DeleteForever
          onClick={() => deleteIdea(idea.id)}
          style={{ cursor: "pointer" }}
        ></DeleteForever>
      </div>
    );
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
      {ideas && ideas.length > 0 ? (
        <h4>Ideas from json server</h4>
      ) : (
        <h4>No ideas found</h4>
      )}
      {ideas?.map((idea) => {
        return ideaItem(idea);
      })}
      <Button onClick={() => postIdea()}>Click me for new Idea</Button>
    </div>
  );
};

export default APIDemo;
