import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import pg from "pg";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 5000;
const API_URL = "http://localhost:4000";

const db = new pg.Client({
  user: "Milan_owner",
  host: "ep-polished-smoke-a12sfj0v.ap-southeast-1.aws.neon.tech", 
  database: "EventRadar",
  password: "yXv7R6fGMABz",
  port: 5432,
  ssl: "true",
});

db.connect();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true }));
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(bodyParser.json());

app.get("/public/style.css", (req, res) => {
    res.sendFile(__dirname + "/public/style.css");
  });
  
app.use('/images', express.static(__dirname + '/images'));



// Route to render the login register page
app.get("/", (req, res) => {
    res.render("firstPage.ejs");
});

// Route to render the home page
app.get("/home", (req, res) => {
  res.render("home.ejs");
});

// Route to render the register page
app.get("/register", (req, res) => {
  res.render("register.ejs");
});

// Route to render the login page
app.get("/login", (req, res) => {
  res.render("login.ejs");
});


// Route to post the register data
app.post("/register", async (req, res) => {
  const {name, email, password} = req.body;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      res.redirect("/login");
    } else {
      const result = await db.query(
        "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
        [name, email, password]
      );
      console.log(result);
      res.redirect("/home");
    }
  } catch (err) {
    console.log(err);
  }
});

// Route to check the register page
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedPassword = user.password;

      if (password === storedPassword) {
        // res.sendFile(__dirname + "/views/home.html");
        res.redirect("/home")
      } else {
        res.send("Incorrect Password");
      }
    } else {
      res.redirect("/register");
    }
  } catch (err) {
    console.log(err);
  }
});



//Events

// Route to render the events page
app.get("/events", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/events`);
    console.log(response);
    res.render("events.ejs", {events : response.data });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});

// Route to render the add event page
app.get("/addevent", async (req, res) => {
  res.render("addevent.ejs");
});

// Route to render the edit event
// app.get("/newevent", (req, res) => {
//   res.render("addevent.ejs", { heading: "New Post", submit: "Create Post" });
// });

// app.get("/edit/:id", async (req, res) => {
//   try {
//     const response = await axios.get(`${API_URL}/posts/${req.params.id}`);
//     console.log(response.data);
//     res.render("modify.ejs", {
//       heading: "Edit Post",
//       submit: "Update Post",
//       post: response.data,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching post" });
//   }
// });

// add a event
app.post("/api/addevent", async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}/addevent`, req.body);
    console.log(response.data);
    res.redirect("/events");
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
});

// Partially update a post
// app.post("/api/posts/:id", async (req, res) => {
//   console.log("called");
//   try {
//     const response = await axios.patch(
//       `${API_URL}/posts/${req.params.id}`,
//       req.body
//     );
//     console.log(response.data);
//     res.redirect("/");
//   } catch (error) {
//     res.status(500).json({ message: "Error updating post" });
//   }
// });

// Delete a post
app.get("/api/events/delete/:id", async (req, res) => {
  try {
    await axios.delete(`${API_URL}/events/${req.params.id}`);
    res.redirect("/events");
  } catch (error) {
    res.status(500).json({ message: "Error deleting post" });
  }
});


//Notification
// Route to render the notifications page
app.get("/notifications", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/notifications`);
    console.log(response);
    res.render("notifications.ejs", {notifications : response.data });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});


// Route to render the send notification page
app.get("/sendnotification", async (req, res) => {
  res.render("sendnotification.ejs");
});


// add the notification
app.post("/api/sendnotification", async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}/sendnotification`, req.body);
    console.log(response.data);
    res.redirect("/notifications");
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
