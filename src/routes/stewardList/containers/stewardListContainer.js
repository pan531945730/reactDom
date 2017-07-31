import { connect } from 'react-redux'
import { fetchStewardList, } from './../modules/stewardList'

import stewardList0 from '../components/stewardList'

const mapDispatchtoProps = {
  fetchStewardList,
}

const mapStateToProps = (state) => ({
  stewardList11: state.stewardList12
})

export default connect(mapStateToProps, mapDispatchtoProps)(stewardList0)
