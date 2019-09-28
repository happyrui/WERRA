import React from 'react';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            err: '',
            info: '',
        };
    }

    componentDidCatch(error, info) {
        this.setState({
            hasError: true,
            err: error.toString(),
            info: JSON.stringify(info)
        })
        console.log(error, info)
    }

    render() {
        const { hasError, err, info } = this.state;
        return (
            hasError ?
            <div>
                <div>出错了</div>
                <div>{err}</div>
                <div>{info}</div>
            </div> 
            : this.props.children
        )
    }
}