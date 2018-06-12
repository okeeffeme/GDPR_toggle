let ObjA = {
  adA: [
    "a", "b", "c"
  ],
  adB: [
    "b", "c"
  ],
  adC: [
    "c"
  ]
}

let Usecases = makeUsecasesList(ObjA);
let Permissions = makePermissionsList(ObjA);

function copyObj(obj){
  return JSON.parse(JSON.stringify(obj));
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

// function makeDataListA(obj) {
//   let objCopy = copyObj(obj);
//   let b = [];
//   for (let i = 0; i < Object.keys(objCopy).length; i++) {
//     let key = Object.keys(objCopy)[i];
//     for (let z = 0; z < objCopy[key].length; z++) {
//       b.push(objCopy[key][z]);
//     }
//   }
//   b = filterDups(b);
//   b = arrToObj(b);
//   console.log(b);
//   return b;
// }

function makePermissionsList(obj) {
  let objCopy = copyObj(obj);
  objCopy = [].concat.apply([], Object.values(objCopy));
  objCopy = filterDups(objCopy);
  objCopy = arrToObj(objCopy);
  return objCopy;
}

function makeUsecasesList(obj) {
  let objCopy = copyObj(obj);
  for (let i = 0; i < Object.keys(objCopy).length; i++) {
    let key = Object.keys(objCopy)[i];
    let values = Object.values(objCopy[key]);
    // values = values.push(false);
    objCopy[key] = new Set(values);
    objCopy[key].add(false);
  }
  return objCopy;
}

function test() {
  console.log(Permissions);
  console.log(Usecases);
  return;
}

test();
