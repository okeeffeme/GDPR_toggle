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

function old_toggleUsecase(caseList, usecases, status) {
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

function old_togglePermission(dependencies, status) {
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
  constructor(props) {
    super(props);
    this.state = {};
    this.state.enabled = new Set(['a','b']);
  }

  componentWillMount = () => {
    this.Usecases = makeUsecasesList(items);
    this.Permissions = Array.from(makePermissionsSet(items));
    this.permissionsSet = makePermissionsSet(items);
    this.usecasesSet = makeUsecasesSet(items);
  }

  toggleCheckbox = label => {
    if (this.state.enabled.has(label)) {
      this.setState(this.state.enabled.delete(label));
    } else {
      this.setState(this.state.enabled.add(label));
    }
  }

  controlRules = label => {
    console.log('controlRules');
    let permissionsSet = makePermissionsSet(items);
    let usecasesSet = makeUsecasesSet(items);
    if (permissionsSet.has(label)) {
      this.togglePermission(label);
      console.log(this.enabled);
    }
    else if (usecasesSet.has(label)) {
      this.toggleUsecase(label);
      // togglePermission(permissions);
      // console.log('Requires ' + permissions);
      console.log(this.enabled);
    }
  }

  togglePermission = label => {
    const usecases = getUsecases(label, this.Usecases);
    if(this.state.enabled.has(label)){
      this.toggleCheckbox(label);
      for(let i = 0;i<usecases.length;i++){
        if (this.state.enabled.has(usecases[i])){
          this.toggleCheckbox(usecases[i]);
        }
      }
    } else {
      this.toggleCheckbox(label);
    }
  }

  toggleUsecase = label => {
    const permissions = getDependencies(this.Usecases, label);
    if (this.state.enabled.has(label)){
      this.toggleCheckbox(label);
    } else {
      this.toggleCheckbox(label);
      for(let i = 0;i<permissions.length;i++){
        if(!this.state.enabled.has(permissions[i])){
          this.toggleCheckbox(permissions[i]);
        }
      }
    }
  }

  controlDriver = label => {
    console.log('controlDriver');
    return this.state.enabled.has(label);
  }

  createCheckbox = label => (
    <Checkbox
      label={label}
      onClick={() => this.controlRules(label)}
      onChange={() => this.controlDriver(label)}
      checked={() => this.state}
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
