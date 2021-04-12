import React from 'react';
import GridListTile from '@material-ui/core/GridListTile';
import GridList from '@material-ui/core/GridList';
import Container from '@material-ui/core/Container';
import IdeaCard from '../ideaparts/IdeaCard.js';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { Button } from '@material-ui/core';

class IdeaList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        list: this.props.data,
      };

    }

    MyComponent = (props) => {
          
      if (isWidthUp('xl', this.props.width)) {
        return 2;
      }
  
      if (isWidthUp('lg', this.props.width)) {
        return 2;
      }
  
      if (isWidthUp('md', this.props.width)) {
        return 2;
      }
  
      return 1;
    };

    dynamicSort(property) {
      var sortOrder = 1;
      if(property[0] === "-") {
          sortOrder = -1;
          property = property.substr(1);
      }
      return function (a,b) {
          var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
          return result * sortOrder;
      }
  }

    //TODO minus operator toggle
    sorter = () => {this.setState( state => ({
      list: state.list.sort(this.dynamicSort("-category"))
    }));
    }

    render() {

      console.log(this.state.list);     
        /* TODO: Sort by Date, upvotes (desc, asc) */
      
        return (
            <Container maxWidth="lg">
           <Button onClick={() => {this.sorter("categories")}}>SORT</Button>
            <GridList cols={this.MyComponent()} cellHeight="320">
                {this.state.list.map((tile) => (
    <GridListTile key={tile.img} cols={tile.cols || 1} cellHeight="auto">
      <IdeaCard key={tile} data={tile}></IdeaCard>
    </GridListTile>
  ))}
            </GridList>
            </Container>
        );
    }
  }
  
  export default withWidth()(IdeaList);