alert('Bienvenido a nuestro sistema de turnos')

let perfil=prompt('Es usted un paciente? Ingrese SI o NO').toUpperCase()

while(perfil != 'SI' && perfil != 'NO'){
    alert('Debe colocar SI o NO')
    perfil=prompt('Es usted un paciente? Ingrese SI o NO').toUpperCase();
}

if (perfil.toUpperCase() == "SI") {

    // Solicitar datos al paciente
    class Paciente {
            constructor(nombre, apellido, edad, email, profesional, horario) {
                this.nombre=nombre;
                this.apellido=apellido;
                this.edad=edad;
                this.email = email;
                this.profesional = profesional;
                this.horario = horario;
            }
        }

        const usuario1 = new Paciente (prompt ('Ingrese su nombre:'), prompt('Ingrese su apellido:'), Number(prompt('Ingrese su edad:')), 
        prompt('Ingrese su email:'), prompt('Ingrese el apellido del profesional:'), 
        prompt('Ingrese el horario de preferencia (MAÑANA: 9 A 12 o TARDE: 14 A 18): '))
        
        if (usuario1.nombre == '' || usuario1.apellido == '' || usuario1.edad== '' ||  usuario1.email == '' || usuario1.profesional == '' || usuario1.horario == '' ) {
            alert('No hay registro')
        }
        else {
            console.log(usuario1)
            alert('Su turno fue registrado con exito, se enviara la confirmacion a su email')
        }
    }        


if (perfil.toUpperCase() == "NO"){
     // Solicitar datos al profesional

    let registro=prompt('Si ud. es un profesional de nuestra institucion y Desea registrarse Ingrese SI o NO').toUpperCase()
    while(registro != 'SI' && registro != 'NO'){
        alert('Debe colocar SI o NO')
        registro=prompt('Desea registrarse Ingrese SI o NO')
    }
    
    if(registro.toUpperCase() == "SI"){
        
        let legajo=prompt('Ingrese su legajo de 4 digitos')
        while(!Number(legajo) || legajo.toString().length<4){
            alert('Ingrese un numero de legajo valido')
            legajo=Number(prompt('Ingrese su legajo de 4 digitos'))
        }
        let clavePersonal=prompt('Ingrese su clave de 6 digitos')
        while(!Number(clavePersonal) || clavePersonal.toString().length<6){
            alert('Ingrese una clave valida')
            clavePersonal=Number(prompt('Ingrese su clave de 6 digitos'))
        }

        let numeroDePacientes = prompt('Bienvenido Doctor/a. Ingrese el número de pacientes que atenderá hoy');

        // Validar que el número ingresado es un número válido
        while (!Number(numeroDePacientes) || numeroDePacientes <= 0) {
            alert('Ingrese un número válido');
        numeroDePacientes = prompt('Ingrese el número de pacientes que atenderá hoy');
        }

            // Convertir a número
        numeroDePacientes = Number(numeroDePacientes);

        const valorConsulta = 10000;

        function totalConsultas(numeroDePacientes, valorConsulta) {
        return numeroDePacientes * valorConsulta;
        }

        const total = totalConsultas(numeroDePacientes, valorConsulta);

        console.log(`El valor total a facturar de sus consultas hoy es: ${total}`);
    }
}