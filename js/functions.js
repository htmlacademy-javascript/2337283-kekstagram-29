function checkStringLength (string, length) {
  return string.length <= length;
}


function checkPalindrom (string) {
  string = string.toLowerCase().replaceAll(' ', '');
  let changedWord = '';
  for (let i = string.length - 1; i >= 0; i--) {
    changedWord += string[i];
  }

  if (string === changedWord) {
    return true;
  }
  return false;
}

function getNumber (string) {
  string = String(string);
  let number = '';
  for (let i = 0; i < string.length; i++) {
    const symbol = parseInt(string[i], 10);
    if (Number.isNaN(symbol) === false) {
      number += symbol;
    }
  }
  return Number(number || string);
}

checkStringLength('проверямая строка', 10);
checkPalindrom('Лёша на полке клопа нашёл ');
getNumber('2023 год');

function parseTime(time) {
  const [hour, minute] = time.split(':');
  return hour * 60 + Number(minute);
}

function checkMeeting (dayStart, dayEnd, meetingStart, meetingDuration) {
  const dayStartInMinutes = parseTime(dayStart);
  const dayEndInMinutes = parseTime(dayEnd);
  const meetingStartInMinutes = parseTime(meetingStart);
  const meetingEnd = meetingStartInMinutes + meetingDuration;
  return (
    meetingStartInMinutes >= dayStartInMinutes &&
    meetingEnd <= dayEndInMinutes
  );
}

// console.log(checkMeeting('08:00', '17:30', '14:00', 90)); true
// console.log(checkMeeting('8:0', '10:0', '8:0', 120)); true
// console.log(checkMeeting('08:00', '14:30', '14:00', 90)); false
// console.log(checkMeeting('14:00', '17:30', '08:0', 90)); false
// console.log(checkMeeting('8:00', '17:30', '08:00', 900)); false

checkMeeting('08:00', '17:30', '14:00', 90);
