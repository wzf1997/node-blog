import React, { FC, useState, useRef } from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, message, Button, Progress } from 'antd';
import * as Icon from '@ant-design/icons';
import './index.scss';
import UploadFile from '../../component/uploadFile';
import { isEmpty, api, uploadFile } from '../../utils/isEmpty';
import { TAB_LIST } from './const';

const { Header, Content, Footer, Sider } = Layout;

const Admin: FC<{}> = (props: any) => {
	const [current, setCurrent] = useState<string | number>('4');
	const [progress, setProgress] = useState<number>(0);
	const [isUploadEnd, setIsUploadEnd] = useState<boolean>(false);
	const abort: { current: any } = useRef(null);

	const article = () => {
		return
	}
	return (
		<Layout>
			<Sider
				breakpoint="lg"
				collapsedWidth="0"
				onBreakpoint={broken => {
					console.log(broken);
				}}
				onCollapse={(collapsed, type) => {
					console.log(collapsed, type);
				}}
			>
				<div className="logo" />
				<Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} onClick={(item) => {
					const { key } = item;
					setCurrent(key);
				}}>
					{
						Object.keys(TAB_LIST).map((key: string) => {
							let value: any = TAB_LIST[key];
							const { text, icon } = value;
							// 这里我不知道 Icon 的ts 数据类型 所以直接用 重新赋值 转换下 就ok了
							let IconTotal: any = Icon;
							const component = React.createElement(IconTotal[icon])
							return <Menu.Item key={key} icon={component}>
								{text}
							</Menu.Item>
						})
					}
				</Menu>
			</Sider>
			<Layout>
				<Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
				<Content style={{ margin: '24px 16px 0' }}>
					<div className='upload'>
						<input type="file" onChange={async (e) => {
							let file: any = e.target.files;

							// 这里在做一个 去重判断 重复名字的就不忘数据里面添加了
							let aricleList = localStorage.getItem('article') || ''
							if (aricleList.split(';').includes(file[0].name)) {
								message.error('文件已经上传成功,忘记了吧！');
								return;
							}
							if (!isEmpty(file[0].name)) {
								setIsUploadEnd(false);
							}
							let formData = new FormData();
							formData.append('file', file[0]);
							let res: any = await uploadFile({
								apiName: '/upload/single',
								data: formData,
								progressCallback: (data: any) => {
									const { percent, abort: abortCallback } = data;
									setProgress(Number(percent));
									abort.current = abortCallback;

								},
								endCallback: (data: any) => {
									const { isUploadEnd } = data;
									let aricleList = localStorage.getItem('article')
									if (!aricleList) {
										localStorage.setItem('article', file[0].name);
									} else {
										aricleList += `;${file[0].name}`
										localStorage.setItem('article', aricleList);
									}
									message.success('文件上传成功');
									setIsUploadEnd(isUploadEnd);
								}

							}).catch(err => {
								message.error('文件上传失败');
							})
						}} id='file' />
						{
							!isUploadEnd && <Progress percent={progress} size="small" status='active' />
						}
						{
							!isUploadEnd && <Button danger onClick={abort.current} type='primary'>取消文件上传</Button>
						}
						{
							!isUploadEnd && <Button onClick={() => {
								console.log('断点续传');
							}} type='primary'>断点上传</Button>
						}
					</div>
				</Content>
				<Footer style={{ textAlign: 'center' }}>Blog ©2020 Created by wzf</Footer>
			</Layout>
		</Layout>
	)

}
export default Admin;