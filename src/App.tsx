import { Canvas } from './features/canvas/Canvas'
import { Flex, Select } from 'antd'
import { Vec2D } from './features/canvas/graphics/vector2D'
import { useAppSelector, useAppDispatch } from './app/hooks'
import { setType, selectType } from './features/canvas/canvasSlice'

function App() {
    const canvasType = useAppSelector(selectType)
    const dispatch = useAppDispatch()

    const objectsRender = (tick: number) => {
        const sunCentre = new Vec2D(0, 0)
        const planets = {
            mercuryCentre: new Vec2D(45 + 4, 0),
            venusCentre: new Vec2D(45 + 8, 0),
            earthCentre: new Vec2D(45 + 11, 0),
            marsCentre: new Vec2D(45 + 17, 0),
            jupiterCentre: new Vec2D(45 + 57, 0),
            saturnCentre: new Vec2D(45 + 105, 0),
            uranusCentre: new Vec2D(45 + 211, 0),
            neptuneCentre: new Vec2D(45 + 320, 0),
        }
        const speedMultiply = [0.24, 0.61, 1, 1.88, 11.86, 29.46, 84.01, 164.79]
        for (const [index, planet] of Array.from(
            Object.keys(planets).entries(),
        )) {
            ;(planets as Record<string, Vec2D>)[planet] =
                sunCentre.rotateCircle(
                    [(planets as Record<string, Vec2D>)[planet]],
                    true,
                    tick,
                    speedMultiply[index] * 60,
                )[0]
        }
        return [
            sunCentre.circle(45),
            planets.mercuryCentre.circle(0.38),
            planets.venusCentre.circle(0.94),
            planets.earthCentre.circle(1),
            planets.marsCentre.circle(0.53),
            planets.jupiterCentre.circle(11.21),
            planets.saturnCentre.circle(9.41),
            planets.uranusCentre.circle(3.98),
            planets.neptuneCentre.circle(3.81),
        ]
    }

    return (
        <Flex
            vertical={true}
            justify="start"
            align="start"
            style={{
                width: '100vw',
                height: '100vh',
                overflow: 'scroll',
            }}
        >
            <Select
                defaultValue="image"
                style={{
                    width: 120,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: '10px',
                    marginBottom: '10px',
                }}
                onChange={(value) => {
                    dispatch(setType(value))
                }}
                options={[
                    { value: 'image', label: 'Image' },
                    { value: 'video', label: 'Video' },
                    { value: '2d', label: '2D Space' },
                    { value: '3d', label: '3D Space', disabled: true },
                ]}
            />
            {((canvasType) => {
                switch (canvasType) {
                    case 'image':
                        return (
                            <Canvas
                                fontSize={1}
                                image={'/media/galaxy_256_256.jpeg'}
                            />
                        )
                    case 'video':
                        return (
                            <Canvas
                                fontSize={1}
                                video={'/media/galaxy_360p.mp4'}
                            />
                        )
                    case '2d':
                        return (
                            <Canvas
                                fontSize={1}
                                space2D={{
                                    width: 750,
                                    height: 750,
                                    objectsRender,
                                }}
                            />
                        )
                }
            })(canvasType)}
        </Flex>
    )
}

export default App
