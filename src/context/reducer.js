export const reducer = (state, action) => {
  
  switch (action.type) {
  
    case "fetching" : {
      return {
        ...state,
        fetching : true,
      }
    }

    case "fetch-complete" : {
      return {
        ...state,
        fetching : false,
      }
    }

    case "update-countries" : {
      return {
        ...state,
        countries : [... action.payload]
      }
    }


    default:
      return state
  }
}

export const initialState = {
  countries : null,
  fetching : true,
}