'use strict'

const fs = require('fs').promises
const path = require('path')

if (process.argv.length < 3) {
  process.exit(1)
  return
}

function toNFC (file) {
  let normalized = file.normalize()
  if (file !== normalized) {
    return [file, normalized]
  }
  return null
}

async function main () {
  const dir = process.argv[2]
  const files = await fs.readdir(dir)
  files
    .map(toNFC)
    .filter(pair => pair != null)
    .forEach(async pair => {
      const from = `${dir}${path.sep}${pair[0]}`
      const to = `${dir}${path.sep}${pair[1]}`
      await fs.rename(from, to)
    })
}

main().then().catch(console.error)
