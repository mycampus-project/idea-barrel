import React from 'react';
import List from '@material-ui/core/List';
import Container from '@material-ui/core/Container';
import IdeaCard from '../ideaparts/IdeaCard.js';


class IdeaList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        title: "",
        body: "",
        cat: "",
      };
    }
  
  
    myChangeHandler = (event) => {
      let nam = event.target.name;
      let val = event.target.value;
      this.setState({[nam]: val});
    };
  
    render() {
        let ideas = this.props.data;

        const listItems = ideas.map((item) => (
            <IdeaCard key={item} data={item}></IdeaCard>
        ));
      
        return (
            <Container maxWidth="md">
            <List width="100%">
                {listItems}
            </List>
            </Container>
        );
    }
  }
  
  export default IdeaList;