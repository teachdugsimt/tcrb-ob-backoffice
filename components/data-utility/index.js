const addKeyToDataSource = (arrayDataSource) => {
  let newDataSource = arrayDataSource
  for (let index = 0; index < newDataSource.length; index++) {
    newDataSource[index].key = index + 1;
  }
  return new Promise((resolve) => {
    resolve(newDataSource)
  })
}
export {
  addKeyToDataSource
}
