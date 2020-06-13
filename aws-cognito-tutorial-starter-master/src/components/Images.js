import React, { Component, Fragment } from 'react';
import Product from './Product';
import axios from "axios";
const config = require('../config.json');

export default class Images extends Component {

  //base64ToUpload = "";
  state = {
    newproduct: null,
    images: []
    images: [],
    imageToUpload: "ABCDEFG"
  }

  constructor(props) {
    super(props);
    this.testVarible = "this is a test";
  }
  fetchimages = async () => {
    // add call to AWS API Gateway to fetch images here
    // then set them in state
@@ -26,24 +31,97 @@ export default class Images extends Component {
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
      console.log(base64ToUpload)

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
      url: 'https://diq17alyd2.execute-api.us-east-1.amazonaws.com/Prod/image-upload-to-s3',
      data: data,
      transformRequest: [(data, headers) => {
        // transform the data

        return data;
      }]
    };

    axios(options).then(response => {
      console.log(response.data)
      console.log(response.data.Location);
    });
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
            <h1>Image Upload</h1>
            <p className="subtitle is-5">Upload images:</p>
            <br />
            <input id="inputFileToLoad" type="file" onchange="encodeImageFileAsURL();" />
           <div id="imgTest"></div>

            <input id="inputFileToLoad" type="file" class="button is-light" onChange={this.encodeImageFileAsURL.bind(this)} />
            <div id="imgTest"></div>
            <input type="submit" value="Upload" class="button is-dark" onClick={this.uploadToS3.bind(this)} />
          </div>

          <script type='text/javascript'>
            //paste upload image function here
          //paste upload image function here
          </script>
        </section>
      </Fragment>


    )
  }
}