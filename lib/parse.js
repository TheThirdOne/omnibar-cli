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