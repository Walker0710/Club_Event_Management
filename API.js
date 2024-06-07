import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

//Events API
// In-memory data store
let events = [
  {
    id: 1,
    name: "Milan",
    venue:
      "OAT",
    time: "1 Jan", 
  },
  {
    id: 2,
    name: "E-Submmit",
    venue:
      "Auditoriam",
    time: "2 Jan", 
  },
  {
    id: 3,
    name: "Ted",
    venue:
      "RCC",
    time: "3 Jan", 
  },
];

let lastEventId = 3;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//GET All events 
app.get("/events", (req, res) => {
  console.log(events);
  res.json(events);
});

//GET a specific post by id
// app.get("/posts/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const foundPost = posts.find((joke) => joke.id === id);
//   if (!foundPost) return res.status(404).json({ message: "Post not found" });
//   res.json(foundPost);
// });

//POST a new event
app.post("/addevent", (req, res) => {
  const newId = lastEventId += 1;
  const event = {
    id: newId,
    name: req.body.name,
    venue: req.body.venue,
    time: req.body.time,
  };
  lastEventId = newId;
  events.push(event);
  res.status(201).json(event);
});

//PATCH a post when you just want to update one parameter
// app.patch("/posts/:id", (req, res) => {
//   const post = posts.find((p) => p.id === parseInt(req.params.id));
//   if (!post) return res.status(404).json({ message: "Post not found" });

//   if (req.body.title) post.title = req.body.title;
//   if (req.body.content) post.content = req.body.content;
//   if (req.body.author) post.author = req.body.author;

//   res.json(post);
// });

//DELETE a specific event by providing the post id.
app.delete("/posts/:id", (req, res) => {
  const index = events.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "event not found" });

  posts.splice(index, 1);
  res.json({ message: "event deleted" });
});




//Notification API
// In-memory data store
let notifications = [
  {
    id: 1,
    content: "Elan theme revele at 2 jan",
    sendTime: "10 am 1 jan 2024", 
  },
  {
    id: 1,
    content: "Opening ceramony of Milan at 4 Jan 2024",
    sendTime: "2 am 3 jan 2024", 
  },
  {
    id: 1,
    content: "Cricket match of Charakha Vs Kalam at 5 Jan 2024",
    sendTime: "2 am 3 jan 2024", 
  },
];

let lastNotifyId = 3;

//GET All events
app.get("/notifications", (req, res) => {
  console.log(events);
  res.json(notifications);
});

//POST a new notification
app.post("/sendnotification", (req, res) => {
  const newId = lastNotifyId += 1;
  const noti = {
    id: newId,
    content: req.body.content,
    sendTime: req.body.sendTime,
  };
  lastEventId = newId;
  notifications.push(noti);
  res.status(201).json(noti);
});

app.delete("/posts/:id", (req, res) => {
  const index = events.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "event not found" });

  posts.splice(index, 1);
  res.json({ message: "event deleted" });
});



app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});