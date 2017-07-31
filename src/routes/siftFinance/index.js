import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'siftFinance',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const siftFinance = require('./containers/siftFinanceContainer').default
      const reducer = require('./modules/siftFinance').default
      injectReducer(store, { key: 'siftFinance', reducer })
      cb(null, siftFinance)
    })
  }
})
