export const getTimeArr = () => {
  const hoursArray = [];
  for (let i = 0; i < 24; i++) {
    hoursArray.push(i.toString().padStart(2, '0'));
  }

  const minutesArray = [];
  for (let i = 0; i < 60; i++) {
    minutesArray.push(i.toString().padStart(2, '0'));
  }

  return { hoursArray, minutesArray };
};

// Array with numbers from 00 to 60
