(() => {
  // Seletores dos principais elementos da interface
  const container = document.querySelector('.container');
  const qrCodeBtn = document.querySelector('#qr-form button');
  const qrCodeInput = document.querySelector('#qr-form input');
  const qrCodeImg = document.querySelector('#qr-code img');
  const qrImage = document.querySelector('#random-image');

  const QR_CODE_API = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=';

  // Função responsável por gerar o QR Code
  function gerarQrCode() {
    const inputValue = qrCodeInput.value.trim();
    if (!inputValue) return;

    qrCodeBtn.innerText = 'Gerando QR Code...';

    // Gera o QR Code
    qrCodeImg.src = `${QR_CODE_API}${encodeURIComponent(inputValue)}`;

    // Atualiza a imagem aleatória sempre que gerar o QR Code
    qrImage.src = `https://picsum.photos/400/200?random=${Date.now()}`;

    // Quando a imagem do QR Code carregar
    qrCodeImg.onload = () => {
      container.classList.add('active');
      qrCodeBtn.innerText = 'Código Criado!';
    };

    // Se ocorrer erro ao carregar QR Code
    qrCodeImg.onerror = () => {
      qrCodeBtn.innerText = 'Erro ao gerar QR Code!';
    };
  }

  // Lida com a tecla Enter no campo de input
  function aoPressionarEnter(e) {
    if (e.code === 'Enter') {
      e.preventDefault();
      gerarQrCode();
    }
  }

  // Reseta o estado visual se o campo for apagado
  function aoDigitarInput() {
    if (!qrCodeInput.value.trim()) {
      container.classList.remove('active');
      qrCodeBtn.innerText = 'Gerar QR Code';
    }
  }

  // Eventos
  qrCodeBtn.addEventListener('click', gerarQrCode);
  qrCodeInput.addEventListener('keydown', aoPressionarEnter);
  qrCodeInput.addEventListener('keyup', aoDigitarInput);
})();
 