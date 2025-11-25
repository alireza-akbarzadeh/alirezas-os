import { useState, useEffect } from "react";
import { Battery, BatteryCharging } from "lucide-react";

interface BatteryManager {
  level: number;
  charging: boolean;
  addEventListener(type: string, listener: EventListener): void;
  removeEventListener(type: string, listener: EventListener): void;
}

export function BatteryIndicator() {
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [isCharging, setIsCharging] = useState<boolean | null>(null);

  useEffect(() => {
    if ("getBattery" in navigator) {
      (navigator as any).getBattery().then((battery: BatteryManager) => {
        setBatteryLevel(battery.level * 100);
        setIsCharging(battery.charging);

        const updateBattery = () => {
          setBatteryLevel(battery.level * 100);
          setIsCharging(battery.charging);
        };

        battery.addEventListener("levelchange", updateBattery);
        battery.addEventListener("chargingchange", updateBattery);

        return () => {
          battery.removeEventListener("levelchange", updateBattery);
          battery.removeEventListener("chargingchange", updateBattery);
        };
      });
    } else {
      // Fallback for unsupported browsers
      setBatteryLevel(85);
      setIsCharging(false);
    }
  }, []);

  if (batteryLevel === null || isCharging === null) {
    return <div>Loading...</div>;
  }

  const getIconColor = () => {
    if (isCharging) return "text-blue-500";
    if (batteryLevel > 50) return "text-green-500";
    if (batteryLevel > 20) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="flex items-center gap-1">
      <span className="text-[11px] tabular-nums">
        {Math.round(batteryLevel)}%
      </span>
      <div className="relative flex items-center">
        {isCharging ? (
          <BatteryCharging className={`h-5 w-5 ${getIconColor()}`} />
        ) : (
          <Battery className={`h-5 w-5 ${getIconColor()}`} />
        )}
      </div>
    </div>
  );
}
