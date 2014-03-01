chrome.omnibox.onInputChanged.addListener(
  function(text, suggest) {
    console.log('inputChanged: ' + text);
    console.log(obj.getSuggestions(text))
    suggest(obj.getSuggestions(text));
  });
obj = new Command();
obj.hii = {there:'cool'};
obj.hello = 1;
// This event is fired with the user accepts the input in the omnibox.
chrome.omnibox.onInputEntered.addListener(
  function(text) {
    console.log('inputEntered: ' + text);
    alert('You just typed "' + text + '"');
  });