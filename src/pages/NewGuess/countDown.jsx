import { useState, useEffect } from "react";

const CountDown = () => {
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [hours, setHours] = useState("00");

  useEffect(() => {
    setInterval(() => {
    
      const date = new Date(1630238340000);
      var minute = date.getMinutes() - new Date().getMinutes();
      var second = new Date().getSeconds() - date.getSeconds();
      var hour = date.getDay() - new Date().getDay();
      setMinutes(minute);
      setSeconds(second);
      setHours(hour);
     
    }, 1000);
  }, []);

  return (
    <div className="d-flex align-items-center ">
      <div style={{ fontSize: "28px", color: `#dc3545` }}>{hours}</div><span style={{ fontSize: "20px", color: `#dc3545` }} >:</span>
      <div style={{ fontSize: "28px", color: `#dc3545` }}>{minutes}</div><span style={{ fontSize: "20px", color: `#dc3545` }}>:</span>
      <div style={{ fontSize: "28px", color: `#dc3545` }}>{seconds}</div>
    </div>
  );
};

export default CountDown;
