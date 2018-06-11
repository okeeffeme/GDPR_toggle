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

function makePrivacy(a) {
  let objCopy = JSON.parse(JSON.stringify(a));
  let b = 0;
  for (let i = 0; i < Object.keys(objCopy).length; i++) {
    console.log(Object.keys(objCopy)[i].values);
  }
  // console.log(b);
  console.log(b);
  return objCopy;
}

makePrivacy(objA);
