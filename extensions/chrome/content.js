const extension_id = 'mfgahechimnhoclmnokgoinlicmhfofa';
const extension_port_name = 'br.net.cartoriodigital.signer.PORT';
const request_event = 'br.net.cartoriodigital.signer.request';
const response_event = 'br.net.cartoriodigital.signer.response';

let extension_port = null;
let browser = chrome;

function init() {
  injectMeta();

  document.addEventListener(request_event, function(event) {
    onPageMessage(event.detail);
  });
}

function onPageMessage(message) {
  console.log('[Content] received a request', message);

  if (extension_port === null) {
    extension_port = browser.runtime.connect({ name: extension_port_name });
    extension_port.onMessage.addListener(onExtensionMessage);
    console.log('[Content] opened port with extension');
  }
  extension_port.postMessage(message);
}

function onExtensionMessage(message) {
  console.log('[Content] received a response', message);

  document.dispatchEvent(new CustomEvent(response_event, { detail: message }));
}

function injectMeta() {
  let meta = document.createElement('meta');
  meta.id = extension_id;
  meta.name = 'br.net.cartoriodigital.signer';
  document.head.appendChild(meta);
}

init();
