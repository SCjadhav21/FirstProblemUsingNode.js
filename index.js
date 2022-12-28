const http = require("http");
const fs = require("fs");
const cowsayjs = require("cowsayjs");
const dns = require("node:dns");
const argv = process.argv.slice(2);

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.setHeader("Content-type", "text/html");
    res.end(" <h1>WELCOME TO EMPLOYEE MANAGEMENT SYSTEM</h1>");
  } else if (req.url === "/address") {
    if (argv[0] === undefined) {
      console.log("Please specify a valid example");
    } else {
      dns.lookup(argv[0], (err, address) => {
        if (err) {
          console.log(err);
          console.log("Please specify a valid example");
        } else {
          console.log(address);
          res.setHeader("Content-type", "text/html");
          res.end(`<h1>The IP Address is '${address}'</h1>`);
        }
      });
    }
  } else if (req.url === "/writeinfile") {
    fs.writeFile("./employee.txt", "Employee names are as follows:", (err) => {
      if (err) {
        console.log(err);
      } else {
        res.setHeader("Content-type", "text/html");
        res.end(" <h1>Data has been written in the file</h1>");
      }
    });
  } else if (req.url === "/delete") {
    fs.unlink("./employee.txt", (err) => {
      if (err) {
        console.log(err);
      } else {
        res.setHeader("Content-type", "text/html");
        res.end(" <h1>File has been deleted</h1>");
      }
    });
  } else if (req.url === "/alldetails") {
    fs.readFile("./employee.txt", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.end(cowsayjs.moo(`${data}`));
      }
    });
  } else if (req.url === "/enternames") {
    let data = ["Aman", "Albert", "Varun", "Rajat", "Nrupul"];
    data.map((el) => {
      fs.appendFile("./employee.txt", `\n${el}`, (err) => {
        if (err) {
          console.log(err);
        } else {
          res.setHeader("Content-type", "text/html");
          res.end(" <h1>All the names added in the file</h1>");
        }
      });
    });
  } else {
    res.end(" <h1>Invalid End Point</h1>");
  }
});

server.listen(4500, () => {
  console.log("listening on port 4500...");
});
