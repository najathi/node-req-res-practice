const fs = require("fs");

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    // console.log("url", url);
    // console.log("method", method);

    if (url === "/") {
        res.setHeader("Content-Type", "text/html");
        res.write("<html>");
        res.write("<head><title>Assignment Page</title></head>");
        res.write("<body>");
        res.write("<h1>Assignment - 01</h1>");
        res.write('<br><br><a href="/create-users">Create Users</a>');
        res.write("</body>");
        res.write("</html>");
        res.end();
    }

    if (url === "/users" && method === "POST") {
        // method must be capital letter

        res.write("<html>");
        res.write("<head><title>users Page</title></head>");
        res.write("<body>");
        res.write("<h1>Users page</h1>");

        // get data
        const body = [];
        req.on("data", (chunk) => {
            // console.log("chunk", chunk);
            body.push(chunk);
        });

        let msg;

        req.on("end", () => {
            const parsedBody = Buffer.concat(body).toString();
            // console.log("parsedBody", parsedBody);
            // console.log('parsedBody.split("=")[1]', parsedBody.split("=")[1]);
            msg = parsedBody.split("=")[1];
            fs.writeFile("users.txt", msg, (err) => {});
        });
        res.write('<br><br><a href="/create-users">Create Users</a>');
        res.write("</body>");
        res.write("</html>");
        return res.end();
    }

    if (url === "/user") {
        res.statusCode = 302;
        res.setHeader("Location", "/users");
        return res.end();
    }

    if (url === "/create-users") {
        res.write("<html>");
        res.write("<head><title>Form page</title></head>");
        res.write("<body>");
        res.write(
            '<form action="/users" method="post"><input type="text" name="username"><button type="submit">Submit</button></form>'
        );
        res.write('<br><br><a href="/">Home</a>');
        res.write("</body>");
        res.write("</html>");
        return res.end();
    }
};

exports.handler = requestHandler;
