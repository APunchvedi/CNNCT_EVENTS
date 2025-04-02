import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import "../styles/Calender.css";
import { BASE_URL } from "../PreData/Properties";
import axios from "axios";

const convertTo24HourFormat = (timeString) => {
  const [time, period] = timeString.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (period === "PM" && hours !== 12) {
    hours += 12;
  }
  if (period === "AM" && hours === 12) {
    hours = 0;
  }

  return { hours, minutes };
};

const CalendarView = () => {
  const today = new Date();
  const [currentView, setCurrentView] = useState("timeGridWeek");
  const [searchTerm, setSearchTerm] = useState("");
  const [blockedDates, setBlockedDates] = useState([]);
  const calendarRef = useRef(null);
  const [events, setEvents] = useState([]);

  // Fetching blocked dates
  useEffect(() => {
    const fetchBlockedDates = async () => {
      try {
        
        const token = localStorage.getItem("token"); // localStorage token check

        
        const response = await axios.get(`${BASE_URL}/api/event/getAllEvents`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { data } = response;

        if (data.success && data.blockedDates) {
          
          const transformedBlockedDates = data.blockedDates.map(
            (blockedDate, index) => {
              
              const [year, month, day] = blockedDate.date.split("-").map(Number);
              const startTime = convertTo24HourFormat(blockedDate.timeStart);
              const endTime = convertTo24HourFormat(blockedDate.timeEnd);

              
              const backgroundColor = blockedDate.backgroundColor || "#FF0000";
              const darkerBackgroundColor = shadeColor(backgroundColor, -30);

              return {
                id: `blocked-${index}`,
                title: blockedDate.title,
                start: new Date(
                  year,
                  month - 1,
                  day,
                  startTime.hours,
                  startTime.minutes
                ),
                end: new Date(
                  year,
                  month - 1,
                  day,
                  endTime.hours,
                  endTime.minutes
                ),
                allDay: false,
                display: "block",
                backgroundColor: backgroundColor,
                borderColor: darkerBackgroundColor,
                barColor: darkerBackgroundColor,
                className: "blocked-date",
                extendedProps: {
                  originalBackgroundColor: backgroundColor,
                  originalBarColor: darkerBackgroundColor,
                },
              };
            }
          );

          setBlockedDates(transformedBlockedDates);
        }
      } catch (error) {
        console.error("Error fetching blocked dates:", error);
      }
    };

    fetchBlockedDates();
  }, []);


  // Helper function to generate a darker or lighter shade of a color
  const shadeColor = (color, percent) => {
    const num = parseInt(color.slice(1), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = ((num >> 8) & 0x00ff) + amt;
    const B = (num & 0x0000ff) + amt;

    return (
      "#" +
      (
        0x1000000 +
        (R < 0 ? 0 : R > 255 ? 255 : R) * 0x10000 +
        (G < 0 ? 0 : G > 255 ? 255 : G) * 0x100 +
        (B < 0 ? 0 : B > 255 ? 255 : B)
      )
        .toString(16)
        .slice(1)
    );
  };

  // Memoized event content renderer
  const eventContentRenderer = useCallback((eventInfo) => {
    const event = eventInfo.event;
    const originalBackgroundColor =
      event.extendedProps.originalBackgroundColor || "#666";

    // Check if the background color is black or very dark
    const isBlackOrDark =
      originalBackgroundColor === "#000000" ||
      originalBackgroundColor === "#000" ||
      parseInt(originalBackgroundColor.slice(1), 16) < 0x333333;

    // For black/dark backgrounds, use a lighter shade for the bar
    // For other colors, use a darker shade as before
    const originalBarColor = isBlackOrDark
      ? shadeColor(originalBackgroundColor, 50)
      : event.extendedProps.originalBarColor ||
        shadeColor(originalBackgroundColor, -30);

    return (
      <div
        className="calendar-event"
        style={{
          position: "relative",
          height: "100%",
          width: "100%",
        }}
      >
        {/* Colored bar for the specific time slot */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "4px",
            backgroundColor: originalBarColor,
          }}
        />
        <div
          style={{
            marginLeft: "8px",
            color: isBlackOrDark ? "#FFFFFF" : originalBarColor,
            fontWeight: "500",
            backgroundColor: `${originalBackgroundColor}20`,
            borderRadius: "4px",
            padding: "2px 4px",
          }}
        >
          {eventInfo.timeText && (
            <div className="event-time">{eventInfo.timeText}</div>
          )}
          <div>{event.title}</div>
        </div>
      </div>
    );
  }, []);

 
  const combinedEvents = useMemo(() => {
    return [...events, ...blockedDates];
  }, [events, blockedDates]);

  
  const filteredEvents = useMemo(() => {
    if (searchTerm.trim() === "") {
      return combinedEvents;
    }
    return combinedEvents.filter((event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, combinedEvents]);

  
  const handleDateClick = useCallback(() => {}, []);

 
  const handleViewChange = useCallback((value) => {
    let newView = "timeGridWeek";

    switch (value) {
      case "day":
        newView = "timeGridDay";
        break;
      case "week":
        newView = "timeGridWeek";
        break;
      case "month":
        newView = "dayGridMonth";
        break;
      case "year":
        newView = "dayGridYear";
        break;
      default:
        newView = "timeGridWeek";
    }

    setCurrentView(newView);

    if (calendarRef.current) {
      calendarRef.current.getApi().changeView(newView);
    }
  }, []);

 
  const handlePrevClick = useCallback(() => {
    if (calendarRef.current) {
      calendarRef.current.getApi().prev();
    }
  }, []);

  const handleNextClick = useCallback(() => {
    if (calendarRef.current) {
      calendarRef.current.getApi().next();
    }
  }, []);

  const handleTodayClick = useCallback(() => {
    if (calendarRef.current) {
      calendarRef.current.getApi().today();
    }
  }, []);

  const dayHeaderContentRenderer = useCallback((args) => {
    const date = args.date;
    const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
    const dayNumber = date.getDate();

    return (
      <div className="day-header">
        <div className="day-name">{dayName}</div>
        <div className="day-number">{dayNumber}</div>
      </div>
    );
  }, []);

  return (
    <div className="fade-in">
      <div className="calendar-header">
        <div className="header-left">
          <div className="header-item">
            <span className="header-label">Activity</span>
            <div className="header-value">
              Event type <ChevronRight className="h-3 w-3 ml-1" />
            </div>
          </div>
          <div className="header-item">
            <span className="header-label">Time Zone</span>
            <div className="header-value">
              Indian Time Standard <ChevronRight className="h-3 w-3 ml-1" />
            </div>
          </div>
        </div>
      </div>

      <div className="calendar-navigation">
        <div className="nav-controls">
          <button className="nav-button" onClick={handlePrevClick}>
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button className="today-button" onClick={handleTodayClick}>
            Today
          </button>
          <button className="nav-button" onClick={handleNextClick}>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="calendar-actions">
          <div className="view-toggle">
            {["day", "week", "month", "year"].map((view) => (
              <button
                key={view}
                className={`view-toggle-button ${
                  (currentView === "timeGridDay" && view === "day") ||
                  (currentView === "timeGridWeek" && view === "week") ||
                  (currentView === "dayGridMonth" && view === "month") ||
                  (currentView === "dayGridYear" && view === "year")
                    ? "active"
                    : ""
                }`}
                onClick={() => handleViewChange(view)}
              >
                {view.charAt(0).toUpperCase() + view.slice(1)}
              </button>
            ))}
          </div>

          <div className="search-container">
            <Search className="search-icon h-4 w-4" />
            <input
              type="text"
              placeholder="Search"
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="calendar-container">
        <FullCalendar
          ref={calendarRef}
          plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
          allDaySlot={false}
          initialView={currentView}
          headerToolbar={false}
          events={filteredEvents}
          dateClick={handleDateClick} // No-op handler; disabled alert/prompt feature
          dayHeaderContent={dayHeaderContentRenderer}
          eventContent={eventContentRenderer}
          editable={false}
          selectable={false}
          views={{
            dayGridYear: {
              type: "dayGrid",
              duration: { years: 1 },
              buttonText: "Year",
            },
          }}
        />
      </div>

      <div className="calendar-footer">EST GMT-5</div>
    </div>
  );
};

export default CalendarView;
