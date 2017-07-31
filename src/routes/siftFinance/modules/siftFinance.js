// ------------------------------------
// Constants
// ------------------------------------
const RECEIVE_SIFT = 'RECEIVE_SIFT'
const REQUEST_SIFT = 'REQUEST_SIFT'
const CLEAR_SIFT = 'CLEAR_SIFT'

// ------------------------------------
// Actions
// ------------------------------------

function requestSiftFinance () {
  return {
    type: REQUEST_SIFT
  }
}

let avaliableId = 0
export const receiveSiftFinance = (value) => ({
  type: RECEIVE_SIFT,
  payload: {
    text: value,
    id: avaliableId++
  }
})

export const clearSiftFinance = () => ({
  type: CLEAR_SIFT
})

export function fetchSiftFinance () {
  return (dispatch, getState) => {
    if (getState().siftFinance.fetching) return

    dispatch(requestSiftFinance())
    return fetch('http://np.94bank.com/api/Ajax', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            body: 'M=GetProductList&D={"ProductTypeId":2,"PageIndex":1,"PageSize":15}'
          })
      .then(data => data.text())
      .then(text => dispatch(receiveSiftFinance(JSON.parse(text)['D'])))
  }
}

export const actions = {
  requestSiftFinance,
  receiveSiftFinance,
  clearSiftFinance,
  fetchSiftFinance
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REQUEST_SIFT]: (state) => {
    return ({...state, fetching: true})
  },
  [RECEIVE_SIFT]: (state, action) => {
    return ({...state, fetching: false, text: [action.payload]})
  },
  [CLEAR_SIFT]: (state) => {
    return ({...state, text: []})
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  fetching: false,
  text: []
}
export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  console.log(action.type)
  return handler ? handler(state, action) : state
}
