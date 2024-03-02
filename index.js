import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.urlencoded({ extended: true }));

let userIsAuthorised = false;

function check(req, res, next) {
    const { username, password } = req.body;
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
        res.sendFile(__dirname + "/welcome.html");
    } else {
        res.redirect('/');
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
