import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

var userIsAuthorised = false;

function check(req, res, next) {
    const username = req.body["username"];
    const password = req.body["password"];
    if (username === "sahil08roy" && password === "sahil123") {
        userIsAuthorised = true;
    }
    next();
}

app.use(check);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/submitform", (req, res) => {
    if (userIsAuthorised) {
        // console.log(userIsAuthorised);
        res.render(__dirname + "/welcome.ejs", { name: req.body["username"] }); //__dirname +
    } else {
        res.redirect('/');
    }
});

const port = process.env.PORT || 3000;
//port
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
