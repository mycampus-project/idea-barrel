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
  card: {
    display: "flex",
    flexDirection: "column",
    border: "solid 3px blue",
    height: "22.9em",
    justifyContent: "space-between",
    padding: "0.5em",
    width: "100%"
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
    width : "12em",
  },
  bodyCont: {
    justifyContent:"left",
    border: "solid 1px black",
    width : "100%",
    height: "55%"
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
    window.location.reload();
  } catch (e) {
    console.log("error deleting an idea");
    console.log(e);
  }
};

const upvoteIdea = async (id, senderId, upvotes, category, title, body) => {
  try {
    const data = {
      upvotes: upvotes + 1,
      id: id,
      senderId: senderId,
      category: category,
      title: title,
      body: body,
    };
    // TODO  if current user = idea senderID...
    const res = await updateIdeaAsync(data);
    window.location.reload();
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
      title: "",
      body: "",
      cat: "",
    };
  }

  render() {
    const { title, category, id, body, upvotes, senderId } = this.props.data;
    console.log("UPVOTES " + upvotes);

    return (
      // Card for event details and dialog for more info
      <div className={this.props.classes.root}>
        <Card className={this.props.classes.card}>
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
                <Typography variant="h6" className={this.props.classes.category}>
                  {category}
                </Typography>
                </Container>
                
                <Container className={this.props.classes.bodyCont}>
                <Typography className={this.props.classes.body}>
                  {body}
                </Typography>
                </Container>
                
             
            
          <Container maxWidth="md" flexWrap="nowrap">
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
                  onClick={() =>
                    upvoteIdea(id, senderId, upvotes, category, title, body)
                  }
                  startIcon={<ArrowUpwardIcon />}
                >
                  Upvote
                </Button>

              </MuiThemeProvider>
              {upvotes ? (
                  <Typography variant="h6" className={this.props.classes.category}>
                    Upvotes: {upvotes}
                  </Typography>
                ) : null}

              {/* TODO: Conditional formatting. Flagging for users, delete for admin */}

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
              ></DeleteForever>
            </Box>
          </Container>
          </Box>
        </Card>
      </div>
    );
  }
}

export default withStyles(useStyles)(IdeaCard);
