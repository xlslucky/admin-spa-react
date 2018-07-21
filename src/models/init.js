import { fromJS } from 'immutable'
import { message } from 'antd'

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
  store,
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
          payload,
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
      async [action](payload = {}, state) {
        let nextPayload = fromJS(payload)
        if (store) {
          nextPayload = fromJS({ ...state[namespace].payload.toJS(), ...payload })
        }
        try {
          dispatch({
            type: actionTypes[ActionTypes.PENDING],
            payload: nextPayload,
          })

          const { data } = await effect(nextPayload.toJS())

          if (data.code < 0) {
            /* eslint-disable no-console */
            console.log(data)
            if (data.msg.length > 50) {
              message.error('接口调用异常，请联系系统管理员')
            } else {
              message.error(data.msg)
            }
            dispatch({
              type: actionTypes[ActionTypes.FAILURE],
              payload: data.msg,
            })
          } else {
            dispatch({
              type: actionTypes[ActionTypes.SUCCESS],
              payload: data,
            })
          }
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
