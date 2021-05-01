const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const campos = {
	usuario: false,
	nombre: false,
	password: false,
	correo: false,
	telefono: false
}



formulario.addEventListener('submit',function(e){
    e.preventDefault();
	const terminos = document.getElementById("terminos");

	if(campos.usuario && campos.nombre && campos.password && campos.correo && campos.telefono && terminos.checked){
		document.getElementById("formulario-exito").classList.add("formulario-exito-activo");
		document.getElementById("formulario-mensaje").classList.remove("formulario-mensaje-activo");
		setTimeout(() => {
			document.getElementById("formulario-exito").classList.remove("formulario-exito-activo");
		}, 3000);
		formulario.reset();

		document.querySelectorAll("formulario-correcto").forEach((icono) =>{
				icono.classList.remove("formulario-correcto");
		});

	}
	else{
		document.getElementById("formulario-exito").classList.remove("formulario-exito-activo");
		document.getElementById("formulario-mensaje").classList.add("formulario-mensaje-activo");		
	}
});


const validarFormulario = function(e){
	switch(e.target.name){
		case "usuario":
			validarCampo(expresiones.usuario,e.target,'usuario');
		break;
		case "nombre":
			validarCampo(expresiones.nombre,e.target,'nombre');
		break;
		case "password":
			validarCampo(expresiones.password,e.target,'password');
			validarPassword();
		break;
		case "password2":
			validarPassword();
		break;
		case "correo":
			validarCampo(expresiones.correo,e.target,'correo');
		break;
		case "telefono":
			validarCampo(expresiones.telefono,e.target,'telefono');
		break;						
	}
}
 
function validarCampo(expresion,input,campo){
	if(expresion.test(input.value)){
		document.getElementById(`grupo-${campo}`).classList.remove("formulario-incorrecto");
		document.getElementById(`grupo-${campo}`).classList.add("formulario-correcto");
		document.querySelector(`#grupo-${campo} i`).classList.remove("fa-times-circle");
		document.querySelector(`#grupo-${campo} i`).classList.add("fa-check-circle");
		campos[campo] = true;
	}else{
		document.getElementById(`grupo-${campo}`).classList.add("formulario-incorrecto");
		document.getElementById(`grupo-${campo}`).classList.remove("formulario-correcto");
		document.querySelector(`#grupo-${campo} i`).classList.remove("fa-check-circle");
		document.querySelector(`#grupo-${campo} i`).classList.add("fa-times-circle");
		campos[campo] = false;				
	}
}

function validarPassword(){
	const password1 = document.getElementById("password");
	const password2 = document.getElementById("password2");

	if(password1.value !== password2.value){
		document.getElementById('grupo-password2').classList.add("formulario-incorrecto");
		document.getElementById('grupo-password2').classList.remove("formulario-correcto");
		document.querySelector('#grupo-password2 i').classList.remove("fa-check-circle");
		document.querySelector('#grupo-password2 i').classList.add("fa-times-circle");	
	}
	else{
		document.getElementById('grupo-password2').classList.remove("formulario-incorrecto");
		document.getElementById('grupo-password2').classList.add("formulario-correcto");
		document.querySelector('#grupo-password2 i').classList.add("fa-check-circle");
		document.querySelector('#grupo-password2 i').classList.remove("fa-times-circle");	
	}
}




inputs.forEach(function (input){
    input.addEventListener('keyup',validarFormulario);
});
