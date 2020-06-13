import React, { Component, Fragment } from 'react';
import Product from './Product';
import axios from "axios";
const config = require('../config.json');
const initialState = {};

export default class Images extends Component {

  //base64ToUpload = "";
  state = {
    images: [],
    imageToUpload: "",
    response: "",
    message: ""
  }

  constructor(props) {
    super(props);
    this.testVarible = "this is a test";
  }

  setImages(images) {
    return this.setState({ images: images })
  }

  setImageToUpload(imagetoupload) {
    return this.setState({ imageToUpload: imagetoupload })
  }

  fetchimages = async () => {
    // add call to AWS API Gateway to fetch images here
    // then set them in state
    //export default class Images extends Component {
    this.fetchimages();
  }

  //function to encode the image file to url
  encodeImageFileAsURL() {
    var base64ToUpload = "";
    var filesSelected = document.getElementById("inputFileToLoad").files;
    if (filesSelected.length > 0) {
      var fileToLoad = filesSelected[0];

      var fileReader = new FileReader();

      fileReader.onload = function (fileLoadedEvent) {
        var srcData = fileLoadedEvent.target.result; // <--- data: base64

        var newImage = document.createElement('img');
        newImage.src = srcData;

        document.getElementById("imgTest").innerHTML = newImage.outerHTML;
        //alert("Converted Base64 version is " + document.getElementById("imgTest").getAttribute(src));
        console.log("Converted Base64 version is " + document.getElementById("imgTest").innerHTML.replace('<img src="data:image/jpeg;base64,', '').replace('">', ''));
        base64ToUpload = document.getElementById("imgTest").innerHTML.replace('<img src="data:image/jpeg;base64,', '').replace('">', '')
        this.setState({ imageToUpload: base64ToUpload })
        //this.setImageToUploadProp(base64ToUpload);
      }.bind(this)
      fileReader.readAsDataURL(fileToLoad);
      //console.log(base64ToUpload)
      console.log(this.props.auth.accesstoken)
    }


  }

  uploadToS3() {
    console.log('HI')
    var data = '{"to_upload_image": "' + this.state.imageToUpload + '"}'
    //   $.ajax({
    //     url: 'https://diq17alyd2.execute-api.us-east-1.amazonaws.com/Prod/image-upload-to-s3',
    //     method: 'POST',
    //     dataType: 'text', //You can also define this as Json
    //     data: data,
    //     success: function (response) { console.log(response); },
    //     error: function (error) { console.log(error); }
    //   });
    // }

    var options = {
      method: 'post',
      url: 'https://u3oaen5c35.execute-api.us-east-1.amazonaws.com/prod/upload-to-s3',
      data: data,
      headers: { Authorization: `Bearer ${this.props.auth.accesstoken}` },
      transformRequest: [(data, headers) => {
        // transform the data

        return data;
      }]
    };
    
    console.log(options.headers)


    axios(options).then(response => {
      console.log(response.headers)
      var message = "Upload successful!";
      console.log(response.data)
      console.log(response.data.Location);
      this.setState({ response: response.data.Location })
      this.setState({ message: message })
      this.setImages("");
      document.getElementById("imgTest").innerHTML = "";
      document.getElementById("inputFileToLoad").value = "";
      
    }).then(console.log).catch(console.log);
    

    
  

  }

  // setImageToUploadProp = (imageBase64Code) => {
  //   this.setState({ imageToUpload: imageBase64Code });
  // }

  render() {

    return (
      <Fragment>
        <section className="section">
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
          <div className="container">
          {!this.props.auth.isAuthenticated && (
              <article class="message is-danger">
                <div class="message-body">
                  Please log in to upload image.
                </div>
              </article>
          )}
          {this.props.auth.isAuthenticated && this.props.auth.user && (
            <div>
            <h1>Image Upload</h1>
            <p className="subtitle is-5">Upload images:</p>
            <br />

            <input id="inputFileToLoad" type="file" class="button is-light" onChange={this.encodeImageFileAsURL.bind(this)} />
            <div id="imgTest"></div>
            <input type="submit" value="Upload" class="button is-dark" onClick={this.uploadToS3.bind(this)} />
            <div>
            <h1 style={{color:"green"}}>{this.state.message}</h1>
            </div>
          </div>
          )}

          
          </div>

          <script type='text/javascript'>
          </script>
        </section>
      </Fragment>


    )
  }
}