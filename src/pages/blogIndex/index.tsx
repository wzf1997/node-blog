import React, { FC , useState } from 'react';
import './index.scss';
import { Menu, Button, Collapse, Avatar, Switch } from 'antd';
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { study,life } from './config';
const { SubMenu } = Menu;

const App: React.FC<{}> = () => {
    const [collapsed, setCollapsed] =  useState<boolean>(false);
    const [color,setColor] = useState<string>('dark')
    const  [checked,setChecked] = useState<boolean>(true);
    const changeMode = (value: string):void=> {
        setColor(value ? 'dark' : 'light')
        setChecked(c=> !c);
    }
    return (
      <div style={{ width: 256  }} className='blog-index'>
        <div className='blog-index-first'>
            <Switch onChange={changeMode} checked={checked}/>
            <span style={{ color:'white'}}> {checked? '深色模式':'浅色模式'}</span>
        </div>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="vertical"
          theme={color}
          inlineCollapsed={collapsed}
        >
          <Menu.Item key="20" icon={<PieChartOutlined />}>
            留言板
          </Menu.Item>
          <Menu.Item key="30" icon={<MailOutlined /> }>
            联系我
          </Menu.Item>
          <SubMenu key="sub1" icon={<DesktopOutlined />} title="技术学习">
            {
                study.map((item,index) => {
                    return <Menu.Item key={index + study.length }>{item}</Menu.Item>
                })
            }
          </SubMenu>
          <SubMenu key="sub2" icon={<AppstoreOutlined />} title="生活感悟">
            {
                life.map((item,index) => {
                    return <Menu.Item key={index + study.length + life.length}>{item}</Menu.Item>
                })
            }
          </SubMenu>
        </Menu>
         <div className='blog-index-avatar'>
             <Avatar src={ require('../../assets/image/avatar.jpeg')} shape={'square'} size={150}/>
             <div className='title' style={{color: "white", fontSize:'32px'}}>wzf1997</div>
         </div>
         <Avatar src ={ require('../../assets/image/github.png')} />
      </div>
    );
}
export default App

