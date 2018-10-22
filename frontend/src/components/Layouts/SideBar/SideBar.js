import React from 'react';
import { Layout, Menu, Checkbox } from 'antd';
import MenuItems from './MenuItems';

const { Sider } = Layout;

const sideBars = (props) => {
    
    //store props data to different constant
    const { genre, category, writer, director } = props;

    return (
        <Sider width={200} style={{ background: '#fff' }}>
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}>

                <MenuItems ikey="content" itemData={category} itype="camera" >
                    Contents
                </MenuItems>

                <MenuItems ikey="genre" itemData={genre} itype="project" >
                    Genres
                </MenuItems>

                <MenuItems ikey="writer" itemData={writer} itype="diff" >
                    Writers
                </MenuItems>

                <MenuItems ikey="director" itemData={director} itype="video-camera" >
                    Directors
                </MenuItems>

            </Menu>

        </Sider>
    );
}

export default sideBars;