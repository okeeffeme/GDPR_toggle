import React from 'react';
import Checkbox from './Checkbox';

const items = {
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

function copyObj(obj){
  return JSON.parse(JSON.stringify(obj));
}

function copyObj(obj){
  return JSON.parse(JSON.stringify(obj));
}

function getKey(i, obj) {
  return Object.keys(obj)[i];
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

function permissionsSet(obj) {
  let objCopy = copyObj(obj);
  objCopy = [].concat.apply([], Object.values(objCopy));
  objCopy = filterDups(objCopy);
  return new Set(objCopy);
}
function usecasesSet(obj) {
  let objCopy = copyObj(obj);
  objCopy = [].concat.apply([], Object.keys(objCopy));
  objCopy = filterDups(objCopy);
  return new Set(objCopy);
}

//////////////////////////////////////////////

class GDPRcontrols extends React.Component {
  componentWillMount = () => {
    this.Usecases = makeUsecasesList(items);
    this.Permissions = makePermissionsList(items);
    this.permissionsSet = permissionsSet(items);
    this.usecasesSet = usecasesSet(items);
  }

  controlRules = label => {
    if (permissionsSet.has(label)) {
      const usecases = getUsecases(label, this.Usecases);
      toggleUsecase(usecases);
    }
    else if (usecasesSet.has(label)) {
      const permissions = getDependencies(label);
      togglePermission(permissions);
    }
  }


  createCheckbox = label => (
    <Checkbox
      label={label}
      handleCheckboxChange={this.controlRules}
      key={label}
    />
  )

  createCheckboxes = list => {
    list = Array.from(list)
    list.map(this.createCheckbox);
    //list.forEach(this.createCheckbox)
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">

            {this.createCheckboxes(permissionsSet)}

          </div>
          <div className="col-sm-6">

            {this.createCheckboxes(usecasesSet)}

          </div>
        </div>
      </div>
    );
  }

}
export default GDPRcontrols;
