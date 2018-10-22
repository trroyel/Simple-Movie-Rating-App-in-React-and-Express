import React from 'react';
import { Layout } from 'antd';
import Headers from './Headers/Headers';
import Contents from './Contents/Contents';
import SideBar from './SideBar/SideBar';

const layouts = (props) => (
    <Layout>
        <Headers />
        <Layout>
            <SideBar />
            <Contents movieContent={props.movieContent}/>
        </Layout>
    </Layout>);

export default layouts;