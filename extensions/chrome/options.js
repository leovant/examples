var page = document.getElementById('buttonDiv');

const kButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];

function constructOptions(kButtonColors) {
  for (var item of kButtonColors) {
    var button = document.createElement('button');
    button.style.backgroundColor = item;
    button.addEventListener('click', function() {
      chrome.storage.sync.set({ color: item }, function() {
        console.log('The color is ' + item);
      });
    });
    page.appendChild(button);
  }
}
constructOptions(kButtonColors);
