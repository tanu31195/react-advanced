# React Advanced Concepts

## Higher Order Components <https://reactjs.org/docs/higher-order-components.html>

[The Transition From Higher-Order Component Pattern To React Hooks Pattern](https://blog.openreplay.com/the-transition-from-higher-order-component-pattern-to-react-hooks-pattern/#:~:text=HOC%20helps%20to%20isolate%20logic,we%20can%20write%20custom%20hooks.)

Used to reuse logic across components(sharing logic)

For example tooltip functionality  
In the component we need to have a state boolean value such as show tooltip  
Next handle mouse events, use event handlers to change state  
Also we need to conditionally render according to the flag  

So we create a new function and pass a component as an argument,  
and the function returns a wrapped component with the logic for showing tooltip  
HOC can return a class or function component

HOC functions are prefixed using `with`

- The Higher-Order Component(HOC) Pattern is a popular React pattern to empower reusability among components.
- HOC is a function that takes a component as an argument and returns an enhanced version.
- HOC helps to isolate logic and state management in a separate class-based component.
- With React Hooks, state management can occur outside of a class.
- Hooks empower developers to use the functional programming aspects in React.
- There are standard hooks, and we can write custom hooks.
- Hooks are helpful to isolate the state and side-effects from a component and encourage reusability.
- The React developer community aggressively adopts React Hooks over Higher-Order Components for a new implementation.

### Caveats <https://legacy.reactjs.org/docs/higher-order-components.html#caveats>

- Don’t Use HOCs Inside the render Method
- Static Methods Must Be Copied Over
- Refs Aren’t Passed Through

## Controlled vs Uncontrolled components in react

Controlled components are components where the state is managed by React. In other words, the component receives its current value and callbacks to update that value through props. When the user interacts with a controlled component, it will notify the parent component and update its state through the callback. This means that the parent component has full control over the state of the controlled component.

For example if an input has `<input value= (name) onChanges {e => setName (e. target.value)) />`
Component will be controlled when setting an initial value `const [name, setName] = useState('')`. 
Component will be uncontrolled if the initial values are null or undefined `const [name, setName] = useState()`. This is also incorrect implementation and should not be done.

## Hooks(16.8) <https://reactjs.org/docs/hooks-intro.html>

Enables state and lifecycle features in functional components  
without writing a class components    
Prefix hooks with `use`  
[Rules of hooks](https://reactjs.org/docs/hooks-rules.html)

- Only Call Hooks at the Top Level. Don’t call Hooks inside loops, conditions, or nested functions
- Only Call Hooks from React Functions

### useState Hook

- Never change the state variable directly always use setState `count + 1`
- Allows to hook into react state  
- Cannot be called inside if statements or loops or nested functions  
- This is because React relies on the order which the hooks are called to manage state internally  
- React hooks must be called in the exact same order in every component render  
- State not updated immediately. setState is run asynchronously(in background) so if you want to make sure something happens after the state update only you can pass a call back function to setState or use useEffect hook.
- Multiple setState will be batched together and the state will be updated if previous state is not used only the last setState will be applied
- Pass a function to setState to get the previous state and then update state using it `setCount(prevCount => prevCount + 1)`
- When using useState() set an initial value and don't keep it null or undefined. Because it will cause the component/ input to be an uncontrolled component and then change to a controlled component/input when a value is set 
- Correct `const [name, setName] = useState('')`. Wrong `const [name, setName] = useState()`

- If we are working with arrays make sure to return a new array/object instead of modifying the existing array. Keys help to improve performance by only changing the changed object in the list.
- Do not store copies of objects. Keep only a reference by saving id in state rather than a copy of the object on list (Derived state).
- Avoid derived state(creating new state from existing state)
- Use useRef instead of useState for form inputs.

### useEffect Hook

useEffect hook will enable lifecycle methods in functional components
- componentDidMount() : Called when component is mounted for the 1st time
- componentDidUpdate() : Called when component is updated(receives new props or state changes)
- componentWillUnmount() : Called when the component is unmounted

- useEffect runs after all state changes are done

<hr>

        useEffect(() => {
        //This function will be called every time the component renders(didMount and didUpdate)
        });
<hr>

<hr>
        useEffect(() => {
        //This function will be called only when the component renders(didMount)
        }, []);
<hr>

        useEffect(() => {
        //We can give an array of dependencies
        //So this function will be called only when val1 or val2 is changed
        //Remove the array to call every time
        //Do not leave an empty array because it will not be called after the component is mounted
        }, [val1, val2]);
<hr>

        useEffect(() => {
        
        return () => {
        //By adding a return function it will act as unmount
        //Here we can write all the clean up code
        //If no dependencies are given it will be called every time
        }
        }, [val1, val2]);

<hr>

When using network/API calls we need to use async await functions  
Function that is passed to the useEffect hook should be a regular function  
Check src/hooks/Users.jsx:7

    const user = { age, name }

    useEffect ( () =› { console. log (user)
    }, [name, age])

Above is not recommended because we are using user but in array name and age is given to fix this check below

- Use AbortController in clean up(useEffect return) to abort fetch requests when the component is unmounted or re-renders fast

### useMemo Hook

This hook is used to memoize a value so that it only changes when its dependencies change. This can help optimize performance by preventing unnecessary calculations.
When dependencies change run the function and return.

    const user = useMemo ( ( ) =› {
    return { age, name }
    }, [name, age])

    useEffect ( ( ) =› { console. log (user)
    }, [user])

Same reference is used

### useTransition Hook

Allows to do non urgent updates which won't change the UI until it's done
Can use isPending state to show loaders

`const [isPending, startTransition] = useTransition()`


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

- We have the UI, Actions, and State
- From the UI actions are dispatched and are identified with the `type` property
- Then the dispatched action's specific reducers update the state. (Reducers are pure functions that take the current state and an action as input and return a new state.)
- Store maintains the state: The state of the application is stored in a single object called the store. The store is created using the createStore method and holds the current state tree of the application

#### Redux vs Redux Toolkit

Redux is a state management library for JavaScript applications, often used with React. It provides a predictable state container and a set of tools for managing application state in a more organized and efficient way.

Redux Toolkit, on the other hand, is a package that provides a set of utilities and best practices for using Redux. It includes utilities to simplify common Redux use cases, such as creating Redux stores, creating Redux slices (which are reducers and actions together), and creating asynchronous Redux logic.

In other words, Redux Toolkit is essentially a collection of tools and recommended practices for using Redux, with the goal of making it easier and faster to write Redux code.

Some of the specific features of Redux Toolkit include:

- A configureStore function that simplifies the process of creating a Redux store with middleware and other configuration options.
- A createSlice function that generates a slice of the Redux store with a reducer function and corresponding action creators.
- A set of utilities for working with asynchronous logic, including the createAsyncThunk function for creating async actions and the createEntityAdapter function for managing normalized data.

Overall, while Redux provides a lot of power and flexibility, it can also be somewhat verbose and require a lot of boilerplate code. Redux Toolkit aims to streamline and simplify the Redux development experience, making it more accessible and approachable for developers of all levels.

#### Redux Thunk

Overall, Redux-Thunk allows you to handle asynchronous operations in a way that integrates seamlessly with the Redux architecture.

Redux-Thunk is a middleware for Redux that allows you to write asynchronous logic that interacts with the Redux store. It is commonly used in React applications that use Redux for state management.

In Redux, actions are typically plain JavaScript objects that describe a change in the application state. Reducers then take those actions and update the state accordingly. However, sometimes you need to perform asynchronous operations, such as fetching data from a server or making a network request. This is where Redux-Thunk comes in.

With Redux-Thunk, you can dispatch functions (called "thunks") instead of plain objects as actions. These thunks can contain asynchronous logic and have access to the Redux store's dispatch and getState methods. When a thunk is dispatched, it can perform the asynchronous operation and then dispatch additional actions to update the state based on the result of the operation.

#### MobX and Redux

Redux is a more rigid and verbose library that provides a structured and scalable architecture while MobX is more flexible and lightweight, offering easier learning curves and improved performance.

- Architecture:
Redux follows a strict unidirectional data flow, while MobX provides a more flexible architecture that allows for bi-directional data flow. In Redux, data flows in a single direction through a centralized store, with actions dispatched to update the store and trigger UI updates. In MobX, data can flow in both directions between the store and components, making it easier to handle complex data relationships.
- Complexity:
Redux can be more complex to set up and use because it requires more boilerplate code, such as creating action types, actions, and reducers. MobX, on the other hand, is more straightforward and requires less boilerplate code.
- Performance:
MobX can be more performant than Redux because it uses a reactive programming model that automatically updates the UI when data changes. Redux, on the other hand, requires manual updates to the UI through actions and reducers.
- Learning Curve:
Redux can have a steeper learning curve than MobX, especially for developers new to functional programming and Redux's unidirectional data flow. MobX's reactive programming model, on the other hand, can be easier for developers to understand and work with.

## Improve performance in React apps

- Use the latest version of React: Always use the latest version of React as it contains performance improvements and bug fixes.
- Use Production Builds: Use the production build of React in your app to minimize the file size and optimize performance.
- Implement Code Splitting: Code splitting is a technique to break up your code into smaller chunks, which can be loaded on-demand when needed. This technique can significantly improve the initial load time of your app.
- Optimize Rendering: React renders only the necessary components when the state or props change. You can optimize rendering by using React.memo to memoize components and prevent unnecessary re-renders.
- Avoid unnecessary re-renders: Use the shouldComponentUpdate lifecycle method or React.PureComponent to prevent unnecessary re-renders of components.
- Use Virtualization: Use virtualization techniques, such as react-virtualized or react-window, to render only the visible portion of a large list or table, which can significantly improve the rendering performance.
- Optimize Images: Optimize the images used in your app by compressing and resizing them, using webp format instead of jpg or png where possible, and lazy loading them to reduce the initial page load time.
- Avoid unnecessary state changes: Avoid setting state unnecessarily, and use useCallback and useMemo hooks to optimize performance when working with state and props.
- Avoid using too many third-party libraries: Limit the number of third-party libraries used in your app to improve the app's performance.
- Measure Performance: Use tools like React DevTools, Chrome DevTools, and Lighthouse to measure your app's performance and identify areas for improvement.

### Code Splitting

- Can code split functions as below,

Dynamic imports

    <button 
    onClick=(() =› {
    import(* ../sum.js"). then (module => {
    alert(module.sum(2,2))})
    })
    >

- Can code split components by dynamic imports using `lazy()` and `<Suspense fallback={<h2>Loading...‹/h2>}></Suspense>` can set a fallback prop with a component till it loads.

   const Store = lazy (() => import(" . /components/Store")) //For default functions
   const About = lazy (() =›  import (" . /components/About"). then (module =› { return { default: module.About } })) //For named functions

- Conditional Code Splitting
- useTransition hook

### Pure components

React Pure Components are a performance optimization technique in React that reduce unnecessary re-rendering of components. They work by implementing a `shouldComponentUpdate` lifecycle method that compares the current props and state with the previous props and state, and determines if the component needs to re-render.

The `shouldComponentUpdate` method in a React Pure Component performs a shallow comparison of the props and state. Shallow comparison means that only the top-level properties of the props and state objects are compared, not their nested properties. If there are no changes in the top-level properties of the props and state objects, then the component does not need to re-render.

React Pure Components are useful when you have components that receive a lot of props or state updates, and you want to optimize performance by reducing unnecessary re-rendering. However, it's important to note that using React Pure Components is not always the best solution, especially when dealing with deeply nested objects or arrays. In those cases, a regular React Component with a custom `shouldComponentUpdate` method that performs a deep comparison may be more appropriate.

A functional component can be pure, just like a class component can be pure. In fact, React provides a `React.memo` higher-order component that can be used to memoize and optimize functional components in the same way that PureComponent optimizes class components.

`React.memo` is a higher-order component that accepts a functional component as its argument and returns a new memoized component. The memoized component will only re-render if its props have changed.

The memoized component will only re-render if its props have changed. If the props haven't changed, the memoized component will reuse the previously rendered output, which can improve the performance of your React application.

It's important to note that memoization can have a performance cost, especially when dealing with complex or deeply nested objects. Therefore, you should only use memoization when you have a component that re-renders frequently and the cost of re-rendering outweighs the cost of memoization.

## React Strict mode

- Helps highlight potential problems in a React`<React.StrictMode><App /></React.StrictMode>`
- Can wrap certain parts of the App or components
- Used only at development, when pushed to production it will work as normal
- Detects unintended side effects (Use useEffects to perform actions and not with setState)
- React has 2 phases (Render and commit)
- Detects mount/unmount side effects (Clean up use effects)
- Detects deprecated methods and other legacy usages
