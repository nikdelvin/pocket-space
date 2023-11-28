import { Canvas } from './features/canvas/Canvas'
import { Flex } from 'antd'
import { Vec2D } from './features/canvas/graphics/vector2D'

function App() {
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
            {/* <Canvas fontSize={1} image={'/media/galaxy_128_128.jpeg'} /> */}
            {/* <Canvas fontSize={1} video={'/media/galaxy_360p.mp4'} /> */}
            <Canvas
                fontSize={1}
                space2D={{
                    width: 640,
                    height: 640,
                    objectsRender: (tick: number) => {
                        const objects = {
                            circleDot: new Vec2D(0, 0),
                            squareDots: [
                                new Vec2D(-25, 175),
                                new Vec2D(-25, 225),
                                new Vec2D(25, 225),
                                new Vec2D(25, 175),
                            ],
                        }
                        const circle = objects.circleDot.circle(250)
                        objects.squareDots = objects.circleDot.rotateCircle(
                            objects.squareDots,
                            true,
                            tick,
                            100,
                        )
                        const square = [
                            objects.squareDots[0].line(objects.squareDots[1]),
                            objects.squareDots[1].line(objects.squareDots[2]),
                            objects.squareDots[2].line(objects.squareDots[3]),
                            objects.squareDots[3].line(objects.squareDots[0]),
                        ]
                        return [circle].concat(square)
                    },
                }}
            />
        </Flex>
    )
}

export default App
