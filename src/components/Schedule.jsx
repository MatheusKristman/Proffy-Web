import React, { useState, useEffect } from 'react';
import './Register.css';

function Schedule({ update, scheduleError }) {
    const [isWeekClicked, setIsWeekClicked] = useState(false);
    const [weekOptions, setWeekOptions] = useState({
        segunda: false,
        terca: false,
        quarta: false,
        quinta: false,
        sexta: false
    });    
    const [values, setValues] = useState({
        dia: null,
        inicio: null,
        fim: null
    });
    
    useEffect(() => {
        if(values.inicio && values.fim && values.dia){
            update(values);
        }
    }, [values]);

    function handleChange(params) {
        if(!params){
            return
        }

        if('inicio' in params){
            return setValues({
                dia: values.dia,
                inicio: params.inicio,
                fim: values.fim
            })
        }

        if('fim' in params){
            return setValues({
                dia: values.dia,
                inicio: values.inicio,
                fim: params.fim
            })
        }

        if('dia' in params){
            return setValues({
                dia: params.dia,
                inicio: values.inicio,
                fim: values.fim
            })
        }
    }

    function openWeekSelect(e) {
        e.preventDefault();
        if(!e.target.classList.contains('register-box-form-select-week-option')){
            setIsWeekClicked(!isWeekClicked);
        }
    }

    function changeWeekOption(option) {
        const newObj = { ...weekOptions };
        Object.keys(newObj).forEach(key => {
            newObj[key] = false;
        });
        newObj[option] = true;
        setWeekOptions(newObj);
        setIsWeekClicked(false);
    }

    function blurWeekSelect(e) {
        if(!e.target.classList.contains('register-box-form-select-week-option')){
            setIsWeekClicked(false);
        }
    }

    return (
        <div className='register-box-form-schedule-wrapper'>
            <div onBlur={blurWeekSelect} tabIndex='-1' className='register-box-form-div-week'>
                <span className='register-box-form-placeholder'>
                    Dia da semana
                </span>
                <div onClick={openWeekSelect} className={scheduleError.schedule ? 'register-box-form-select-week register-error' : 'register-box-form-select-week'}>
                    <span className={values.dia === '' ? 'register-box-form-select-placeholder' : 'register-box-form-select-week-text'}>
                        {values.dia === '' ? 'Selecione o dia' : values.dia}
                    </span>
                    <button className='register-box-form-select-week-button' />
                    <div className={ isWeekClicked ? 'register-box-form-select-week-options' : 'register-box-form-select-week-options select-desactive' }>
                        <div 
                            onClick={(e) => {
                                changeWeekOption('segunda');                                
                                handleChange({dia: 'Segunda'})
                            }}
                            className={weekOptions.segunda ? 'register-box-form-select-week-option option-selected' : 'register-box-form-select-week-option'}
                        >
                            Segunda
                        </div>
                        <div 
                            onClick={(e) => {
                                changeWeekOption('terca');
                                handleChange({dia: 'Terça'})
                            }}
                            className={weekOptions.terca ? 'register-box-form-select-week-option option-selected': 'register-box-form-select-week-option'}
                        >
                            Terça
                        </div>
                        <div 
                            onClick={(e) => {
                                changeWeekOption('quarta');
                                handleChange({dia: 'Quarta'})
                            }}
                            className={weekOptions.quarta ? 'register-box-form-select-week-option option-selected' : 'register-box-form-select-week-option'}
                        >
                            Quarta
                        </div>
                        <div 
                            onClick={(e) => {
                                changeWeekOption('quinta');                                
                                handleChange({dia: 'Quinta'})
                            }}
                            className={weekOptions.quinta ? 'register-box-form-select-week-option option-selected' : 'register-box-form-select-week-option'}
                        >
                            Quinta
                        </div>
                        <div 
                            onClick={(e) => {
                                changeWeekOption('sexta');                                
                                handleChange({dia: 'Sexta'});
                            }}
                            className={weekOptions.sexta ? 'register-box-form-select-week-option option-selected' : 'register-box-form-select-week-option'}
                        >
                            Sexta
                        </div>
                    </div>
                </div>
            </div>
            
            <div className='register-box-form-div-H-initial'>
                <span className='register-box-form-placeholder'>Das</span>
                <input
                    type='text'
                    name='inicio'
                    autoComplete='off'
                    className={scheduleError.schedule ? 'register-box-form-input-H-initial register-error' : 'register-box-form-input-H-initial'}
                    onChange={(e) => handleChange({inicio: e.target.value})}
                />
                <div className='register-box-input-focus-line' />
            </div>

            <div className='register-box-form-div-H-final'>
                <span className='register-box-form-placeholder'>Até</span>
                <input
                    type='text'
                    name='fim'
                    autoComplete='off'
                    className={scheduleError.schedule ? 'register-box-form-input-H-final register-error' : 'register-box-form-input-H-final'}
                    onChange={(e) => handleChange({fim: e.target.value})}
                />
                <div className='register-box-input-focus-line' />
            </div>
        </div>
    )
}

export default Schedule