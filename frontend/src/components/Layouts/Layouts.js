import React from 'react';
import { Layout } from 'antd';
import Headers from './Headers/Headers';
import Contents from './Contents/Contents';
import SideBar from './SideBar/SideBar';

const layouts = (props) => (
    <Layout>
        <Headers />
        <Layout>
            <SideBar
                category={props.category}
                writer={props.writer}
                director={props.director}
                genre={props.genre}
            />

            <Contents contentData={props.contentData} />
        </Layout>
    </Layout>);

export default layouts;