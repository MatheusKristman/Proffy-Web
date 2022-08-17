import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';
import people from '../images/people.png';
import './Home.css';

function Home() {   

    const navigate = useNavigate();

    function goStudy() {
        navigate('/list');
    }

    function goLesson() {
        navigate('/register');
    }

    return (
        <div className='home-container'>
            <div className='home-wrapper'>
                <div className='home-info'>
                    <img src={logo} alt={logo} className='home-logo' />
                    <p className='home-info-desc'>Sua plataforma de estudos online.</p>
                </div>
                <div className='home-images'>
                    <img src={people} alt='people' className='home-image-people' />
                </div>
                <div className='home-buttons-wrapper'>
                    <div className='home-buttons'>
                        <button className='home-button-study' onClick={goStudy}>Estudar</button>
                        <button className='home-button-lesson' onClick={goLesson}>Dar aulas</button>
                    </div>
                    <div className='home-users-box'>
                        <small>Total de 285 conexões já realizadas </small> <p>&#128156;</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
