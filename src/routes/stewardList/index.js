import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'stewardList',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const stewardList = require('./containers/stewardListContainer').default
      const reducer = require('./modules/stewardList').default
      injectReducer(store, { key: 'stewardList12', reducer })
      cb(null, stewardList)
    })
  }
})
