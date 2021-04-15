import React, {Component} from 'react';
import UserContext from "./userContext";
import MovieRow from "./MovieRow";

class MovieList extends Component {
    static contextType = UserContext;

    componentDidMount() {
        console.log(this.context); //returns the current user object
    }

    render() {
        return (
            //Consumer Expects a function as a child
            <UserContext.Consumer>
                {userContext => <div>Movie List {userContext.name} <MovieRow/> </div>}
            </UserContext.Consumer>
        );
    }
}

// MovieList.contextType = UserContext;

export default MovieList;
