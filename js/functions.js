function checkStringLength (string, length) {
  return string.length <= length;
}


function checkPalindrom (string) {
  const changedString = string.toLowerCase().replaceAll(' ', '');
  const reversedString = [changedString].reverse().join('');

  return changedString === reversedString;
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
