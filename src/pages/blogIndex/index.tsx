import React, { FC, useState } from 'react';
import './index.scss';
import { Menu, Button, Collapse, Avatar, Switch, message } from 'antd';
import {
    AppstoreOutlined,
    PieChartOutlined,
    DesktopOutlined,
    MailOutlined,
} from '@ant-design/icons';
import { study, life } from './config';
import { isEmpty, api } from '../../utils/isEmpty';
const { SubMenu } = Menu;

const App: React.FC<{}> = (props: any) => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const [color, setColor] = useState<any>('dark');
    const [checked, setChecked] = useState<boolean>(true);
    const [articles, setArticles] = useState([{ article_desc: '' }]);

    const changeMode = (value: string): void => {
        setColor(value ? 'dark' : 'light')
        setChecked(c => !c);
    }

    const clickItem = async (item: string) => {
        let res: any = await api('/article/select', { title: item }, '').catch(err => {
            console.log(err, '查看错误')
        })
        if (res && res.code == '10109') {
            message.error('登录失效了');
            props.history.push('/login')
        } else {
            setArticles(res.result);
            console.log(res, '898998')
            let content: any = document.getElementById('content')
            content.innerHTML = res.result[0].article_desc;
        }
    }

    return (
        <div className='blog'>
            <div style={{ width: 256 }} className='blog-index'>
                <div className='blog-index-first'>
                    <Switch checked={checked} />
                    <span style={{ color: 'white' }}> {checked ? '深色模式' : '浅色模式'}</span>
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
                    <Menu.Item key="30" icon={<MailOutlined />}>
                        联系我
                </Menu.Item>
                    <SubMenu key="sub1" icon={<DesktopOutlined />} title="技术学习">
                        {
                            study.map((item, index) => {
                                return <Menu.Item key={index + study.length} onClick={async () => {
                                    clickItem(item);
                                }}>{item}</Menu.Item>
                            })
                        }
                    </SubMenu>
                    <SubMenu key="sub2" icon={<AppstoreOutlined />} title="生活感悟">
                        {
                            life.map((item, index) => {
                                return <Menu.Item key={index + study.length + life.length} onClick={async (item) => {
                                    let res = await api('/article/select', { title: item }, '').catch(err => {
                                        console.log(err)
                                    })
                                    console.log(res, '888')
                                }}>{item}</Menu.Item>
                            })
                        }
                    </SubMenu>
                </Menu>
                <div className='blog-index-avatar'>
                    <Avatar src={require('../../assets/image/avatar.jpeg')} shape={'square'} size={150} />
                    <div className='title' style={{ color: "white", fontSize: '32px' }}>wzf1997</div>
                </div>
                <div className='blog-index-detail'>
                    <div onClick={() => {
                        window.location.href = 'https://github.com/wzf1997'
                    }}>
                        <Avatar src={require('../../assets/image/github.png')} />
                    </div>
                    <div onClick={() => {
                        console.log(articles)
                        // window.location.href='https://juejin.im/user/2805609406402798'
                    }}>
                        <Avatar src={require('../../assets/image/blog.png')}></Avatar>
                    </div>
                </div>
            </div>
            <div className='blog-content' >
                <div className='markdown-body' id='content'>

                </div>
            </div>
        </div>
    );
}
export default App