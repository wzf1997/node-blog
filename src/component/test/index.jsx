import React, { Component, forwardRef } from 'react'

class Test extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }
    render() {
        return (
            <div>
                <input type="text" ref={this.props.forwordRef} value={this.props.item} focus={true} />
                <div>我是测试的</div>
            </div>
        );
    }
}
//class 组件 必须要这么处理  必须使用forwardRef 创建的组件 才有第二个参数 ref
export default forwardRef((props, ref) => {
    return (
        <Test forwordRef={ref} {...props} />
    )
});