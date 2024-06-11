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
    name: "E-Summit",
    venue:
      "Auditoriam",
    time: "2 Jan", 
  },
  {
    id: 3,
    name: "TedX",
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

app.delete("/deleteevent", (req, res) => {
  const id = parseInt(req.body.id);
  const index = events.findIndex((p) => p.id === id);
  if (index === -1) return res.status(404).json({ message: "Event not found" });

  events.splice(index, 1);
  res.json({ message: "Event deleted" });
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


app.delete("/deletenotification", (req, res) => {
  const id = parseInt(req.body.id);
  const index = notifications.findIndex((p) => p.id === id);
  if (index === -1) return res.status(404).json({ message: "event not found" });

  notifications.splice(index, 1);
  res.json({ message: "event deleted" });
});


app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});






