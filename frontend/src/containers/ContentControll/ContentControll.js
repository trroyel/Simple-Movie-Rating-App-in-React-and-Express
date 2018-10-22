import React, { Component } from 'react';
import Layouts from '../../components/Layouts/Layouts';
import axios from 'axios';
import { Icon } from 'antd';

import './ContentControll.css';

class ContentControll extends Component {

    state = {
        categories: [],
        contents: [],
        writers: [],
        directors: [],
        genres: [],
        error: false
    };

    componentDidMount() {
        axios.all([
            axios.get('/api/categories/'),
            axios.get('/api/search/'),
            axios.get('/api/writers/'),
            axios.get('/api/directors/'),
            axios.get('/api/genres/')
        ])
            .then(axios.spread((category, content, writer, director, genre) => {
                this.setState({
                    categories: category.data,
                    contents: content.data,
                    writers: writer.data,
                    directors: director.data,
                    genres: genre.data
                });
                console.log('\n\n==> Category: ' + this.state.categories);
                console.log('\n\n==> content: ' + this.state.contents);
                console.log('\n\n==> writer: ' + this.state.writers);
                console.log('\n\n==> director: ' + this.state.directors);
                console.log('\n\n==> genre: ' + this.state.genres);

            }))
            .catch(err => {
                this.setState({ error: true });
                console.log(err.message);
            });
    }

    render() {

        let Content = (
            <p className="center">
                <span><Icon type="loading" className="spin-icon" /></span>
            </p>
        );

        if (this.state.error) {
            Content = <p className="center">Error_Occured..</p>
        }

        if (this.state.contents.length > 0 && this.state.categories.length > 0 &&
            this.state.writers.length > 0 && this.state.directors.length > 0 && !this.state.error) {

            Content = <Layouts
                contentData={this.state.contents}
                category={this.state.categories}
                writer={this.state.writers}
                director={this.state.directors}
                genre={this.state.genres}
            />
        }

        return (
            <div className="App">
                {Content}
            </div>
        );
    }
}

export default ContentControll;