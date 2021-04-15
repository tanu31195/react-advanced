import React, {useContext} from 'react';
import UserContext from "./userContext";
import CartContext from "./cartContext";

function MovieRow() {
    const userContext = useContext(UserContext);
    const cartContext = useContext(CartContext);
    console.log(userContext);
    console.log(cartContext);
    return (
        <div> Movie Row {userContext.currentUser ? userContext.currentUser.name : ""} </div>
    );
}

export default MovieRow;
