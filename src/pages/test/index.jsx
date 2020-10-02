import React, { Component, forwardRef } from 'react';
import Test2 from '../../component/test2';
class TestPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.test = [];
    }

    render() {
        return (
            <div onClick={() => {
                console.log(this.test)
            }}>
                我是测试页面
                {
                    [1].map(item => {
                        return (
                            <Test2 ref={this.test} item={item}></Test2>
                        )
                    })
                }
            </div>
        );
    }
}

export default TestPage;