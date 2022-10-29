export const searchFilterChange = text => {
  return {
    type: 'filters/searchFilterChange',
    payload: text
  }
}

export const checkboxTravelChange = checked => {
  return {
    type: 'checkbox/travelChange',
    payload: checked
  }
}
