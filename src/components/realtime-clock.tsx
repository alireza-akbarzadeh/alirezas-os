import { useEffect, useState, memo } from "react";
import dayjs from "dayjs";

function RealtimeClockComponent() {
  const [currentTime, setCurrentTime] = useState(() =>
    dayjs().format("ddd MMM D h:mm A"),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = dayjs().format("ddd MMM D h:mm A");
      setCurrentTime((prevTime) => {
        // Only update if the formatted time has actually changed
        if (prevTime !== newTime) {
          return newTime;
        }
        return prevTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <time>{currentTime}</time>;
}

// Memoize to prevent unnecessary re-renders when parent re-renders
export const RealtimeClock = memo(RealtimeClockComponent);
