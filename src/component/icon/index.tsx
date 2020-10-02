import React, { FC , useState}  from 'react'

//定义一个接口
interface IconProps {
    name: string,
    size ?: number
}

const  ICON: FC <IconProps>  = (props) => {
    const { name, size } = props;
    return (
        <i className={`iconfont ${name}`} style={{ fontSize:`${size}px`}}></i>
    )
}
export default ICON;
     

