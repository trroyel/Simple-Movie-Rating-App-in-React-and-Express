import React from 'react';
import { Layout, Menu, Checkbox } from 'antd';
import MenuItems from './MenuItems';

const { Sider } = Layout;
const CheckboxGroup = Checkbox.Group;

const sideBars = (props) => {

    //store props data to different constant
    const { genre, category, writer, director, actor } = props;
 
    return (
        <Sider width={200} style={{ background: '#fff' }}>

            <div style={{ marginLeft: '25px', }}>
                <h3><b>Actors</b></h3>
                <CheckboxGroup options={actor} onChange={(checkedValue) => props.handleActorSearch(checkedValue)} />
            </div>


            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}>

                <MenuItems ikey="content" itemData={category} itype="camera" handleContentSearch={props.handleContentSearch} >
                    Category
                </MenuItems>

                <MenuItems ikey="genre" itemData={genre} itype="project" handleContentSearch={props.handleContentSearch}>
                    Genre
                </MenuItems>

                <MenuItems ikey="writer" itemData={writer} itype="diff" handleContentSearch={props.handleContentSearch}>
                    Writer
                </MenuItems>

                <MenuItems ikey="director" itemData={director} itype="video-camera" handleContentSearch={props.handleContentSearch}>
                    Director
                </MenuItems>

            </Menu>

        </Sider>
    );
}

export default sideBars;