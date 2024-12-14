// URL del Apps Script desplegado
const apiUrl = 'https://script.google.com/macros/s/AKfycbwiiFVvzIff4_S77VpdJrQeFybdMa2iRflUewL-mGvnGF_933n-m3Z11NNVIXllt8Wn/exec';

const slider = document.getElementById('slider');
let currentIndex = 0;
let images = [];

// Función para transformar enlaces de Google Drive a formato de vista directa
function transformGoogleDriveLink(link) {
    const driveFileRegex = /https:\/\/drive\.google\.com\/file\/d\/([^\/]+)\/view/;
    const match = link.match(driveFileRegex);
    return match ? `https://drive.google.com/uc?id=${match[1]}` : link;
}

// Función para mover el slider
function moveSlider(index) {
    currentIndex = (index + images.length) % images.length; // Asegurar índice válido
    const offset = currentIndex * -100;
    slider.style.transform = `translateX(${offset}%)`;
}

// Navegación con botones
document.getElementById('nextBtn').addEventListener('click', () => {
    moveSlider(currentIndex + 1);
});

document.getElementById('prevBtn').addEventListener('click', () => {
    moveSlider(currentIndex - 1);
});

// Función para cargar imágenes desde la hoja "PORTADA" del Google Sheet
async function loadSliderImages() {
    try {
        const portadaUrl = `${apiUrl}?sheet=PORTADA`; // URL para la hoja "PORTADA"
        const response = await fetch(portadaUrl);
        const result = await response.json();

        if (result.status === 'success') {
            images = result.data.slice(1).map(row => transformGoogleDriveLink(row[0])); // Saltar encabezado y obtener URLs

            console.log('Imágenes desde PORTADA:', images);

            // Crear las imágenes dentro del slider
            images.forEach(imageUrl => {
                const imgElement = document.createElement('img');
                imgElement.src = imageUrl;
                imgElement.alt = 'Imagen del slider';
                slider.appendChild(imgElement);
            });

            // Ajustar el ancho del slider basado en las imágenes
            slider.style.width = `${images.length * 100}%`;

            // Iniciar el slider en la primera imagen
            moveSlider(0);
        } else {
            console.error('Error al cargar imágenes de PORTADA:', result.message);
        }
    } catch (error) {
        console.error('Error al cargar las imágenes desde PORTADA:', error);
    }
}

// Función para cargar noticias desde la hoja "NOTICIAS" del Google Sheet
async function loadNews() {
    try {
        const newsUrl = `${apiUrl}?sheet=NOTICIAS`; // URL para la hoja "NOTICIAS"
        const response = await fetch(newsUrl);
        const result = await response.json();

        if (result.status === 'success') {
            const newsContainer = document.querySelector('.news-grid');
            const newsData = result.data.slice(1); // Saltar encabezado

            console.log('Noticias desde NOTICIAS:', newsData);

            // Crear las cards para cada noticia
            newsData.forEach(newsItem => {
                const [title, description, imageUrl] = newsItem; // Suponiendo que las columnas son Título, Descripción e Imagen

                const newsCard = document.createElement('div');
                newsCard.classList.add('news-card');

                const imgElement = document.createElement('img');
                imgElement.src = transformGoogleDriveLink(imageUrl);
                imgElement.alt = `Imagen de ${title}`;
                imgElement.classList.add('news-image');

                const contentDiv = document.createElement('div');
                contentDiv.classList.add('news-content');

                const titleElement = document.createElement('h3');
                titleElement.textContent = title;

                const descriptionElement = document.createElement('p');
                descriptionElement.textContent = description;

                contentDiv.appendChild(titleElement);
                contentDiv.appendChild(descriptionElement);

                newsCard.appendChild(imgElement);
                newsCard.appendChild(contentDiv);

                newsContainer.appendChild(newsCard);
            });
        } else {
            console.error('Error al cargar noticias de NOTICIAS:', result.message);
        }
    } catch (error) {
        console.error('Error al cargar las noticias desde NOTICIAS:', error);
    }
}

// Función para cargar propuestas desde la hoja "PROPUESTAS"
async function loadProposals() {
    try {
        const proposalsUrl = `${apiUrl}?sheet=PROPUESTAS`;
        const response = await fetch(proposalsUrl);
        const result = await response.json();

        if (result.status === 'success') {
            const proposalsContainer = document.querySelector('.features-grid');
            const proposalsData = result.data.slice(1); // Saltar encabezado

            console.log('Propuestas desde PROPUESTAS:', proposalsData);

            // Crear las cards para cada propuesta
            proposalsData.forEach(proposalItem => {
                const [title, description] = proposalItem; // Suponiendo que las columnas son Título y Descripción

                const proposalCard = document.createElement('div');
                proposalCard.classList.add('feature-card');

                const titleElement = document.createElement('h3');
                titleElement.textContent = title;

                const descriptionElement = document.createElement('p');
                descriptionElement.textContent = description;

                proposalCard.appendChild(titleElement);
                proposalCard.appendChild(descriptionElement);

                proposalsContainer.appendChild(proposalCard);
            });
        } else {
            console.error('Error al cargar propuestas:', result.message);
        }
    } catch (error) {
        console.error('Error al cargar las propuestas:', error);
    }
}

