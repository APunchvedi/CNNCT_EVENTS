import express from "express";
import { createEvent, getEvents, updateEvent, deleteEvent, joinEvent, respondToEvent, getUserEvents, getAllEventsAndBlockedDates } from "../controllers/eventController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create",protect, createEvent); 
router.get("/getAll",protect, getEvents); 
router.get("/getAllEvents",protect, getAllEventsAndBlockedDates );
router.post('/respond',protect, respondToEvent);
router.get('/my-events', protect, getUserEvents);
router.put("/:id", updateEvent); 
router.delete("/:id", deleteEvent);
router.post("/:id", joinEvent); 

export default router;
