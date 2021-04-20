import React from "react";
import GridListTile from "@material-ui/core/GridListTile";
import GridList from "@material-ui/core/GridList";
import Container from "@material-ui/core/Container";
import IdeaCard from "../ideaparts/IdeaCard.js";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import { Button } from "@material-ui/core";

class IdeaList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: this.props.data,
      categorySort: "Ascending",
      upvotesSort: "Ascending",
      dynCellHeight: 420,
    };
  }

  columnSize = (props) => {
  
    if (isWidthUp("md" ||"lg"||"xl", this.props.width)) {
      if (this.state.dynCellHeight !== 420) {
        this.setState((state) => ({
          dynCellHeight: 420
        }));
      }
      return 2;
    }
    if (this.state.dynCellHeight !== 520) {
    this.setState((state) => ({
      dynCellHeight: 520
    }));
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

  sorter = (param) => {
    var stateSort = param.replace("-", "") + "Sort";
    console.log("statesort");
    console.log(stateSort);
    console.log(param);
    var newSort;
    if (this.state[stateSort] === "Ascending") {
      newSort = "Descending";      
    }
    else newSort = "Ascending";
    
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
      <Container maxWidth="lg">
        <Button
          onClick={() => {
            if (this.state.categorySort === "Ascending") {
            this.sorter("category");
            }
            else this.sorter("-category");
          }}>
          SORT BY CATEGORY {this.state.categorySort}
        </Button>
        <Button
          onClick={() => {
            if (this.state.upvotesSort === "Ascending") {
            this.sorter("upvotes");
            }
            else this.sorter("-upvotes");
          }}>
          SORT BY UPVOTES {this.state.upvotesSort}
        </Button>
        <GridList cols={this.columnSize()} cellHeight={this.state.dynCellHeight}>
          {this.state.list.map((tile) => (
            <GridListTile key={tile.id} cols={tile.cols || 1}>
              <IdeaCard key={tile} data={tile} cellH={this.state.dynCellHeight}></IdeaCard>
            </GridListTile>
          ))}
        </GridList>
      </Container>
    );
  }
}

export default withWidth()(IdeaList);
