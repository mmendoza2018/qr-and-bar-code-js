let html5QrCode = null;
function onScanSuccess(decodedText, decodedResult) {
  // handle the scanned code as you like, for example:
  console.log(`Code matched = ${decodedText}`, decodedResult);
  Swal.fire(decodedText);
}

function onScanFailure(error) {
  // handle scan failure, usually better to ignore and keep scanning.
  // for example:
  console.warn(`Code scan error = ${error}`);
}

//detectar camaras disponibles 
Html5Qrcode.getCameras().then(camaras => {
  if (camaras && camaras.length) {
    console.log('camaras :>> ', camaras);
    // encontro camaras disponibles
    var cameraId = camaras[0].id;
    let selectCamara = document.getElementById("CamarasDisponibles");
    let html = `<option value="" selected>Seleccione una camara</option>`;

    camaras.forEach(camara => {
      html += `<option value="${camara.id}">${camara.label}</option>`;
    });

    selectCamara.innerHTML = html;
  }
}).catch(error => {
  console.log('error :>> ', error);
});

const seleccionoCamara = (elemento) => {

  let camaraSeleccionada = elemento.value;
  console.log('camaraSeleccionada :>> ', camaraSeleccionada);
  if (camaraSeleccionada === "") return;
  document.getElementById("imgReferencial").style.display = "none";
  html5QrCode = new Html5Qrcode("qr-reader");
  html5QrCode.start(
    camaraSeleccionada,
    {
      fps: 10,    // Optional, frame per seconds for qr code scanning
      qrbox: { width: 250, height: 250 }  // Optional, if you want bounded box UI
    }, onScanSuccess)
    .catch((err) => {
      console.log('err :>> ', err);
    });

}

const detenerCamara = () => {
  console.log('html5QrCode :>> ', html5QrCode);
  html5QrCode.stop().then((ignore) => {
    document.getElementById("imgReferencial").style.display = "block";
    document.getElementById("CamarasDisponibles").value = "";
    
  }).catch((err) => {
    // Stop failed, handle it.
  });
}


/* lectura de imagenes */

const html5QrCode2 = new Html5Qrcode("reader");
// File based scanning
const fileinput = document.getElementById('qr-input-file');
fileinput.addEventListener('change', e => {
  if (e.target.files.length == 0) {
    // No file selected, ignore 
    return;
  }

  const imageFile = e.target.files[0];
  // Scan QR Code
  html5QrCode2.scanFile(imageFile, true)
  .then(decodedText => {
    // success, use decodedText
    console.log(decodedText);
  })
  .catch(err => {
    // failure, handle it.
    console.log(`Error scanning file. Reason: ${err}`)
  });
});




/* let html5QrcodeScanner = new Html5QrcodeScanner(
    "qr-reader",
    { fps: 10, qrbox: { width: 250, height: 250 } },
     false);
html5QrcodeScanner.render(onScanSuccess); */