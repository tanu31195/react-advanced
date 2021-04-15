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
import CartContext from "./context/cartContext";
import Login from "./context/Login";

class App extends Component {
    handleLoggedIn = (username) => {
        console.log(username);
        const user = {name: "Tanushka"}
        this.setState({currentUser: user});
    }

    state = {currentUser: null}

    render() {
        return (
            <CartContext.Provider value={{cart: []}}>
                <UserContext.Provider value={{currentUser: this.state.currentUser, onLoggedIn: this.handleLoggedIn}}>
                    <div>
                        <MoviePage/>
                        <Login/>
                    </div>
                </UserContext.Provider>
            </CartContext.Provider>
        );
    }
}

export default App;
