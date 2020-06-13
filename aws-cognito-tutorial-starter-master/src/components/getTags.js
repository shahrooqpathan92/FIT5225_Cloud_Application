import React, { Component, Fragment } from 'react';
import Product from './Product';
import axios from "axios";
const config = require('../config.json');

export default class GetTags extends Component {

  state = {
    tag1: "",
    tag2: "",
    tag3: "",
    tag4: "",
    tag5: ""
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

  getImagesFromTags() {
    var tag1 = this.state.tag1;
    var tag2 = this.state.tag2;
    var tag3 = this.state.tag3;
    var tag4 = this.state.tag4;
    var tag5 = this.state.tag5;
    var url = 'https://c6bzzi56dg.execute-api.us-east-1.amazonaws.com/prod/getimages?tag1=' + tag1 + '&tag2=' + tag2 + '&tag3=' + tag3 + '&tag4=' + tag4 + '&tag5=' + tag5
    console.log("url: " + url)
    var options = {
      method: 'get',
      url: url
      //data: data,
      // transformRequest: [(data, headers) => {
      //   // transform the data

      //   return data;
      // }]
    };

    axios(options).then(response => {
      console.log(response)
    });
  }

  setTag1(tag) {
    return this.setState({ tag1: tag })
  }

  setTag2(tag) {
    return this.setState({ tag2: tag })
  }
  setTag3(tag) {
    return this.setState({ tag3: tag })
  }
  setTag4(tag) {
    return this.setState({ tag4: tag })
  }
  setTag5(tag) {
    return this.setState({ tag5: tag })
  }


  componentDidMount = () => {
    this.fetchimages();
  }

  render() {
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            {!this.props.auth.isAuthenticated && (
              <div>
                <p>Please log in to search for tags</p>
              </div>
            )}
            {this.props.auth.isAuthenticated && this.props.auth.user && (
              <div>
                <h1>Get Tags</h1>
                <p className="subtitle is-5">Add tags you want to find below:</p>
                <br />
                <div className="columns">
                  <div className="column is-full">

                    <div className="field has-addons">
                      <div className="control">
                        <input
                          className="input is-medium"
                          type="text"
                          placeholder="Enter tag1"
                          value={this.state.tag1}
                          onChange={(e) => this.setTag1(e.target.value)}
                        />
                      </div>
                      <div className="control">
                        <input
                          className="input is-medium"
                          type="text"
                          placeholder="Enter tag2"
                          value={this.state.tag2}
                          onChange={(e) => this.setTag2(e.target.value)}
                        />
                      </div>
                      <div className="control">
                        <input
                          className="input is-medium"
                          type="text"
                          placeholder="Enter tag3"
                          value={this.state.tag3}
                          onChange={(e) => this.setTag3(e.target.value)}
                        />
                      </div>
                      <div className="control">
                        <input
                          className="input is-medium"
                          type="text"
                          placeholder="Enter tag4"
                          value={this.state.tag4}
                          onChange={(e) => this.setTag4(e.target.value)}
                        />
                      </div>
                      <div className="control">
                        <input
                          className="input is-medium"
                          type="text"
                          placeholder="Enter tag5"
                          value={this.state.tag5}
                          onChange={(e) => this.setTag5(e.target.value)}
                        />
                      </div>
                      <div className="control">
                        <button type="submit" className="button is-light is-medium">
                          Add tags
                      </button>
                      </div>
                    </div>

                  </div>
                  <div className="column is-two-thirds">
                    <div className="tile is-ancestor">
                      <div className="tile is-4 is-parent  is-vertical">
                        {/* { 
                      this.state.images.map((product, index) => 
                        <Product 
                          isAdmin={true}
                          handleUpdateProduct={this.handleUpdateProduct}
                          handleDeleteProduct={this.handleDeleteProduct} 
                          name={product.productname} 
                          id={product.id}
                          key={product.id}
                        />)
                    } */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>


          <input type="submit" value="Get Images" class="button is-dark" onClick={this.getImagesFromTags.bind(this)} />
        </section>
      </Fragment>
    )
  }
}
