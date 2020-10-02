type tabList = {
    [key: string]: {
        key: number,
        text: string,
        icon?: any,
    }
}

export const TAB_LIST: tabList = {
    '1': {
        key: 1,
        text: 'nav1',
        icon: 'UserOutlined'
    },
    '2': {
        key: 2,
        text: 'nav2',
        icon: 'VideoCameraOutlined'
    },
    '3': {
        key: 3,
        text: '增加文章详情',
        icon: 'UploadOutlined'
    },
    '4': {
        key: 4,
        text: '上传文件',
        icon: 'UserOutlined'
    },
};