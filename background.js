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
  
function getKeys(obj,match) {
    var r = [];
    for (var k in obj) {
        if (!obj.hasOwnProperty(k)) 
            continue;
        if(k.startsWith(match))
          r.push(k);
    }
    return r;
}
function makeSuggestions(keys,obj,prefix,dprefix){
  var r = [];
  dprefix = dprefix || '';
  for(var i = 0;i < keys.length;i++){
    r.push({content:prefix+' '+keys[i],description:dprefix + keys[i]});
  }
  return r;
}
function getSuggestions(text,obj){
  var textArr = text.split(/\s+/);
  
  var temp = textArr[textArr.length-1];
  textArr[textArr.length-1] = ''; 
  var prefix = textArr.join(' ') //makes prefix
  textArr[textArr.length-1] = temp;
  
  temp = obj;
  for(var i = 0; i < textArr.length-1;i++){
    temp = temp[textArr[i]];
    console.log(temp);
    if(typeof temp !== 'object'){
      console.log('RUN')
      return [{content: text+' ',description: 'No suggestions'}]
    }
  }
  var a = makeSuggestions(getKeys(temp,textArr[textArr.length-1]),temp,prefix);
  if(a.length === 1&&temp[a[0].description]){
    console.log('good')
    var com = a[0];
    
    a = makeSuggestions(getKeys(temp[a[0].description],''),temp[a[0].description],prefix + ' '+a[0].description, a[0].description+' ');
    a.splice(0,0,com);
  }
  return a;
}
function parse(str){
  var split = str.split(/\s+/);
  out = {_:[]};
  for(var i = 0; i < split.length;i++){
    //if word is undefined skip
    if(!split[i])continue;
    //only work on options
    if(split[i].indexOf('-') !== -1){
      //splits the word into characters if necesary
      isSingle = (split[i].indexOf('--') !== -1);
      split[i] = split[i].replace(/-/g,'');
      if(isSingle){word=[split[i]]}else{word=split[i].split('')}
      //for boolean tags
      if(word.length > 1){
        for(var k = 0; k < word.length;k++){
          out[word[k]] = true;
        }
      }else{
        //makes option eqaul to the next word if possible; otherwise treat as boolean
        if(i < split.length-1 && split[i+1].indexOf('-')===-1){
          out[word[0]] = split[i+1];
          split[i+1] = undefined;
        }else{
          out[word[0]] = true;
        }
      }
    }else{
      //add to bare words
      out._.push(split[i]);
    }
  }
  return out;
}