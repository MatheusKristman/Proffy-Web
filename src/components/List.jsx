import React, { useState, useEffect, useCallback } from 'react';
import {Link} from 'react-router-dom';
import arrowBack from '../images/arrow-back.svg';
import logo from '../images/logo-register.png';
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
    const [savedData, setSavedData] = useState([]);
    const [isScheduleSelectOpen, setIsScheduleSelectOpen] = useState(false);
    const [scheduleOptions, setScheduleOptions] = useState({
        zero: false,
        um: false,
        dois: false,
        tres: false,
        quatro: false,
        cinco: false,
        seis: false,
        sete: false,
        oito: false,
        nove: false,
        dez: false,
        onze: false,
        doze: false,
        treze: false,
        quatorze: false,
        quinze: false,
        dezeseis: false,
        dezesete: false,
        dezoito: false,
        dezenove: false,
        vinte: false,
        vinteUm: false,
        vinteDois: false,
        vinteTres: false,
        todos: false
    });
    const [scheduleText, setScheduleText] = useState('');

    useEffect(() => {
        const savedResult = JSON.parse(localStorage.getItem("teacher-data")) || [];
        setSavedData(savedResult);
    }, []);    

    useEffect(() => {

        if (savedData.length === 0) {
            setHasResult(false);
        } else {
            setHasResult(true);
        }

    }, [savedData]);

    function addInputData(e) {
        const { name, value } = e.target;
        setSearchData({ ...searchData, [name]: value });
    }

    const handleSearch = useCallback(async () => {
        if (searchData.subject !== "" && searchData.day !== "" && searchData.schedule === "todos"){
            setSearchActive(true);

            const reset = await JSON.parse(localStorage.getItem("teacher-data")) || [];
            
            const filteredResultSubject = await reset.filter((subject) => subject.materia.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchData.subject.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")));            

            const filteredResultDay = await filteredResultSubject.filter((data) => data.horario.find((horario) => horario.dia === searchData.day));

            setSavedData(await filteredResultDay);

            return;
        }
        
        if (searchData.subject !== '' && searchData.day !== '' && searchData.schedule !== '') {
            setSearchActive(true);
            
            const reset = await JSON.parse(localStorage.getItem("teacher-data")) || [];
            
            const filteredResultSubject = await reset.filter((subject) => subject.materia.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchData.subject.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")));            

            const filteredResultDay = await filteredResultSubject.filter((data) => data.horario.find((horario) => horario.dia === searchData.day));

            const filteredResultSchedule = await filteredResultDay.filter((data) => data.horario.find((horario) => Number(horario.inicio) <= Number(searchData.schedule) && Number(horario.fim) >= Number(searchData.schedule.trim())));
            
            setSavedData(await filteredResultSchedule);
        }
    }, [searchData]);

    useEffect(() => {
        
        handleSearch();

    }, [searchData, handleSearch]);

    function handleSelect(e) {
        console.log(e.target);
        if (!e.target.classList.contains('list-infos-select-week-option')) {
            setIsDaySelectOpen(!isDaySelectOpen);
        }
    }

    function handleSelectSchedule(e) {
        if (!e.target.classList.contains("list-infos-select-schedule-option")) {
            setIsScheduleSelectOpen(!isScheduleSelectOpen);
        }
    }

    function blurDaySelect(e) {
        if(!e.target.classList.contains('list-infos-select-week-option') && !e.target.classList.contains("list-infos-select-week-button")){
            setIsDaySelectOpen(false);
        }
    }

    function blurScheduleSelect(e) {
        if (!e.target.classList.contains("list-infos-select-schedule-option") && !e.target.classList.contains("list-infos-select-schedule-button")) {
            setIsScheduleSelectOpen(false); 
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

    function changeScheduleOption(option) {
        const newObj = { ...weekOptions };
        Object.keys(newObj).forEach(key => {
            newObj[key] = false;
        });
        newObj[option] = true;
        setScheduleOptions(newObj);
        setIsScheduleSelectOpen(false);
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
                            <input type='text' name='subject' value={searchData.subject} onBlur={handleSearch} onChange={addInputData} className='list-infos-input-school-subject' />
                        </div>

                        <div onBlur={blurDaySelect} tabIndex="-1" className='list-infos-week'>
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
                                            setSearchData({ ...searchData, day: e.target.textContent });
                                        }}
                                    >
                                        <span className='list-infos-select-week-option-text'>Segunda</span>
                                    </div>

                                    <div 
                                        className={weekOptions.terca ? 'list-infos-select-week-option list-option-selected': 'list-infos-select-week-option'}
                                        onClick={(e) => {
                                            changeWeekOption('terca');
                                            setWeekText(e.target.textContent);
                                            setSearchData({ ...searchData, day: e.target.textContent });
                                        }}
                                    >
                                        <span className='list-infos-select-week-option-text'>Terça</span>
                                    </div>

                                    <div 
                                        className={weekOptions.quarta ? 'list-infos-select-week-option list-option-selected': 'list-infos-select-week-option'}
                                        onClick={(e) => {
                                            changeWeekOption('quarta');
                                            setWeekText(e.target.textContent);
                                            setSearchData({ ...searchData, day: e.target.textContent });
                                        }}                                        
                                    >
                                        <span className='list-infos-select-week-option-text'>Quarta</span>
                                    </div>

                                    <div 
                                        className={weekOptions.quinta ? 'list-infos-select-week-option list-option-selected': 'list-infos-select-week-option'}
                                        onClick={(e) => {
                                            changeWeekOption('quinta');
                                            setWeekText(e.target.textContent);
                                            setSearchData({ ...searchData, day: e.target.textContent });
                                        }}
                                    >
                                        <span className='list-infos-select-week-option-text'>Quinta</span>
                                    </div>

                                    <div 
                                        className={weekOptions.sexta ? 'list-infos-select-week-option list-option-selected': 'list-infos-select-week-option'}
                                        onClick={(e) => {
                                            changeWeekOption('sexta');
                                            setWeekText(e.target.textContent);
                                            setSearchData({ ...searchData, day: e.target.textContent });
                                        }}
                                    >
                                        <span className='list-infos-select-week-option-text'>Sexta</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div onBlur={blurScheduleSelect} tabIndex="-1" className='list-infos-schedule'>
                            <span className='list-infos-placeholder'>Horario</span>
                            <div onClick={handleSelectSchedule} className='list-infos-select-schedule'>
                                <span>
                                    {scheduleText}
                                </span>
                                <button className='list-infos-select-schedule-button' />
                                <div className={isScheduleSelectOpen ? 'list-infos-select-schedule-options' : 'list-infos-select-schedule-options list-select-desactive'}>
                                    <div 
                                        className={scheduleOptions.zero ? 'list-infos-select-schedule-option list-option-selected' : 'list-infos-select-schedule-option'}
                                        onClick={(e) => {
                                            changeScheduleOption('zero');
                                            setScheduleText(e.target.textContent);
                                            setSearchData({ ...searchData, schedule: "0" });
                                        }}
                                    >
                                        <span className='list-infos-select-schedule-option-text'>00 AM</span>
                                    </div>                                                                     
                                    <div 
                                        className={scheduleOptions.um ? 'list-infos-select-schedule-option list-option-selected' : 'list-infos-select-schedule-option'}
                                        onClick={(e) => {
                                            changeScheduleOption('um');
                                            setScheduleText(e.target.textContent);
                                            setSearchData({ ...searchData, schedule: "1" });
                                        }}
                                    >
                                        <span className='list-infos-select-schedule-option-text'>01 AM</span>
                                    </div>
                                    <div 
                                        className={scheduleOptions.dois ? 'list-infos-select-schedule-option list-option-selected' : 'list-infos-select-schedule-option'}
                                        onClick={(e) => {
                                            changeScheduleOption('dois');
                                            setScheduleText(e.target.textContent);
                                            setSearchData({ ...searchData, schedule: "2" });
                                        }}
                                    >
                                        <span className='list-infos-select-schedule-option-text'>02 AM</span>
                                    </div>
                                    <div 
                                        className={scheduleOptions.tres ? 'list-infos-select-schedule-option list-option-selected' : 'list-infos-select-schedule-option'}
                                        onClick={(e) => {
                                            changeScheduleOption('tres');
                                            setScheduleText(e.target.textContent);
                                            setSearchData({ ...searchData, schedule: "3" });
                                        }}
                                    >
                                        <span className='list-infos-select-schedule-option-text'>03 AM</span>
                                    </div>
                                    <div 
                                        className={scheduleOptions.quatro ? 'list-infos-select-schedule-option list-option-selected' : 'list-infos-select-schedule-option'}
                                        onClick={(e) => {
                                            changeScheduleOption('quatro');
                                            setScheduleText(e.target.textContent);
                                            setSearchData({ ...searchData, schedule: "4" });
                                        }}
                                    >
                                        <span className='list-infos-select-schedule-option-text'>04 AM</span>
                                    </div>
                                    <div 
                                        className={scheduleOptions.cinco ? 'list-infos-select-schedule-option list-option-selected' : 'list-infos-select-schedule-option'}
                                        onClick={(e) => {
                                            changeScheduleOption('cinco');
                                            setScheduleText(e.target.textContent);
                                            setSearchData({ ...searchData, schedule: "5" });
                                        }}
                                    >
                                        <span className='list-infos-select-schedule-option-text'>05 AM</span>
                                    </div>
                                    <div 
                                        className={scheduleOptions.seis ? 'list-infos-select-schedule-option list-option-selected' : 'list-infos-select-schedule-option'}
                                        onClick={(e) => {
                                            changeScheduleOption('seis');
                                            setScheduleText(e.target.textContent);
                                            setSearchData({ ...searchData, schedule: "6" });
                                        }}
                                    >
                                        <span className='list-infos-select-schedule-option-text'>06 AM</span>
                                    </div>
                                    <div 
                                        className={scheduleOptions.sete ? 'list-infos-select-schedule-option list-option-selected' : 'list-infos-select-schedule-option'}
                                        onClick={(e) => {
                                            changeScheduleOption('sete');
                                            setScheduleText(e.target.textContent);
                                            setSearchData({ ...searchData, schedule: "7" });
                                        }}
                                    >
                                        <span className='list-infos-select-schedule-option-text'>07 AM</span>
                                    </div>
                                    <div 
                                        className={scheduleOptions.oito ? 'list-infos-select-schedule-option list-option-selected' : 'list-infos-select-schedule-option'}
                                        onClick={(e) => {
                                            changeScheduleOption('oito');
                                            setScheduleText(e.target.textContent);
                                            setSearchData({ ...searchData, schedule: "8" });
                                        }}
                                    >
                                        <span className='list-infos-select-schedule-option-text'>08 AM</span>
                                    </div>
                                    <div 
                                        className={scheduleOptions.nove ? 'list-infos-select-schedule-option list-option-selected' : 'list-infos-select-schedule-option'}
                                        onClick={(e) => {
                                            changeScheduleOption('nove');
                                            setScheduleText(e.target.textContent);
                                            setSearchData({ ...searchData, schedule: "9" });
                                        }}
                                    >
                                        <span className='list-infos-select-schedule-option-text'>09 AM</span>
                                    </div>
                                    <div 
                                        className={scheduleOptions.dez ? 'list-infos-select-schedule-option list-option-selected' : 'list-infos-select-schedule-option'}
                                        onClick={(e) => {
                                            changeScheduleOption('dez');
                                            setScheduleText(e.target.textContent);
                                            setSearchData({ ...searchData, schedule: "10" });
                                        }}
                                    >
                                        <span className='list-infos-select-schedule-option-text'>10 AM</span>
                                    </div>
                                    <div 
                                        className={scheduleOptions.onze ? 'list-infos-select-schedule-option list-option-selected' : 'list-infos-select-schedule-option'}
                                        onClick={(e) => {
                                            changeScheduleOption('onze');
                                            setScheduleText(e.target.textContent);
                                            setSearchData({ ...searchData, schedule: "11" });
                                        }}
                                    >
                                        <span className='list-infos-select-schedule-option-text'>11 AM</span>
                                    </div>
                                    <div 
                                        className={scheduleOptions.doze ? 'list-infos-select-schedule-option list-option-selected' : 'list-infos-select-schedule-option'}
                                        onClick={(e) => {
                                            changeScheduleOption('doze');
                                            setScheduleText(e.target.textContent);
                                            setSearchData({ ...searchData, schedule: "12" });
                                        }}
                                    >
                                        <span className='list-infos-select-schedule-option-text'>12 AM</span>
                                    </div>
                                    <div 
                                        className={scheduleOptions.treze ? 'list-infos-select-schedule-option list-option-selected' : 'list-infos-select-schedule-option'}
                                        onClick={(e) => {
                                            changeScheduleOption('treze');
                                            setScheduleText(e.target.textContent);
                                            setSearchData({ ...searchData, schedule: "13" });
                                        }}
                                    >
                                        <span className='list-infos-select-schedule-option-text'>13 PM</span>
                                    </div>
                                    <div 
                                        className={scheduleOptions.quatorze ? 'list-infos-select-schedule-option list-option-selected' : 'list-infos-select-schedule-option'}
                                        onClick={(e) => {
                                            changeScheduleOption('quatorze');
                                            setScheduleText(e.target.textContent);
                                            setSearchData({ ...searchData, schedule: "14" });
                                        }}
                                    >
                                        <span className='list-infos-select-schedule-option-text'>14 PM</span>
                                    </div>
                                    <div 
                                        className={scheduleOptions.quinze ? 'list-infos-select-schedule-option list-option-selected' : 'list-infos-select-schedule-option'}
                                        onClick={(e) => {
                                            changeScheduleOption('quinze');
                                            setScheduleText(e.target.textContent);
                                            setSearchData({ ...searchData, schedule: "15" });
                                        }}
                                    >
                                        <span className='list-infos-select-schedule-option-text'>15 PM</span>
                                    </div>
                                    <div 
                                        className={scheduleOptions.dezeseis ? 'list-infos-select-schedule-option list-option-selected' : 'list-infos-select-schedule-option'}
                                        onClick={(e) => {
                                            changeScheduleOption('dezeseis');
                                            setScheduleText(e.target.textContent);
                                            setSearchData({ ...searchData, schedule: "16" });
                                        }}
                                    >
                                        <span className='list-infos-select-schedule-option-text'>16 PM</span>
                                    </div>
                                    <div 
                                        className={scheduleOptions.dezesete ? 'list-infos-select-schedule-option list-option-selected' : 'list-infos-select-schedule-option'}
                                        onClick={(e) => {
                                            changeScheduleOption('dezesete');
                                            setScheduleText(e.target.textContent);
                                            setSearchData({ ...searchData, schedule: "17" });
                                        }}
                                    >
                                        <span className='list-infos-select-schedule-option-text'>17 PM</span>
                                    </div>
                                    <div 
                                        className={scheduleOptions.dezoito ? 'list-infos-select-schedule-option list-option-selected' : 'list-infos-select-schedule-option'}
                                        onClick={(e) => {
                                            changeScheduleOption('dezoito');
                                            setScheduleText(e.target.textContent);
                                            setSearchData({ ...searchData, schedule: "18" });
                                        }}
                                    >
                                        <span className='list-infos-select-schedule-option-text'>18 PM</span>
                                    </div>
                                    <div 
                                        className={scheduleOptions.dezenove ? 'list-infos-select-schedule-option list-option-selected' : 'list-infos-select-schedule-option'}
                                        onClick={(e) => {
                                            changeScheduleOption('dezenove');
                                            setScheduleText(e.target.textContent);
                                            setSearchData({ ...searchData, schedule: "19" });
                                        }}
                                    >
                                        <span className='list-infos-select-schedule-option-text'>19 PM</span>
                                    </div>
                                    <div 
                                        className={scheduleOptions.vinte ? 'list-infos-select-schedule-option list-option-selected' : 'list-infos-select-schedule-option'}
                                        onClick={(e) => {
                                            changeScheduleOption('vinte');
                                            setScheduleText(e.target.textContent);
                                            setSearchData({ ...searchData, schedule: "20" });
                                        }}
                                    >
                                        <span className='list-infos-select-schedule-option-text'>20 PM</span>
                                    </div>
                                    <div 
                                        className={scheduleOptions.vinteUm ? 'list-infos-select-schedule-option list-option-selected' : 'list-infos-select-schedule-option'}
                                        onClick={(e) => {
                                            changeScheduleOption('vinteUm');
                                            setScheduleText(e.target.textContent);
                                            setSearchData({ ...searchData, schedule: "21" });
                                        }}
                                    >
                                        <span className='list-infos-select-schedule-option-text'>21 PM</span>
                                    </div>
                                    <div 
                                        className={scheduleOptions.vinteDois ? 'list-infos-select-schedule-option list-option-selected' : 'list-infos-select-schedule-option'}
                                        onClick={(e) => {
                                            changeScheduleOption('vinteDois');
                                            setScheduleText(e.target.textContent);
                                            setSearchData({ ...searchData, schedule: "22" });
                                        }}
                                    >
                                        <span className='list-infos-select-schedule-option-text'>22 PM</span>
                                    </div>
                                    <div 
                                        className={scheduleOptions.vinteTres ? 'list-infos-select-schedule-option list-option-selected' : 'list-infos-select-schedule-option'}
                                        onClick={(e) => {
                                            changeScheduleOption('vinteTres');
                                            setScheduleText(e.target.textContent);
                                            setSearchData({ ...searchData, schedule: "23" });
                                        }}
                                    >
                                        <span className='list-infos-select-schedule-option-text'>23 PM</span>
                                    </div>
                                    <div 
                                        className={scheduleOptions.todos ? 'list-infos-select-schedule-option list-option-selected' : 'list-infos-select-schedule-option'}
                                        onClick={(e) => {
                                            changeScheduleOption('todos');
                                            setScheduleText(e.target.textContent);
                                            setSearchData({ ...searchData, schedule: "todos" });
                                        }}
                                    >
                                        <span className='list-infos-select-schedule-option-text'>Qualquer Horario</span>
                                    </div>                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {searchActive ? ( 
                    hasResult ? (
                        <div className='list-result'>
                            {savedData.map((data, index) => (
                                <div key={index} className="list-result-card">
                                    <div className="list-result-wrapper">
                                        <div className="list-result-titles">
                                            <img src={data.foto} alt="profile" className="list-result-profile-image" />
                                            <div className="list-result-titles-text">
                                                <h1 className="list-result-name">{data.nome}</h1>
                                                <h2 className="list-result-school-subject">{data.materia}</h2>
                                            </div>
                                        </div>

                                        <div className="list-result-descs">
                                            <div className="list-result-desc">
                                                {data.bio.split(/\r?\n/).map((str, index) => (
                                                    <span key={index}>{str}</span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="list-result-infos">
                                            <div className="list-result-infos-values">
                                                <span className="list-result-value-desc">Preço/hora</span>
                                                <h2 className="list-result-value">R$ {data.custo},00</h2>
                                            </div>
                                            <div className="list-result-buttons">
                                                <button className="list-result-button">Entrar em contato</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}                            
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
