import React, { PureComponent } from 'react';

// interface Props {
//     render: (props: {x: number, y: number}) => any
// }

class RenderProps extends PureComponent {
    state = {x: 0, y: 0}

    handleMouseMove = (event) => {
        this.setState({
          x: event.clientX,
          y: event.clientY
        })
      }
    
    render() {
      return (
        <div onMouseMove={this.handleMouseMove}>
        {this.props.render(this.state)}
        </div>
      )
    }
}
export default RenderProps