<template>
    <canvas id="tv" />
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'

let resizeHandler: (() => void) | null = null

const staticNoise = () => {
  const canvas = document.querySelector<HTMLCanvasElement>('#tv')
  if (!canvas) {
    return
  }

  const context = canvas.getContext('2d')
  if (!context) {
    return
  }

  const scaleFactor = 2.5 // Noise size
  const samples: ImageData[] = []
  let sampleIndex = 0
  let scanOffsetY = 0
  let scanSize = 0
  const FPS = 50
  const scanSpeed = FPS * 15 // 15 seconds from top to bottom
  const SAMPLE_COUNT = 10

  const interpolate = (x: number, x0: number, y0: number, x1: number, y1: number) => {
    return y0 + (y1 - y0) * ((x - x0) / (x1 - x0))
  }

  const generateRandomSample = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    const intensity: number[] = []
    const factor = h / 50
    const trans = 1 - Math.random() * 0.05

    const intensityCurve: number[] = []
    for (let i = 0; i < Math.floor(h / factor) + factor; i += 1) {
      intensityCurve.push(Math.floor(Math.random() * 15))
    }

    for (let i = 0; i < h; i += 1) {
      const value = interpolate(
        i / factor,
        Math.floor(i / factor),
        intensityCurve[Math.floor(i / factor)],
        Math.floor(i / factor) + 1,
        intensityCurve[Math.floor(i / factor) + 1]
      )
      intensity.push(value)
    }

    const imageData = ctx.createImageData(w, h)
    for (let i = 0; i < w * h; i += 1) {
      const k = i * 4
      let color = Math.floor(36 * Math.random())
      color += intensity[Math.floor(i / w)]
      imageData.data[k] = color
      imageData.data[k + 1] = color
      imageData.data[k + 2] = color
      imageData.data[k + 3] = Math.round(25 * trans)
    }
    return imageData
  }

  const onResize = () => {
    canvas.width = canvas.offsetWidth / scaleFactor
    canvas.height = canvas.width / (canvas.offsetWidth / canvas.offsetHeight)
    scanSize = (canvas.offsetHeight / scaleFactor) / 3

    samples.length = 0
    for (let i = 0; i < SAMPLE_COUNT; i += 1) {
      samples.push(generateRandomSample(context, canvas.width, canvas.height))
    }
  }

  const render = () => {
    context.putImageData(samples[Math.floor(sampleIndex)], 0, 0)

    sampleIndex += 20 / FPS
    if (sampleIndex >= samples.length) {
      sampleIndex = 0
    }

    const grd = context.createLinearGradient(0, scanOffsetY, 0, scanSize + scanOffsetY)

    grd.addColorStop(0, 'rgba(255,255,255,0)')
    grd.addColorStop(0.1, 'rgba(255,255,255,0)')
    grd.addColorStop(0.2, 'rgba(255,255,255,0.2)')
    grd.addColorStop(0.3, 'rgba(255,255,255,0.0)')

    context.fillStyle = grd
    context.fillRect(0, scanOffsetY, canvas.width, scanSize + scanOffsetY)
    context.globalCompositeOperation = 'lighter'

    scanOffsetY += canvas.height / scanSpeed
    if (scanOffsetY > canvas.height) {
      scanOffsetY = -(scanSize / 2)
    }

    window.requestAnimationFrame(render)
  }

  window.addEventListener('resize', onResize)
  resizeHandler = onResize
  onResize()
  window.requestAnimationFrame(render)
}

onMounted(staticNoise)

onBeforeUnmount(() => {
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler)
  }
})
</script>

<style lang="scss">
    .screen{
        canvas{
            padding: 0;
            margin: 0;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            transform: translate3d(0, 0, 0);
        }
    }
</style>
