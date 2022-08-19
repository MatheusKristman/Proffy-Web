import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';
import people from '../images/people.png';
import sabrina from '../images/sabrina.jpg';
import dylan from '../images/dylan.jpg';
import guzz from '../images/guzz.jpg';
import kevin from '../images/kevin.jpg';
import marlon from '../images/marlon.jpg';
import giselli from '../images/giselli.jpg';
import renan from '../images/renan.jpg';
import './Home.css';

function Home() {   

    const navigate = useNavigate();

    function goStudy() {
        navigate('/list');
    }

    function goLesson() {
        navigate('/register');
    }

    const [initialData, setInitialData] = useState([{
        bio: "Eu sou Nicolas Cage, um ótimo professor de química quântica.\nMas infelizmente tenho que dar aula de artes\nMe contrata por favor!",
        custo: "200",
        foto: "//https://imagens.brasil.elpais.com/resizer/-sq_qxO7YmGukKYkh1U6DCLYu78=/1200x0/cloudfront-eu-central-1.images.arcpublishing.com/prisa/LL3KKOVYQN5NFSMWTE4J3MD6ME.jpg",
        horario: [{dia: "Sexta", inicio: "5", fim: "20"}],
        materia: "Artes",
        nome: "Nicolas Cage",
        tel: "(11) 91004-1998"
    }, {
        bio: "Eu sou professora de Biologia, amo animais, natureza, e tudo relacionado, tenho métodos que irão elevar seu conhecimento em Biologia.",
        custo: "30",
        foto: `//${sabrina}`,
        horario: [{dia: "Terça", inicio: "8", fim: "14"}],
        materia: "Biologia",
        nome: "Sabrina Parker",
        tel: "(12) 96542-1897"
    }, {
        bio: "Um cientista muito louco pronto para ensinar as maravilhas da ciência para você, vamos juntos criar um novo Frankenstein de conhecimento.",
        custo: "50",
        foto: `//${dylan}`,
        horario: [{dia: "Quarta", inicio: "14", fim: "20"}],
        materia: "Ciências",
        nome: "Dylan Askov",
        tel: "(86) 96542-7514"
    }, {
        bio: "Jogador de Basquete Profissional e professor de Educação Física nas horas vagas\n vamos que eu estou pronto para enterrar conhecimento na sua mente e no seu físico.",
        custo: "60",
        foto: "//https://www.adnkronos.com/resources/0276-155a5aa52f31-4cb7424f2621-1000/format/big/lebron_james_fg_ipa.jpg",
        horario: [{dia: "Quinta", inicio: "10", fim: "16"}],
        materia: "Educação Física",
        nome: "LeBron James",
        tel: "(32) 98853-7920"
    }, {
        bio: "Professor de física, já montei um foguete usando apenas um grampo e coca-cola\n está pronto para essa jornada?",
        custo: "40",
        foto: `//${guzz}`,
        horario: [{dia: "Sexta", inicio: "11", fim: "17"}],
        materia: "Física",
        nome: "Guzz Friman",
        tel: "(99) 98781-5656"
    }, {
        bio: "Conhecedor dos setes mares, explorador, conheço o planeta de ponta a ponta\n se está pronto para conhecer também, vem comigo!",
        custo: "150",
        foto: `//${marlon}`,
        horario: [{dia: "Segunda", inicio: "12", fim: "18"}],
        materia: "Geografia",
        nome: "Marlon Silva",
        tel: "(32) 98924-7631"
    }, {
        bio: "Uma Wikipedia ambulante, sou historiador e um ótimo contador de história, fico horas e horas falando com você cada detalhe de história\n vai aprender rapidinho.",
        custo: "40",
        foto: `//${kevin}`,
        horario: [{dia: "Terça", inicio: "13", fim: "19"}],
        materia: "História",
        nome: "Kevin Bryanico",
        tel: "(86) 99936-6549"
    }, {
        bio: "Sou bom com números, já fiz parte de time de cobrança\n me chame se precisar de ajuda.",
        custo: "25",
        foto: `//${renan}`,
        horario: [{dia: "Quarta", inicio: "14", fim: "20"}],
        materia: "Matemática",
        nome: "Renan Cabreiro",
        tel: "(79) 99215-0677"
    }, {
        bio: "Leitora de todos os livros que já existiram no planeta terra\n já se prepara que você ira ler também!",
        custo: "60",
        foto: `//${giselli}`,
        horario: [{dia: "Quinta", inicio: "15", fim: "21"}],
        materia: "Português",
        nome: "Giselli Kimber",
        tel: "(43) 99725-6681"
    }, {
        bio: "Dou aulas particulares nas horas vagas\n surgiu um problema pessoal recentemente e preciso da sua ajuda para complementar renda.",
        custo: "50",
        foto: "//https://s.yimg.com/os/pt-BR/blogs/vi-internet/walterwhitereal.jpg",
        horario: [{dia: "Sexta", inicio: "16", fim: "22"}],
        materia: "Química",
        nome: "Walter White",
        tel: "(64) 98844-6794"
    }]);

    const fetchData = useCallback(() => {
        const localSave = JSON.parse(localStorage.getItem("teacher-data")) || [];

        if (localSave.length === 0) {
            localStorage.setItem("teacher-data", JSON.stringify(initialData));
        }
    }, [initialData])

    useEffect(() => {
        fetchData();
    }, []);

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
