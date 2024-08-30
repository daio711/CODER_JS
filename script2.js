alert('Bienvenido a nuestro sistema de turnos');

let perfil = prompt('¿Es usted un paciente? Ingrese SI o NO').toUpperCase();

while (perfil !== 'SI' && perfil !== 'NO') {
    alert('Debe colocar SI o NO');
    perfil = prompt('¿Es usted un paciente? Ingrese SI o NO').toUpperCase();
}

class Profesional {
    constructor(nombre, apellido, especialidad, horarios) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.especialidad = especialidad;
        this.horarios = horarios; // Array con los horarios disponibles
    }
}

class Paciente {
    constructor(nombre, apellido, edad, email, profesional, horario) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.email = email;
        this.profesional = profesional;
        this.horario = horario;
    }
}

// Lista de profesionales con horarios disponibles
const profesionales = [
    new Profesional('Juan', 'Perez', 'Cardiología', ['09:00', '10:00', '11:00', '14:00', '15:00']),
    new Profesional('Ana', 'Garcia', 'Dermatología', ['09:00', '11:00']),
    new Profesional('María', 'Lopez', 'Pediatría', ['14:00', '16:00']),
    new Profesional('Carlos', 'Perez', 'Neurología', ['08:00', '09:00', '10:00'])
];

// Array para almacenar los pacientes registrados
const pacientesRegistrados = [];

if (perfil === 'SI') {
    const nombreProfesionalBuscado = prompt('Ingrese el nombre del profesional que desea buscar:').toUpperCase();
    const apellidoProfesionalBuscado = prompt('Ingrese el apellido del profesional que desea buscar:').toUpperCase();

    // Usar filter para encontrar los profesionales que coincidan con el apellido ingresado
    const profesionalesEncontrados = profesionales.filter(profesional => profesional.apellido.toUpperCase() === apellidoProfesionalBuscado);

    if (profesionalesEncontrados.length > 0) {
        // Filtrar por nombre si hay coincidencia en el apellido
        const profesionalEncontrado = profesionalesEncontrados.find(profesional => profesional.nombre.toUpperCase() === nombreProfesionalBuscado);

        if (profesionalEncontrado) {
            alert(`Profesional encontrado: Dr/a. ${profesionalEncontrado.nombre} ${profesionalEncontrado.apellido} - Especialidad: ${profesionalEncontrado.especialidad}`);
            
            const horarioPreferido = prompt('Ingrese el horario de preferencia, los mismos son de 30 minutos (por ejemplo: 09:00 o 14:30):');
            
            if (profesionalEncontrado.horarios.includes(horarioPreferido)) {
                const usuario1 = new Paciente(
                    prompt('Ingrese su nombre:'),
                    prompt('Ingrese su apellido:'),
                    Number(prompt('Ingrese su edad:')),
                    prompt('Ingrese su email:'),
                    `${profesionalEncontrado.nombre} ${profesionalEncontrado.apellido}`,
                    horarioPreferido
                );

                if (!usuario1.nombre || !usuario1.apellido || !usuario1.edad || !usuario1.email || !usuario1.horario) {
                    alert('No hay registro');
                } else {
                    pacientesRegistrados.push(usuario1);
                    console.log(usuario1);
                    alert('Su turno fue registrado con éxito, se enviará la confirmación a su email');

                    const turno = new Date('October 20, 2024');
                    alert(`Se le ha otorgado un turno para el día: ${turno.toLocaleDateString()} a las ${usuario1.horario} con el Dr/a. ${usuario1.profesional}`);
                }
            } else {
                alert('El horario seleccionado no está disponible para este profesional.');
            }
        } else {
            alert(`No se encontró un profesional con el nombre ${nombreProfesionalBuscado} y apellido ${apellidoProfesionalBuscado}.`);
        }
    } else {
        alert('Profesional no encontrado.');
    }

} else if (perfil === 'NO') {

    let registro = prompt('Si usted es un profesional de nuestra institución y desea registrarse, ingrese SI o NO').toUpperCase();

    while (registro !== 'SI' && registro !== 'NO') {
        alert('Debe colocar SI o NO');
        registro = prompt('Desea registrarse, ingrese SI o NO').toUpperCase();
    }

    if (registro === 'SI') {
        let legajo = prompt('Ingrese su legajo de 4 dígitos');
        while (!Number(legajo) || legajo.toString().length < 4) {
            alert('Ingrese un número de legajo válido');
            legajo = Number(prompt('Ingrese su legajo de 4 dígitos'));
        }

        let clavePersonal = prompt('Ingrese su clave de 6 dígitos');
        while (!Number(clavePersonal) || clavePersonal.toString().length < 6) {
            alert('Ingrese una clave válida');
            clavePersonal = Number(prompt('Ingrese su clave de 6 dígitos'));
        }

        let numeroDePacientes = prompt('Bienvenido Doctor/a. Ingrese el número de pacientes que atenderá hoy');

        while (!Number(numeroDePacientes) || numeroDePacientes <= 0) {
            alert('Ingrese un número válido');
            numeroDePacientes = prompt('Ingrese el número de pacientes que atenderá hoy');
        }

        numeroDePacientes = Number(numeroDePacientes);
        const valorConsulta = 10000;

        function totalConsultas(numeroDePacientes, valorConsulta) {
            return numeroDePacientes * valorConsulta;
        }

        const total = totalConsultas(numeroDePacientes, valorConsulta);
        console.log(`El valor total a facturar de sus consultas hoy es: ${total}`);

        
        } 
    }


