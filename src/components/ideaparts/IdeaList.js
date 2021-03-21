import React from 'react';
import List from '@material-ui/core/List';
import Container from '@material-ui/core/Container';
import IdeaCard from '../ideaparts/IdeaCard.js';


const IdeaList = () => {

    const list = [1,2,3];
    
    const listItems = list.map((item) => (
        <IdeaCard key={item} id={item}></IdeaCard>
    ));

    return (
        <Container maxWidth="md">
        <List>
            {listItems}
        </List>
        </Container>
    );
}

export default IdeaList;