module.exports = {

  filtrate : function(buffer){
    let data   = buffer.toString('utf8');
    let filter = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;

    return data.replace(filter, "");
  }
};
