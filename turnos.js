document.addEventListener('DOMContentLoaded', () => {
    Swal.fire({
        title: '¿Es usted un paciente?',
        text: "Seleccione una opción",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'SI',
        cancelButtonText: 'NO',
    }).then((result) => {
        if (result.isConfirmed) {
            // Mostrar formulario de paciente
            mostrarFormularioPaciente();
        } else {
            // Mostrar formulario de profesional
            mostrarFormularioProfesional();
        }
    });

    function mostrarFormularioPaciente() {
        document.getElementById('paciente-section').style.display = 'block';

        // Obtener profesionales de la base de datos o localStorage
        const profesionales = JSON.parse(localStorage.getItem('profesionales')) || [];

        // Poblamos el select con los profesionales
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

            // Guardar en la base de datos o localStorage
            fetch('/api/guardarPaciente', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(paciente)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    toastr.success(`Turno registrado para ${paciente.nombre} con ${paciente.profesional} a las ${paciente.horario}`);
                } else {
                    toastr.error('Ocurrió un error al registrar el turno');
                }
            })
            .catch(err => {
                toastr.error('Error en el servidor');
            });
        });
    }

    function mostrarFormularioProfesional() {
        document.getElementById('profesional-section').style.display = 'block';

        document.getElementById('profesional-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const legajo = document.getElementById('profesional-legajo').value;
            const clave = document.getElementById('profesional-clave').value;
            const numeroPacientes = document.getElementById('numero-pacientes').value;

            const valorConsulta = 10000;
            const total = numeroPacientes * valorConsulta;
            document.getElementById('total-factura').textContent = `El valor total a facturar hoy es: ${total}`;
            toastr.success(`Total a facturar: ${total}`);
        });
    }
});

// Clases
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
