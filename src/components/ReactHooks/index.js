import React, { useState, useEffect } from 'react';

 // 使用 react hooks
 /**
  *  在函数式组件中使用 state 和其他react 特性
  */

const ReactHooks = () => {
    const [count, setCount] = useState(10);
    const [aa, setAa] = useState(2);
    
    // 接收两个参数，回调函数，状态依赖数组
    // 回调函数： 在组件第一次render和之后的每次update后运行，React保证在DOM已经更新完成之后才会运行回调
    // 状态依赖数组： 当配置了状态依赖项后，只有检测到配置的状态变化时，才会调用回调函数。
    useEffect(() => {
        console.log('aaaaa');
    }, [count])
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
            Click me
            </button>
            <p>You clicked {aa} times</p>
            <button onClick={() => setAa(aa * 2)}>
            Click me
            </button>
        </div>
    );
}


export default ReactHooks;
