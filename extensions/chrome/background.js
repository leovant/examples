const version = '1.0';

const native_application = 'br.net.cartoriodigital.assinador';
const page_host = 'acesso.cartoriodigital.net.br';
const extension_id = 'mfgahechimnhoclmnokgoinlicmhfofa';
const extension_port_name = 'br.net.cartoriodigital.assinador.PORT';

const status = {
  INSTALLED: 0,
  EXTENSION_NOT_INSTALLED: 1,
  EXTENSION_OUTDATED: 2,
  NATIVE_NOT_INSTALLED: 3,
  NATIVE_OUTDATED: 4
};

let browser = chrome;
let pages = [];
/**
 * Set initial listeners.
 */
function init() {
  browser.runtime.onConnect.addListener(onPageConnected);

  if (browser.runtime.onUpdateAvailable != null) {
    browser.runtime.onUpdateAvailable.addListener(onUpdateAvailable);
  }
  console.log('[Background] loaded');
}
/**
 * Handler called when an update is available.
 * @param {Object} details Details of the update.
 */
function onUpdateAvailable(details) {
  console.info(`New version available: ${details.version}`);
  // Update extension
}
/**
 * Connect to the native application.
 * @param {Object} page The connected page.
 */
function connectToNative(page) {
  page.native_port = browser.runtime.connectNative(native_application);

  page.native_port.onMessage.addListener(function(message) {
    onNativeMessage(page, message);
  });

  page.native_port.onDisconnect.addListener(function(callback_port) {
    onNativeDisconnected(page, callback_port);
  });
  console.log('[Background] connected to native application');
}
/**
 * Handler called when the a message is received from the native application.
 * @param {Object} page The connected page.
 * @param {Object|string} message The received message.
 */
function onNativeMessage(page, message) {
  if (page.disconnected) {
    console.log(
      '[Background] received message from native component (page already disconnected)'
    );
    return;
  }

  if (typeof message === 'string') {
    message = JSON.parse(message);
  }
  console.log('[Background] received message from native application', message);

  if (message._rid !== undefined) {
    let callback = page.callbacks[message._rid];
    delete page.callbacks[message._rid];
    callback(message);
  } else {
    console.warn("Missing request id ('_rid') in the message.", message);
  }
}
/**
 * Handler called when the native application disconnects.
 * @param {Object} page The connected page.
 * @param {Object} port The connection port.
 */
function onNativeDisconnected(page, port) {
  if (page.disconnected) {
    console.log(
      '[Background] native component disconnected (page already disconnected'
    );
    return;
  }

  let error_message = 'Did not receive response from native application';

  if (port && port.error && port.error.message) {
    error_message = port.error.message;
  } else if (browser.runtime.lastError === 'string') {
    error_message = browser.runtime.lastError;
  } else if (browser.runtime.lastError.message) {
    error_message = browser.runtime.lastError.message;
  }
  console.error(`[Background] native component disconnected: ${error_message}`);

  page.native_port = null;

  for (let request_id in page.callbacks) {
    let callback = page.callbacks[request_id];

    callback({
      success: false,
      exception: {
        message: error_message,
        complete: error_message,
        origin: 'background',
        code: 'native_disconnected'
      }
    });
    delete page.callbacks[request_id];
  }
}
/**
 * Handler called when a new page connects to the extension.
 * @param {Object} port The connection port.
 */
function onPageConnected(port) {
  let page = {
    page_port: port,
    native_port: null,
    disconnected: false,
    callbacks: {}
  };

  if (port.name !== extension_port_name) {
    console.warn(`[Background] ignored connect event on port ${port.name}`);
    return;
  }
  pages.push(page);

  port.onMessage.addListener(function(message) {
    onPageMessage(page, message);
  });

  port.onDisconnect.addListener(function() {
    onPageDisconnected(page);
  });

  try {
    connectToNative(page);
  } catch (err) {
    console.error(
      '[Background] got an error while connecting to native application',
      err
    );
  }
}
/**
 * Handler called when a message is received from the page.
 * @param {Object} page The connected page.
 * @param {Object|string} message The message.
 */
function onPageMessage(page, message) {
  let page_callback = function(response) {
    console.log('[Background] calling callback function', response);

    page.page_port.postMessage(response);
  };
  if (typeof message === 'string') {
    message = JSON.parse(message);
  }
  message._rid = uuid();
  page.callbacks[message._rid] = page_callback;
  console.log('[Background] sending message to native', message);

  if (page.native_port === null) {
    try {
      connectToNative(page);
    } catch (err) {
      console.error(
        '[Background] got an error while connecting to native application',
        err
      );
    }
  }
  // TODO: read message command
  page.native_port.postMessage(message);
}
/**
 * Handler called when a page disconnects.
 * @param {Object} page The page that disconnected.
 */
function onPageDisconnected(page) {
  console.log('[Background] disconnected page', page);
  page.disconnected = true;

  if (page.native_port) {
    // Native shutdown?
  }
  pages.splice(pages.indexOf(page), 1);
}
/**
 * RFC 4122 compliant UUID generator.
 * Extracted from https://codingrepo.com/regular-expression/2015/11/23/javascript-generate-uuidguid-for-rfc-4122-version-4-compliant-with-regular-expression/
 */
function uuid() {
  // Modern browsers
  if (crypto) {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      let r = crypto.getRandomValues(new Uint8Array(1))[0] % 16 | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
  // Old browsers
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
/**
 * Main script
 */
chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: page_host }
          })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
});

init();
