import React from "react";
import GridListTile from "@material-ui/core/GridListTile";
import GridList from "@material-ui/core/GridList";
import Container from "@material-ui/core/Container";
import IdeaCard from "../ideaparts/IdeaCard.js";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import { Button } from "@material-ui/core";
import IdeaDialog from "../ideaparts/IdeaDialog.js";

class IdeaList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: this.props.data,
      user: this.props.user,
      show: false,
      dialogData: "",
      categorySort: "Ascending",
      upvotesSort: "Ascending",
    };
  }

  columnSize = (props) => {
    if (isWidthUp("md" || "lg" || "xl", this.props.width)) {
      return 2;
    }
    return 1;
  };

  dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      var result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  }

  handleShow = (data) => {
    this.setState((state) => ({
      show: true,
      dialogData: data,
    }));
  };

  // Closes the idea dialog
  handleClose = () => {
    this.setState((state) => ({
      show: false,
    }));
  };

  sorter = (param) => {
    var stateSort = param.replace("-", "") + "Sort";
    console.log("statesort");
    console.log(stateSort);
    console.log(param);
    var newSort;
    if (this.state[stateSort] === "Ascending") {
      newSort = "Descending";
    } else newSort = "Ascending";

    console.log("Ajettu sortteri");
    this.setState((state) => ({
      list: state.list.sort(this.dynamicSort(param)),
      [stateSort]: newSort,
    }));
  };

  render() {
    console.log("Lista");
    console.log(this.state.list);

    return (
      <Container maxWidth="md">
        <Button
          variant="outlined"
          onClick={() => {
            if (this.state.categorySort === "Ascending") {
              this.sorter("category");
            } else this.sorter("-category");
          }}
        >
          SORT BY CATEGORY {this.state.categorySort}
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            if (this.state.upvotesSort === "Ascending") {
              this.sorter("upvotes");
            } else this.sorter("-upvotes");
          }}
        >
          SORT BY UPVOTES {this.state.upvotesSort}
        </Button>
        <GridList
          style={{ marginTop: "0.5em" }}
          cols={this.columnSize()}
          cellHeight={420}
        >
          {this.state.list.map((tile) => (
            <GridListTile key={tile.id} cols={tile.cols || 1}>
              <div onClick={() => this.handleShow(tile)}>
                <IdeaCard key={tile} data={tile} cellH={420}></IdeaCard>
              </div>
            </GridListTile>
          ))}
        </GridList>
        <IdeaDialog
          userData={this.state.user}
          show={this.state.show}
          handleClose={this.handleClose}
          data={this.state.dialogData}
        />
      </Container>
    );
  }
}

export default withWidth()(IdeaList);
