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

function checkPermission(permission, usecase) {
  let status = false;
  if (usecase.has(permission)) {
    status = true;
  }
  return status;
}

// TODO: throw error if requesting unknown permission or usecase
function getUsecases(permission, usecases) {
  let caseList = [];
  for (let i = 0; i < Object.keys(usecases).length; i++) {
    if (checkPermission(permission, getValue(i, usecases))) {
      caseList.push(getKey(i, usecases));
    }
  }
  return caseList;
}

function toggleUsecase(caseList, status) {
  status = status || false;
  console.log('usecase status is ' + status);
  for (i = 0; i < caseList.length; i++) {
    let currentSet = Usecases[caseList[i]];
    if (currentSet.has(!status)) {
      currentSet.delete(!status);
      currentSet.add(status);
    }
  }
  return 'run Usecases toggle';
}

function getDependencies(key) {
  let dependencies = Usecases[key];
  dependencies = Array.from(dependencies);
  dependencies = dependencies.filter(a => typeof a !== "boolean");
  return dependencies;
}

function togglePermission(dependencies, status) {
  status = status;
  for (var i = 0; i < dependencies.length; i++) {
    if (status != Permissions[dependencies[i]]) {
      Permissions[dependencies[i]] = status;
    }
  }
  return 'run Permissions toggle';
}


let Usecases = makeUsecasesList(ObjA);
let Permissions = makePermissionsList(ObjA);

function test() {
  console.log(Usecases);
  console.log(Permissions);
  return;
}
test();

function toggleHandle(x) {
  if (x === 'p'){
    const permission = event.target.value;
    const usecases = getUsecases(permission, Usecases);
    toggleUsecase(usecases);
    for (var i = 0; i < usecases.length; i++) {
      $(' :input[value=' + usecases[i] + ']:checked').prop("checked", false);
    }
    console.log(Usecases);
  }
  else if (x === 'uc'){
    const usecase = event.target.value;
    const permissions = getDependencies(usecase);
    togglePermission(permissions);
    for (var i = 0; i < permissions.length; i++) {
      $(' :input[value=' + permissions[i] + ']').prop("checked", true);
    }
    console.log(Permissions);
  }
  return;
}

function enableP() {
  $("input[type='checkbox']" && "input[id|='p']").prop("checked", true);
  togglePermission(['a', 'b', 'c'], true);
  console.log(Permissions);
}
function enableUC() {
  $("input[type='checkbox']").prop("checked", true);
  toggleUsecase(['adA', 'adB', 'adC'], true);
  togglePermission(['a', 'b', 'c'], true);
  console.log(Usecases);
  console.log(Permissions);
}
function disableP() {
  $("input[type='checkbox']").prop("checked", false);
  toggleUsecase(['adA', 'adB', 'adC'], false);
  togglePermission(['a', 'b', 'c'], false);
  console.log(Usecases);
  console.log(Permissions);
}
function disableUC() {
  $("input[type='checkbox']" && "input[name*='Advertiser ']").prop("checked", false);
  toggleUsecase(['adA', 'adB', 'adC'], false);
  console.log(Usecases);
}
