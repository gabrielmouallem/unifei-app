export function checkEmail(str: string) {
  // eslint-disable-next-line
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    str
  );
}

export const checkUInt = (value: string): boolean => {
  return /^$|^[0-9]+$/.test(value);
};

export const checkFloat = (value: string): boolean => {
  return /^[+-]$|^[+-]?\d+?(\.)?(\d+)?$/.test(value);
};

export const checkLatCoordinates = (value: string) =>
  checkIsOnInterval(value, -90, 90);

export const checkLngCoordinates = (value: string) =>
  checkIsOnInterval(value, -180, 180);

export const checkIsOnInterval = (value: string, min: number, max: number) => {
  return (
    value === "" ||
    value === "-" ||
    (checkFloat(value) && parseFloat(value) >= min && parseFloat(value) <= max)
  );
};

export const checkSegment = (
  workingAngle: number,
  angleStart: number,
  angleEnd: number,
  arrayAngleStart: string[],
  arrayAngleEnd: string[]
): boolean => {
  let nextValue = -1;
  let flag = true;
  const arrayStartSort = arrayAngleStart.map((elem) => {
    return parseInt(elem, 10);
  });
  const arrayStart = [...arrayStartSort];
  arrayStartSort.sort();

  if (workingAngle !== 360 && angleStart > angleEnd) return false;
  if (
    workingAngle !== 360 &&
    (angleStart >= workingAngle || angleEnd > workingAngle)
  )
    return false;

  if (angleStart === angleEnd) return false;

  for (let index = 0; index < arrayStart.length; index++) {
    if (arrayStart[index] < parseInt(arrayAngleEnd[index], 10)) {
      if (angleStart > angleEnd) {
        if (
          angleStart >= arrayStart[index] &&
          angleStart < parseInt(arrayAngleEnd[index], 10)
        )
          return false;

        if (angleEnd > arrayStartSort[0]) return false;

        if (arrayStart[index] > angleStart) return false;
      } else {
        if (arrayStart[index] > angleStart && flag) {
          flag = false;
          if (angleEnd > arrayStart[index]) return false;
        }
        if (
          angleStart >= arrayStart[index] &&
          angleStart < parseInt(arrayAngleEnd[index], 10)
        )
          return false;
      }
    } else if (arrayStart[index] > parseInt(arrayAngleEnd[index], 10)) {
      if (angleStart > angleEnd) return false;
      if (angleStart >= arrayStart[index]) return false;

      if (
        angleStart + 360 >= arrayStart[index] &&
        angleStart + 360 < parseInt(arrayAngleEnd[index], 10) + 360
      )
        return false;

      if (arrayStart[index] > angleStart && flag) {
        nextValue = arrayStart[index];
        flag = false;
        if (angleEnd > nextValue) return false;
      }
    }
  }

  return true;
};

export const checkSegmentComplete = (
  workingAngle: number,
  arrayAngleStart: string[],
  arrayAngleEnd: string[]
): boolean => {
  let sum = 0;

  arrayAngleStart.map((elem, index) => {
    if (parseInt(elem, 10) < parseInt(arrayAngleEnd[index], 10)) {
      sum += parseInt(arrayAngleEnd[index], 10) - parseInt(elem, 10);
    } else sum += 360 - parseInt(elem, 10) + parseInt(arrayAngleEnd[index], 10);
  });

  console.log("SUM", sum);
  if (workingAngle === sum) return true;
  else return false;
};
