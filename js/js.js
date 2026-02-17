document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Crónicas del Olimpo - JS cargado correctamente');

    // ===== BASE DE DATOS LOCAL =====
    if (!localStorage.getItem('consultasOraculo')) {
        localStorage.setItem('consultasOraculo', JSON.stringify([]));
    }

    // ===== FILTRO DE DIOSES =====
    const filtroBtns = document.querySelectorAll('.filtro-btn');
    const diosCards = document.querySelectorAll('.card-dios');

    if (filtroBtns.length > 0 && diosCards.length > 0) {
        console.log('✅ Filtro de dioses inicializado');
    
        function filtrarDioses(categoria) {
            diosCards.forEach(card => {
                const categorias = card.dataset.categoria.split(' ');
                if (categoria === 'todos' || categorias.includes(categoria)) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                } else {
                    card.style.display = 'none';
                }
            });
        }
    
        filtroBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                filtroBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const categoria = this.dataset.filtro;
                console.log('Filtrando por:', categoria);
                filtrarDioses(categoria);
            });
        });
    }
    
    // ===== FORMULARIO DEL ORÁCULO CON LOCALSTORAGE =====
    const formulario = document.getElementById('oraculo-form');
    const respuestaDiv = document.getElementById('respuesta-oraculo');
    
    if (formulario) {
        formulario.addEventListener('submit', function(e) {
            e.preventDefault();
            
            respuestaDiv.style.display = 'block';
            respuestaDiv.className = 'respuesta-oraculo';
            respuestaDiv.innerHTML = '🔮 La Pitia está interpretando tu consulta...';
            
            const formData = new FormData(formulario);
            const datos = {
                id: Date.now(),
                nombre: formData.get('nombre'),
                email: formData.get('email'),
                dios: formData.get('dios'),
                tipo: formData.get('tipo'),
                consulta: formData.get('consulta'),
                fecha: new Date().toLocaleString()
            };
            
            // Guardar en localStorage (BASE DE DATOS LOCAL)
            const consultas = JSON.parse(localStorage.getItem('consultasOraculo'));
            consultas.push(datos);
            localStorage.setItem('consultasOraculo', JSON.stringify(consultas));
            
            // Respuestas del oráculo
            const respuestas = [
                "✨ Los dioses han escuchado tu consulta. El destino te es favorable.",
                "⚡ Zeus asiente ante tu petición. Buen augurio.",
                "🌊 Poseidón agita las aguas... debes tener paciencia.",
                "🦉 Atenea ilumina tu camino con sabiduría.",
                "💀 Hades guarda silencio. No es momento de preguntar.",
                "☀️ Apolo predice grandes acontecimientos en tu futuro.",
                "🔮 Hécate teje sombras... la respuesta llegará en sueños.",
                "🦋 Tánatos susurra que la vida es un ciclo eterno.",
                "⚖️ Némesis observa. La justicia divina actuará."
            ];
            
            const respuestaAleatoria = respuestas[Math.floor(Math.random() * respuestas.length)];
            
            setTimeout(() => {
                respuestaDiv.className = 'respuesta-oraculo exito';
                respuestaDiv.innerHTML = `
                    <p>🔮 <strong>El Oráculo responde:</strong></p>
                    <p>${respuestaAleatoria}</p>
                    <p><small>Consulta guardada en los archivos del Olimpo (ID: ${datos.id})</small></p>
                `;
                formulario.reset();
            }, 1000);
        });
    }
    
    // ===== FUNCIÓN PARA VER CONSULTAS (en consola) =====
    window.verConsultas = function() {
        console.log('📋 Consultas guardadas:', 
            JSON.parse(localStorage.getItem('consultasOraculo')));
    };
});