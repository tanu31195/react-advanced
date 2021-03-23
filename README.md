# React Advanced Concepts

## Higher Order Components <https://reactjs.org/docs/higher-order-components.html>

Used to reuse logic across components(sharing logic)

For example tooltip functionality  
In the component we need to have a state boolean value such as show tooltip  
Next handle mouse events, use event handlers to change state  
Also we need to conditionally render according to the flag  

So we create a new function and pass a component as an argument,  
and the function returns a wrapped component with the logic for showing tooltip  
HOC can return a class or function component

HOC functions are prefixed using `with`
