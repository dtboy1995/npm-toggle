TAOBAO            = 'https://registry.npm.taobao.org/'
NPM               = 'https://registry.npmjs.org/'

exec              = require 'execa'
command           = require 'commander'
{ version }       = require '../package'    
{ green, yellow } = require 'colors/safe'

command
    .usage "#{green '--taobao'} or #{green '--npm'}" 
    .version version
    .option '-t, --taobao', 'set taobao registry'
    .option '-n, --npm', 'set npm registry'
    .option '-r, --registry', 'show current registry'
    .parse process.argv

{ taobao, npm, registry } = command
unless taobao? or npm? or registry? then command.help()
url = if taobao? then TAOBAO else NPM
script = if registry then 'npm config get registry' else "npm config set registry #{url}"
        
exec.shell script
    .then ({stdout}) ->
      unless registry
        console.log "npm registry has switched to #{yellow url}"
      else
        console.log "current registry is #{yellow stdout}"
    .catch console.error
