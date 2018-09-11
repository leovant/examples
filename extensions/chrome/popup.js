const file_url =
  'https://acesso.cartoriodigital.net.br/assets/img/cdig-background-image-01-beach.jpg';

const request_event = 'br.net.cartoriodigital.assinador.request';
const response_event = 'br.net.cartoriodigital.assinador.response';

const native_application = 'br.net.cartoriodigital.assinador';
const extension_port_name = 'br.net.cartoriodigital.assinador.PORT';

var port = null;

function enableDownload(status) {
  if (status === true) {
    document.getElementById('ctn-download').style.display = 'block';
  } else {
    document.getElementById('ctn-download').style.display = 'none';
  }
}

function enableMessages(status) {
  if (status === true) {
    document.getElementById('ctn-messages').style.display = 'block';
  } else {
    document.getElementById('ctn-messages').style.display = 'none';
  }
}

function appendMessage(text) {
  document.getElementById('response').innerHTML += '<p>' + text + '</p>';
}

function connect() {
  appendMessage('Connecting to native host <b>' + native_application + '</b>');
  port = chrome.runtime.connectNative(native_application);

  if (port) {
    port.onMessage.addListener(onNativeMessage);
    port.onDisconnect.addListener(onDisconnected);

    document.getElementById('btn-send-message').disabled = false;
    document.getElementById('ctn-download').style.display = 'none';
  }
}

function onNativeMessage(message) {
  appendMessage('Received message: <b>' + JSON.stringify(message) + '</b>');
}

function onDisconnected() {
  appendMessage('Failed to connect: ' + chrome.runtime.lastError.message);
  port = null;
  document.getElementById('btn-send-message').disabled = true;
  document.getElementById('ctn-download').style.display = 'block';

  setTimeout(function() {
    connect();
  }, 5000);
}

function sendNativeMessage(text) {
  let message = { text: text };

  if (port == null) {
    connect();
  }
  port.postMessage(message);
  appendMessage('Sent message: <b>' + JSON.stringify(message) + '</b>');
}

document.addEventListener('DOMContentLoaded', function() {
  let btn_download = document.getElementById('btn-download');
  let btn_send = document.getElementById('btn-send-message');

  btn_download.onclick = function() {
    chrome.downloads.download(
      { url: file_url, filename: 'teste.jpg' },
      function(download_id) {
        chrome.downloads.onChanged.addListener(function(download) {
          if (download.id !== download_id || download.state === undefined) {
            return;
          }
          if (download.state.current === 'complete') {
            chrome.downloads.show(download_id);
          }
        });
      }
    );
  };

  btn_send.onclick = function() {
    let input = document.getElementById('input-text');

    sendNativeMessage(input.value);
  };

  connect();
});