// Función para cargar equipo desde la hoja "EQUIPO"
async function loadTeam() {
    try {
        const teamUrl = `${apiUrl}?sheet=EQUIPO`;
        const response = await fetch(teamUrl);
        const result = await response.json();

        if (result.status === 'success') {
            const teamContainer = document.querySelector('.team-grid');
            const teamData = result.data.slice(1); // Saltar encabezado

            console.log('Equipo desde EQUIPO:', teamData);

            // Crear las cards para cada miembro del equipo
            teamData.forEach(teamItem => {
                const [name, position, description, imageUrl] = teamItem; // Suponiendo columnas: Nombre, Puesto, Descripción, Imagen

                const teamCard = document.createElement('div');
                teamCard.classList.add('team-card');

                const imgContainer = document.createElement('div');
                imgContainer.classList.add('team-image-container');

                const imgElement = document.createElement('img');
                imgElement.src = transformGoogleDriveLink(imageUrl);
                imgElement.alt = `Imagen de ${name}`;
                imgElement.classList.add('team-image');

                imgContainer.appendChild(imgElement);

                const infoDiv = document.createElement('div');
                infoDiv.classList.add('team-info');

                const nameElement = document.createElement('h3');
                nameElement.textContent = name;
                nameElement.classList.add('team-name');

                const positionElement = document.createElement('p');
                positionElement.textContent = position;
                positionElement.classList.add('team-position');

                const descriptionElement = document.createElement('p');
                descriptionElement.textContent = description;
                descriptionElement.classList.add('team-description');

                infoDiv.appendChild(nameElement);
                infoDiv.appendChild(positionElement);
                infoDiv.appendChild(descriptionElement);

                teamCard.appendChild(imgContainer);
                teamCard.appendChild(infoDiv);

                teamContainer.appendChild(teamCard);
            });
        } else {
            console.error('Error al cargar equipo:', result.message);
        }
    } catch (error) {
        console.error('Error al cargar el equipo:', error);
    }
}

// Cargar las imágenes, noticias, propuestas y equipo al cargar la página
window.onload = () => {
    loadSliderImages();
    loadNews();
    loadProposals();
    loadTeam();
};

// Obtener los enlaces y las secciones
const equipoLink = document.querySelector('a[href="#equipo"]');
const sections = document.querySelectorAll('section');
const equipoSection = document.querySelector('#equipo');
const otherLinks = document.querySelectorAll('a[href]:not([href="#equipo"])');

// Inicialmente, la sección de "Nuestro Equipo" está oculta
equipoSection.style.display = 'none';

// Manejador para la sección de "Nuestro Equipo"
equipoLink.addEventListener('click', (e) => {
    e.preventDefault();

    // Si "Nuestro Equipo" está oculta, mostrarlo con animación
    if (equipoSection.style.display === 'none') {
        // Ocultar todas las demás secciones
        sections.forEach(section => {
            section.style.display = 'none';
        });

        // Mostrar la sección de "Nuestro Equipo" con animación
        equipoSection.style.display = 'block';
        equipoSection.classList.add('slide-in');

        // Desplazar la página hacia la parte superior de la sección "Nuestro Equipo"
        window.scrollTo({
            top: equipoSection.offsetTop,
            behavior: 'smooth'
        });

        setTimeout(() => {
            equipoSection.classList.remove('slide-in');
        }, 1000); // Duración de la animación
    }
});

// Manejador para otros enlaces
otherLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        // Ocultar la sección de "Nuestro Equipo" si está visible
        if (equipoSection.style.display === 'block') {
            equipoSection.classList.add('slide-out');
            setTimeout(() => {
                equipoSection.style.display = 'none';
                equipoSection.classList.remove('slide-out');
            }, 500); // Duración de la animación de salida
        }

        // Mostrar las demás secciones
        sections.forEach(section => {
            if (section !== equipoSection) {
                section.style.display = 'block';
            }
        });
    });
});

// Obtener el navbar y la sección de inicio
const navbar = document.querySelector('.navbarx');
const inicioSection = document.querySelector('#inicio');

