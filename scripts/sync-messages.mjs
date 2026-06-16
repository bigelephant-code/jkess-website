import { readFileSync, writeFileSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const msgsDir = join(__dirname, '..', 'messages')

// Read master English file
const master = JSON.parse(readFileSync(join(msgsDir, 'en.json'), 'utf-8'))
const masterKeys = Object.keys(master)

let langs = readdirSync(msgsDir).filter(f => f.endsWith('.json') && f !== 'en.json')

for (const langFile of langs) {
  const filePath = join(msgsDir, langFile)
  const data = JSON.parse(readFileSync(filePath, 'utf-8'))
  
  // Add any missing keys from master with English fallback
  let changed = false
  for (const key of masterKeys) {
    if (data[key] === undefined) {
      data[key] = master[key] // English fallback
      changed = true
    }
  }
  
  // Remove keys that are no longer in master
  for (const key of Object.keys(data)) {
    if (!masterKeys.includes(key)) {
      delete data[key]
      changed = true
    }
  }
  
  if (changed) {
    writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8')
    console.log(`✓ Updated ${langFile} with ${masterKeys.filter(k => data[k] === undefined).length} new keys`)
  } else {
    console.log(`  ${langFile} already up to date`)
  }
}

console.log('\nDone!')
