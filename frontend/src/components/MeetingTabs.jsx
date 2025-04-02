import { NavLink } from "react-router-dom";
import "../styles/MeetingTabs.css"; // Import CSS

const MeetingTabs = () => {
  const tabs = [
    { name: "Upcoming", path: "/booking/upcoming" },
    { name: "Pending", path: "/booking/pending" },
    { name: "Canceled", path: "/booking/canceled" },
    { name: "Past", path: "/booking/past" },
  ];

  return (
    <div className="meetings-tabs">
      {tabs.map((tab) => (
        <NavLink
          key={tab.name}
          to={tab.path}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          {tab.name}
        </NavLink>
      ))}
    </div>
  );
};

export default MeetingTabs;
