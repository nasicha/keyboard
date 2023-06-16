
export const useLeftStick = (x: number, y: number) => {

  function degrees(radians: number) {
    return radians * (180 / Math.PI);
  }

  function isWithinSmallerCircle(x: number, y: number, r: number) {
    let distance = Math.sqrt(x * x + y * y);
    return distance <= r;
  }

  const deadzone = 0.4;

  if(isWithinSmallerCircle(x, y, deadzone)) {
    return 0;
  }

  let angle = Math.atan2(y, x);
  angle = (degrees(angle) + 360) % 360;

  if (angle >= 0 && angle < 60) {
    return 3;
  } else if (angle >= 60 && angle < 120) {
    return 4;
  } else if (angle >= 120 && angle < 180) {
    return 5;
  } else if (angle >= 180 && angle < 240) {
    return 6;
  } else if (angle >= 240 && angle < 300) {
    return 1;
  } else {
    return 2;
  }
}