// Función para manejar el cambio de clase según la posición en la página
window.addEventListener('scroll', () => {
    if (window.scrollY >= inicioSection.offsetTop) {
        // Si estamos más allá de la sección de inicio, reducimos el navbar
        navbar.classList.add('shrunk');
    } else {
        // Si estamos en la sección de inicio, restauramos el navbar
        navbar.classList.remove('shrunk');
    }
});

// Formulario de inscripción
const form = document.getElementById('registrationForm');

// URL del script de Google Apps Script
const googleScriptURL = 'TU_URL_DEL_DESPLIEGUE';

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Recoger los datos del formulario
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    try {
        // Enviar los datos a Google Sheets
        const response = await fetch(googleScriptURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (result.status === 'success') {
            alert('¡Inscripción completada exitosamente!');
            form.reset();
        } else {
            alert('Hubo un problema al enviar los datos. Por favor, inténtalo de nuevo.');
        }
    } catch (error) {
        console.error('Error al enviar los datos:', error);
        alert('Error al conectar con el servidor. Por favor, inténtalo de nuevo más tarde.');
    }
});


const sliderTrack2 = document.getElementById('sliderTrack2');
    let postIds = []; // Aquí guardaremos los postIds desde la hoja de cálculo

    // URL de tu API de Apps Script
    const apiUrl2 = 'https://script.google.com/macros/s/AKfycbzmemX5EQzzwEPDBsgs7WUuW5wVGCZ2KG8snGhVc0bf_3a1yc-DlK_djhh82xtxQpwFAg/exec'; // Reemplaza con la URL de tu API de Apps Script

    // Función para obtener los postIds desde la API de Apps Script
    async function fetchPostIds() {
        const response = await fetch(apiUrl2);
        const data = await response.json();
        postIds = data; // Asigna los postIds obtenidos
        addInstagramPosts(postIds); // Llama a la función para agregar los posts
    }

    // Función para agregar publicaciones de Instagram
    async function addInstagramPosts(postIds) {
        let slides = [];
        const postsPerSlide = 3; // Número de publicaciones por slide

        // Agrupar las publicaciones en slides
        for (let i = 0; i < postIds.length; i += postsPerSlide) {
            const slide = document.createElement('div');
            slide.classList.add('slide2');
            const posts = postIds.slice(i, i + postsPerSlide);

            // Agregar publicaciones al slide
            posts.forEach(postId => {
                const post = document.createElement('div');
                post.classList.add('post2');
                post.innerHTML = ` 
                    <blockquote class="instagram-media" 
                        data-instgrm-captioned 
                        data-instgrm-permalink="https://www.instagram.com/reel/${postId}/?utm_source=ig_embed&amp;utm_campaign=loading" 
                        data-instgrm-version="14">
                    </blockquote>
                `;
                slide.appendChild(post);
            });

            slides.push(slide);
        }

        // Agregar todos los slides al track
        slides.forEach(slide => sliderTrack2.appendChild(slide));

        // Reprocesar las incrustaciones de Instagram
        window.instgrm.Embeds.process();
    }

    // Llamar a la función para obtener los datos desde la hoja de cálculo
    fetchPostIds();

    // Función para actualizar la posición del slider
    const updateSliderPosition = () => {
        const sliderWidth = document.querySelector('.slider2').offsetWidth;
        const postsPerScreen = Math.floor(sliderWidth / (document.querySelector('.post2').offsetWidth + 5)); // Calcula cuántas publicaciones caben en pantalla
        const totalPosts = document.querySelectorAll('.post2').length;

        // Asegurar que el índice no se salga de los límites
        if (currentIndex2 < 0) currentIndex2 = 0;
        if (currentIndex2 >= totalPosts - postsPerScreen) currentIndex2 = totalPosts - postsPerScreen;

        // Calcular el desplazamiento necesario
        const offset = -currentIndex2 * (document.querySelector('.post2').offsetWidth + 5); // 5px de margen entre publicaciones
        sliderTrack2.style.transform = `translateX(${offset}px)`;
    };

    let currentIndex2 = 0;

    document.getElementById('prevBtn2').addEventListener('click', () => {
        currentIndex2 = Math.max(0, currentIndex2 - 1); // Mover una publicación a la vez
        updateSliderPosition();
    });

    document.getElementById('nextBtn2').addEventListener('click', () => {
        const totalPosts = document.querySelectorAll('.post2').length;
        const postsPerScreen = Math.floor(document.querySelector('.slider2').offsetWidth / (document.querySelector('.post2').offsetWidth + 5));
        currentIndex2 = Math.min(totalPosts - postsPerScreen, currentIndex2 + 1); // Mover una publicación a la vez
        updateSliderPosition();
    });