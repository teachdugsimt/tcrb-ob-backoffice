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
    return <p>{text}</p>
  } else {
    if (isComma) {
      let customText = stringToNumber.toLocaleString()
      return <p style={{ textAlign: "right" }}>{customText}</p>
    } else {
      return <p>{text}</p>
    }
  }
}
export {
  addKeyToDataSource,
  addCommaInData
}
