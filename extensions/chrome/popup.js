const file_url =
  'https://acesso.cartoriodigital.net.br/assets/img/cdig-background-image-01-beach.jpg';

let btn_download = document.getElementById('btn-download');

btn_download.onclick = function() {
  chrome.downloads.download({ url: file_url, filename: 'teste.jpg' }, function(
    download_id
  ) {
    chrome.downloads.onChanged.addListener(function(download) {
      if (download.id !== download_id || download.state === undefined) {
        return;
      }
      if (download.state.current === 'complete') {
        chrome.downloads.show(download_id);
      }
    });
  });
};
