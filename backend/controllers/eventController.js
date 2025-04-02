import Event from "../models/Events.js";
import { parse, format } from "date-fns";
import bcrypt from "bcryptjs";
// Check if event conflicts with existing events
const checkEventConflict = async (userId, date, timeStart, timeEnd) => {
  const existingEvent = await Event.findOne({
    user: userId,
    date: new Date(date),
    $or: [
      { timeStart: { $lte: timeEnd }, timeEnd: { $gte: timeStart } }, // Overlapping time check
    ],
  });

  return existingEvent ? true : false;
};

// export const createEvent = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     let {
//       eventTopic,
//       description,
//       date,
//       timeStart,
//       timeEnd,
//       hostName,
//       password,
//       link,
//       bannerImage,
//       backgroundColor,
//     } = req.body;

//     // Parse date from dd/MM/yyyy to ISO format
//     const parsedDate = parse(date, "dd/MM/yyyy", new Date());
//     if (isNaN(parsedDate)) {
//       return res.status(400).json({ error: "Invalid date format." });
//     }
//     date = format(parsedDate, "yyyy-MM-dd");

//     // Check for time conflicts (assuming checkEventConflict handles date as ISO)
//     const conflict = await checkEventConflict(userId, date, timeStart, timeEnd);
//     if (conflict)
//       return res
//         .status(400)
//         .json({ error: "An event is already scheduled for this time slot." });

//     const event = new Event({
//       participants: [{ user: userId, status: 'accepted' }],
//       eventTopic,
//       description,
//       date,
//       timeStart,
//       timeEnd,
//       hostName,
//       password,
//       link,
//       bannerImage,
//       backgroundColor,

//     });

//     await event.save();
//     res.status(201).json(event);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// Get all events of a user

export const createEvent = async (req, res) => {
  try {
    const userId = req.user.id;
    let {
      eventTopic,
      description,
      date,
      timeStart,
      timeEnd,
      hostName,
      password,
      link,
      bannerImage,
      backgroundColor,
    } = req.body;

    // Parse date from dd/MM/yyyy to ISO format
    const parsedDate = parse(date, "dd/MM/yyyy", new Date());
    if (isNaN(parsedDate)) {
      return res.status(400).json({ error: "Invalid date format." });
    }
    date = format(parsedDate, "yyyy-MM-dd");

    // Check for time conflicts (assuming checkEventConflict handles date as ISO)
    const conflict = await checkEventConflict(userId, date, timeStart, timeEnd);
    if (conflict)
      return res
        .status(400)
        .json({ error: "An event is already scheduled for this time slot." });

    const event = new Event({
      user: userId,
      eventTopic,
      description,
      date,
      timeStart,
      timeEnd,
      hostName,
      password,
      link,
      bannerImage,
      backgroundColor,
    });

    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEvents = async (req, res) => {
  try {
    const userId = req.user.id;
    const events = await Event.find({ user: userId });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllEventsAndBlockedDates = async (req, res) => {
  try {
    // Extract user ID from JWT (assuming middleware sets req.user)
    const userId = req.user.id;

    // Fetch events based on user ID
    const events = await Event.find(
      { user: userId },
      "eventTopic date backgroundColor timeEnd timeStart"
    ).lean();

    // Map events to format { date: 'YYYY-MM-DD', title: 'Event Title' }
    const blockedDates = events.map((event) => ({
      date: event.date.toISOString().split("T")[0], // Convert to 'YYYY-MM-DD'
      title: event.eventTopic,
      backgroundColor: event.backgroundColor,
      timeStart: event.timeStart,
      timeEnd: event.timeEnd,
    }));

    res.status(200).json({ success: true, blockedDates });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Update an event
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!event) return res.status(404).json({ error: "Event not found" });

    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateEvents = async (req, res) => {
  try {
    const { password, ...eventData } = req.body;

    // Fetch the event from DB
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });

    // Check password using bcrypt
    const isMatch = await bcrypt.compare(password, event.password);
    if (!isMatch) return res.status(403).json({ error: "Incorrect password" });

    // Proceed with update
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      eventData,
      {
        new: true,
      }
    );

    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an event
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });

    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const joinEvent = async (req, res) => {
  try {
    const { password } = req.body;
    const event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ error: "Event not found" });

    // **Compare user-entered password with hashed password**
    const isMatch = await event.comparePassword(password);
    if (!isMatch) return res.status(401).json({ error: "Invalid password" });

    res.json({
      message: "Password verified, you can join the event",
      eventLink: event.link,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({ status: "upcoming" });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserEvents = async (req, res) => {
  try {
    const userId = req.user.id;
    const events = await Event.find({
      $or: [{ user: userId }, { "participants.user": userId }],
    })
      .populate("user", "firstname lastname")
      .populate("participants.user", "firstname lastname");

    const currentDate = new Date();
    const categorizedEvents = {
      upcoming: [],
      pending: [],
      past: [],
      rejected: [],
    };

    events.forEach((event) => {
      const eventDate = new Date(event.date);
      const userParticipant = event.participants.find(
        (p) => p.user._id.toString() === userId
      );

      // Check if event date has passed
      if (eventDate < currentDate) {
        // Move to past events regardless of original status
        const pastEvent = { ...event.toObject() };
        pastEvent.status = "past";

        // If user is a participant, set their participation status
        if (userParticipant) {
          // Find the participant's index to update their status in the pastEvent object
          const participantIndex = pastEvent.participants.findIndex(
            (p) => p.user._id.toString() === userId
          );

          if (participantIndex !== -1) {
            // Update participant status if not already set
            if (userParticipant.status === "pending") {
              pastEvent.participants[participantIndex].status = "missed";
            }
          }
        }

        categorizedEvents.past.push(pastEvent);
      } else {
        // For future events, categorize by status
        if (userParticipant && userParticipant.status === "rejected") {
          categorizedEvents.rejected.push(event);
        } else {
          categorizedEvents[event.status].push(event);
        }
      }
    });

    res.json({ events: categorizedEvents });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// **Accept or Reject Event**

export const respondToEvent = async (req, res) => {
  try {
    const { eventId, response } = req.body;
    const userId = req.user.id;
    const event = await Event.findById(eventId);

    if (!event) return res.status(404).json({ error: "Event not found" });

    const currentDate = new Date();

    // Handle response logic first
    if (response === "accept") {
      // Add user to participants or update their status
      const participantIndex = event.participants.findIndex(
        (participant) => participant.user.toString() === userId
      );

      if (participantIndex === -1) {
        event.participants.push({ user: userId, status: "accepted" });
      } else {
        event.participants[participantIndex].status = "accepted";
      }

      event.buttonStatus = "accepted";

      // Set event status based on date for accepted events
      if (event.date < currentDate) {
        event.status = "past";
      } else {
        event.status = "upcoming";
      }
    } else if (response === "reject") {
      // Remove user from participants or update status to rejected
      const participantIndex = event.participants.findIndex(
        (participant) => participant.user.toString() === userId
      );

      if (participantIndex === -1) {
        event.participants.push({ user: userId, status: "rejected" });
      } else {
        event.participants[participantIndex].status = "rejected";
      }

      event.buttonStatus = "rejected";
      event.status = "rejected";
    } else {
      return res.status(400).json({ error: "Invalid response" });
    }

    await event.save();
    res.json({
      message: `Event ${response}ed successfully.`,
      event: {
        id: event._id,
        status: event.status,
        buttonStatus: event.buttonStatus,
      },
    });
  } catch (error) {
    console.error("Error in respondToEvent:", error);
    res.status(500).json({ error: error.message });
  }
};
