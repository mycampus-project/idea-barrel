import React from "react";
import {
  Card,
  CardContent,
  CardActionArea,
  Typography,
  makeStyles,
  Box,
} from "@material-ui/core";
import Moment from "react-moment";

const EventCard = (props) => {
  const { data } = props;
  const {
    title,
    category,
    date,
    startTime,
    endTime,
    senderfName,
    senderlName,
  } = data; //eslint-disable-line

  const useStyles = makeStyles((theme) => ({
    eventCard: {
      width: "100%",
      justifyContent: "center",
      marginLeft: "auto",
      marginRight: "auto",
      borderColor: theme.palette.primary.main,
      border: "1px solid",
      borderRadius: 4,
    },
  }));
  const styles = useStyles();

  return (
    // Card for event details and dialog for more info
    <div>
      <Card className={styles.root}>
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
            <Box width="100%" justifyContent="flex-start"></Box>
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
    </div>
  );
};
export default EventCard;
