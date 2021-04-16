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

When using network/API calls we need to use async await functions  
Function that is passed to the useEffect hook should be a regular function  
Check src/hooks/Users.jsx:7

### Custom hooks

We can use common logic into custom hooks and use it in components

## Context

Data can be passed down the component tree without prop drilling  
Providers and consumers will be used  
Redux was used before context was introduced  

### Context in Class Components

- Can have different types of context
Eg: UserContext, ThemeContext
- Pascal naming convention is used to name context

1. Create Context object using React.createContext(). This returns a context object
`const UserContext = React.createContext();`

2. Provide in a top component.  
   Wrap the element in Context.Provider component and set a value
`<UserContext.Provider value={this.state.currentUser}>`

3. Use Context.Consumer to use it 
Wrap the child component in the Context.Consumer component
This Context.Consumer expects a function as the child, so we cannot just pass an element, for example a div
So a lambda expression can be passed


    <UserContext.Consumer>
        {userContext => <div>Movie List {userContext.name}</div>}
    </UserContext.Consumer>

4. In the component tree context will be shown as Context. This is a generic name  
It is a good practice to give each context an explicit name using Context.displayName
`UserContext.displayName = 'UserContext'; `
So the above context will be shown as UserContext.Provider and UserContext.Consumer in the component tree  

When using multiple contexts we need to wrap each context around the element

#### Context outside render method

- If we want to consume a context outside the render method like inside a lifecycle hook as componentDidMount  
- Outside the render method we do not have access to the Context.Consumer component  
- Solution is to set a static property before/after creating a class  
- Static property: A property that belongs to a class not an object  
- Below is setting the contextType explicitly after creating the class  
`MovieList.contextType = UserContext;` src/context/MovieList.jsx:21  

- After setting the static property the context can be used as below

      componentDidMount() {
         console.log(this.context); //returns the current user object
      }

- The static property can be set as part of creating the class as well 
  `static contextType = UserContext;` src/context/MovieList.jsx:5

### Context in Functional Components

- Best to use functional components over class components with context
- useContext(Context) hook can be used
  `const currentUser = useContext(UserContext);` src/context/MovieRow.jsx:5
- By using the hook we can use the context value inside and outside the render component
- When using function components the Consumer component will not be in the component tree so this reduces complexity

### Updating Context

src/App.js:37
We need to pass functions to handle the change (Update the state) like passing props

### Redux

Maintains a store which contains the global state of the application  
So data can be shared across components  

