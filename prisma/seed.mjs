// import shoes from "./shoes";
import shoes from "./shoes.js";
// const fs = require('fs')
import fs from 'fs'

const createJson = (jsonContent, type) => {
    fs.writeFile(`${type}.json`, jsonContent, 'utf8', function (err) {
          if (err) {
              console.log("An error occured while writing JSON Object to File.");
              return console.log(err);
          }
       
          console.log("JSON file has been saved.");
      });
  }

// let newShoes = shoes.map((shoe) =>{
//     return [shoe]
// })
  createJson(JSON.stringify(shoes), 'shoes')
// console.log(newShoes)
