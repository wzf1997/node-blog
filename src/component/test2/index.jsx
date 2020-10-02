import React, { Component, useRef, forwardRef, useImperativeHandle } from 'react';

// 学习 useImperativeHandle  函数式组件将方法或者dom节点 暴露给父组件
function Test2(props, parentRef) {
    const inputRef = useRef(null);
    const add = () => {
        console.log('我被父组件调用了啦');
    }
    useImperativeHandle(
        parentRef,
        () => ({
            foucus: inputRef.current.focus,
            add,
        }),
    )
    return (
        <div>
            输入起来
            <input type="text" ref={inputRef} />
        </div>
    )
}

export default forwardRef(Test2);