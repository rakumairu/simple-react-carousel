import React, { Children } from 'react'

export interface ICarouselProps {
  /**
   * Items that going to be showed
   */
  children: React.ReactNode

  /**
   * Indicate how many to show at once
   */
  show: number

  /**
   * Is the carousel will be repeating
   */
  infiniteLoop?: boolean

  /**
   * Render with indicator
   */
  withIndicator?: boolean

  /**
   * Render custom previous button
   * @param previousItem function to navigate to previous item
   * @param defaultClass default class for the button, it contain styles to position the button correctly. (not the arrow icon)
   * @example
   * <Carousel
   *   renderPreviousButton={(previousItem, defaultClass) => (
   *     <button onClick={previousItem} className={defaultClass}>
   *       previous
   *     </button>
   *   )}
   * >
   *   ...
   * </Carousel>
   */
  renderPreviousButton?: (
    previousItem: () => void,
    defaultClass?: string
  ) => JSX.Element

  /**
   * Render custom next button
   * @param nextItem function to navigate to next item
   * @param defaultClass default class for the button, it contain styles to position the button correctly. (not the arrow icon)
   * @example
   * <Carousel
   *   renderNextButton={(nextItem, defaultClass) => (
   *     <button onClick={nextItem} className={defaultClass}>
   *       next
   *     </button>
   *   )}
   * >
   *   ...
   * </Carousel>
   */
  renderNextButton?: (
    nextItem: () => void,
    defaultClassName?: string
  ) => JSX.Element

  /**
   * additional className for container element
   */
  containerClassName?: string

  /**
   * props for container element, be aware that if you supply className props here, it will overwrite the default one
   */
  containerProps?: React.HTMLProps<HTMLDivElement>

  /**
   * additional className for wrapper element
   */
  wrapperClassName?: string

  /**
   * props for wrapper element, be aware that if you supply className props here, it will overwrite the default one
   */
  wrapperProps?: React.HTMLProps<HTMLDivElement>

  /**
   * additional className for content wrapper element
   */
  contentWrapperClassName?: string

  /**
   * props for content wrapper element, be aware that if you supply className props here, it will overwrite the default one
   */
  contentWrapperProps?: React.HTMLProps<HTMLDivElement>

  /**
   * additional className for content element
   */
  contentClassName?: string

  /**
   * props for content element, be aware that if you supply className props here, it will overwrite the default one
   */
  contentProps?: React.HTMLProps<HTMLDivElement>

  /**
   * Classname for indicator container
   */
  indicatorContainerClassName?: string

  /**
   * props for indicator container element, be aware that if you supply className and ref props here, it will overwrite the default one
   */
  indicatorContainerProps?: React.HTMLProps<HTMLDivElement>

  /**
   * className for each classes in the indicator,
   * active: current item,
   * close: item that close with current item,
   * far: item that far from current item
   */
  indicatorClassNames?: {
    active?: string
    close?: string
    far?: string
  }

  /**
   * Render custom dot element
   * @param index dot's index
   * @param defaultClassName default class for the dot element, it contain styles to display the dot correctly
   * @example
   * <Carousel
   *   renderDot={(index, defaultClassName) => (
   *     // data-index is required for scrolling purposes
   *     <div key={index} data-index={index} className={defaultClassName} />
   *   )}
   * >
   *   ...
   * </Carousel>
   */
  renderDot?: (
    index: number,
    defaultClassName: string
  ) => JSX.Element
}

