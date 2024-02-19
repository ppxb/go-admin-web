import {
  defineConfig,
  presetMini,
  presetUno,
  presetIcons,
  presetWebFonts,
  transformerDirectives
} from 'unocss'

export default defineConfig({
  content: {
    pipeline: {
      include: [/\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/, 'src/**/*.{js,ts}']
    }
  },
  presets: [
    presetMini({ dark: 'class' }),
    presetUno,
    presetIcons({
      extraProperties: {
        display: 'inline-block'
      },
      collections: {
        carbon: () => import('@iconify-json/carbon/icons.json').then(i => i.default),
        ic: () => import('@iconify-json/ic/icons.json').then(i => i.default)
      }
    }),
    presetWebFonts({
      provider: 'bunny',
      fonts: {
        sans: [
          {
            name: 'Poppins',
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
    'text-muted-foreground': 'text-slate-900/60',
    'custom-link': 'font-medium underline underline-offset-4 text-muted-foreground hover:text-muted'
  }
})
