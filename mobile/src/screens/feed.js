import React from 'react';

// Импортируем NoteFeed
import NoteFeed from '../components/NoteFeed';

const Feed = props => {
    return <NoteFeed />;
};
Feed.navigationOptions = {
    title: 'Feed'
};
export default Feed;
