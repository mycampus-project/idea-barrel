import React, { useState, useEffect } from "react";
import IdeaList from "../components/ideaparts/IdeaList.js"
import AddIcon from "@material-ui/icons/Add";
import { navigate } from "hookrouter";
import BackendAPI from "../api/BackendAPI";
import { Typography, Fab } from "@material-ui/core";

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

  const ideaForm = () => {
    navigate("/idea-form");
  };

  return (
    <div>

      
      {ideas.length > 0 ? (
                  <IdeaList data={ideas} user={user}></IdeaList>
                ) : <Typography>Loading...</Typography>
      }   
      <br></br>   
      <Fab
        color="primary"
        aria-label="add"
        style={{
          margin: 0,
          top: "auto",
          right: 16,
          bottom: 16,
          left: "auto",
          position: "fixed",
        }}
        onClick={() => ideaForm()}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

export default IdeaBarrelPage;
