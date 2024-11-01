import * as fs from 'node:fs';
import qr from "qr-image-color";
import express from "express";
import { encode } from 'node:querystring';

const port = 8080;
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res)=> {
  res.render("index.ejs");
});

app.post("/", (req, res)=> {
  var qr_img = qr.image(req.body["txt"], {type: "png", color: "black", background: "white"});
  qr_img.pipe(fs.createWriteStream("./public/images/qr_img.png"));
  res.render("index.ejs", {foundURL: "images/qr_img.png"});
});

app.listen(port, ()=> {
  console.log(`Listening on port ${port}...`);
});