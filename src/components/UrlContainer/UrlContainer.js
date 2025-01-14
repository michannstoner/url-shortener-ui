import React from 'react';
import './UrlContainer.css';
import UrlCard from '../UrlCard/UrlCard'

const UrlContainer = props => {
  const urlEls = props.urls.map((url, i) => {
    return (
      <UrlCard 
        key={i}
        title={url.title}
        short_url={url.short_url}
        long_url={url.long_url}
      />
    )
  });

  return (
    <section>
      { urlEls.length ? urlEls : <p>No urls yet! Find some to shorten!</p>}
    </section>
  )
}

export default UrlContainer;
