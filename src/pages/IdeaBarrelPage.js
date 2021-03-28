import React, { useState, useEffect } from "react";
import { DeleteForever } from "@material-ui/icons";
import IdeaForm from "../components/ideaparts/IdeaForm";
import IdeaList from "../components/ideaparts/IdeaList.js"

import BackendAPI from "../api/BackendAPI";

const { fetchIdeasAsync, fetchUsersAsync, deleteIdeaAsync } = BackendAPI();


const dataStyle = {
  border: "1px solid black",
  width: "400px",
  padding: "4px",
  marginTop: "4px",
};


const IdeaBarrelPage = () => {
  const [ideas, setIdeas] = useState([]);
  // eslint-disable-next-line
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
    const fetchIdeas = async () => {
      try {
        const response = await fetchIdeasAsync();
        setIdeas(response);
      } catch (e) {
        console.log("error fetching bulletins");
      }
    };
    getUsers();
    fetchIdeas();
  }, []);


  const setRandomUser = (data) => {
    const randomUser =
      data.length > 0
        ? data[Math.floor(Math.random() * Math.floor(data.length))]
        : null;
    setUser(randomUser);
  };

  // An idea template to demonstrate post request to the json-server
 

  const deleteIdea = async (id, category) => {
    try {
      await deleteIdeaAsync(id, category);
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
        <h4>{idea.title}</h4>
        <p>{idea.body}</p>
        <h4>Category: {idea.category}</h4>
        <h4>Votes: 0</h4>
        <DeleteForever
          onClick={() => deleteIdea(idea.id, idea.category)}
          style={{ cursor: "pointer" }}
        ></DeleteForever>
      </div>
    );
  };



  return (
    <div>
      <h4 style={{fontSize: "3em"}}>
        Current user : {user?.fName} {user?.lName}
      </h4>
      <IdeaList data={ideas}></IdeaList>
      <IdeaForm data={user}></IdeaForm>
    </div>
  );
};

export default IdeaBarrelPage;
