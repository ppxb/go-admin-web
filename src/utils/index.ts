export const uniqueSlash = (url: string) => url.replace(/(https?:\/)|(\/)+/g, '$1$2')
