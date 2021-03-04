import React, { useState, useEffect } from "react";
import { DeleteForever } from "@material-ui/icons";
import IdeaFormDemo from "../IBDemo/ideaFormDemo";

import DummyAPI from "../../api/DummyAPI";

const dataStyle = {
  border: "1px solid black",
  width: "400px",
  padding: "4px",
  marginTop: "4px",
};

const {
  deleteIdeaAsync,
  fetchUsersAsync,
  fetchIdeasAsync,
} = DummyAPI();

const APIDemo = () => {
  const [ideas, setIdeas] = useState([]);
  const [users, setUsers] = useState([]);
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

  const setRandomUser = (data) => {
    const randomUser =
      data.length > 0
        ? data[Math.floor(Math.random() * Math.floor(data.length))]
        : null;
    setUser(randomUser);
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
          Below is a JSON server API demo usage exmaple - tailored for ideas [Component from:
          src/components/dev/APIDemoIdea]
        </h4>
      </div>
      <h4>
        Current user : {user?.fName} {user?.lName}
      </h4>
      {ideas && ideas.length > 0 ? (
        <h4>Ideas from json server</h4>
      ) : (
        <h4>No ideas found</h4>
      )}
      {ideas?.map((idea) => {
        return ideaItem(idea);
      })}
      <p></p>
      <IdeaFormDemo data={user}></IdeaFormDemo>
    </div>
  );
};

export default APIDemo;
