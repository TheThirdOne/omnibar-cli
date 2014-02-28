chrome.omnibox.onInputChanged.addListener(
  function(text, suggest) {
    console.log('inputChanged: ' + text);
    console.log(getSuggestions(text,obj))
    suggest(getSuggestions(text,obj));
  });
obj = {
  hello:1,
  hii:{there:'cool'}
}
// This event is fired with the user accepts the input in the omnibox.
chrome.omnibox.onInputEntered.addListener(
  function(text) {
    console.log('inputEntered: ' + text);
    alert('You just typed "' + text + '"');
  });