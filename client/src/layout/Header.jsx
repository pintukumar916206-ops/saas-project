import React, { useState } from "react";
import settingIcon from "../assets/setting.png";
import userIcon from "../assets/user.png";
import { useSelector, useDispatch } from "react-redux";
import { use } from "react";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [currentTime, setCurrentTime] = useState(" ");
  const [currentDate, setCurrentDate] = useState(" ");
  useEffect(() => {
    const UpdateDateTime = () => {
      const now = new Date();
      const hours = now.getHours() % 12 || 12;
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds();
      const ampm = now.getHours() >= 12 ? "PM" : "AM";
      setCurrentTime(`${hours}:${minutes}:${seconds} ${ampm}`);
      const option = {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      setCurrentDate(now.toLocaleTimeString("en-IN", option));

    };
    UpdateDateTime();
    const intervalId = setInterval(UpdateDateTime, 1000);
    return () => clearInterval(intervalId); 
  }, []);

  return <></>;
};

export default Header;
