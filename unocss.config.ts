import { defineConfig, presetUno, presetWebFonts, transformerDirectives } from 'unocss'

export default defineConfig({
  presets: [
    presetUno,
    presetWebFonts({
      provider: 'bunny',
      fonts: {
        sans: [
          {
            name: 'Inter',
            weights: [400, 500, 600, 700]
          },
          {
            name: 'Noto Sans SC',
            weights: [400, 500, 600, 700]
          }
        ]
      }
    })
  ],
  transformers: [transformerDirectives()]
})
