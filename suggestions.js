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