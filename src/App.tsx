import React from 'react';
import './App.css';
import Carousel from './Carousel';
import './Carousel.css'

function App() {
  return (
    <div className="App">
      <Carousel
        show={3}
        infiniteLoop
        withIndicator
      >
        <div>
          <div style={{ padding: 8 }}>
            <img src="https://placeimg.com/100/100/any" alt="placeholder" style={{ width: '100%' }} />
          </div>
        </div>
        <div>
          <div style={{ padding: 8 }}>
            <img src="https://placeimg.com/100/100/any" alt="placeholder" style={{ width: '100%' }} />
          </div>
        </div>
        <div>
          <div style={{ padding: 8 }}>
            <img src="https://placeimg.com/100/100/any" alt="placeholder" style={{ width: '100%' }} />
          </div>
        </div>
        <div>
          <div style={{ padding: 8 }}>
            <img src="https://placeimg.com/100/100/any" alt="placeholder" style={{ width: '100%' }} />
          </div>
        </div>
        <div>
          <div style={{ padding: 8 }}>
            <img src="https://placeimg.com/100/100/any" alt="placeholder" style={{ width: '100%' }} />
          </div>
        </div>
        <div>
          <div style={{ padding: 8 }}>
            <img src="https://placeimg.com/100/100/any" alt="placeholder" style={{ width: '100%' }} />
          </div>
        </div>
        <div>
          <div style={{ padding: 8 }}>
            <img src="https://placeimg.com/100/100/any" alt="placeholder" style={{ width: '100%' }} />
          </div>
        </div>
        <div>
          <div style={{ padding: 8 }}>
            <img src="https://placeimg.com/100/100/any" alt="placeholder" style={{ width: '100%' }} />
          </div>
        </div>
        <div>
          <div style={{ padding: 8 }}>
            <img src="https://placeimg.com/100/100/any" alt="placeholder" style={{ width: '100%' }} />
          </div>
        </div>
        <div>
          <div style={{ padding: 8 }}>
            <img src="https://placeimg.com/100/100/any" alt="placeholder" style={{ width: '100%' }} />
          </div>
        </div>
        <div>
          <div style={{ padding: 8 }}>
            <img src="https://placeimg.com/100/100/any" alt="placeholder" style={{ width: '100%' }} />
          </div>
        </div>
      </Carousel>
    </div>
  );
}

export default App;
