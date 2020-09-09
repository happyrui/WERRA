var hook = {};
const render = () => ReactDOM.render(<App />,  document.getElementById('root'))
const isChange = (arr, hook) => (arr.some(item => item !== hook[item]))

export default function UseState(initState) {
    hook.state = initState;
    function setState(changeState) {
        hook.state = changeState
        // 重新render,挂载dom节点
        render();
    }
    return [hook[state], setState]
}

export default function UseEffet(fn, [...rely]) {
    if(isChange(rely, hook)) {
        fn();
        render();
    }
    
}

export default function UseReducer(fn, initState) {


    return [state, dispatch]
}
