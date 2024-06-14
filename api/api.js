import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 6000;

//Events API
// In-memory data store
let events = [
  {
    id: 1,
    name: "Battle Of Bands",
    venue:
      "Old Mess Lawn",
    time: "9:00 - 12:00 AM, 15 Feb", 
  },
  {
    id: 2,
    name: "Group Dance",
    venue:
      "Auditoriam",
    time: "1:00 - 3:00 PM, 15 Feb", 
  },
  {
    id: 3,
    name: "Prom Night",
    venue:
      "Old Mess Lawn",
    time: "8:00 - 11:00 PM, 15 Feb", 
  },
  {
    id: 4,
    name: "Sugar Rocketry",
    venue:
      "Football Ground",
    time: "9:00 - 11:00 AM, 16 Feb", 
  },
  {
    id: 5,
    name: "Freestyle",
    venue:
      "Auditorium",
    time: "12:00 - 2:00 PM, 16 Feb", 
  },
];

let lastEventId = 5;

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
    content: "Battle Of Bands is starting in 5 min",
    sendTime: "8:55 AM 15 Feb 2024", 
  },
  {
    id: 2,
    content: "Group Dance will start at 1:30 PM",
    sendTime: "10:56 AM 15 Feb 2024", 
  },
  {
    id: 3,
    content: "Hurry up guys prom night is starting in 10 min",
    sendTime: "8:07 PM 15 Feb 2024", 
  },
  {
    id: 4,
    content: "Venue for freestyle is changed to hostel circle",
    sendTime: "11:02 PM 15 Feb 2024", 
  },
];

let lastNotifyId = 4;

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






