import React from 'react';
import { Layout, Input } from 'antd';
import './Headers.css';
const { Header } = Layout;
const Search = Input.Search;

const headers = (props) => (
    <Header className="header">
        <div className="logo" >MOVIE RATING</div>

        <Search
            placeholder="input search text"
            onSearch={value => console.log(value)}
            style={{ width: "85%" }}
        />

    </Header>
);

export default headers;