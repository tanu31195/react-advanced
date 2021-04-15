import Movie from "./hoc/Movie";
import Counter from "./hooks/Counter";
import Users from "./hooks/Users";
// import MoviePage from "./context/MoviePage";
//
// function App() {
//     return (
//         <div>
//             {/*<Movie id={1}/>*/}
//             {/*<Counter />*/}
//             {/*<Users />*/}
//             <MoviePage />
//         </div>
//     );
// }
//
// export default App;

import React, {Component} from 'react';
import MoviePage from "./context/MoviePage";
import UserContext from "./context/userContext";

class App extends Component {
    state = {currentUser: {name: 'Tanushka'}}

    render() {
        return (
            <UserContext.Provider value={this.state.currentUser}>
                <div>
                    <MoviePage/>
                </div>
            </UserContext.Provider>
        );
    }
}

export default App;
