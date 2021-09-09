//VARIABLES
let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.navbar');

const btnEnviar = document.querySelector('#enviar');
const formulario = document.querySelector('#enviar-email');

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//VARIABLES DE CAMPOS
const nombre = document.querySelector('#nombre');
const email = document.querySelector('#email');
const numero = document.querySelector('#numero');
const mensaje = document.querySelector('#mensaje');

menu.addEventListener('click',()=>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
})

window.onscroll = () => {
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
};

eventListener();
function eventListener() {
    document.addEventListener('DOMContentLoaded', iniciarApp);

    //Campos de formulario
    nombre.addEventListener('blur', validarFormulario);
    email.addEventListener('blur', validarFormulario);
    numero.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    //Enviar email
    formulario.addEventListener('submit', enviarEmail);
}

//FUNCIONES
function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

//VALIDAR FORMULARIO
function validarFormulario(e) {
    if(e.target.value.length > 0) {
        const error = document.querySelector('p.error');
        if(error){
            error.remove();
        }
    } else {
        e.target.classList.add('border-red-500');
        mostrarError('Todos los campos son obligatorios');
    }

    if(e.target.type === 'email'){
        if(er.test(e.target.value)){
            const error = document.querySelector('p.error');
            if(error){
                error.remove();
            }
        } else {
            mostrarError('Email Invalido');
        }
    }

    if(er.test(email.value) && nombre.value !=='' && numero.value !== '' && mensaje.value !== ''){
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed','opacity-50');
    }
}

function mostrarError(mensaje) {
    //Creando el mensaje
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('error','box-error')

    const errores = document.querySelectorAll('.error');

    if(errores.length === 0){
        formulario.appendChild(mensajeError);
    }    
}

//Enviar email
function enviarEmail(e){
    e.preventDefault();

    //Mostrar el spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    //Despues de tres segundos ocultar el spinner
    setTimeout(()=>{
        spinner.style.display = 'none';

        //Mensaje de envio correcto
        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje se envio correctamente';
        parrafo.classList.add('correcto');

        //Insertar el parrado
        formulario.insertBefore(parrafo, spinner);

        setTimeout(()=>{
            parrafo.remove();
            resetearFormulario();
        }, 5000);        
    }, 3000);
}

//Funcion que resetee el formulario
function resetearFormulario() {
    formulario.reset();

    iniciarApp();
}
