import { fromJS } from 'immutable'

const ActionTypes = {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
  RESET: 'RESET',
}

const ActionTypeList = Object.keys(ActionTypes)

const createActionType = namespace =>
  ActionTypeList.reduce((map, actionType) => ({
    ...map,
    [actionType]: `${namespace}/${actionType}`,
  }), {})

export default (namespace, {
  action,
  reset,
  payload = {},
  response = {},
  reducer = () => {},
  effect = () => {},
  // selectors,
}) => {
  const actionTypes = createActionType(namespace)

  return {
    state: {
      payload: fromJS(payload),
      response: fromJS(response),
      error: null,
      pending: false,
    },
    reducers: {
      [actionTypes[ActionTypes.PENDING]](state, payload) {
        return {
          ...state,
          pending: true,
          payload: fromJS({ ...state.payload.toJS(), ...payload }),
        }
      },
      [actionTypes[ActionTypes.SUCCESS]](state, response) {
        return {
          ...state,
          pending: false,
          response: fromJS(reducer(response)),
        }
      },
      [actionTypes[ActionTypes.FAILURE]](state, error) {
        return {
          ...state,
          pending: false,
          error,
        }
      },
      [actionTypes[ActionTypes.RESET]](state) {
        return {
          ...state,
          pending: false,
          error: null,
          payload: state.payload.clear(),
          response: state.response.clear(),
        }
      },
    },
    effects: dispatch => ({
      async [action](payload) {
        try {
          dispatch({
            type: actionTypes[ActionTypes.PENDING],
            payload,
          })

          const resp = await effect(payload)

          dispatch({
            type: actionTypes[ActionTypes.SUCCESS],
            payload: resp,
          })
        } catch (error) {
          dispatch({
            type: actionTypes[ActionTypes.FAILURE],
            payload: error.message || '接口调用失败',
          })
        }
      },
      [reset]() {
        dispatch({
          type: actionTypes[ActionTypes.RESET],
        })
      },
    }),
  }
}
