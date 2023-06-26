
import { isWithinSmallerCircle } from "./useUtils";
export const useRightStick = (x: number, y: number, seledctedCharGroup: number) => {

  function degrees(radians: number) {
    return radians * (180 / Math.PI);
  }

  const deadzone = 0.8

  if(isWithinSmallerCircle(x, y, deadzone)) {
    return 0;
  }

  let angle = Math.atan2(y, x);
  angle = (degrees(angle) + 360) % 360;

  if (angle >= 45 && angle < 135) {
    return 3;
  } else if (angle >= 135 && angle < 225) {
    return 4;
  } else if (angle >= 225 && angle < 315) {
    return 1;
  } else {
    return 2;
  }
}