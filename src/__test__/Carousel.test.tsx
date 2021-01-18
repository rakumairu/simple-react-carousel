import React from 'react'
import { render, cleanup } from '@testing-library/react'
import Carousel from '../components/Carousel/Carousel'

afterEach(cleanup)

it('render 2 items with next button', () => {
    const { getAllByTestId, getByTestId } = render(
        <Carousel
            show={1}
        >
            <h2 data-testid="carousel-item-1">Item 1</h2>
            <h2 data-testid="carousel-item-2">Item 2</h2>
        </Carousel>
    )

    const items = getAllByTestId(/carousel-item-*/)
    const nextButton = getByTestId(/right-button/)

    expect(items).toHaveLength(2)
    expect(nextButton).toBeInTheDocument()
})

it('render 2 items without next button', () => {
    const { getAllByTestId, queryByTestId } = render(
        <Carousel
            show={3}
        >
            <h2 data-testid="carousel-item-1">Item 1</h2>
            <h2 data-testid="carousel-item-2">Item 2</h2>
        </Carousel>
    )

    const items = getAllByTestId(/carousel-item-*/)
    const nextButton = queryByTestId(/right-button/)

    expect(items).toHaveLength(2)
    expect(nextButton).toBeNull()
})

it('show 2 of 3 item with infinite loop', () => {
    const { getAllByTestId, queryByTestId } = render(
        <Carousel
            show={2}
            infiniteLoop
        >
            <h2 data-testid="carousel-item-1">Item 1</h2>
            <h2 data-testid="carousel-item-2">Item 2</h2>
            <h2 data-testid="carousel-item-3">Item 3</h2>
        </Carousel>
    )

    const items = getAllByTestId(/carousel-item-*/)
    const nextButton = queryByTestId(/right-button/)
    const previousButton = queryByTestId(/left-button/)

    expect(items).toHaveLength(7) // 3 actual item + 2 cloned previous + 2 cloned next
    expect(nextButton).toBeInTheDocument()
    expect(previousButton).toBeInTheDocument()
})

it('show 3 of 3 item with infinite loop', () => {
    const { getAllByTestId, queryByTestId } = render(
        <Carousel
            show={3}
            infiniteLoop
        >
            <h2 data-testid="carousel-item-1">Item 1</h2>
            <h2 data-testid="carousel-item-2">Item 2</h2>
            <h2 data-testid="carousel-item-3">Item 3</h2>
        </Carousel>
    )

    const items = getAllByTestId(/carousel-item-*/)
    const nextButton = queryByTestId(/right-button/)
    const previousButton = queryByTestId(/left-button/)

    expect(items).toHaveLength(3)
    expect(nextButton).toBeNull()
    expect(previousButton).toBeNull()
})

it('render carousel with indicator', () => {
    const { getByTestId } = render(
        <Carousel
            show={1}
            withIndicator
        >
            <h2 data-testid="carousel-item-1">Item 1</h2>
            <h2 data-testid="carousel-item-2">Item 2</h2>
        </Carousel>
    )

    const indicator = getByTestId(/indicator-container/)

    expect(indicator).toBeInTheDocument()
})