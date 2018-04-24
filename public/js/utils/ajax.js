define( require => {
  return function(url, data){
    return $.ajax({
      url,
      data,
      method : 'POST'
    });
  }
});
