import React, { Component, Fragment } from 'react';
import Product from './Product';
import axios from "axios";
const config = require('../config.json');

export default class Images extends Component {

  state = {
    newproduct: null,
    images: []
  }

  fetchimages = async () => {
    // add call to AWS API Gateway to fetch images here
    // then set them in state
    try {
      const res = await axios.get(`${config.api.invokeUrl}/images`);
      const images = res.data;
      this.setState({ images: images });
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }

  componentDidMount = () => {
    this.fetchimages();
  }

  render() {
    return (
      <Fragment>
        <section className="section">
          <div className="container">
          {this.props.auth.isAuthenticated && this.props.auth.user && (
            <div>
            <h1>Image Upload</h1>
            <p className="subtitle is-5">Upload images:</p>
            <br />
            <input id="inputFileToLoad" type="file" onchange="encodeImageFileAsURL();" />
           <div id="imgTest"></div> 
           </div>
          )}
          </div>
          <script type='text/javascript'>
            //paste upload image function here
          </script>
        </section>
      </Fragment>
    
    )
  }
}
