import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import arrowBack from '../images/arrow-back.svg';
import logo from '../images/logo-register.png';
import people1 from '../images/people1.jpg';
import people2 from '../images/people2.jpg';
import './List.css';


function List() {
    const [hasResult, setHasResult] = useState(false);
    const [searchActive, setSearchActive] = useState(false);
    const [isDaySelectOpen, setIsDaySelectOpen] = useState(false);
    const [weekText, setWeekText] = useState('');
    const [weekOptions, setWeekOptions] = useState({
        segunda: false,
        terca: false,
        quarta: false,
        quinta: false,
        sexta: false
    });
    const [searchData, setSearchData] = useState({
        subject: '',
        day: '',
        schedule: ''
    });

    useEffect(() => {
        setSearchData({ ...searchData, day: weekText })
    }, [weekText]);

    useEffect(() => {
        if (searchData.subject !== '' && searchData.day !== '' && searchData.schedule !== '') {
            setSearchActive(true);
        }
    }, [searchData]);

    function addInputData(e) {
        const { name, value } = e.target;
        setSearchData({ ...searchData, [name]: value });
    }

    function handleSelect(e) {
        if (!e.target.classList.contains('list-infos-select-week-option') && !e.target.classList.contains('list-infos-select-week-option-text')) {
            setIsDaySelectOpen(!isDaySelectOpen);
        }
    }

    function changeWeekOption(option) {
        const newObj = { ...weekOptions };
        Object.keys(newObj).forEach(key => {
            newObj[key] = false;
        });
        newObj[option] = true;
        setWeekOptions(newObj);
        setIsDaySelectOpen(false);
    }

    return (
        <div className='list-container'>
            <div className='list-background' />
            <div className='list-wrapper'>
                <header className='list-header'>
                    <Link to='/' className='list-header-back'>
                        <img src={arrowBack} alt='back' className='list-header-back-image' />
                    </Link>

                    <img src={logo} alt='logo' className='list-header-logo' />
                </header>

                <div className='list-infos'>
                    <h1 className='list-infos-title'>Estes são os proffys disponíveis</h1>

                    <div className='list-infos-wrapper'>
                        <div className='list-infos-school-subject'>
                            <span className='list-infos-placeholder'>Matéria</span>
                            <input type='text' name='subject' value={searchData.subject} onChange={addInputData} className='list-infos-input-school-subject' />
                        </div>

                        <div className='list-infos-week'>
                            <span className='list-infos-placeholder'>Dia da semana</span>
                            <div onClick={handleSelect} className='list-infos-select-week'>
                                <span>
                                    {weekText}
                                </span>
                                <button className='list-infos-select-week-button' />
                                <div className={isDaySelectOpen ? 'list-infos-select-week-options' : 'list-infos-select-week-options list-select-desactive'}>
                                    <div 
                                        className={weekOptions.segunda ? 'list-infos-select-week-option list-option-selected' : 'list-infos-select-week-option'}
                                        onClick={(e) => {
                                            changeWeekOption('segunda');
                                            setWeekText(e.target.textContent);
                                        }}
                                    >
                                        <span className='list-infos-select-week-option-text'>Segunda</span>
                                    </div>

                                    <div 
                                        className={weekOptions.terca ? 'list-infos-select-week-option list-option-selected': 'list-infos-select-week-option'}
                                        onClick={(e) => {
                                            changeWeekOption('terca');
                                            setWeekText(e.target.textContent);
                                        }}
                                    >
                                        <span className='list-infos-select-week-option-text'>Terça</span>
                                    </div>

                                    <div 
                                        className={weekOptions.quarta ? 'list-infos-select-week-option list-option-selected': 'list-infos-select-week-option'}
                                        onClick={(e) => {
                                            changeWeekOption('quarta');
                                            setWeekText(e.target.textContent);
                                        }}                                        
                                    >
                                        <span className='list-infos-select-week-option-text'>Quarta</span>
                                    </div>

                                    <div 
                                        className={weekOptions.quinta ? 'list-infos-select-week-option list-option-selected': 'list-infos-select-week-option'}
                                        onClick={(e) => {
                                            changeWeekOption('quinta');
                                            setWeekText(e.target.textContent);
                                        }}
                                    >
                                        <span className='list-infos-select-week-option-text'>Quinta</span>
                                    </div>

                                    <div 
                                        className={weekOptions.sexta ? 'list-infos-select-week-option list-option-selected': 'list-infos-select-week-option'}
                                        onClick={(e) => {
                                            changeWeekOption('sexta');
                                            setWeekText(e.target.textContent);
                                        }}
                                    >
                                        <span className='list-infos-select-week-option-text'>Sexta</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='list-infos-schedule'>
                            <span className='list-infos-placeholder'>Horário</span>
                            <input type='text' name='schedule' value={searchData.schedule} onChange={addInputData} className='list-infos-input-schedule' />
                        </div>
                    </div>
                </div>
                {searchActive ? ( 
                    hasResult ? (
                        <div className='list-result'>
                            <div className='list-result-card'>
                                <div className='list-result-wrapper'>
                                    <div className='list-result-titles'>
                                        <img src={people1} alt='profile' className='list-result-profile-image' />
                                        <div className='list-result-titles-text'>
                                            <h1 className='list-result-name'>Bruna Fernandes</h1>
                                            <h2 className='list-result-school-subject'>Química</h2>
                                        </div>                                
                                    </div>
    
                                    <div className='list-result-descs'>
                                        <div className='list-result-desc'>
                                            <span>Entusiasta das melhores tecnologias de química avançada.</span>
    
                                            <span>
                                                Apaixonada por explodir coisas em laboratório e por mudar a vida das
                                                pessoas através de experiências. Mais de 200.000 pessoas já passaram por 
                                                uma das minhas explosões.
                                            </span>
                                        </div>
                                    </div>
    
                                    <div className='list-result-infos'>
                                        <div className='list-result-infos-values'>
                                            <span className='list-result-value-desc'>Preço/hora</span>
                                            <h2 className='list-result-value'>R$ 20,00</h2>                                    
                                        </div>
                                        <div className='list-result-buttons'>
                                            <button className='list-result-button'>Entrar em contato</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
    
                            <div className='list-result-card'>
                                <div className='list-result-wrapper'>
                                    <div className='list-result-titles'>
                                        <img src={people2} alt='profile' className='list-result-profile-image' />
                                        <div className='list-result-titles-text'>
                                            <h1 className='list-result-name'>Mayk Brito</h1>
                                            <h2 className='list-result-school-subject'>Educação Física </h2>
                                        </div>
                                    </div>
    
                                    <div className='list-result-descs'>
                                        <div className='list-result-desc'>
                                            <span>
                                                Instrutor de Educação Física para iniciantes, minha missão de vida é levar
                                                saúde e contribuir para o crescimento de quem se interessar.
                                            </span>
    
                                            <span>
                                                Comecei a minha jornada profissional em 2001, quando meu pai me deu
                                                dois alteres de 32kg com a seguinte condição: "Aprenda a fazer dinheiro
                                                com isso!"
                                            </span>
                                        </div>
                                    </div>
    
                                    <div className='list-result-infos'>
                                        <div className='list-result-infos-values'>
                                            <span className='list-result-value-desc'>Preço/hora</span>
                                            <h2 className='list-result-value'>R$ 40,00</h2>                                    
                                        </div>
                                        <div className='list-result-buttons'>
                                            <button className='list-result-button'>Entrar em contato</button> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>) : (
                            <div className='list-result'>
                                <div className='list-result-not-found'>
                                    <p className='list-result-not-found-text'>Nenhum professor encontrado com sua pesquisa.</p>
                                </div>
                            </div>
                        )
                    ) : (
                        null
                    )
                }
                
            </div>
        </div>
    )
}

export default List;
