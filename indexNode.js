const http = require("http");

const server = http.createServer((req, res) => {
  //   res.writeHead(200, {
  //     "Content-Type": "text/plain",
  //   });
  //   res.end("Hello world!");

  if (req.url === "/") {
    res.writeHead(200);
    res.write("Welcome to my webserver");
  } else if (req.url === "/unicorns") {
    res.writeHead(200);
    res.write("Our unicorns are fresh and healthy and fed organic code");
  } else {
    res.writeHead(404);
    res.write("404! These are not the unicorns you are looking for");
  }

  res.end();
  //   const unpacked = {
  //     url: req.url,
  //     method: req.method,
  //     headers: req.headers,
  //   };

  //   res.writeHead(200, { "Content-Type": "application/json" });
  //   res.end(JSON.stringify(unpacked));
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
