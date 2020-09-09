import React, { useEffect, useState, useRef, useReducer, useCallback, useMemo } from 'react';
import { Select, Input } from 'antd';

function reducer(state, action) {
// 处理state, 含有多个子值
console.log('action', action);
const data = {...state, ...action}
console.log('data', data);
return data;

//   switch(action.type) {
//     case 'plus':
//       return { duCount: state.duCount + 1 }
//     case 'minus':
//       return { duCount: state.duCount - 1 }
//     default:
//         return;
//   }
}

function Counter() {
    const [count, setCount] = useState(0);
    const [step, setStep] = useState(0);
    const lastCount = useRef(count);
    const [ state, dispatch ] = useReducer(reducer, { duCount: 0 });

    // 记忆计算结果, 返回 一个值
    const memodata = useMemo(() => {
      return step + 'memo'
    }, [step])
  
    useEffect(() => {
    //   lastCount.current = count;
    //   document.title = `You clicked ${count} times`;
    //   console.log(`111You clicked ${count} times`);
    //   console.log(`You clicked ${lastCount.current} times`);
    //   const time = setInterval(() => setCount(c => c + 1), 3000);
      // setCount(count+1)
      setCount(c => c + step);
    //   return () => clearInterval(time);
    }, [step]);
    console.log('sdsdsds', count);

    // 记忆函数体 返回一个函数
    const getFocus = useCallback(() => {
      console.log('useCallback')
    }, [])


    // useCallback(fn, []) === useMemo(() => fn, [])
  
    return (
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
        {/* reducer */}
        <p>you choose {state.keword} now</p>
        <Select style={{ width: 200 }} onChange={(v) => dispatch({ keword: v })}>
          <Select.Option value={1}>数据一</Select.Option>
          <Select.Option value={2}>数据二</Select.Option>
        </Select>
        <Input value={step} onChange={(e) => setStep(Number(e.target.value))} />
        <div>memo值：{memodata} </div>
        {/* 更新一个状态，并且这个状态更新依赖于另一个状态的值  => useReducer */}
        {/* React会保证dispatch在组件的声明周期内保持不变。所以上面例子中不再需要重新订阅定时器 */}
        {/* 使用useCallback 优化性能 */}
        <Input value={memodata} onFocus={getFocus}/>
      </div>
    );
  }

  export default Counter;