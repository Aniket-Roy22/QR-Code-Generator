import * as fs from 'node:fs';
import inquirer from 'inquirer';
import qr from "qr-image";

inquirer
  .prompt([{
    type: "input",
    name: "acceptURL",
    message: "Enter any URL: ",
  }])
  .then((answers) => {
    fs.writeFile("URL.txt", answers.acceptURL, (err)=> {
        if(err) throw err;
        console.log("URL Accepted!");
    })

    var qr_img = qr.image(answers.acceptURL, {type: "png"});
    qr_img.pipe(fs.createWriteStream("qr_img.png"));
  })
  .catch((error) => {
    if (error.isTtyError) {
      throw error;
    } else {
      console.log("URL Accepted!");
    }
  });