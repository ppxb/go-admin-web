import { defineConfig, presetUno, presetIcons, presetWebFonts, transformerDirectives } from 'unocss'

export default defineConfig({
  presets: [
    presetUno,
    presetIcons({
      extraProperties: {
        display: 'inline-block'
      },
      collections: {
        carbon: () => import('@iconify-json/carbon/icons.json').then(i => i.default),
        bxl: () => import('@iconify-json/bxl/icons.json').then(i => i.default)
      }
    }),
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
  transformers: [transformerDirectives()],
  shortcuts: {
    'bg-muted': 'bg-#f9f9f9',
    'text-muted': 'text-slate-950',
    'text-muted-foreground': 'text-slate-900/60'
  }
})
