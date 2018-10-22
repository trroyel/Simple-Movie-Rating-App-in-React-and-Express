import React, { Component } from 'react';
import Layouts from './components/Layouts/Layouts';
import axios from 'axios';

import './App.css';

class App extends Component {

  state = {
    contents: []
  }

  componentDidMount() {
    axios.get('/api/search/', { crossdomain: true })
      .then(response => {
        const content = response.data.slice(0, 8);

        this.setState({ contents: content });
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.message);
      });
  }

  render() {
    let content = <p className="center">Loading..</p>

    if (this.state.contents.length > 0) {
      content = <Layouts movieContent={this.state.contents} />
    }
    return (
      <div className="App">
        {content}

      </div>
    );
  }
}

export default App;