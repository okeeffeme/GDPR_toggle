let objA = {
  testA: [
    "a", "b", "c"
  ],
  testB: [
    "b", "c"
  ],
  testC: [
    "c"
  ]
}

function filterDups(arr){
    let uniqueArray = arr.filter(function(elem, index, self) {
        return index == self.indexOf(elem);
    });
    return uniqueArray
}

function arrToObj(arr){
  let obj = {};
  let value = false;
  for (let i = 0; i < arr.length; i++) {
    obj[arr[i]] = value;
  }
  return obj;
}

function makeDataListA(obj) {
  let objCopy = JSON.parse(JSON.stringify(obj));
  let b = [];
  for (let i = 0; i < Object.keys(objCopy).length; i++) {
    let key = Object.keys(objCopy)[i];
    for (let z = 0; z < objCopy[key].length; z++) {
      b.push(objCopy[key][z]);
    }
  }
  b = filterDups(b);
  b = arrToObj(b);
  console.log(b);
  return b;
}

function makeDataListB(obj) {
  let objCopy = JSON.parse(JSON.stringify(obj));
  let c = [].concat.apply([], Object.values(objCopy));
  c = filterDups(c);
  c = arrToObj(c);
  console.log(c);
  return c;
}

makeDataListA(objA);
