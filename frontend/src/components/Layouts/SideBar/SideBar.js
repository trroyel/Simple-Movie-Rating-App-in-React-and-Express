import React from 'react';
import { Layout, Menu, Icon } from 'antd';

const { SubMenu } = Menu;
const { Sider } = Layout;

const sideBars = (props) => {
    return (
        <Sider width={200} style={{ background: '#fff' }}>
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}>

                <SubMenu key="sub1" title={<span><Icon type="video-camera" />Contents</span>}>
                    <Menu.Item key="1">Movie</Menu.Item>
                    <Menu.Item key="2">Episode</Menu.Item>
                    <Menu.Item key="3">Series</Menu.Item>
                    <Menu.Item key="4">Game</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title={<span><Icon type="laptop" />Director</span>}>
                    <Menu.Item key="5">Humaun Ahmed</Menu.Item>
                    <Menu.Item key="6">James Cameron</Menu.Item>
                    <Menu.Item key="7">Srijit Mukharjee</Menu.Item>
                    <Menu.Item key="8">Toukir Ahmed</Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" title={<span><Icon type="notification" />Writer</span>}>
                    <Menu.Item key="9">Humaun Ahmed</Menu.Item>
                    <Menu.Item key="10">James Cameron</Menu.Item>
                    <Menu.Item key="11">Sirshendu Mukharjee</Menu.Item>
                    <Menu.Item key="12">Jafar Ikbal</Menu.Item>
                </SubMenu>

            </Menu>
        </Sider>
    );
}

export default sideBars;