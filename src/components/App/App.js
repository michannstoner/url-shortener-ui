import React, { Component } from 'react';
import './App.css';
import { getUrls } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      urls: [],
      error: ''
    }
  }

  componentDidMount() {
    getUrls() 
      .then(data => this.setState( { urls: data.urls }))
      .catch(error => alert(error))
  }

  shortenUrl = urlToShorten => {
    fetch('http://localhost:3001/api/v1/urls', {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(urlToShorten)
    })
    .then(response => response.json())
    .then(url => this.setState({ urls: [...this.state.urls, url]}))
    .catch(error => alert(error))
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm shortenUrl={this.shortenUrl}/>
        </header>
        <UrlContainer urls={this.state.urls}/>
      </main>
    );
  }
}

export default App;
