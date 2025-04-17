(function ($) {
    "use strict";
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Date and time picker
    $('#date').datetimepicker({
        format: 'L'
    });
    $('#time').datetimepicker({
        format: 'LT'
    });


    // Pricing carousel
    $(".pricing-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        margin: 30,
        loop: true,
        dots: false,
        nav : false,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            }
        }
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        margin: 30,
        dots: true,
        loop: true,
        items: 1
    });
    
})(jQuery);

fetch("https://script.google.com/macros/s/AKfycbwvty1OV9hHNl5andX2atqpWRisdOOJfH3W0um6WpsRTSVT9lIgyn6_vIK_nk_4WsE7zA/exec?sheet=NT")
  .then((res) => res.json())
  .then((data) => {
    const container = document.querySelector(".service-carousel");

    data.forEach((item) => {
      const div = document.createElement("div");
      div.className = "service-item position-relative";
      div.innerHTML = `
        <img class="img-fluid" src="${item.imagen}" alt="">
        <div class="service-text text-center">
        <div class="not">
            <h4 class="text-white font-weight-medium px-3 ">${item.titulo || ""}</h4>
            <p class="text-white px-3 mb-3 ">${item.descripcion || ""}</p> </div>
            ${
                item.texto_boton
                  ? `<div class="w-100 bg-white text-center p-4">
                       <button class="btn btn-primary abrir-modal up" 
                               data-imagen="${item.imagen}"
                               data-titulo="${item.titulo}"
                               data-descripcion="${item.descripcion}"
                               data-contenido="${item.contenido || ''}"
                               data-fecha="${item.fecha || ''}"
                               data-autor="${item.autor || ''}">
                         ${item.texto_boton}
                       </button>
                     </div>`
                  : ""
              }
              
        </div>
      `;
      container.appendChild(div);
    });

    $(".service-carousel").owlCarousel({
      autoplay: true,
      smartSpeed: 1500,
      margin: 30,
      dots: false,
      loop: true,
      nav: true,
      navText: [
        '<i class="bi bi-chevron-left"></i>',
        '<i class="bi bi-chevron-right"></i>'
      ],
      responsive: {
        0: { items: 1 },
        576: { items: 2 },
        768: { items: 3 },
        992: { items: 4 }
      }
    });
  })
  .catch((err) => console.error("Error cargando noticias:", err));

  fetch("https://script.google.com/macros/s/AKfycbwvty1OV9hHNl5andX2atqpWRisdOOJfH3W0um6WpsRTSVT9lIgyn6_vIK_nk_4WsE7zA/exec?sheet=QS")
  .then((res) => res.json())
  .then((data) => {
    const container = document.getElementById("quienes-somos-container");

    const item = data[0]; // Solo usamos el primer ítem para esta sección

    const puntos = item.puntos
      ? item.puntos.split(",").map(punto => `
          <li class="h6 py-1">
            <i class="far fa-circle text-primary mr-3"></i>${punto.trim()}
          </li>`).join("")
      : "";

    container.innerHTML = `
      <div class="container py-5">
        <div class="row">
          <div class="col-lg-6" style="min-height: 500px;">
            <div class="position-relative h-100">
              <img class="position-absolute w-100 h-100" src="${item.imagen || ''}" style="object-fit: cover;">
            </div>
          </div>
          <div class="col-lg-6 pt-5 pb-lg-5">
            <div class="hours-text bg-light p-4 p-lg-5 my-lg-5">
              <h6 class="d-inline-block text-white text-uppercase bg-primary py-1 px-2">Quienes Somos</h6>
              <h1 class="mb-4">${item.titulo || "Título no disponible"}</h1>
              <p>${item.descripcion || ""}</p>
              <ul class="list-inline">
                ${puntos}
              </ul>
              ${
                item.url_boton && item.texto_boton
                  ? `<a href="${item.url_boton}" target="_blank" class="btn btn-primary mt-2">${item.texto_boton}</a>`
                  : ""
              }
            </div>
          </div>
        </div>
      </div>
    `;
  })
  .catch((err) => console.error("Error cargando sección 'Quienes Somos':", err));

  document.addEventListener("DOMContentLoaded", function () {
    fetch("https://script.google.com/macros/s/AKfycbwvty1OV9hHNl5andX2atqpWRisdOOJfH3W0um6WpsRTSVT9lIgyn6_vIK_nk_4WsE7zA/exec?sheet=Planes")
      .then(response => response.json())
      .then(data => {
        const $carousel = $('#pricing-carousel');
        const wrapper = document.getElementById("planes-wrapper");
        const lateral = document.getElementById("img-lateral");
  
        // Agregar slides al carrusel
        data.forEach(item => {
            const serviciosHTML = item.servicios?.split('&').map(s => `
                <p><i class="fa fa-check text-success mr-2"></i>${s.trim()}</p>
              `).join('') || "";
              
              const slide = `
                <div class="item bg-white" data-bg="${item.imagen_fondo}" data-img="${item.imagen_lateral}">
                  <div class="border-bottom border-primary p-4 other">
                    <h3 class="text-primary text-uppercase mb-2" style="font-size: 1.0rem;">${item.plan}</h3>
                    <p class="text-muted" style="font-size: 0.7rem;" >${item.descripcion || ''}</p>
                  </div>
                  <div class="p-4 itemlist">
                    ${serviciosHTML}
                    ${(item.url_boton && item.texto_boton) ? `<a href="${item.url_boton}" class="btn btn-primary my-2" target="_blank" style="font-size: 0.7rem;">${item.texto_boton}</a>` : ''}
                  </div>
                </div>
              `;              
          $carousel.append(slide);
        });
  
        // Inicializar Owl Carousel
        $('#pricing-carousel').owlCarousel({
            autoplay: true,
            smartSpeed: 1000,
            margin: 30,
            dots: false,
            loop: true,
            nav: true,
            navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
            responsive: {
              0: {
                items: 1
              },
              768: {
                items: 2
              }
            },
            onInitialized: updateBackground,
            onTranslated: updateBackground
          });
          
  
        // Función para cambiar imagenes
        function updateBackground(event) {
          const index = event.item.index - event.relatedTarget._clones.length / 2;
          const realIndex = (index + event.item.count) % event.item.count;
          const currentSlide = event.target.querySelectorAll('.owl-item')[realIndex].querySelector('.item');
  
          if (!currentSlide) return;
  
          const bg = currentSlide.getAttribute('data-bg');
          const img = currentSlide.getAttribute('data-img');
  
          wrapper.style.backgroundImage = `url('${bg || ''}')`;
  
          lateral.style.opacity = 0;
          setTimeout(() => {
            lateral.src = img || '';
            lateral.style.opacity = 1;
          }, 300);
        }
      });
  });

  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("abrir-modal")) {
      const btn = e.target;
  
      // Cargar contenido del modal
      document.getElementById("noticiaModalImagen").src = btn.dataset.imagen || "";
      document.getElementById("noticiaModalTitulo").textContent = btn.dataset.titulo || "";
      document.getElementById("noticiaModalDescripcion").textContent = btn.dataset.descripcion || "";
      document.getElementById("noticiaModalContenido").innerHTML = btn.dataset.contenido || "";
  
      // Formatear la fecha
      let fechaFormateada = "";
      if (btn.dataset.fecha) {
        const fecha = new Date(btn.dataset.fecha);
        fechaFormateada = fecha.toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric"
        });
      }
  
      // Agregar metadatos
      document.getElementById("noticiaModalMeta").textContent =
        `${fechaFormateada} - ${btn.dataset.autor || "Anónimo"}`;
  
      // Mostrar el modal
      noticiaModalInstance = new bootstrap.Modal(document.getElementById('noticiaModal'));
      noticiaModalInstance.show();
    }
  });  