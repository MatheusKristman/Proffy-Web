import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Schedule from './Schedule';
import backArrow from '../images/arrow-back.svg';
import logo from '../images/logo-register.svg';
import warning from '../images/alert.png';
import Validation from '../Validation';
import './Register.css';

function Register() {
    const [counter, setCounter] = useState(0);
    const [isSchoolSubjectClicked, setIsSchoolSubjectClicked] = useState(false);    
    const [schoolSubjectOptions, setSchoolSubjectOptions] = useState({
        artes: false,
        biologia: false,
        ciencias: false,
        educacaoFisica: false,
        fisica: false,
        geografia: false,
        historia: false,
        matematica: false,
        portugues: false,
        quimica: false
    });    
    const [schoolSubjectText, setSchoolSubjectText] = useState('');    
    const [data, setData] = useState({
        nome: '',
        foto: '',
        tel: '',
        bio: '',
        materia: '',
        custo: '',
        horario: []
    });    
    const [scheduleComponent, setScheduleComponent] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    
    const navigate = useNavigate();    
    
    useEffect(() => {
        if (isSubmitting) {
            handleSubmit();
        }
    }, [isSubmitting]);

    function update(values) {
        var result = data.horario.find(value => value.dia === values.dia);
        if(result){
            var resultIndex = data.horario.indexOf(result);
            data.horario.splice(resultIndex, 1);
        }
        data.horario.push(values);
        console.log(data.horario);
    }

    function addData(e) {
        const {name, value} = e.target;
        setData({ ...data, [name]: value });
    }

    function openSchoolSubjectSelect(e) {
        e.preventDefault();
        if(!e.target.classList.contains('register-box-form-select-school-subject-option')){
            setIsSchoolSubjectClicked(!isSchoolSubjectClicked);
        }
    }    

    function changeSchoolSubjectOption(option) {
        const newObj = { ...schoolSubjectOptions };
        Object.keys(newObj).forEach(key => {
            newObj[key] = false;
        });
        newObj[option] = true;
        setSchoolSubjectOptions(newObj);
        setIsSchoolSubjectClicked(false);
    }    

    function blurSchoolSubjectSelect(e) {
        if(!e.target.classList.contains('register-box-form-select-school-subject-option')){
            setIsSchoolSubjectClicked(false);
        }
    }    

    function addSchedule(e) {
        e.preventDefault();
        setScheduleComponent(scheduleComponent.concat(
            <Schedule
                counter={counter}
                update={update}
                scheduleError={errors}
                key={scheduleComponent.length}
            />
        ));
        setCounter(counter + 1);
    }

    function checkData(e) {
        e.preventDefault();
        setErrors(Validation(data));
        setIsSubmitting(true);
        console.log('mudou para true')
    }

    function handleSubmit() {
        if (Object.keys(errors).length === 0 && isSubmitting) {

            console.log(errors);

            const localStorageTeacherData = JSON.parse(localStorage.getItem('teacher-data')) || [];

            localStorageTeacherData.push(data);

            console.log(localStorageTeacherData);

            localStorage.setItem('teacher-data', JSON.stringify(localStorageTeacherData));
            
            setIsSubmitting(false);

            navigate('/');

            return;
        }

        console.log('não envia')
        
        return setIsSubmitting(false);                
    }

    return (
        <div className='register-container'>
            <div className='register-background' />
            <div className='register-wrapper'>
                <header className='register-header'>
                    <Link to='/'>
                        <img src={backArrow} alt='Back to Home' className='register-header-back' />
                    </Link>

                    <img src={logo} alt='Logo' className='register-header-logo' />
                </header>

                <section className='register-info-wrapper'>
                    <div className='register-info'>
                        <h1 className='register-info-title'>
                            Que incrível que você quer dar aulas.
                        </h1>
                        <p className='register-info-desc'>
                            O primeiro passo, é preencher esse formulário de inscrição.
                        </p>
                    </div>

                    <div className='register-box'>
                        <form className='register-box-form'>
                            <h2 className='register-box-title'>Seus dados</h2>
                            <div className='register-box-line' />

                            <div className='register-box-form-div-name'>
                                <span className='register-box-form-placeholder'>Nome completo</span>
                                <input
                                    type='text'
                                    name='nome'
                                    value={data.nome}
                                    autoComplete='off'
                                    className={errors.name ? 'register-box-form-input-name register-error' : 'register-box-form-input-name'}
                                    placeholder={errors.name ? errors.name : ''}
                                    onChange={addData}
                                />
                                <div className='register-box-input-focus-line' />
                            </div>

                            <div className='register-box-form-div-photo'>
                                <span className='register-box-form-placeholder-with-tip'>
                                    Link da sua foto
                                </span>
                                <small className='register-box-form-tip'>(comece com //http)</small>
                                <input
                                    type='text'
                                    name='foto'
                                    value={data.foto}
                                    autoComplete='off'
                                    className={errors.photo ? 'register-box-form-input-photo register-error' : 'register-box-form-input-photo'}
                                    placeholder={errors.photo ? errors.photo : ''}
                                    onChange={addData}
                                />
                                <div className='register-box-input-focus-line' />
                            </div>

                            <div className='register-box-form-div-tel'>
                                <span className='register-box-form-placeholder-with-tip'>
                                    Whatsapp
                                </span>
                                <small className='register-box-form-tip'>(somente números)</small>
                                <input
                                    type='text'
                                    name='tel'
                                    value={data.tel}
                                    autoComplete='off'
                                    className={errors.tel ? 'register-box-form-input-tel register-error' : 'register-box-form-input-tel'}
                                    placeholder={errors.tel ? errors.tel : ''}
                                    onChange={(e) => {
                                        
                                        const regex = /^([0-9]{2})([0-9]{4,5})([0-9]{4})$/;

                                        let str = e.target.value.replace(/[^0-9]/g, "").slice(0, 11);

                                        const result = str.replace(regex, "($1) $2-$3");

                                        setData({ ...data, tel: result });
                                    }}
                                />
                                <div className='register-box-input-focus-line' />
                            </div>

                            <div className='register-box-form-div-bio'>
                                <span className='register-box-form-placeholder'>Biografia</span>
                                <textarea
                                    name='bio'
                                    value={data.bio}
                                    autoComplete='off'
                                    spellCheck='false'
                                    className={errors.bio ? 'register-error register-box-textarea-bio' : 'register-box-textarea-bio'}
                                    placeholder={errors.bio ? errors.bio : ''}
                                    onChange={addData}
                                />
                                <div className='register-box-input-focus-line' />
                            </div>

                            <h2 className='register-box-title2'>Sobre a aula</h2>
                            <div className='register-box-line' />

                            <div onBlur={blurSchoolSubjectSelect} tabIndex='-1' className='register-box-form-div-school-subject'>
                                <span className='register-box-form-placeholder'>Matéria</span>
                                <div 
                                    onClick={openSchoolSubjectSelect}
                                    className={errors.subject ? 'register-box-form-select-school-subject register-error' : 'register-box-form-select-school-subject'}
                                >
                                    <span className={errors.subject && schoolSubjectText === '' ? 'register-box-form-select-placeholder register-error-select-placeholder' : schoolSubjectText === '' ? 'register-box-form-select-placeholder' : 'register-box-form-select-school-subject-text'}>
                                        {schoolSubjectText === '' ? 'Selecione qual você quer ensinar' : schoolSubjectText}
                                    </span>
                                    <button className='register-box-form-select-school-subject-button' />
                                    <div className={ isSchoolSubjectClicked ? 'register-box-form-select-school-subject-options' : 'register-box-form-select-school-subject-options select-desactive' }>
                                        <div
                                            onClick={(e) => {
                                                changeSchoolSubjectOption('artes');
                                                setSchoolSubjectText(e.target.textContent);
                                                setData({ ...data, materia: e.target.textContent });
                                        }}
                                            className={schoolSubjectOptions.artes ? 'register-box-form-select-school-subject-option option-selected' : 'register-box-form-select-school-subject-option'}
                                        >
                                            Artes
                                        </div>
                                        <div 
                                            onClick={(e) => {
                                                changeSchoolSubjectOption('biologia');
                                                setSchoolSubjectText(e.target.textContent);
                                                setData({ ...data, materia: e.target.textContent });
                                            }}
                                            className={schoolSubjectOptions.biologia ? 'register-box-form-select-school-subject-option option-selected' : 'register-box-form-select-school-subject-option'}
                                        >
                                            Biologia
                                        </div>
                                        <div 
                                            onClick={(e) => {
                                                changeSchoolSubjectOption('ciencias');
                                                setSchoolSubjectText(e.target.textContent);
                                                setData({ ...data, materia: e.target.textContent });
                                            }}
                                            className={schoolSubjectOptions.ciencias ? 'register-box-form-select-school-subject-option option-selected' : 'register-box-form-select-school-subject-option'}
                                        >
                                            Ciências
                                        </div>
                                        <div 
                                            onClick={(e) => {
                                                changeSchoolSubjectOption('educacaoFisica');
                                                setSchoolSubjectText(e.target.textContent);
                                                setData({ ...data, materia: e.target.textContent });
                                            }}
                                            className={schoolSubjectOptions.educacaoFisica ? 'register-box-form-select-school-subject-option option-selected' : 'register-box-form-select-school-subject-option'}
                                        >
                                            Educação Física
                                        </div>
                                        <div 
                                            onClick={(e) => {
                                                changeSchoolSubjectOption('fisica');
                                                setSchoolSubjectText(e.target.textContent);
                                                setData({ ...data, materia: e.target.textContent });
                                            }}
                                            className={schoolSubjectOptions.fisica ? 'register-box-form-select-school-subject-option option-selected' : 'register-box-form-select-school-subject-option'}
                                        >
                                            Física
                                        </div>
                                        <div 
                                            onClick={(e) => {
                                                changeSchoolSubjectOption('geografia');
                                                setSchoolSubjectText(e.target.textContent);
                                                setData({ ...data, materia: e.target.textContent });
                                            }} 
                                            className={schoolSubjectOptions.geografia ? 'register-box-form-select-school-subject-option option-selected' : 'register-box-form-select-school-subject-option'}
                                        >
                                            Geografia
                                        </div>
                                        <div 
                                            onClick={(e) => {
                                                changeSchoolSubjectOption('historia');
                                                setSchoolSubjectText(e.target.textContent);
                                                setData({ ...data, materia: e.target.textContent });
                                            }}
                                            className={schoolSubjectOptions.historia ? 'register-box-form-select-school-subject-option option-selected' : 'register-box-form-select-school-subject-option'}
                                        >
                                            História
                                        </div>
                                        <div 
                                            onClick={(e) => {
                                                changeSchoolSubjectOption('matematica')
                                                setSchoolSubjectText(e.target.textContent);
                                                setData({ ...data, materia: e.target.textContent });
                                            }}
                                            className={schoolSubjectOptions.matematica ? 'register-box-form-select-school-subject-option option-selected' : 'register-box-form-select-school-subject-option'}
                                        >
                                            Matemática
                                        </div>
                                        <div 
                                            onClick={(e) => {
                                                changeSchoolSubjectOption('portugues')
                                                setSchoolSubjectText(e.target.textContent);
                                                setData({ ...data, materia: e.target.textContent });
                                            }}
                                            className={schoolSubjectOptions.portugues ? 'register-box-form-select-school-subject-option option-selected' : 'register-box-form-select-school-subject-option'}
                                        >
                                            Português
                                        </div>
                                        <div 
                                            onClick={(e) => {
                                                changeSchoolSubjectOption('quimica')
                                                setSchoolSubjectText(e.target.textContent);
                                                setData({ ...data, materia: e.target.textContent });
                                            }}
                                            className={schoolSubjectOptions.quimica ? 'register-box-form-select-school-subject-option option-selected' : 'register-box-form-select-school-subject-option'}
                                        >
                                            Química
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='register-box-form-div-cost'>
                                <span className='register-box-form-placeholder-with-tip'>
                                    Custo da sua hora por aula
                                </span>
                                <small className='register-box-form-tip'>(em R$)</small>
                                <input
                                    type='text'
                                    name='custo'
                                    value={data.custo}
                                    className={errors.cost ? 'register-box-form-input-cost register-error' : 'register-box-form-input-cost'}
                                    placeholder={errors.cost ? errors.cost : ''}
                                    onChange={addData}
                                />
                                <div className='register-box-input-focus-line' />
                            </div>

                            <div className='register-box-title3-wrapper'>
                                <h2 className='register-box-title3'>Horários disponíveis</h2>
                                <button className='register-box-add-schedule' onClick={addSchedule}>Novo horário</button>
                            </div>
                            <div className='register-box-line' />

                            <span className='register-error-schedule' style={errors.schedule ? {display: 'block'} : {display: 'none'}}>{errors.schedule}</span>

                            <Schedule 
                                counter={counter}
                                update={update}
                                scheduleError={errors}
                                key={scheduleComponent.length}
                            />

                            {scheduleComponent}

                            <div className='register-box-form-footer'>
                                <div className='register-box-form-footer-wrapper'>
                                    <div className='register-box-form-footer-infos'>
                                        <img
                                            src={warning}
                                            alt='alert'
                                            className='register-box-form-footer-infos-image'
                                        />
                                        <p>
                                            Importante <br />
                                            Preencha todos os dados
                                        </p>
                                    </div>

                                    <div className='register-box-form-footer-button-box'>
                                        <button
                                            type='submit'
                                            className='register-box-form-footer-button'
                                            onClick={checkData}
                                        >
                                            Salvar cadastro
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Register;
