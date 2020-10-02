import React, { FC , useState}  from 'react'
import 'antd/dist/antd.css';
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
//定义一个接口
interface UploadProps {
    name: string,
    action: string,
    headers:{ token: string},
    onChange: (info:any)=> void
    btnText?: string,
    method ?: any ,
    data : {
      title: string,
    }
}

const  UploadFile: FC <UploadProps>  = (props) => {
    return (
     <Upload {...props}>
        <Button icon={<UploadOutlined />}>{props.btnText}</Button>
      </Upload>
    )
}
export default UploadFile;