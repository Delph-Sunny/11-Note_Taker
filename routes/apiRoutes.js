const db = require("../db/db.json");
const fs = require("fs");
var path = require("path");

module.exports = function (app) {
  // API GET Requests
  let objectsList = JSON.parse(fs.readFileSync("./db/db.json", "utf8", (err) => {
    if (err) throw err;
  }));

  app.get("/api/notes", function (req, res) {

    return res.json(objectsList)
  })



  // API POST Requests
  app.post("/api/notes", function (req, res) {
    let newNote = { title: req.body.title, text: req.body.text };
    newNote.id = objectsList.length.toString(); // convert to string and add to note

    //  console.log("my new object:", newNote);    // FOR TESTING    
    //  console.log("List of the objects in API:", objectsList); // FOR TESTING 

    objectsList.push(newNote);
    //  console.log("List of old with new objects:", objectsList);    // FOR TESTING

    fs.writeFile("./db/db.json", JSON.stringify(objectsList), (err) => {
      if (err) throw err;
    });
    res.json(objectsList);
  });

  // API DELETE Requests  
  app.delete("/api/notes/:id", function (req, res) {
    var idSelected = JSON.parse(req.params.id);
    console.log(idSelected)

   objectsList = objectsList.filter((e)=>{
      console.log(e.id);    // FOR TESTING
      return e.id != idSelected;
    });
    console.log("List of the objects in API:", objectsList);    // FOR TESTING

    // TO DO: reassign object.id to array index of objectsList

    fs.writeFile("./db/db.json", JSON.stringify(objectsList), (err) => {
      if (err) throw err;
    });
    res.end(); // Shorten the response
  });

// MAYBE For future:
/* API PUT Requests 
app.put("/api/notes/:id", function (req, res) {
  var idSelected = JSON.parse(req.params.id);
*/

};
