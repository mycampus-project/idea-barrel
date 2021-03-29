import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActionArea,
  Container,
  Grid,
} from '@material-ui/core';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { DeleteForever } from "@material-ui/icons";
import BackendAPI from "../../api/BackendAPI";
import "../../App.css"

const buttonTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#37d461'
    },
    secondary: {
      main: '#e04331',
  },
}});

const useStyles = theme => ({
  root: {
    display: 'inherit',
    marginBottom: '0.3em',
  },
  eventButton: {
    marginTop: '2%',
    marginLeft: '1%',
    marginRight: '1%',
    borderRadius: '50%',
    maxWidth: '5%',
  },
  card: {
    border: 'solid 3px blue',
  },
  date: {
    textAlign: 'end',
  },
  likes: {
  },
  body: {
    justifyContent: 'left',
  },
  category: {
    flexDirection: 'row',
    fontSize: '15px',
  },
  eventDetailButton: {
    position: 'absolute',
    left: '85%',
    top: '-5%',
  },
  events: {
    width: '100%',
  }
});

const {deleteIdeaAsync } = BackendAPI();


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


class IdeaCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      cat: "",
    };
  }

render(){

    const {title, category, id, body} = this.props.data;

    return (
      // Card for event details and dialog for more info
      <div className={this.props.classes.root} >
        
        <Card className={this.props.classes.card} >
          <CardActionArea>
            <CardContent>
              <Grid container spacing={3} direction="column" alignItems="flex-start" justify="flex-start">
                <CardHeader title={title} titleTypographyProps={{ variant: 'h4' }} />
                <Typography className={this.props.classes.category}>
                  {category}
                </Typography>
                <Typography className={this.props.classes.body}>
                {body}
              </Typography>
              </Grid>
              </CardContent>
              </CardActionArea>
              <Grid container direction="row" justify="space-between" >
                {/* <Typography className={this.props.classes.date}>
                  {date}
                </Typography>
                <Typography className={this.props.classes.time}>
                  {time}
                </Typography> */}
                <Container maxWidth="md" flexWrap="nowrap">
                  <MuiThemeProvider theme={buttonTheme}>
                <Button
        variant="contained"
        color="primary"
        startIcon={<ArrowUpwardIcon />}
      >
        Upvote
      </Button>
      </MuiThemeProvider>
      </Container>
      
      {/* TODO: Conditional formatting. Flagging for users, delete for admin */}

      <DeleteForever
          onClick={() => deleteIdea(id, category)}
          style={{ cursor: "pointer", border: 'solid 1px red', borderRadius: 90, padding: '0.05em', margin: '0.2em' }}
        ></DeleteForever>
              </Grid>
          
        </Card>

      </div>
    );
};
};


export default withStyles(useStyles)(IdeaCard);


