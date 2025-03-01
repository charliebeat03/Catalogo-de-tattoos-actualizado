async function loadTattoos() {
    try {
        const response = await fetch('/tatuajes.json'); // Ruta corregida
        if (!response.ok) throw new Error("Error HTTP: " + response.status);
        const data = await response.json();

        const grid = document.querySelector('.grid-tatuajes');
        grid.innerHTML = '';

        data.forEach(tattoo => {
            const message = encodeURIComponent(`Hola, quiero agendar una cita para: ${tattoo.title}`);
            const card = `
                <div class="tattoo-card">
                    <a href="${tattoo.image}" data-lightbox="tattoo">
                        <img src="${tattoo.image}" alt="${tattoo.title}">
                    </a>
                    <h3>${tattoo.title} - $${tattoo.price}</h3>
                    <p>${tattoo.body}</p>
                    <a href="https://wa.me/+5355549887?text=${message}" class="whatsapp-btn">
                        📅 Agendar por WhatsApp
                    </a>
                </div>
            `;
            grid.innerHTML += card;
        });

        // Inicializa Lightbox
        lightbox.option({ resizeDuration: 200, wrapAround: true });

    } catch (error) {
        console.error("Error:", error);
        alert("No se pudieron cargar los tatuajes. Recarga la página.");
    }
}

document.addEventListener('DOMContentLoaded', loadTattoos);
