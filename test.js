const ObjA = {
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


function logginator(func, name) {
  name = name || 'a function';
  return function(...args) {
    console.log(name + ' called');
    return func(...args);
  };
};

function copyObj(obj){
  return JSON.parse(JSON.stringify(obj));
}

function getKey(i, obj) {
  return Object.keys(obj)[i];
}

function getValue(i, obj){
  return obj[getKey(i, obj)];
}

function filterDups(arr){
    let uniqueArray = arr.filter(function(elem, index, self) {
        return index == self.indexOf(elem);
    });
    return uniqueArray
}

// filterDups = logginator(filterDups, 'filterDups');

function arrToObj(arr){
  let obj = {};
  let value = false;
  for (let i = 0; i < arr.length; i++) {
    obj[arr[i]] = value;
  }
  return obj;
}

// arrToObj = logginator(arrToObj, 'arrToObj');

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
    objCopy[key] = new Set(values);
    objCopy[key].add(false);
  }
  return objCopy;
}

function checkDependency(dependency, usecase) {
  let status = false;
  if (usecase.has(dependency)) {
    status = true;
  }
  return status;
}

function checkUsecases(dependency, usecases) {
  let status = false;
  let caseList = [] || undefined;
  for (let i = 0; i < Object.keys(usecases).length; i++) {
    if (checkDependency(dependency, getValue(i, usecases))) {
      status = true;
      caseList.push(getKey(i, usecases));
    }
  }
  return [status, caseList];
}

let Usecases = makeUsecasesList(ObjA);
let Permissions = makePermissionsList(ObjA);

function toggle(status, arr) {
  if (status) {
    for (i = 0; i < arr.length; i++) {
      let currentSet = Usecases[arr[i]];
      currentSet.delete(false);
      currentSet.add(true);
    }
  }
  return 'run toggle';
}

function test() {
  // console.log(Permissions);
  console.log(Usecases);
  console.log(toggle(...checkUsecases("b", Usecases)));
  console.log(Usecases);
  return;
}


test('end');
