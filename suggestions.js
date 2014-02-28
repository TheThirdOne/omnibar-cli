function Command(){
}
Command.prototype.getKeys = function(match){
  temp = this;
  if(typeof match === 'object'){
    for(var i = 0; i < match.length-1;i++){
      temp = temp[match[i]];
      console.log(temp);
      if(typeof temp !== 'object'){
        return undefined;
      }
    }
    match = match[match.length-1];
  }
  var r = [];
  for (var k in temp) {
      if (!temp.hasOwnProperty(k)) 
          continue;
      if(k.startsWith(match))
        r.push(k);
  }
  return r;
};
Command.prototype.getValue = function(match){
  for(var i = 0; i < match.length-1;i++){
    temp = temp[match[i]];
    console.log(temp);
    if(typeof temp !== 'object'){
      return undefined;
    }
  }
  return temp[match[match.length-1]];
};
Command.prototype.getSuggestions = function(text){
  var textArr = text.split(/\s+/);
  
  var temp = textArr[textArr.length-1];
  textArr[textArr.length-1] = ''; 
  var prefix = textArr.join(' '); //makes prefix
  textArr[textArr.length-1] = temp;
  
  var a = makeSuggestions(this.getKeys(textArr),prefix);
  if(a===undefined){
    return [{content: text+' ',description: 'No suggestions'}];
  }
  textArr[textArr.length-1] = a[0].description;
  temp = this.getValue(textArr);
  if(a.length === 1&&temp&&typeof temp === 'object'){
    var com = a[0];
    textArr.push('');
    a = makeSuggestions(this.getKeys(textArr),prefix+' '+com.description,com.description+' ');
    a.splice(0,0,com);
  }
  return a;
};
function makeSuggestions(keys,prefix,dprefix){
  var r = [];
  if(!keys)return undefined;
  dprefix = dprefix || '';
  for(var i = 0;i < keys.length;i++){
    r.push({content:prefix+' '+keys[i],description:dprefix + keys[i]});
  }
  return r;
}