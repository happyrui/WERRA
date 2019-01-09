import React, { PureComponent } from 'react';
import Sky from 'react-sky';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Layout, Spin } from 'antd';
import { getImage } from './action';

@connect(
    state => state,
    {
        getImage
    }
)

class OneGame extends PureComponent {
    static propTypes = {
        getImage: PropTypes.func.isRequired,
        oneGameReducer: PropTypes.shape({
            images: PropTypes.object.isRequired
        }).isRequired
    };
    constructor(props){
        super(props);
        this.state = {
            loading: false
        }
    }
    componentDidMount(){
        this.setState({ loading: true });
        this.props.getImage({},() => {
            this.setState({ loading: false });
        });
    }
    render(){
        const { images } = this.props.oneGameReducer;
        return (
            // 在屏幕范围（viewport）时该元素的位置并不受到定位影响（设置是top、left等属性无效），
            // 当该元素的位置将要移出偏移范围时，定位又会变成fixed，根据设置的left、top等属性成固定位置的效果。
            <div>
                <Spin spinning={this.state.loading} >
                    ''
                </Spin>
                <Sky
                        images={images}
                        how={140} /* Pass the number of images Sky will render chosing randomly */
                        time={40} /* time of animation */
                        size={'100px'} /* size of the rendered images */
                        background={'palettedvioletred'} /* color of background */
                />
            </div>
        )
    }
}

export default OneGame;