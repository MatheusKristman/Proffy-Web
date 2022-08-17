import React from 'react';
import logo from '../images/logo.png';
import notFound from '../images/not-found.png';
import './NotFound.css';

function NotFound() {
    return (
        <div className='not-found-container'>
            <img src={logo} alt='logo' className='not-found-logo' />

            <div className='not-found-box'>
                <h1 className='not-found-error'>Error 404</h1>
                <img src={notFound} alt='not-found' className='not-found-image' />
                <h2 className='not-found-title'>Pagina não encontrada</h2>
                <button className='not-found-btn'>Voltar para home</button>
            </div>
        </div>
    )
}

export default NotFound;
