const http = require("http");
const fs = require("fs");


function getData(calldata) {
  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (!err) {
        calldata(JSON.parse(data));
    } else {
        calldata( "database is undefine");
    }
  });
}
const server = http.createServer((req, res) => {

  if (req.url === "/home") {
   
    res.end( "Welcome to the Home page!" );
  } else if (req.url === "/about") { 
    res.end(" Welcome to the About page!");
  } else if (req.url === "/getproductdata") {
    getData((Data) => {
      res.end(JSON.stringify({ products: Data.products }));
    });
  } else if (req.url === "/user") {
    getData((Data) => {
      res.end(JSON.stringify({ users: Data.user }));
    });
   
  } else {
    res.end("Page not found" );
  }
});

server.listen(8080,() => {
  console.log(`Server is running on http://localhost:8080`);
});



