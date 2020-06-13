const AWS = require('aws-sdk');
//*/ get reference to S3 client 
var s3 = new AWS.S3();
    exports.handler = (event, context, callback) => {  
     let encodedImage =JSON.parse(event.body).to_upload_image;
     let decodedImage = Buffer.from(encodedImage, 'base64');
     //var filePath = "whatever2.jpg"
     var params = {
       "Body": decodedImage,
       "Bucket": "image-tag-bucket",
       "ContentType": "image/png",
       "Key": Date.now()+".png",   
    };
    s3.upload(params, function(err, data){
       if(err) {
           callback(err, null);
       } else {
           let response = {
        "statusCode": 200,
        "headers": {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        "body": JSON.stringify(data),
        "isBase64Encoded": false
    };
           callback(null, response);
    }
    });
    
};