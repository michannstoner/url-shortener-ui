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
      .catch(error => this.setState({ error: 'Something went wrong, try again later!' }))
  }

  shortenUrl = urlToShorten => {
    fetch('http://localhost:3001/api/v1/urls', {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(urlToShorten)
    })
    .then(response => response.json())
    .then(url => this.setState({ urls: [...this.state.urls, url]}))
    .catch(error => this.setState({ error: 'We\'re experiencing issues, try later!'}))
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm shortenUrl={this.shortenUrl}/>
        </header>
        {this.state.error && <h2>{this.state.error}</h2>}
        {!this.state.urls && !this.state.error && <p>No urls yet! Find some to shorten!</p>}
        <UrlContainer urls={this.state.urls}/>
      </main>
    );
  }
}

export default App;
