define( require => {
  let o = [,"st","nd","rd"];

  return function(intNum, includeNumber) {
    return (includeNumber ? intNum : "")
    + (o[((intNum = Math.abs(intNum % 100)) - 20) % 10] || o[intNum] || "th");
  };
});
