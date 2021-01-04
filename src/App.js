import Carousel from "./components/Carousel/Carousel"

const App = () => {
    return (
        <div style={{ maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto', marginTop: 64 }}>
            <Carousel>
                <img src="https://via.placeholder.com/1600x300" alt="placeholder" />
                <img src="https://via.placeholder.com/1600x300" alt="placeholder" />
                <img src="https://via.placeholder.com/1600x300" alt="placeholder" />
            </Carousel>
        </div>
    )
}

export default App