const Carousel = ({
  children, show, infiniteLoop, withIndicator,
  renderPreviousButton, renderNextButton,
  containerClassName, wrapperClassName, contentWrapperClassName, contentClassName,
  containerProps, wrapperProps, contentWrapperProps, contentProps,
  indicatorContainerClassName, indicatorContainerProps, indicatorClassNames,
}: ICarouselProps): JSX.Element => {
  const indicatorContainerRef = React.useRef<HTMLDivElement>(null)

  /**
   * Total item
   */
  const length = React.useMemo(() => Children.count(children), [children])

  /**
   * Is the carousel repeating it's item
   */
  const isRepeating = React.useMemo(() => infiniteLoop && Children.count(children) > show, [children, infiniteLoop, show])

  /**
   * Current Index Item of the Carousel
   */
  const [currentIndex, setCurrentIndex] = React.useState<number>(isRepeating ? show : 0)

  /**
   * Is the carousel's transition enabled
   */
  const [isTransitionEnabled, setTransitionEnabled] = React.useState<boolean>(true)

  /**
   * First touch position to be used in calculation for the swipe speed
   */
  const [touchPosition, setTouchPosition] = React.useState<null | number>(null)

  /**
   * Handle if the carousel is repeating
   * and the currentIndex have been set to the last or first item
   */
  React.useEffect(() => {
    if (isRepeating) {
      if (currentIndex === show || currentIndex === length) {
        setTransitionEnabled(true)
      }
    }
  }, [currentIndex, isRepeating, show, length])

  React.useEffect(() => {
    if (withIndicator) {
      const active = indicatorContainerRef.current?.querySelector('.dots-active')
      if (active) {
        let index = active.getAttribute('data-index')
        if (index !== null && indicatorContainerRef.current?.scrollTo) {
          indicatorContainerRef.current?.scrollTo({
            left: ((Number(index) - 2) / 5) * 50,
            behavior: 'smooth',
          })
        }
      }
    }
  }, [withIndicator, currentIndex])

  /**
   * Move forward to the next item
   */
  const nextItem = () => {
    if (isRepeating || currentIndex < (length - show)) {
      setCurrentIndex(prevState => prevState + 1)
    }
  }

  /**
   * Move backward to the previous item
   */
  const previousItem = () => {
    if (isRepeating || currentIndex > 0) {
      setCurrentIndex(prevState => prevState - 1)
    }
  }

  /**
   * Handle when the user start the swipe gesture
   * @param e TouchEvent
   */
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    // Save the first position of the touch
    const touchDown = e.touches[0].clientX
    setTouchPosition(touchDown)
  }

  /**
   * Handle when the user move the finger in swipe gesture
   * @param e TouchEvent
   */
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    // Get initial location
    const touchDown = touchPosition

    // Proceed only if the initial position is not null
    if (touchDown === null) {
      return
    }

    // Get current position
    const currentTouch = e.touches[0].clientX

    // Get the difference between previous and current position
    const diff = touchDown - currentTouch

    // Go to next item
    if (diff > 5) {
      nextItem()
    }

    // Go to previous item
    if (diff < -5) {
      previousItem()
    }

    // Reset initial touch position
    setTouchPosition(null)
  }

  /**
   * Handle when carousel transition's ended
   */
  const handleTransitionEnd = () => {
    if (isRepeating) {
      if (currentIndex === 0) {
        setTransitionEnabled(false)
        setCurrentIndex(length)
      } else if (currentIndex === length + show) {
        setTransitionEnabled(false)
        setCurrentIndex(show)
      }
    }
  }

  /**
   * Render previous items before the first item
   */
  const extraPreviousItems = React.useMemo(() => {
    let output = []
    for (let index = 0; index < show; index++) {
      output.push(Children.toArray(children)[length - 1 - index])
    }
    output.reverse()
    return output
  }, [children, length, show])

  /**
   * Render next items after the last item
   */
  const extraNextItems = React.useMemo(() => {
    let output = []
    for (let index = 0; index < show; index++) {
      output.push(Children.toArray(children)[index])
    }
    return output
  }, [children, show])

  const renderDots = React.useMemo(() => {
    let output = []

    const localShow = isRepeating ? show : 0
    const localLength = isRepeating ? length : Math.ceil(length / show)
    const calculatedActiveIndex = (currentIndex - localShow) < 0 ? (length + (currentIndex - localShow)) : currentIndex - localShow

    for (let index = 0; index < localLength; index++) {
      let className = ''
      if (calculatedActiveIndex === index) {
        className = indicatorClassNames?.active || 'dots-active'
      } else {
        if (calculatedActiveIndex === 0) {
          if (calculatedActiveIndex + index <= 2) {
            className = indicatorClassNames?.close || 'dots-close'
          } else {
            className = indicatorClassNames?.far || 'dots-far'
          }
        } else if (calculatedActiveIndex === localLength - 1) {
          if (Math.abs(calculatedActiveIndex - index) <= 2) {
            className = indicatorClassNames?.close || 'dots-close'
          } else {
            className = indicatorClassNames?.far || 'dots-far'
          }
        } else {
          if (Math.abs(calculatedActiveIndex - index) === 1) {
            className = indicatorClassNames?.close || 'dots-close'
          } else {
            className = indicatorClassNames?.far || 'dots-far'
          }
        }
      }
      output.push(
        <div key={index} data-index={index} className={className} />
      )
    }

    return output
  }, [currentIndex, indicatorClassNames, isRepeating, length, show])

  return (
    <div
      data-testid="carousel-container"
      className={`carousel-container ${containerClassName || ''}`}
      {...containerProps}
    >
      <div
        data-testid="carousel-wrapper"
        className={`carousel-wrapper ${wrapperClassName || ''}`}
        {...wrapperProps}
      >
        {
          (isRepeating || currentIndex > 0) ?
            renderPreviousButton ?
            renderPreviousButton(previousItem, 'left-arrow-button')
            :
            <button
              data-testid="left-button"
              onClick={previousItem}
              className="left-arrow-button"
            >
              <span className="left-arrow" />
            </button>
          : null
        }
        <div
          data-testid="carousel-content-wrapper"
          className={`carousel-content-wrapper ${contentWrapperClassName || ''}`}
          {...contentWrapperProps}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <div
            data-testid="carousel-content"
            className={`carousel-content show-${show} ${contentClassName || ''}`}
            {...contentProps}
            style={{
              transform: `translateX(-${currentIndex * (100 / show)}%)`,
              transition: !isTransitionEnabled ? 'none' : undefined,
            }}
            onTransitionEnd={() => handleTransitionEnd()}
          >
            {
              (length > show && isRepeating) &&
              extraPreviousItems
            }
            {children}
            {
              (length > show && isRepeating) &&
              extraNextItems
            }
          </div>
        </div>
        {
          (isRepeating || currentIndex < (length - show)) ?
            renderNextButton ?
            renderNextButton(nextItem, 'right-arrow-button')
            :
            <button
              data-testid="right-button"
              onClick={nextItem}
              className="right-arrow-button"
            >
              <span className="right-arrow" />
            </button>
          : null
        }
      </div>
      {
        withIndicator &&
        <div
          data-testid="indicator-container"
          ref={indicatorContainerRef}
          className={`indicator-container ${indicatorContainerClassName || ''}`}
          {...indicatorContainerProps}
        >
          {renderDots}
        </div>
      }
    </div>
  )
}

export default Carousel
