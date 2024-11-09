import * as fs from 'node:fs';
import express from "express";
import nodeCanvas from "canvas";
import QRCodeStyling from "qr-code-styling";
import { JSDOM } from "jsdom";

const port = 8080;
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res)=> {
  res.render("index.ejs", {foundURL: "images/blank.jpg"});
});

app.post("/", (req, res)=> {

  const options = {
    width: 300,
    height: 300,
    data: req.body["txt"],
    margin: 7,
    dotsOptions:
    { 
      type: "extra-rounded",
      gradient:
      {
        colorStops: [{ offset: 0, color: "#000" }, { offset: 1, color: "#393E46" }],
      },
      roundSize: true,
    },
    cornersSquareOptions: {
      type: "extra-rounded",
    },
    cornersDotOptions: {
      type: "dots",
      // gradient:
      // {
      //   colorStops: [{ offset: 0, color: "#fc4a1a" }, { offset: 1, color: "#f7b733" }],
      // },
    },
    backgroundOptions:
    {
      color: "#e9ebee",
    },
  }

  const qrCodeImage = new QRCodeStyling({
    jsdom: JSDOM,
    nodeCanvas,
    ...options,
    imageOptions: {
        saveAsBlob: true,
        crossOrigin: "anonymous",
        margin: 20
    },
  });

  qrCodeImage.getRawData("png").then((buffer) => {
    fs.writeFileSync("./public/images/qr_img.png", buffer);
    res.render("index.ejs", {foundURL: "images/qr_img.png"});
  });
});

app.listen(port, ()=> {
  console.log(`Listening on port ${port}...`);
});
