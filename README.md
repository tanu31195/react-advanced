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

## Hooks(16.8) <https://reactjs.org/docs/hooks-intro.html>

Enables state and lifecycle features in functional components  
without writing a class components    
Prefix hooks with `use`  
[Rules of hooks](https://reactjs.org/docs/hooks-rules.html)

- Only Call Hooks at the Top Level. Don’t call Hooks inside loops, conditions, or nested functions
- Only Call Hooks from React Functions

### useState Hook

Allows to hook into react state  
Cannot be called inside if statements or loops or nested functions  
This is because React relies on the order which the hooks are called to manage state internally  
React hooks must be called in the exact same order in every component render  

### useEffect Hook

useEffect hook will enable lifecycle methods in functional components
- componentDidMount() : Called when component is mounted for the 1st time
- componentDidUpdate() : Called when component is updated(receives new props or state changes)
- componentWillUnmount() : Called when the component is unmounted
<hr>


        useEffect(() => {
        //This function will be called everytime the component renders(didMount and didUpdate)
        });
<hr>


        useEffect(() => {
        //We can give an array of dependencies
        //So this function will be called only when val1 or val2 is changed
        //Remove the array to call everytime
        //Do not leave an empty array beacuse it will not be called after the component is mounted
        }, [val1, val2]);
<hr>

        useEffect(() => {
        
        return () => {
        //By adding a return function it will act as unmount
        //Here we can write all the clean up code
        //If no dependencies are given it will be called everytime
        }
        }, [val1, val2]);

<hr>

### Custom hooks

We can use common logic into custom hooks and use it in components
