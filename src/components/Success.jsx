import React from 'react'
import './Success.css';

function Success(props) {
  return (
    <div className='success-container' style={props.style}>
        <div className='success-modal'>
            <h2>Registrado com sucesso</h2>
            <p>Redirecionando para Home...</p>
        </div>
    </div>
  )
}

export default Success