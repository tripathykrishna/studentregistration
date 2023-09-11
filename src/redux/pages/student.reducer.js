const initialState =[];
function updateObjectById(arr, id, updatedObj) {
    
    const index = arr.findIndex((obj) => obj.id === id);

  
    if (index !== -1) {
      arr[index] = { ...arr[index], ...updatedObj };
    }

    
    return arr;
  }
export default function studuentReducer(state=initialState,action){
 switch (action.type){
  case "INSERT_DATA":
    return [...action.payload.values] 
    // kan hela??
   case "ADD_STUDENT":
   return [...state,action.payload.values];
   
   case "DELETE_DATA":
    return state.filter((obj) => obj.id !==action.payload.id);
    case "RESET_STATE":
        return initialState;
    case "EDIT_DATA":
     const updattedData =updateObjectById(state,action.payload.id.values,action.payload.values)
     return updattedData
     default:
       return state;
 }
}
