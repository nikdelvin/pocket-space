import { Canvas } from './features/canvas/Canvas'
import { Flex } from 'antd'

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
            <Canvas fontSize={1} image={'/media/galaxy_800_600.jpeg'} />
        </Flex>
    )
}

export default App
