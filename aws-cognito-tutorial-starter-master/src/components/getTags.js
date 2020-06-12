import React, { Component, Fragment } from 'react';
import Product from './Product';
import axios from "axios";
const config = require('../config.json');

export default class getTags extends Component {

  state = {
    newproduct: { 
      "productname": "", 
      "id": ""
    },
    images: []
  }

  handleAddProduct = async (id, event) => {
    event.preventDefault();
    // add call to AWS API Gateway add product endpoint here
    try {
      const params = {
        "id": id,
        "productname": this.state.newproduct.productname
      };
      await axios.post(`${config.api.invokeUrl}/images/${id}`, params);
      this.setState({ images: [...this.state.images, this.state.newproduct] });
      this.setState({ newproduct: { "productname": "", "id": "" }});
    }catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }

  handleUpdateProduct = async (id, name) => {
    // add call to AWS API Gateway update product endpoint here

    try {
      const params = {
        "id": id,
        "productname": name
      };
      await axios.patch(`${config.api.invokeUrl}/images/${id}`, params);
      const productToUpdate = [...this.state.images].find(product => product.id === id);
      const updatedimages = [...this.state.images].filter(product => product.id !== id);
      productToUpdate.productname = name;
      updatedimages.push(productToUpdate);
      this.setState({images: updatedimages});
    }catch (err) {
      console.log(`Error updating product: ${err}`);
    }
  }

  handleDeleteProduct = async (id, event) => {
    event.preventDefault();
    // add call to AWS API Gateway delete product endpoint here

    try {
      await axios.delete(`${config.api.invokeUrl}/images/${id}`);
      const updatedimages = [...this.state.images].filter(product => product.id !== id);
      this.setState({images: updatedimages});
    }catch (err) {
      console.log(`Unable to delete product: ${err}`);
    }
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

  onAddProductNameChange = event => this.setState({ newproduct: { ...this.state.newproduct, "productname": event.target.value } });
  onAddProductIdChange = event => this.setState({ newproduct: { ...this.state.newproduct, "id": event.target.value } });

  componentDidMount = () => {
    this.fetchimages();
  }

  render() {
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <h1>Get Tags</h1>
            <p className="subtitle is-5">Add tags you want to find below:</p>
            <br />
            <div className="columns">
              <div className="column is-one-third">
                <form onSubmit={event => this.handleAddProduct(this.state.newproduct.id, event)}>
                  <div className="field has-addons">
                    <div className="control">
                      <input 
                        className="input is-medium"
                        type="text" 
                        placeholder="Enter tag1"
                        value={this.state.newproduct.productname}
                        onChange={this.onAddProductNameChange}
                      />
                    </div>
                    <div className="control">
                      <input 
                        className="input is-medium"
                        type="text" 
                        placeholder="Enter tag2"
                        value={this.state.newproduct.id}
                        onChange={this.onAddProductIdChange}
                      />
                    </div>
                    <div className="control">
                      <button type="submit" className="button is-light is-medium">
                        Add tags
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="column is-two-thirds">
                <div className="tile is-ancestor">
                  <div className="tile is-4 is-parent  is-vertical">
                    { 
                      this.state.images.map((product, index) => 
                        <Product 
                          isAdmin={true}
                          handleUpdateProduct={this.handleUpdateProduct}
                          handleDeleteProduct={this.handleDeleteProduct} 
                          name={product.productname} 
                          id={product.id}
                          key={product.id}
                        />)
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    )
  }
}
