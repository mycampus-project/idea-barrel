import React from "react";
import {
  Button,
  Card,
  CardHeader,
  Typography,
  Container,
  Box,
} from "@material-ui/core";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { DeleteForever } from "@material-ui/icons";
import StarIcon from '@material-ui/icons/Star';
import BackendAPI from "../../api/BackendAPI";
import "../../App.css";

const buttonTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#37d461",
    },
    secondary: {
      main: "#e04331",
    },
  },
});

const useStyles = (theme) => ({
  root: {
    display: "inherit",
    marginBottom: "0.3em",
  },
  eventButton: {
    marginTop: "2%",
    marginLeft: "1%",
    marginRight: "1%",
    borderRadius: "50%",
    maxWidth: "5%",
  },
  card420: {
    display: "flex",
    flexDirection: "column",
    border: "solid 3px blue",
    justifyContent: "space-between",
    padding: "0.5em",
    width: "100%",
    height: "30em"
  },
  card520: {
    display: "flex",
    flexDirection: "column",
    border: "solid 3px blue",
    justifyContent: "space-between",
    padding: "0.5em",
    width: "100%",
    height: "37em"
  },
  date: {
    textAlign: "end",
  },
  likes: {},
  body: {
    justifyContent: "left",
  },
  category: {
    textAlign: "center",
    flexDirection: "row",
    fontSize: "15px",
    margin: "0em",},
  categoryCont: {
    marginLeft: "0em",
    justifyContent:"left",
    border: "solid 1px black",
    marginBottom:"0.6em",

 backgroundColor:"yellow",
    width : "auto",
  },
  bodyCont: {
    overflowY: "scroll",
    justifyContent:"left",
    border: "solid 1px black",
    width : "100%",
    height: "45%"
  },
  eventDetailButton: {
    position: "absolute",
    left: "85%",
    top: "-5%",
  },
  events: {
    width: "100%",
  },
});

const { deleteIdeaAsync, updateIdeaAsync } = BackendAPI();

const deleteIdea = async (id, category) => {
  try {
    await deleteIdeaAsync(id, category);
    console.log("deleted");
    //window.location.reload();
  } catch (e) {
    console.log("error deleting an idea");
    console.log(e);
  }
};

const upvoteIdea = async (id, senderId, upvotes, category, title, body, department) => {
  try {
    const data = {
      upvotes: upvotes + 1,
      id: id,
      senderId: senderId,
      category: category,
      title: title,
      body: body,
      department:department
    };
    // TODO  if current user = idea senderID...
    const res = await updateIdeaAsync(data);
    //window.location.reload();
    if (res.status === 200) {
      
      console.log("upvoted");
    } else if (res.status === 400) {
      console.log("Unable to update idea", res.json());
    } else {
      console.log("This shouldn't happend");
    }
  } catch (e) {
    console.log("error upvoting an idea");
    console.log(e);
  }
};

class IdeaCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upvotes: this.props.data.upvotes,
    };
  }

  render() {
    const { title, category, id, body, senderId, department } = this.props.data;

    return (
      // Card for event details and dialog for more info
      <div className={this.props.classes.root}>
        <Card className={this.props.classes["card"+this.props.cellH]}>
          
              <Box
              display="flex"
              flex="1"
                flexDirection="column"
justifyContent="space-between"              >
                <CardHeader
                  title={title}
                  titleTypographyProps={{ variant: "h5" }}
                />
                
                
                <Container className={this.props.classes.categoryCont}>
                  <Box display="flex"
              flex="1"
                flexDirection="row"
justifyContent="space-between"  >
  
                <Typography variant="h6" className={this.props.classes.category}>
                  {category} -
                </Typography>
                <Typography variant="h6" className={this.props.classes.category}>
                   - {department}
                   
                </Typography>
                {JSON.parse(window.localStorage.getItem("user"))?.department === department ? (

<StarIcon />) : null }
                
                
                </Box>
                
                </Container>
                
                

                <Box className={this.props.classes.bodyCont}>
                <Typography className={this.props.classes.body}>
                  {body}
                </Typography>

                </Box>
                
             
            
          <Container maxWidth="md" flexwrap="nowrap">
            <Box display="flex" flexdirection="row" justifyContent="space-between">
              {/* <Typography className={this.props.classes.date}>
                  {date}
                </Typography>
                <Typography className={this.props.classes.time}>
                  {time}
                </Typography> */}
                
              <MuiThemeProvider theme={buttonTheme}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    upvoteIdea(id, senderId, this.state.upvotes, category, title, body, department);
                    this.setState( state => ({
                      upvotes: state.upvotes +1
                    }));
                  }}
                  startIcon={<ArrowUpwardIcon />}
                >
                  Upvote
                </Button>

              </MuiThemeProvider>
              {this.state.upvotes ? (
                  <Typography variant="h6" className={this.props.classes.category}>
                    Upvotes: {this.state.upvotes}
                  </Typography>
                ) : null}

              {JSON.parse(window.localStorage.getItem("user"))?.isAdmin || JSON.parse(window.localStorage.getItem("user"))?.department === department ? (
              <DeleteForever
                onClick={() => deleteIdea(id, category)}
                style={{
                  cursor: "pointer",
                  color:"white",
                  backgroundColor:"red",
                  border: "solid 1px black",
                  borderRadius: 90,
                  padding: "0.05em",
                  margin: "0.2em",
                }}
              ></DeleteForever> ) : null }
            </Box>
          </Container>
          </Box>
        </Card>
      </div>
    );
  }
}

export default withStyles(useStyles)(IdeaCard);
