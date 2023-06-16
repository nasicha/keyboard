export const useIsStickActive = (controller: any, stick: String) => {

  if(!controller.value) {
    return
  }


  const threshold = 0.5;
  let currentStick;

  if (stick === 'left') {
    currentStick = controller.value?.stick.left;
    
  } else if (stick === 'right') {
    currentStick = controller.value?.stick.right;

  }

  return (
    Math.abs(currentStick.horizontal) > threshold ||
    Math.abs(currentStick.vertical) > threshold
  );
};
