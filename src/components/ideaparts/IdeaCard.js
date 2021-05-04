import React from "react";
import {
  Card,
  Typography,
  Container,
  Box,
  CardContent,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import StarIcon from "@material-ui/icons/Star";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import "../../App.css";

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
    backgroundColor: "#3F51B5",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "0.5em",
    width: "100%",
    height: "30em",
  },
  card520: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "0.5em",
    width: "100%",
    height: "37em",
  },
  cardCont: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    height: "30em",
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
    fontSize: "1.6em",
    margin: "0em",
  },
  categoryCont: {
    marginLeft: "0em",
    border: "solid 1px white",
    padding: "1.4em",
    backgroundColor: "white",
    width: "100%",
    height: "14em",
    borderRadius: 8,
    marginBottom: "1em",
    marginTop: "1em",
  },
  bodyCont: {
    overflowY: "scroll",
    justifyContent: "left",
    border: "solid 1px black",
    width: "100%",
    height: "45%",
  },
  eventDetailButton: {
    position: "absolute",
    left: "85%",
    top: "-5%",
  },
  events: {
    width: "100%",
  },
  title: {
    color: "white",
    fontSize: "3em",
  },
  upvotes: {
    color: "#cdff57",
  },
});

class IdeaCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upvotes: this.props.data.upvotes,
    };
  }

  render() {
    const { title, category, department } = this.props.data;

    return (
      // Card for event details and dialog for more info
      <div className={this.props.classes.root}>
        <Card className={this.props.classes.card}>
          <CardContent className={this.props.classes.cardCont}>
            <Box
              display="flex"
              flex="1"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Typography className={this.props.classes.title}>
                {title}
              </Typography>
              <Container className={this.props.classes.categoryCont}>
                <Box
                  display="flex"
                  flex="1"
                  flexDirection="column"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    variant="h6"
                    className={this.props.classes.category}
                  >
                    {department}
                  </Typography>
                  <Typography
                    variant="h6"
                    className={this.props.classes.category}
                  >
                    {category}
                  </Typography>
                  <br></br>
                  <Typography
                    variant="h6"
                  >
                    More details
                  </Typography>
                  <ArrowForwardIcon />
                </Box>
              </Container>
              <Container maxWidth="md" flexwrap="nowrap">
                <Box
                  display="flex"
                  flexdirection="row"
                  justifyContent="space-between"
                >
                  {this.state.upvotes ? (
                    <Typography
                      variant="h6"
                      className={this.props.classes.upvotes}
                    >
                      Upvotes: {this.state.upvotes}
                    </Typography>
                  ) : (
                    <Typography
                      variant="h6"
                      className={this.props.classes.upvotes}
                    >
                      Upvotes: 0
                    </Typography>
                  )}
                  {JSON.parse(window.localStorage.getItem("user"))
                    ?.department === department ? (
                    <StarIcon style={{ color: "yellow", fontSize: 30 }} />
                  ) : null}
                </Box>
              </Container>
            </Box>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(useStyles)(IdeaCard);
