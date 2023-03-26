const num = 12;
const findSolution = (num) => {
  const res = [];
  let a, b;
  let x, y;
  for (let a = 1; a <= Math.sqrt(num); a++) {
    if (Number.isInteger((b = num / a))) {
      if (Number.isInteger((x = (b + a) / 2))) {
        if (Number.isInteger((y = (b - a) / 4))) {
          res.push([x, y]);
        }
      }
    }
  }
  return res;
};
console.log(findSolution(num));
