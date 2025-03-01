async function loadTattoos() {
    try {
        const response = await fetch('/_tatuajes');
        if (!response.ok) throw new Error("Error al cargar los datos");
        const data = await response.json();

        const grid = document.querySelector('.grid-tatuajes');
        grid.innerHTML = '';

        data.forEach(tattoo => {
            if (!tattoo.image || !tattoo.title) {
                console.warn("Tatuaje con datos incompletos:", tattoo);
                return;
            }

            const message = encodeURIComponent(`Hola, quiero agendar una cita para este tatuaje: ${tattoo.title}`);
            const card = `
                <div class="tattoo-card">
                    <a href="${tattoo.image}" data-lightbox="tattoo">
                        <img src="${tattoo.image}" alt="${tattoo.title}">
                    </a>
                    <h3>${tattoo.title} ${tattoo.price ? `- $${tattoo.price}` : ''}</h3>
                    ${tattoo.body ? `<p>${tattoo.body}</p>` : ''}
                    <a href="https://wa.me/+5355549887?text=${message}" class="whatsapp-btn">
                        📅 Agendar por WhatsApp
                    </a>
                </div>
            `;
            grid.innerHTML += card;
        });

        lightbox.option({ resizeDuration: 200, wrapAround: true });

    } catch (error) {
        console.error("Error:", error);
        alert("No se pudieron cargar los tatuajes");
    }
}

document.addEventListener('DOMContentLoaded', loadTattoos);
