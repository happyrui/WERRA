import React, { PureComponent } from 'react';
import styles from './index.less';

export default class CssEx extends PureComponent {
    render() {
        return (
            <div>
                <div className="inlineTable">
                    这是一个listItem模型
                </div>
                <div className="box">
                    <p className="content">文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字</p>
                </div>
                <div className="boxSizing">
                    hjdsdh
                </div>
                <textarea>
                    ssd
                </textarea>
                <div className="boxImg">
                    <img src="https://demo.cssworld.cn/images/4/cover-5-1.jpg" />
                </div>
                <div className='border'></div>
                <div className="sanjiaoxing"></div>
            </div>
        )
    }
}


