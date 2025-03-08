const displayHours = (hour: number): string => {
  if (hour > 9) {
    return hour.toString();
  } else {
    return `0${hour.toString()}`;
  }
};

export default displayHours;
