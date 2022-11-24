const fs = require('fs');
const request = require('request');


// command line arguments
const arguments = process.argv.slice(2);
const arg1 = arguments[0];
const arg2 = arguments[1];


// downloads body of a webpage and writes it to a file in the local filesystem, returning a confirmation message with a byte count
const pageDownloader = (arg1, arg2) => {

  // downloads page
  request(arg1, (error, response, body) => {

    // edge case: if url is invalid
    if (error) {
      console.log("Error message: Unable to download. Please verify URL.");
      process.exit();
    }

    // writes file to file path
    fs.writeFile(arg2, body, error => {

      // edge case: if file path is invalid 
      if (error) {
        console.log("Error message: Unable to write file.");
        process.exit();
      }

      const byteCount = body.length;
      console.log(`Downloaded and saved ${byteCount} bytes to ${arg2}`);
    });

  });

};


pageDownloader(arg1, arg2);