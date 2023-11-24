import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { setCanvas, selectCanvas } from './canvasSlice'
import { Typography } from 'antd'

export function Canvas(props: { fontSize: number; image: string }) {
    const canvas = useAppSelector(selectCanvas)
    const dispatch = useAppDispatch()
    const gradient = ' .:!/r(l1Z4H9W8$@'

    async function init(
        imageSrc: string,
    ): Promise<{ values: string; width: number; height: number }> {
        return await new Promise((resolve) => {
            const image = new Image()
            image.src = imageSrc
            image.addEventListener('load', () => {
                const canvas = document.createElement('canvas')
                canvas.width = image.width
                canvas.height = image.height
                const ctx = canvas.getContext('2d')
                ctx?.drawImage(image, 0, 0, image.width, image.height)
                const imageData = ctx?.getImageData(
                    0,
                    0,
                    image.width,
                    image.height,
                )
                const lettersData = []
                for (
                    let x = 0, len = imageData?.data.length as number;
                    x < len;
                    x += 4
                ) {
                    const r = imageData?.data[x] as number
                    const g = imageData?.data[x + 1] as number
                    const b = imageData?.data[x + 2] as number
                    const avg = Math.floor((r + g + b) / 3)
                    if (avg === 255) lettersData.push(gradient[16])
                    else lettersData.push(gradient[Math.floor(avg / 15)])
                }
                const output = []
                const chunkSize = image.width
                for (let i = 0; i < lettersData.length; i += chunkSize) {
                    const chunk = lettersData.slice(i, i + chunkSize)
                    output.push(`${chunk.join('')}\n`)
                }
                resolve({
                    values: output.join(''),
                    width: image.width,
                    height: image.height,
                })
            })
        })
    }

    useEffect(() => {
        init(props.image).then((data) => {
            dispatch(setCanvas(data))
        })
    }, [dispatch, props.image])

    return (
        <Typography.Text
            style={{
                fontFamily: 'monospace',
                fontSize: `${props.fontSize}px`,
                color: 'white',
                backgroundColor: 'black',
                width: `${props.fontSize * canvas.width}px`,
                height: `${props.fontSize * canvas.height}px`,
                lineHeight: '1',
                letterSpacing: `${
                    props.fontSize * 0.3979 -
                    Math.ceil((props.fontSize - 1) / 2) * 0.0001
                }px`,
                whiteSpace: 'pre',
                margin: 'auto',
            }}
            id="canvas_text"
        >
            {canvas.values}
        </Typography.Text>
    )
}
