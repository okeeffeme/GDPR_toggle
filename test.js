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

function makePrivacyA(a) {
  let objCopy = JSON.parse(JSON.stringify(a));
  let b = [];
  for (let i = 0; i < Object.keys(objCopy).length; i++) {
    let key = Object.keys(objCopy)[i];
    for (let z = 0; z < objCopy[key].length; z++) {
      b.push(objCopy[key][z]);
    }
  }
  // console.log(b);
  console.log(b);
  return objCopy;
}

function makePrivacyB(a) {
  let objCopy = JSON.parse(JSON.stringify(a));
  let c = [].concat.apply([], Object.values(objCopy));
  console.log(c);
  return objCopy;
}

makePrivacyA(objA);
