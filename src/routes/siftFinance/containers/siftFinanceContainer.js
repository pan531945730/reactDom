import { connect } from 'react-redux'
import { fetchSiftFinance, clearSiftFinance, } from './../modules/siftFinance'

import siftFinance from '../components/siftFinance'

const mapDispatchtoProps = {
  fetchSiftFinance,
  clearSiftFinance,
}

const mapStateToProps = (state) => ({
  siftFinance: state.siftFinance
})

export default connect(mapStateToProps, mapDispatchtoProps)(siftFinance)
