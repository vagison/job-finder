function sortArrayOfObjectsByDate(arrayOfObjects, fieldName, direction) {
  return arrayOfObjects.sort((a, b) => {
    const dateA = new Date(a[fieldName])
    const dateB = new Date(b[fieldName])
    let comparison = 0

    if (dateA > dateB) {
      comparison = 1
    } else if (dateA < dateB) {
      comparison = -1
    }

    return direction === 'ASC' ? comparison : -comparison
  })
}

export { sortArrayOfObjectsByDate }
