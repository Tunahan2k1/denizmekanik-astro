// public/assets/js/iletisim.js

$(document).ready(function() {
  // Haritayı başlat
  initMap();
  
  const urlParams = new URLSearchParams(window.location.search);
  const konu = urlParams.get('konu');
  
  if (konu) {
    $('#subject').val(decodeURIComponent(konu));
  }
  
  $('#contactForm').on('submit', function(e) {
    e.preventDefault();
    const name = $('#name').val(), email = $('#email').val(), subject = $('#subject').val(), message = $('#message').val();
    
    if (!name || !email || !subject || !message) {
      showFormStatus('Lütfen tüm alanları doldurun.', 'error');
      return;
    }
    
    emailjs.send("service_iu3fiun", "template_02chgco", {
      from_name: name, from_email: email, subject: subject, message: message, to_email: "selamikir@denizmekanik.com"
    }).then(() => {
      showFormStatus('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.', 'success');
      $('#contactForm')[0].reset();
    }, (error) => {
      showFormStatus('Bir hata oluştu: ' + error.text, 'error');
    });
  });
});

function showFormStatus(message, type) {
  const formStatus = $('#formStatus');
  formStatus.text(message).removeClass('success error').addClass(type).fadeIn();
  setTimeout(() => { formStatus.fadeOut(); }, 5000);
}

function initMap() {
  if ($('#map').length === 0) return;
  
  const lat = 40.88156235281501;
  const lng = 29.359690105129584;
  
  const map = L.map('map').setView([lat, lng], 15);

  // === BU KISIM ÇOK ÖNEMLİ ===
  // Leaflet'in varsayılan ikon yollarını CDN'e göre yeniden yapılandırıyoruz.
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });
  // === BU KISIM ÇOK ÖNEMLİ ===
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
  
  L.marker([lat, lng]).addTo(map)
    .bindPopup('<b>Deniz Mekanik</b><br>Tuzla/İstanbul')
    .openPopup();
}