import React from 'react';
import GridListTile from '@material-ui/core/GridListTile';
import GridList from '@material-ui/core/GridList';
import Container from '@material-ui/core/Container';
import IdeaCard from '../ideaparts/IdeaCard.js';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';



class IdeaList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        title: "",
        body: "",
        cat: "",
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

  
  
  
    myChangeHandler = (event) => {
      let nam = event.target.name;
      let val = event.target.value;
      this.setState({[nam]: val});
    };
  
    render() {
        let ideas = this.props.data;

        /* TODO: Sort by Date, upvotes (desc, asc) */
      
        return (
            <Container maxWidth="lg">
            <GridList cols={this.MyComponent()} cellHeight="320">
                {ideas.map((tile) => (
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