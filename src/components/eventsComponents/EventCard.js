import React from "react";
import {
  Card,
  CardContent,
  CardActionArea,
  Typography,
  ThemeProvider,
  createMuiTheme,
  makeStyles,
  Box,
} from "@material-ui/core";
import Moment from "react-moment";

const EventCard = (props) => {
  const { data } = props;
  const {
    title,
    body,
    category,
    date,
    startTime,
    endTime,
    senderfName,
    senderlName,
  } = data; //eslint-disable-line

  const eventCardTheme = createMuiTheme({
    spacing: 5,
    breakpoints: {
      values: {
        // not applied
        xsm: 280,
        sm: 360,
        lg: 768,
        xl: 1024,
        xxl: 1920,
      },
      MuiPaper: {
        root: {
          width: "100%",
          marginTop: "5",
        },
        rounded: {
          //textcolor
          color: "black",
          borderRadius: 5,
        },
      },
      // card
      MuiButtonBase: {
        root: {
          // text color
          color: "black",
        },
      },
      MuiCardContent: {
        root: {
          padding: "20px",
          marginLeft: 0,
          marginRight: 0,
        },
      },
    },
  });
  const useStyles = makeStyles({
    eventCard: {
      border: "2px solid blue",
      borderRadius: 4,
    },
  });
  const styles = useStyles();

  return (
    // Card for event details and dialog for more info
    <div>
      <ThemeProvider theme={eventCardTheme}>
        <Card>
          <CardActionArea>
            <CardContent className={styles.eventCard}>
              <Box display="flex" flexDirection="row" minWidth="200px">
                <Box width="100%">
                  <Typography component={"span"} variant={"h4"}>
                    {title}
                  </Typography>
                </Box>
                <Box flexShrink={0}>
                  <Typography>{category}</Typography>
                </Box>
              </Box>
              <Box width="100%" justifyContent="flex-start">
                <Box minHeight="100px" marginTop="1%" marginBottom="1%">
                  <Typography component={"span"} variant={"body2"}>
                    {body}
                  </Typography>
                </Box>
              </Box>
              <Box width="100%" justifyContent="flex-start">
                <Typography component={"span"} variant={"subtitle"}>
                  <p>
                    start time:{" "}
                    <Moment format="DD-MM-YYYY HH:mm:ss" date={startTime} />
                  </p>
                  <p>
                    end time:{" "}
                    <Moment format="DD-MM-YYYY HH:mm:ss" date={endTime} />
                  </p>
                </Typography>
              </Box>
              <Box
                wid
                display="flex"
                justifyContent="flex-end"
                width="100%"
                margin="0"
              >
                <Typography component={"span"} variant={"subtitle"}>
                  Posted {""}
                  <Moment format="DD-MM-YYYY" date={date} />{" "}
                  <Moment format="HH:mm:ss" date={date} /> by: {senderfName}{" "}
                  {senderlName}
                </Typography>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      </ThemeProvider>
    </div>
  );
};
export default EventCard;
