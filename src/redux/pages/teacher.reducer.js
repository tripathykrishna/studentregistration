const intialState = [];


function updateObjectById(arr, id, updatedObj) {
  const index = arr.findIndex((obj) => obj.id === id);

  if (index !== -1) {
    arr[index] = { ...arr[index], ...updatedObj };
  }

  return arr;
}

export default function teacherReducer(state = intialState, action) {
  switch (action.type) {
    case"INSERT_DATA":
    return[...action.payload.values];
    case "ADD_TDATA":
      return [...state, action.payload.values];
    case "EDIT_TDATA":
      const updattedData = updateObjectById(
        state,
        action.payload.id.values,
        action.payload.values
      );
      return updattedData;
    case "DELETE_TDATA":
      return state.filter((obj) => obj.id !== action.payload.id);

    case "RESET_STATE":
      return intialState;
    default:
      return state;
  }
}
