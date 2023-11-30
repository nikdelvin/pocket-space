import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { setCanvas, selectCanvas } from './canvasSlice'
import { store } from '../../app/store'
import { Typography } from 'antd'
import {
    updateDataFrom2DSpace,
    updateDataFromImage,
    updateDataFromVideo,
} from './canvasFunctions'

export function Canvas(props: {
    fontSize: number
    image?: string
    video?: string
    space2D?: {
        width: number
        height: number
        objectsRender: (tick: number) => string[][]
    }
}) {
    const canvas = useAppSelector(selectCanvas)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (props.image != null) {
            updateDataFromImage(
                props.image,
                (data: { values: string; width: number; height: number }) => {
                    dispatch(setCanvas(data))
                },
            )
        } else if (props.video != null) {
            updateDataFromVideo(
                props.video,
                (data: { values: string; width: number; height: number }) => {
                    if (store.getState().canvas.type !== 'video') return false
                    dispatch(setCanvas(data))
                    return true
                },
            )
        } else if (props.space2D != null) {
            updateDataFrom2DSpace(
                props.space2D,
                (data: { values: string; width: number; height: number }) => {
                    if (store.getState().canvas.type !== '2d') return false
                    dispatch(setCanvas(data))
                    return true
                },
            )
        }
    }, [dispatch, props.image, props.space2D, props.video])

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
        >
            {canvas.values}
        </Typography.Text>
    )
}
