const { spawn } = require('child_process');

module.exports = function(command, options){
  console.log(options);
  let cmd = spawn.apply(null, [ 'sh', [ '-c', `"${command}"` ], options ]);
  /*
  cmd.stdout.pipe(process.stdout);
  cmd.stderr.pipe(process.stderr);
  cmd.stdin.pipe(process.stdin);
  */
  return cmd;
};
