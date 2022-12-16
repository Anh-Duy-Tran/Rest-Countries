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

    case "set-country" : {
      return {
        ...state,
        country : {...action.payload}
      }
    }

    case "update-query" : {
      return {
        ...state,
        query : action.payload
      }
    }


    default:
      return state
  }
}

export const initialState = {
  countries : null,
  fetching : true,
  country : null,
  query : ''
}