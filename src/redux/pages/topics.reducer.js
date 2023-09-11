const initialState=[];
function updateObjectById(arr, id, updatedObj) {
    const index = arr.findIndex((obj) => obj.id === id);
  
    if (index !== -1) {
      arr[index] = { ...arr[index], ...updatedObj };
    }
  
    return arr;
  }

  export default function topicsReducer(state = initialState,action){
    switch (action.type) {
      case "INSERT_DATA":
        return [...action.payload.values];
      case "ADD_TOPICS":
        return [...state, action.payload.values];
      case "DELETE_TOPICS":
        console.log("action", action);
        console.log("state", state);
        console.log("final value", [...state, action.payload.values]);
        console.log(
          "final value",
          state.filter((obj) => obj.id !== action.payload.id)
        );
        return state.filter((obj) => obj.id !== action.payload.id);
      case "RESET_STATE":
        return initialState;
        case "EDIT_DATA":
           const updattedData = updateObjectById(state, action.payload.values.id, action.payload.values);
           
        console.log("action", action);
        console.log("state", state);
        console.log(updattedData);
          return updattedData
      default:
        return state;
    }
  }