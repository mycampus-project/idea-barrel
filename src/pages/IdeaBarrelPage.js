import React, { useState, useEffect } from "react";
import IdeaForm from "../components/ideaparts/IdeaForm";
import IdeaList from "../components/ideaparts/IdeaList.js"

import BackendAPI from "../api/BackendAPI";

const { fetchIdeasAsync, fetchUsersAsync} = BackendAPI();

// TODO: If user == admin -> allow submissions OR ablity to delete submissions. Also have a list of flagged ideas visible
// Properties for a idea: Date(DATE), Submitter(ID String), Flagged(BOOL),Title (STRING), Desc(STRING), Category (String [from a list]), Votes


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
