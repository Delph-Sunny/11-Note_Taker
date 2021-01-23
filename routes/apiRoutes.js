const db = require("../db/db.json");
const fs = require("fs");
var path = require("path");

module.exports = function (app) {
  // API GET Requests
  let objectsList = JSON.parse(fs.readFileSync("./db/db.json", "utf8", (err) => {
    if (err) throw err;
  }));

  app.get("/api/notes", function (req, res) {
    console.log("List of the objects in API:", objectsList); // FOR TESTING
    return res.json(objectsList)
  })



  // API POST Requests
  app.post("/api/notes", function (req, res) {
    let newNote = req.body;
    newNote.id = objectsList.length.toString(); // convert to string and add to note
    console.log(newNote);    // FOR TESTING 
    console.log(objectsList);    // FOR TESTING 
    var savedNote = objectsList.push(newNote);
    console.log(savedNote);    // FOR TESTING

    fs.writeFile("./db/db.json", JSON.stringify(savedNote), "utf8", (err) => {
      if (err) throw err;
    });
    res.json(savedNote);
  });

  // API DELETE Requests  
  app.delete("/api/notes/:id", function (req, res) {
    var deleteId = JSON.parse(req.params.id);

    // console.log(objectsList)

    res.end("Deleted!");
  });
};
