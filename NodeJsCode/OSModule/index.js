const os = require('os');

// os.arch() => return OS cpu architecture like 64, 32 bit
console.log(os.arch())

// os.constants => contains commonly used operating system specific constants for error codes etc.

console.log(os.constants);

// os.cpus() => return an array of objects containing info about each logical cpu core like => model ,speed times

console.log(os.cpus())

// os.freemem() => return the amount of free system memory in bytes as an integer.

console.log(`${os.freemem()/1024/1024/1024}`); // bytes to GegaBytes 


// os.getPriority(pid) => returns the scheduling priority for the process specifed by pid.
// if pid is not given or 0 , the priority of current process is returned

console.log(os.getPriority(0))

// os.homedir() => return the path of the current user's home diretory.

console.log(os.homedir())

// os.totalmem() => return the total memory of system

console.log(os.totalmem())


// os.hostname() => return the hostname (desktop name)

console.log(os.hostname())

// os.platform() => return user's platform  (win32)

console.log(os.platform())

// os.tmpdir() => return the path of temperory directory

console.log(os.tmpdir())

// os.type() => return OS name as returned by uname
// Linux for linux
// Windows_NT for windows
// Darwin for macos

console.log(os.type())