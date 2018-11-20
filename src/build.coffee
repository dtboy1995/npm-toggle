fs      =   require 'fs'
del     =   require 'del'
exec    =   require 'execa'

del "bin/*.*"
  .then ->
    exec.shell "coffee --output bin/ -c src/"
  .then ->
    filename = "bin/toggle.js"
    clistr = fs.readFileSync filename, 'utf-8'
    fs.writeFileSync filename, "#!/usr/bin/env node\n#{clistr}"
    console.log "build done"
  .catch console.error