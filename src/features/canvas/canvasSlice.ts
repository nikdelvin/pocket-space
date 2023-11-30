import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

export interface CanvasState {
    type: string
    values: string
    width: number
    height: number
}

const initialState: CanvasState = {
    type: 'image',
    values: new Array(128)
        .fill(`${new Array(128).fill('@').join('')}\n`)
        .join(''),
    width: 128,
    height: 128,
}

export const canvasSlice = createSlice({
    name: 'canvas',
    initialState,
    reducers: {
        setCanvas: (
            state,
            action: PayloadAction<{
                values: string
                width: number
                height: number
            }>,
        ) => {
            return { ...state, ...action.payload }
        },
        setType: (state, action: PayloadAction<string>) => {
            return { ...state, type: action.payload }
        },
    },
})

export const { setCanvas, setType } = canvasSlice.actions

export const selectCanvas = (state: RootState) => state.canvas

export const selectType = (state: RootState) => state.canvas.type

export default canvasSlice.reducer
