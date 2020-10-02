
import React, { FC, useState, useEffect, useRef } from 'react';
import { Checkbox, Button, Input, Modal, Tabs, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import ICON from '../../component/icon';
import "./index.scss";
import { Link } from 'react-router-dom';
import { isEmpty, api } from '../../utils/isEmpty';
import Test from '../../component/test';
const { TabPane } = Tabs;

const Login: FC<{}> = (props: any) => {
    const [userText, setUserText] = useState<string>(localStorage.getItem('user') || '');
    const [userPassword, setUserPassword] = useState<string>('');
    const [isChecked, setIsChecked] = useState<boolean>(true);

    const changeCallback = (type: string, value: string): void => {
        if (type == 'user') {
            setUserText(value);
        } else {
            setUserPassword(value);
        }
    }

    const login = async () => {
        if (!isChecked) {
            localStorage.removeItem('user');
        } else {
            localStorage.setItem('user', userText);
        }
        if (isEmpty(userText) || isEmpty(userPassword)) {
            Modal.warn({
                title: '温馨提示',
                content: '用户名和密码不能为空'
            })
            return;
        }
        let res: any = await api('/user/login', { name: userText, password: userPassword }, '').catch(err => {
            Modal.error({
                title: '温馨提示',
                content: err,
            })
        });
        const { token } = res;
        if (res.success == undefined) {
            let secondsToGo = 3;
            const modal = Modal.info({
                title: '温馨提示',
                content: `您还没没有注册, ${secondsToGo}秒钟后跳往注册页`,
            })
            const timer = setInterval(() => {
                secondsToGo -= 1;
                modal.update({
                    content: `您还没没有注册, ${secondsToGo}秒钟后跳往注册页`,
                });
            }, 1000);
            setTimeout(() => {
                clearInterval(timer)
                modal.destroy();
                props.history.push('/register');
            }, 3 * 1000);
        } else if (res.success) {
            message.success('登录成功');
            localStorage.setItem('token', token);
            props.history.push(`/admin:${userText}`);
        } else {
            message.success('密码错误');
            setUserPassword('');
        }
    }

    const loginCard = () => {
        return (
            <div className='login_card'>
                <h2>FLY</h2>
                <Input
                    size={'large'}
                    placeholder="请输入用户名"
                    prefix={
                        <ICON name='icon-icon_user' size={20} />
                    }
                    value={userText}
                    onChange={(e) => {
                        changeCallback('user', e.target.value);
                    }}
                ></Input>
                <Input.Password
                    prefix={
                        <ICON name='icon-icon_lock' size={20} />
                    }
                    value={userPassword}
                    size={'large'}
                    onChange={(e) => {
                        changeCallback('password', e.target.value);
                    }}
                    placeholder="请输入密码"
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
                <Checkbox onChange={(e) => {
                    setIsChecked(e.target.checked)
                }} checked={isChecked}>记住用户名</Checkbox>
                <Button block={true} type={"primary"} size={'large'} onClick={login}>登录</Button>
                <div className='button-label'>
                    <div>
                        <Link to='/register'>
                            <span>免费注册</span>🙋
                        </Link>
                    </div>
                    <div>忘记密码</div>
                </div>
            </div>
        )

    }

    return (
        <div className='container'>
            {
                loginCard()
            }
        </div>
    )
}

export default Login