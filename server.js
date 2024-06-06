import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 5000;
const API_URL = "http://localhost:4000";

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true }));
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(bodyParser.json());

app.get("/public/style.css", (req, res) => {
    res.sendFile(__dirname + "/public/style.css");
  });
  
app.use('/images', express.static(__dirname + '/images'));

// Route to render the main page
app.get("/", (req, res) => {
    res.render("home.ejs");
});

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

// // add a event
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
    await axios.delete(`${API_URL}/posts/${req.params.id}`);
    res.redirect("/events");
  } catch (error) {
    res.status(500).json({ message: "Error deleting post" });
  }
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
