
import  React, { FC , useState}   from 'react';
import { Checkbox, Button, Input, Modal, Tabs, Avatar } from 'antd';
import {  EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import ICON  from '../../component/icon';
import "./index.scss";
import { Link } from 'react-router-dom';
import { isEmpty, api } from '../../utils/isEmpty';


const Register: FC <{}> = (props:any) => {
    const [userText, setUserText ] =useState  <string> ('');
    const [userPassword, setUserPassword] = useState <string> ('');
    const [valiatePassword, setValiatePassword] = useState<string>('');
    const changeCallback = (type:string, value: string ): void =>{
         if(type =='user') {
             setUserText(value);
         }else if ( type == 'password') {
             setUserPassword(value);
         }else {
             setValiatePassword(value);
         }
    }

    const register = async ()  =>{
        if(isEmpty(userText) || isEmpty(userPassword)){
             Modal.warn({
                 title:'温馨提示',
                 content:'用户名和密码不能为空'
             })
             return;
        }
        // 验证密码 
        let reg =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/
        if(!reg.test(userPassword)){
            Modal.error({
                title:'温馨提示',
                content:'请输入8-16位,并至少含有一个大写字母和小写字母'
            })
            return;
        }
        if(userPassword !== valiatePassword){
            Modal.warn({
                title:'温馨提示',
                content:'两次输入的密码不一样'
            })
            return;
        }
        let res:any = await api('/user/register',{name:userText,password:userPassword},'');
        if(res.status && res.status == 200){
            props.history.push('/admin');
        }else {
            Modal.error({
                title:'温馨提示',
                content:'注册失败'
            });
        }
    }

    const registerCard = () => {
        return (
            <div className='login_card'>
                <h2>FLY</h2>
                <Input 
                    size={'large'} 
                    placeholder="请输入用户名"  
                    prefix={
                        <ICON name='icon-icon_user' size={20} />
                    }
                    value= { userText }
                    onChange={(e)=>{
                        changeCallback('user', e.target.value);
                    }}
                ></Input>
                <Input.Password
                    prefix={
                        <ICON name='icon-icon_lock' size={20}/>
                    }
                    value = { userPassword }
                    size={'large'}
                    onChange={(e)=>{
                        changeCallback('password', e.target.value );
                    }}
                    placeholder="请输入密码"
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
                <Input.Password
                    prefix={
                        <ICON name='icon-icon_lock' size={20}/>
                    }
                    value = { valiatePassword }
                    size={'large'}
                    onChange={(e)=>{
                        changeCallback('valiatePassWord', e.target.value );
                    }}
                    placeholder="请再输入一遍密码"
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
                
                <Button block={true}  type={"primary"} size={'large'} onClick={register}>注册</Button>
                <div className='button-label'>
                    <div>
                        <Link to='/login'>
                            <span>已有账号</span>🙋 
                        </Link>
                    </div>
                    <div>
                        <Link to='/login'>
                            <span style={{color:'white'}}>立即登录</span> 
                        </Link>
                    </div>
                </div>
           </div>
        )

    }

    const introduceCard = () => {
        return (
            <div className='introduce'>
                <div className='img'>
                    <Avatar src={ require('../../assets/image/avatar.jpeg')} shape={'circle'} size={100}/>
                </div>
                <h4 className='name'>
                    Fly 
                </h4>
                <div className='job'>
                上海 - web前端开发工程师
                </div>
                <div className='note'>
                    '是金子，总会花光的；是镜子，总会反光的; 成功之前要戒色哇；永远不要跟别人比幸运，我从来没想过我比别人幸运，我也许比他们更有毅力，在最困难的时候，他们熬不住了，我可以多熬一秒钟、两秒钟.'
                </div>
            </div>
        )
    }

    return (
        <div className='container'>
            <div className='card'>
                {
                    introduceCard()
                }
                {
                    registerCard()
                }
                
            </div>
        </div>
    )
}

export default Register