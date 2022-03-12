const section3 = (length, total) => {
  const number = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let output = [];
  let indexStart = 0;
  let indexLast = length - 1;

  for (let index = indexLast; index < number.length; index++) {
    let temp = number.slice(indexStart, length - 1);
    if (index != number.length) {
      temp.push(number[index]);
      if (addition(temp) == total) output.push(temp);
      console.log(temp);
    }
  }

  // while (indexLast <= number.length) {
  //   console.log(indexStart);
  //   temp = number.slice(indexStart, indexLast);
  //   console.log(number);
  //   if (addition(temp) == total) output.push(temp);
  //   indexStart++;
  //   // console.log(indexStart);
  //   // indexLast++;
  // }

  console.log(output);
};

const addition = (array) => {
  let total = 0;
  for (let index = 0; index < array.length; index++) {
    total += array[index];
  }
  return total;
};

section3(3, 6);
