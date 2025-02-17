// Carga los datos de los tatuajes desde los archivos .md
async function loadTattoos() {
    const response = await fetch('/_tatuajes');
    const data = await response.json();

    const grid = document.querySelector('.grid-tatuajes');
    grid.innerHTML = ''; // Limpia el contenido anterior

    data.forEach(tattoo => {
        const card = `
            <div class="tattoo-card">
                <a href="${tattoo.image}" data-lightbox="tattoo">
                    <img src="${tattoo.image}" alt="${tattoo.title}">
                </a>
                <h3>${tattoo.title} - $${tattoo.price}</h3>
                <p>${tattoo.body}</p>
                <a href="https://wa.me/+5355549887?text=Hola%20quiero%20agendar%20una%20cita%20para%20este%20tatuaje:%20${tattoo.image}" class="whatsapp-btn">
                    📅 Agendar por WhatsApp
                </a>
            </div>
        `;
        grid.innerHTML += card;
    });

    // Inicializa Lightbox
    lightbox.option({
        resizeDuration: 200,
        wrapAround: true,
    });
}

// Carga los tatuajes cuando la página esté lista
document.addEventListener('DOMContentLoaded', loadTattoos);
