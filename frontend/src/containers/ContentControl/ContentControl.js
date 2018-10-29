import React, { Component } from 'react';
import Headers from '../../components/Headers/Headers';
import Contents from '../../components/Contents/Contents';
import SideBar from '../../components/SideBar/SideBar';
import axios from 'axios';
import { Layout, Spin, Alert } from 'antd';

import './ContentControl.css';

class ContentControll extends Component {

    state = {
        categories: [],
        contents: [],
        writers: [],
        directors: [],
        genres: [],
        actors: [],
        isLoading: false,
        error: false
    };

    componentDidMount() {
        this.setState({ isLoading: true });
        axios.all([
            axios.get('/api/categories/'),
            axios.get('/api/search/'),
            axios.get('/api/writers/'),
            axios.get('/api/directors/'),
            axios.get('/api/genres/'),
            axios.get('/api/search/actors')
        ])
            .then(axios.spread((category, content, writer, director, genre, actor) => {
                this.setState({
                    categories: category.data,
                    contents: content.data,
                    writers: writer.data,
                    directors: director.data,
                    genres: genre.data,
                    actors: actor.data,
                    isLoading: false,
                    error: false
                });
            }))
            .catch(err => {
                this.setState({ error: true, isLoading: false });
            });
    }

    contentSearchHandler = (serachTo, serachBy) => {
        this.setState({ isLoading: true });

        axios.get(`/api/search/${serachTo.toLowerCase()}/${serachBy}/`)
            .then(response => {
                const content = response.data;
                this.setState({ contents: content, isLoading: false, error: false });
            })
            .catch(err => {
                this.setState({ error: true, isLoading: false })
            })
    };

    singleContentSearchHandler = (id) => {
        alert('singleContentSearchHandler clicked! '+id);
        //this.setState({ isLoading: true });
        axios.get(`/api/contents/${id}`)
            .then(res => {
                const content = res.data;
                console.log(content);
                
                //this.setState({ contents: content, isLoading: false, error: false });
            })
            .catch(err => {
                console.log(err);
                
               // this.setState({ error: true, isLoading: false })
            })
    };

    actorSearchHandler = (actorsArray) => {

        this.setState({ isLoading: true });
        const arrupdate = `["${actorsArray.join('","')}"]`;

        axios.get(`api/search/data/content/actor?array=${arrupdate}`)
            .then(response => {
                const content = response.data;
                this.setState({ contents: content, isLoading: false, error: false });
            })
            .catch(err => {
                this.setState({ error: true, isLoading: false })
            })
    };


    getActorsObjectToArray = () => {
        const actorsData = [];
        this.state.actors.forEach(obj => {
            obj.actors.forEach(actor => actorsData.push(actor))
        });
        const uniqueActor = [...new Set(actorsData)];
        return uniqueActor;
    };

    render() {

        const { categories, contents, directors, writers, genres, isLoading, error } = this.state;
        const actorsData = this.getActorsObjectToArray();

        let content = null;

        if (isLoading) {
            content = <Spin tip="Loading..." className="center" />
        } else if (error) {
            content = <Alert
                message="404"
                description="No content found!."
                type="error" showIcon
                className="center" />
        } else {
            content = <Contents
                contentData={contents}
                handleSingleContent={this.singleContentSearchHandler} />
        }

        // content = (error)
        //     ? <p className="center">404!</p>
        //     : <Contents contentData={contents} />


        const sidebar = <SideBar
            category={categories}
            writer={writers}
            director={directors}
            genre={genres}
            actor={actorsData}
            handleContentSearch={this.contentSearchHandler}
            handleActorSearch={this.actorSearchHandler} />

        return (
            <Layout>
                <Headers />
                <Layout>
                    {sidebar}
                    {content}
                </Layout>
            </Layout>

        );
    }
}

export default ContentControll;