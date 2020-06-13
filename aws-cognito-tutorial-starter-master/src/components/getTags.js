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
    tag5: "",
    photos: [],
    message: "Enter tags and submit to display images"
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
      console.log(response.data)

      var responseArray = response.data;

      this.setState({ photos: responseArray })
      // responseArray.map((x) => {
      //   console.log("X is"+x)
      //   return(<img src={x} />)
      // });

      //Resetting the fields
      var message = "Displaying images for: ";
      if (this.state.tag1 != null) {
        message = message + this.state.tag1 +" "
      }
      if (this.state.tag2 != null) {
        message = message + this.state.tag2 +" "
      }
      if (this.state.tag3 != null) {
        message = message + this.state.tag3 +" "
      }
      if (this.state.tag4 != null) {
        message = message + this.state.tag4 +" "
      }
      if (this.state.tag5 != null) {
        message = message + this.state.tag5 +" "
      }
      this.setState({ message: message })
      this.setTag1("")
      this.setTag2("")
      this.setTag3("")
      this.setTag4("")
      this.setTag5("")

    });


  }

  //Setting the state of tag1
  setTag1(tag) {
    return this.setState({ tag1: tag })
  }

  //Setting the state of tag2
  setTag2(tag) {
    return this.setState({ tag2: tag })
  }

  //Setting the state of tag3
  setTag3(tag) {
    return this.setState({ tag3: tag })
  }

  //Setting the state of tag4
  setTag4(tag) {
    return this.setState({ tag4: tag })
  }

  //Setting the state of tag5
  setTag5(tag) {
    return this.setState({ tag5: tag })
  }

  // displayPhotos(){
  //   return React.createElement(() => <p>This is where the images will be displayed</p>);
  // }

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
                        <label> Tag 1</label>
                        <input
                          className="input is-medium"
                          type="text"
                          placeholder="Enter tag1"
                          value={this.state.tag1}
                          onChange={(e) => this.setTag1(e.target.value)}
                        />
                      </div>
                      <div className="control">
                        <label> Tag 2</label>
                        <input
                          className="input is-medium"
                          type="text"
                          placeholder="Enter tag2"
                          value={this.state.tag2}
                          onChange={(e) => this.setTag2(e.target.value)}
                        />
                      </div>
                      <div className="control">
                        <label> Tag 3</label>
                        <input
                          className="input is-medium"
                          type="text"
                          placeholder="Enter tag3"
                          value={this.state.tag3}
                          onChange={(e) => this.setTag3(e.target.value)}
                        />
                      </div>
                      <div className="control">
                        <label> Tag 4</label>
                        <input
                          className="input is-medium"
                          type="text"
                          placeholder="Enter tag4"
                          value={this.state.tag4}
                          onChange={(e) => this.setTag4(e.target.value)}
                        />
                      </div>
                      <div className="control">
                        <label> Tag 5</label>
                        <input
                          className="input is-medium"
                          type="text"
                          placeholder="Enter tag5"
                          value={this.state.tag5}
                          onChange={(e) => this.setTag5(e.target.value)}
                        />
                      </div>
                      {/* <div className="control">
                        <button type="submit" className="button is-light is-medium">
                          Add tags
                      </button>
                      </div> */}
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


          <input type="submit" value="Get Images" class="button is-dark" onClick={this.getImagesFromTags.bind(this)} style={{ marginTop: "2em", marginLeft: "4em" }} />

          <div>
            <h1 style={{ margin: "2em" }}>{this.state.message}</h1>

            {

              this.state.photos.map((item, i) => {

                return <img src={this.state.photos[i]} style={{ height: "300px", width: "auto", margin: "2em" }} />
              })
            }

          </div>
          {/* {this.displayPhotos.bind(this)} */}
        </section>

      </Fragment>
    )
  }
}
