import React from 'react';
import Checkbox from './Checkbox';
import './GDPRcontrols.css';

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

function getValue(i, obj){
  return obj[getKey(i, obj)];
}

function filterDups(arr){
    let uniqueArray = arr.filter(function(elem, index, self) {
        return index == self.indexOf(elem);
    });
    return uniqueArray
}

function makeUsecasesList(obj) {
  let objCopy = copyObj(obj);
  for (let i = 0; i < Object.keys(objCopy).length; i++) {
    let key = Object.keys(objCopy)[i];
    let values = Object.values(objCopy[key]);
    objCopy[key] = new Set(values);
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

function toggleUsecase(caseList, usecases, status) {
  status = status || false;
  console.log('usecase status is ' + status);
  for (let i = 0; i < caseList.length; i++) {
    let currentSet = usecases[caseList[i]];
    if (currentSet.has(!status)) {
      currentSet.delete(!status);
      currentSet.add(status);
      console.log('usecase status is now ' + status);
    }
  }
  return 'run Usecases toggle';
}

function getDependencies(usecases, key) {
  let dependencies = usecases[key];
  dependencies = Array.from(dependencies);
  dependencies = dependencies.filter(a => typeof a !== "boolean");
  return dependencies;
}

function togglePermission(dependencies, status) {
  status = status;
  for (let i = 0; i < dependencies.length; i++) {
    if (status != Permissions[dependencies[i]]) {
      Permissions[dependencies[i]] = status;
    }
  }
  return 'run Permissions toggle';
}

function makePermissionsSet(obj) {
  let objCopy = copyObj(obj);
  objCopy = [].concat.apply([], Object.values(objCopy));
  objCopy = filterDups(objCopy);
  return new Set(objCopy);
}
function makeUsecasesSet(obj) {
  let objCopy = copyObj(obj);
  objCopy = [].concat.apply([], Object.keys(objCopy));
  objCopy = filterDups(objCopy);
  return new Set(objCopy);
}

//////////////////////////////////////////////

class GDPRcontrols extends React.Component {
  componentWillMount = () => {
    this.Usecases = makeUsecasesList(items);
    this.Permissions = Array.from(makePermissionsSet(items));
    this.permissionsSet = makePermissionsSet(items);
    this.usecasesSet = makeUsecasesSet(items);
    this.enabled = new Set;
    // this.disabled = new Set([...makePermissionsSet(items), ...makeUsecasesSet(items)]);
  }

  toggleCheckbox = label => {
    if (this.enabled.has(label)) {
      this.enabled.delete(label);
    } else {
      this.enabled.add(label);
    }
  }

  controlRules = label => {
    console.log('click ');
    let permissionsSet = makePermissionsSet(items);
    let usecasesSet = makeUsecasesSet(items);
// PERMISSIONS
    if (permissionsSet.has(label)) {
      const usecases = getUsecases(label, this.Usecases);
      for(let i = 0;i<usecases.length;i++){
        this.toggleCheckbox(usecases[i]);
      }
      this.toggleCheckbox(label);
      // toggleUsecase(usecases, this.Usecases);
      console.log('Used in ' + usecases);
      console.log(this.enabled);
    }
// USECASES
    else if (usecasesSet.has(label)) {
      const permissions = getDependencies(this.Usecases, label);
      if (this.enabled.has(label)){
        this.toggleCheckbox(label);
      } else {
        this.toggleCheckbox(label);
        for(let i = 0;i<permissions.length;i++){
          if(!this.enabled.has(permissions[i])){
            this.toggleCheckbox(permissions[i]);
          }
        }
      }
      // togglePermission(permissions);
      console.log('Requires ' + permissions);
      console.log(this.enabled);
    }
  }

  createCheckbox = label => (
    <Checkbox
      label={label}
      onClick={() => this.controlRules(label)}
      key={label}
    />
  )

  createCheckboxes = list => Array.from(list).map(this.createCheckbox);

  // createCheckboxes = list => {
  //   list = Array.from(list)
  //   return list.map(this.createCheckbox);
  // }

  render() {
    const { createCheckboxes, Permissions, Usecases } = this;

    const permissionsCheckboxes = createCheckboxes(Permissions);
    const usecasesCheckboxes = createCheckboxes(Object.keys(Usecases));

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">

            <h2>Permissions</h2>
            {permissionsCheckboxes}

          </div>
          <div className="col-sm-6">

            <h2>Usecases</h2>
            {usecasesCheckboxes}

          </div>
        </div>
      </div>
    );
  }

}
export default GDPRcontrols;
