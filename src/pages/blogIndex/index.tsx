import React, { FC , useState } from 'react';
import './index.scss';
import { Menu, Button, Collapse } from 'antd';
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
    const toggleCollapsed = () => {
        setCollapsed(c=>!c);
    };
    return (
      <div style={{ width: 256 }}>
        <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16, marginTop:16 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
        </Button>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
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
      </div>
    );
}
export default App

