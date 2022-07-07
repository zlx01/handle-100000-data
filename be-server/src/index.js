const http = require("http");
const port = 8000;
let list = [];

for (let i = 0; i < 100000; i++) {
  list.push({
    src: "https://dummyimage.com/300",
    alt: `dummy image ${i}`,
    tid: i,
  });
}

http
  .createServer((req, res) => {
    res.writeHead(200, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify(list));
  })
  .listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
