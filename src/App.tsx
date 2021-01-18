import React from 'react';
import Carousel from './components/Carousel/Carousel';
import './components/Carousel/Carousel.css'

function App() {
  return (
    <div className="App">
      <Carousel
        show={2}
        infiniteLoop
        withIndicator
      >
      <h2 data-testid="carousel-item-1">Item 1</h2>
      <h2 data-testid="carousel-item-2">Item 2</h2>
      <h2 data-testid="carousel-item-3">Item 3</h2>
      <h2 data-testid="carousel-item-1">Item 1</h2>
      <h2 data-testid="carousel-item-2">Item 2</h2>
      <h2 data-testid="carousel-item-3">Item 3</h2>
      <h2 data-testid="carousel-item-1">Item 1</h2>
      <h2 data-testid="carousel-item-2">Item 2</h2>
      <h2 data-testid="carousel-item-3">Item 3</h2>
      <h2 data-testid="carousel-item-1">Item 1</h2>
      <h2 data-testid="carousel-item-2">Item 2</h2>
      <h2 data-testid="carousel-item-3">Item 3</h2>
      <h2 data-testid="carousel-item-1">Item 1</h2>
      <h2 data-testid="carousel-item-2">Item 2</h2>
      <h2 data-testid="carousel-item-3">Item 3</h2>
      </Carousel>
    </div>
  );
}

export default App;
