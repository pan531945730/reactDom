import React from 'react'
import PropTypes from 'prop-types'
import FootBar from '../../components/FootBar'
import './CoreLayout.scss'
import '../../styles/core.scss'

export const CoreLayout = ({ children }) => (
  <div className='container'>
    <div className='core-layout__viewport'>
      {children}
    </div>
    <FootBar />
  </div>
)

CoreLayout.propTypes = {
  children: PropTypes.element.isRequired
}

export default CoreLayout
