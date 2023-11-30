function getData(
    ctx: CanvasRenderingContext2D | null,
    source: HTMLImageElement | HTMLVideoElement,
    isVideo?: boolean,
) {
    const gradient = ' .:!/r(l1Z4H9W8$@'
    const width = isVideo
        ? (source as HTMLVideoElement).videoWidth
        : source.width
    const height = isVideo
        ? (source as HTMLVideoElement).videoHeight
        : source.height
    ctx?.drawImage(source, 0, 0, width, height)
    const imageData = ctx?.getImageData(0, 0, width, height)
    const lettersData = []
    for (let x = 0, len = imageData?.data.length as number; x < len; x += 4) {
        const r = imageData?.data[x] as number
        const g = imageData?.data[x + 1] as number
        const b = imageData?.data[x + 2] as number
        const avg = Math.floor((r + g + b) / 3)
        if (avg === 255) lettersData.push(gradient[16])
        else lettersData.push(gradient[Math.floor(avg / 15)])
    }
    const output = []
    const chunkSize = width
    for (let i = 0; i < lettersData.length; i += chunkSize) {
        const chunk = lettersData.slice(i, i + chunkSize)
        output.push(`${chunk.join('')}\n`)
    }
    return {
        values: output.join(''),
        width,
        height,
    }
}

export function updateDataFromImage(
    imageSrc: string,
    callback: (data: { values: string; width: number; height: number }) => void,
) {
    new Promise((resolve) => {
        const image = new Image()
        image.src = imageSrc
        image.addEventListener('load', () => {
            const canvas = document.createElement('canvas')
            canvas.width = image.width
            canvas.height = image.height
            const ctx = canvas.getContext('2d')
            resolve(getData(ctx, image))
        })
    }).then((data) => {
        callback(
            data as {
                values: string
                width: number
                height: number
            },
        )
    })
}

export function updateDataFromVideo(
    videoSrc: string,
    callback: (data: {
        values: string
        width: number
        height: number
    }) => boolean,
) {
    const video = document.createElement('video')
    video.src = videoSrc
    video.autoplay = true
    video.muted = true
    video.playsInline = true
    video.loop = true
    video.crossOrigin = 'https://www.mediafire.com'
    video.addEventListener('loadeddata', function () {
        const canvas = document.createElement('canvas')
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        const ctx = canvas.getContext('2d', { willReadFrequently: true })
        function update() {
            const check = callback(getData(ctx, video, true))
            if (check) requestAnimationFrame(update)
            else video.remove()
        }
        video.play()
        update()
    })
}

export async function updateDataFrom2DSpace(
    space: {
        width: number
        height: number
        objectsRender: (tick: number) => string[][]
    },
    callback: (data: {
        values: string
        width: number
        height: number
    }) => boolean,
) {
    for (let t = 0; t < 10000; t++) {
        await new Promise((resolve) => setTimeout(resolve, 20))
        const objects = space.objectsRender(t)
        const output: string[][] = new Array(space.height)
            .fill(true)
            .map(() => new Array(space.width).fill(' '))
        for (const coord of [...new Set(objects.flat())]) {
            const x = Number(coord.split(';')[0]) + Math.floor(space.width / 2)
            const y = Number(coord.split(';')[1]) + Math.floor(space.height / 2)
            try {
                output[y][x] = '@'
            } catch {}
        }
        const chunks = []
        for (const chunk of output) {
            chunks.push(chunk.join(''))
        }
        const check = callback({
            values: chunks.reverse().join('\n'),
            width: space.width,
            height: space.height,
        })
        if (!check) break
    }
}
