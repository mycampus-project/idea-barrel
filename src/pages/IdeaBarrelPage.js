import React, { useState, useEffect } from "react";
import IdeaForm from "../components/ideaparts/IdeaForm";
import IdeaList from "../components/ideaparts/IdeaList.js"

import BackendAPI from "../api/BackendAPI";
import { Typography } from "@material-ui/core";

const { fetchIdeasAsync } = BackendAPI();

// TODO: If user == admin -> allow submissions OR ablity to delete submissions. Also have a list of flagged ideas visible
// Properties for a idea: Date(DATE), Submitter(ID String), Flagged(BOOL),Title (STRING), Desc(STRING), Category (String [from a list]), Votes


const IdeaBarrelPage = () => {
  const [ideas, setIdeas] = useState([]);
  // eslint-disable-next-line
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchIdeas = async () => {
          try {
        const response = await fetchIdeasAsync();
        setIdeas(response);
        console.log("ideoita");
        console.log(ideas);
      } catch (e) {
        console.log("error fetching ideas");
        console.log(e)
      }
    };
    console.log("PARSE");
    var fName = (JSON.parse(window.localStorage.getItem("user")));
    setUser(fName);
    console.log(user);
    fetchIdeas();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {JSON.parse(window.localStorage.getItem("user"))?.fName ? (

<div>
      <h2>
        Current user :  {user?.fName +" "+ user?.lName}, department head of {user?.department}.</h2>
      <h3>Submitted ideas related to your department have a star icon next to the category.</h3>
      </div>
      ) : <h1>Return to home page and select a user profile</h1> }
      {JSON.parse(window.localStorage.getItem("user"))?.isAdmin ? (
        <h3>You have admin rights with delete permissions</h3>
        ) : <h3>Department heads have rights with delete permissions on ideas targeted to their department</h3> }
      
      {ideas.length > 0 ? (
                  <IdeaList data={ideas}></IdeaList>
                ) : <Typography>Loading...</Typography>
      }   
      <br></br>   
      <IdeaForm data={user}></IdeaForm>
    </div>
  );
};

export default IdeaBarrelPage;
