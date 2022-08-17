export default function Validation(values) {
    const errors = {};

    if (values.nome.length < 4) {        
        errors.name = 'Favor inserir acima de 4 caracteres.';
    } else if (!isNaN(Number(values.nome))) {        
        errors.name = 'Favor inserir somente letras!'
    }

    if (values.foto.substring(0, 6) !== '//http') {
        errors.photo = 'Favor iniciar com "//http"!';
    }

    if (values.tel.length < 13) {
        errors.tel = 'Favor inserir acima de 13 números!';
    }

    if (values.bio.length < 20) {
        errors.bio = 'Favor inserir acima de 20 caracteres!';
    }

    if (values.materia === '') {
        errors.subject = 'Favor selecionar uma opção do menu!';
    }

    if (Number(values.custo) < 10) {
        errors.cost = 'Valor valido somente acima de R$10,00!';
    }

    if (values.horario.length === 0) {
        errors.schedule = 'Favor preencher o campo abaixo!';
    }

    return errors;
}