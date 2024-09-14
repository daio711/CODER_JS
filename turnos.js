document.addEventListener('DOMContentLoaded', () => {
    let perfil = prompt('¿Es usted un paciente? Ingrese SI o NO').toUpperCase();
    
    while (perfil !== 'SI' && perfil !== 'NO') {
        alert('Debe colocar SI o NO');
        perfil = prompt('¿Es usted un paciente? Ingrese SI o NO').toUpperCase();
    }

    // Definir los profesionales
    const profesionales = [
        new Profesional('Juan', 'Perez', 'Cardiología', ['09:00', '10:00', '11:00', '14:00', '15:00']),
        new Profesional('Ana', 'Garcia', 'Dermatología', ['09:00', '11:00']),
        new Profesional('María', 'Lopez', 'Pediatría', ['14:00', '16:00']),
        new Profesional('Carlos', 'Perez', 'Neurología', ['08:00', '09:00', '10:00'])
    ];

    // Guardar en localStorage 
    localStorage.setItem('profesionales', JSON.stringify(profesionales));

    // Si es paciente, mostrar el formulario y agregar los profesionales al select
    if (perfil === 'SI') {
        document.getElementById('paciente-section').style.display = 'block';

        // Cargar profesionales en el select
        const profesionalSelect = document.getElementById('profesional-select');
        profesionales.forEach(profesional => {
            let option = document.createElement('option');
            option.value = profesional.nombre + ' ' + profesional.apellido;
            option.text = `${profesional.nombre} ${profesional.apellido} - ${profesional.especialidad}`;
            profesionalSelect.add(option);
        });

        document.getElementById('paciente-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const nombre = document.getElementById('paciente-nombre').value;
            const apellido = document.getElementById('paciente-apellido').value;
            const edad = document.getElementById('paciente-edad').value;
            const email = document.getElementById('paciente-email').value;
            const profesional = document.getElementById('profesional-select').value;
            const horario = document.getElementById('horario-preferido').value;

            const paciente = new Paciente(nombre, apellido, edad, email, profesional, horario);
            
            // Guardar en localStorage
            const pacientesRegistrados = JSON.parse(localStorage.getItem('pacientes')) || [];
            pacientesRegistrados.push(paciente);
            localStorage.setItem('pacientes', JSON.stringify(pacientesRegistrados));

            document.getElementById('turno-mensaje').textContent = `Turno registrado para ${paciente.nombre} con el profesional ${paciente.profesional} a las ${paciente.horario}.`;
        });

    } else if (perfil === 'NO') {
        document.getElementById('profesional-section').style.display = 'block';
        document.getElementById('profesional-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const legajo = document.getElementById('profesional-legajo').value;
            const clave = document.getElementById('profesional-clave').value;
            const numeroPacientes = document.getElementById('numero-pacientes').value;

            const valorConsulta = 10000;
            const total = numeroPacientes * valorConsulta;
            document.getElementById('total-factura').textContent = `El valor total a facturar hoy es: ${total}`;
        });
    }
});

// Definición de clases
class Profesional {
    constructor(nombre, apellido, especialidad, horarios) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.especialidad = especialidad;
        this.horarios = horarios;
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
