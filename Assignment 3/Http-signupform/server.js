const http = require("http");
const fs = require("fs");
const path = require("path");
const PORT = 8080;

const server = http.createServer((req, res) => {
  if (req.url === "/signup" && req.method === "GET") {
    // Serve the HTML signup form
    fs.readFile("./signup.html", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        return res.end("Error loading signup form");
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  }

  else if (req.url === "/signup" && req.method === "POST") {
    let body = "";

    req.on("data", chunk => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const parsed = new URLSearchParams(body);
      const username = parsed.get("username");
      const password = parsed.get("password");

      const newUser = { username, password };

      // Read existing users
      fs.readFile("./db.json", "utf-8", (err, data) => {
        if (err) {
          return res.end("Could not read users");
        }

        let users = JSON.parse(data || "[]");
        users.push(newUser);

        // Write updated users back to file
        fs.writeFile("./db.json", JSON.stringify(users, null, 2), err => {
          if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            return res.end("Error saving user");
          }

          res.writeHead(200, { "Content-Type": "text/html" });
          res.end("<h2>Thank You for Signup...!!!</h2>");
        });
      });
    });
  }

  else if (req.url === "/allusers" && req.method === "GET") {
    fs.readFile("./db.json", "utf-8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        return res.end("Error reading user data");
      }

      const users = JSON.parse(data || "[]");
      const filteredUsers = users.map(user => ({ username: user.username }));

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(filteredUsers, null, 2));
    });
  }

  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
