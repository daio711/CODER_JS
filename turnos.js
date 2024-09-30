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
            mostrarFormularioPaciente();
        } else {
            mostrarFormularioProfesional();
        }
    });

    function mostrarFormularioPaciente() {
        document.getElementById('paciente-section').style.display = 'block';

        // Realiza carga de profesionales en un archivo JSON - ruta relativa
        fetch('/profesionales.json')
            .then(response => response.json())
            .then(profesionales => {
                const profesionalSelect = document.getElementById('profesional-select');
                profesionales.forEach(profesional => {
                    let option = document.createElement('option');
                    option.value = `${profesional.nombre} ${profesional.apellido}`;
                    option.text = `${profesional.nombre} ${profesional.apellido} - ${profesional.especialidad}`;
                    profesionalSelect.add(option);
                });
            })
            .catch(err => Toastify({
                text: "Error al cargar profesionales",
                backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
            }).showToast());

        document.getElementById('paciente-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const paciente = new Paciente(
                document.getElementById('paciente-nombre').value,
                document.getElementById('paciente-apellido').value,
                document.getElementById('paciente-edad').value,
                document.getElementById('paciente-email').value,
                document.getElementById('profesional-select').value,
                document.getElementById('horario-preferido').value
            );

            // Guardar en localStorage
            const pacientesGuardados = JSON.parse(localStorage.getItem('pacientes')) || [];
            pacientesGuardados.push(paciente);
            localStorage.setItem('pacientes', JSON.stringify(pacientesGuardados));

            Toastify({
                text: `Turno registrado para ${paciente.nombre} con ${paciente.profesional} a las ${paciente.horario}`,
                backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
            }).showToast();
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

            Toastify({
                text: `Total a facturar: ${total}`,
                backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
            }).showToast();
        });
    }
});

// Clase Paciente
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
