import React, {useState, useEffect} from 'react';
import useDocumentTitle from "./useDocumentTitle";

function Counter() {
    const [count, setCount] = useState(0);
    const [name, setName] = useState('');

    // useEffect(() => {
    //     document.title = `${name} has clicked ${count} times!`
    //     return () => {
    //         console.log('Clean Up');
    //     }
    // }, [count,name]);

    useDocumentTitle(`${name} has clicked ${count} times!`);

    return (
        <>
            <input type="text" onChange={(value) => setName(value.target.value)}/>
            <div>
                {name} has clicked {count} times
            </div>
            <button onClick={() => setCount(count + 1)}>Increase</button>
        </>
    );
}

export default Counter;
