const isDev = process.env.APP_ENV === 'development'
  || process.env.APP_ENV === 'dev'
  || process.env.APP_ENV === 'local'

export const log = (...args: unknown[]) => {
  if (isDev) {
    // eslint-disable-next-line no-console
    console.log(...args)
  }
}

export const logInfo = (...args: unknown[]) => {
  if (isDev) {
    // eslint-disable-next-line no-console
    console.info(...args)
  }
}

export const logWarn = (...args: unknown[]) => {
  if (isDev) {
    // eslint-disable-next-line no-console
    console.warn(...args)
  }
}

export const logError = (...args: unknown[]) => {
  if (isDev) {
    // eslint-disable-next-line no-console
    console.error(...args)
  }
}
