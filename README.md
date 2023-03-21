# print png prompt

[![Version](https://img.shields.io/npm/v/printpngprompt.svg)](https://www.npmjs.com/package/printpngprompt)

Print Stable Diffusion Prompt included in PNG files

```sh
$ npx printpngprompt .
```

```sh
$ npx printpngprompt --help
Usage: printpngprompt <dir> [options]

CLI to Print Stable Diffusion Prompt included in PNG files

Options:
  -m, --markdown   show with markdown layout                 
  -r, --recursive  recursive digging                         
  -d, --debug      show raw PNG data                         
  -h, --help       display help for command                  

$ npx printpngprompt example.png
sample.png

1girl, computer, monitor, coding, keyboard \(computer\), desk, (Masterpiece:1.2), (best quality:1.2),

Negative prompt: bad_prompt_version2, EasyNegative,  (Worst Quality, Low Quality:1.4), Normal Quality, longbody, lowres, pubic hair, extra digit, fewer digits, cropped, text, claw,

- Steps: 20
- Sampler: DPM++ 2M Karras
- CFG scale: 7
- Seed: 000000000
- Size: 512x512
- Model hash: 0000ffff00
- Model: example-model
- Denoising strength: 0.5
- Clip skip: 2
- Hires upscale: 1.4
- Hires upscaler: R-ESRGAN 4x+ Anime6B

---

$ npx printpngprompt example.png --markdown
### sample.png

![img](sample.png)

1girl, computer, monitor, coding, keyboard \(computer\), desk, (Masterpiece:1.2), (best quality:1.2),

**Negative prompt:** bad_prompt_version2, EasyNegative,  (Worst Quality, Low Quality:1.4), Normal Quality, longbody, lowres, pubic hair, extra digit, fewer digits, cropped, text, claw,

- Steps: 20
- Sampler: DPM++ 2M Karras
- CFG scale: 7
- Seed: 000000000
- ...

---

$ npx printpngprompt . -r

sample1.png                                                                                                       

1girl, ...
- Steps: 20
- Sampler: ...

---                                                                                                              

sample2.png                                                                                                      

1girl, ...
- Steps: 20
- Sampler: ...

---                                                                                                              

dir1/sample3.png                                                                                        

1girl, ...
- Steps: 20
- Sampler: ...

---                                                                                                              

```
