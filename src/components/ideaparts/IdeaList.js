import React from 'react';
import List from '@material-ui/core/List';
import Container from '@material-ui/core/Container';
import IdeaCard from '../ideaparts/IdeaCard.js';


const IdeaList = () => {

    return (
        <Container maxWidth="md">
        <List>
        <IdeaCard></IdeaCard>
        <IdeaCard></IdeaCard>
        </List>
        </Container>
    );
}

export default IdeaList;