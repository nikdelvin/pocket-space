import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

export interface CanvasState {
    values: string
    width: number
    height: number
}

const initialState: CanvasState = {
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
            _state,
            action: PayloadAction<{
                values: string
                width: number
                height: number
            }>,
        ) => {
            return { ...action.payload }
        },
    },
})

export const { setCanvas } = canvasSlice.actions

export const selectCanvas = (state: RootState) => state.canvas

export default canvasSlice.reducer
