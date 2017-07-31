// ------------------------------------
// Constants
// ------------------------------------
const RECEIVE_STEWARD = 'RECEIVE_STEWARD'
const REQUEST_STEWARD = 'REQUEST_STEWARD'

// ------------------------------------
// Actions
// ------------------------------------

function requestStewardList () {
  return {
    type: REQUEST_STEWARD
  }
}

let avaliableId = 0
export const receiveStewardList = (value) => ({
  type: RECEIVE_STEWARD,
  payload: {
    text: value,
    id: avaliableId++
  }
})

export function fetchStewardList () {
  return (dispatch, getState) => {
    if (getState().stewardList12.fetching) return

    dispatch(requestStewardList())
    return fetch('http://np.94bank.com/api/Ajax', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            body: 'M=GetProductList&D={"ProductTypeId":1,"PageIndex":1,"PageSize":15}'
          })
      .then(data => data.text())
      .then(text => dispatch(receiveStewardList(JSON.parse(text)['D'])))
  }
}

export const actions = {
  requestStewardList,
  receiveStewardList,
  fetchStewardList
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REQUEST_STEWARD]: (state) => {
    return ({...state, fetching: true})
  },
  [RECEIVE_STEWARD]: (state, action) => {
    return ({...state, fetching: false, text: [action.payload]})
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
  return handler ? handler(state, action) : state
}
