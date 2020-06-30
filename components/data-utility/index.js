const addKeyToDataSource = (arrayDataSource) => {
  let newDataSource = arrayDataSource
  for (let index = 0; index < newDataSource.length; index++) {
    newDataSource[index].key = index + 1;
  }
  return new Promise((resolve) => {
    resolve(newDataSource)
  })
}
const addCommaInData = (text, isComma) => {
  let stringToNumber = new Number(text)
  if (isNaN(stringToNumber)) {
    return <span>{text}</span>
  } else {
    if (isComma) {
      let customText = stringToNumber.toLocaleString()
      return <span style={{ textAlign: "right", }}>{customText}</span>
    } else {
      return <span>{text}</span>
    }
  }
}
export {
  addKeyToDataSource,
  addCommaInData
}
