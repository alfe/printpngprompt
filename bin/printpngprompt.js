#!/usr/bin/env node

import fs from 'fs';
import PNGMetadata from 'png-metadata';
import { program } from 'commander';

program
  .name('printpngprompt')
  .usage("<file|dir> [options]")
  .description('CLI to Print Stable Diffusion Prompt included in PNG files')
  .option('-m, --markdown', 'show with markdown layout')
  .option('-r, --recursive', 'recursive digging')
  .option('-d, --debug', 'show raw PNG data')
  .version('1.0.3', '-v, --version', 'output the current version');


program.parse(process.argv);
if (program.args.length < 1) {
  program.help();
}

const opts = program.opts();

const encodeForMarkdown = (string) => {
  return !opts.markdown ? string : string.replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

const embedStr = (str) => {
  if (!opts.markdown) {
    return (`\x1b[1m${str}\x1b[0m`)
  }
  return `**${str}**`
}

const showPngPrompt = (fileName) => {
  if (!fileName.endsWith('.png')) return;

  var data = PNGMetadata.readFileSync(fileName);
  var list = PNGMetadata.splitChunk(data).filter((item) => item.type !== 'IDAT')

  var TEXT = list.filter((item) => (
    item.type.toUpperCase() === 'TEXT'
    && (
      item.data.substring(0, 10) === 'parameters'
      // TODO: case 'Description'
      // TODO: case 'Comment'
    )
  ))

  const parameters = TEXT[0]?.data;
  if (!parameters) return;
  const prompt = parameters.split('Negative prompt:').shift();
  const others = parameters.split('Negative prompt:').pop();
  const negativePrompt = others.split('\nSteps:')[0]

  const otherParams = (`Steps:${others.split('\nSteps:')[1]}`.split(/,/g))

  console.log(`
${opts.markdown ? '### ' :''}${fileName.replace(/^\.\//, '').replace(/\\/g, '/')}
${opts.markdown ? `
![img](${fileName})
` :''}
${encodeForMarkdown(prompt.substring(11).trim())}

${embedStr('Negative prompt:')} ${encodeForMarkdown(negativePrompt.trim())}
${otherParams.map((value) => {
  if (!value.includes(':')) return (`,${value}`)
  return (`\n- ${value.trim()}`)
}).join('')}
${!opts.debug ? '' : `
#### row tEXt

${parameters}
`}
---`)
}

const diggingPNG = (fileName) => {
  if (fileName.endsWith('.png')) {
    showPngPrompt(fileName);
    return;
  }
  const dir = fileName;
  fs.readdir(dir, { withFileTypes: true }, (err, files = []) => {
    files.forEach(file => {
      if (file.isDirectory()) {
        if (opts.recursive) {
          diggingPNG(`${dir}/${file.name}`)
        }
      } else {
        if (file.name.endsWith('.png')) {
          showPngPrompt(`${dir}/${file.name}`)
        }
      }
    })
  })
}

program.args.forEach(fileName => diggingPNG(fileName));
