import React, { useEffect, useRef, useState } from 'react';
import styles from './scss/index.module.scss';
import { classNames } from '@/utils';
interface ICarouselProps {
    children?: React.ReactNode;
    showControls?: boolean;
    showIndicators?: boolean;
    autoPlay?: boolean;
    interval?: number;
    showThumbnails?: boolean;
}
export const Carousel = (props: ICarouselProps) => {
    const { children, showControls, autoPlay = true, interval = 3000, showThumbnails } = props;
    const carouselContainerInnerRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const carouselStatusStash = useRef<{
        currentIndex: number;
        childrenCount: number;
        intervalTimer: NodeJS.Timeout | undefined;
    }>({
        currentIndex: 0,
        childrenCount: 0,
        intervalTimer: undefined,
    });
    useEffect(() => {
        carouselInit();
        if (autoPlay) return startAutoPlay();
    }, []);
    const carouselInit = () => {
        if (!carouselContainerInnerRef.current) return;
        cloneFirstItem();
        carouselContainerInnerRef.current.style.transform = `translateX(-100%)`;
        carouselStatusStash.current.currentIndex = 1;
        setCurrentIndex(1);
    };
    const updateCarousel = (itemIndex: number) => {
        if (!carouselContainerInnerRef.current) return;
        const offset = -itemIndex * 100;
        carouselContainerInnerRef.current.style.transform = `translateX(${offset}%)`;
    };
    const cloneFirstItem = () => {
        if (!carouselContainerInnerRef.current) return;
        const items = carouselContainerInnerRef.current.children;

        const firstItem = items[0].cloneNode(true);
        const lastItem = items[items.length - 1].cloneNode(true);
        carouselContainerInnerRef.current.insertBefore(lastItem, items[0]);
        carouselContainerInnerRef.current.appendChild(firstItem);
        carouselStatusStash.current.childrenCount = items.length;
    };
    const startAutoPlay = () => {
        const intervalTimer = setInterval(() => {
            showNext();
        }, interval);
        carouselStatusStash.current.intervalTimer = intervalTimer;
        return () => clearInterval(intervalTimer);
    };
    const showPrev = () => {
        if (!carouselContainerInnerRef.current) return;
        stopAutoPlay();
        carouselStatusStash.current.currentIndex = Math.max(carouselStatusStash.current.currentIndex - 1, 0);
        setCurrentIndex(carouselStatusStash.current.currentIndex);
        updateCarousel(carouselStatusStash.current.currentIndex);
        startAutoPlay();
    };
    const showNext = () => {
        if (!carouselContainerInnerRef.current) return;
        stopAutoPlay();
        carouselStatusStash.current.currentIndex = Math.min(
            carouselStatusStash.current.currentIndex + 1,
            carouselStatusStash.current.childrenCount - 1,
        );
        setCurrentIndex(carouselStatusStash.current.currentIndex);
        updateCarousel(carouselStatusStash.current.currentIndex);
        startAutoPlay();
    };

    const stopAutoPlay = () => {
        if (carouselStatusStash.current.intervalTimer) {
            clearInterval(carouselStatusStash.current.intervalTimer);
        }
    };
    const onTransitionEnd = () => {
        if (!carouselContainerInnerRef.current) return;
        // jump to the first item
        if (carouselStatusStash.current.currentIndex === carouselStatusStash.current.childrenCount - 1) {
            carouselStatusStash.current.currentIndex = 1;
            carouselContainerInnerRef.current.style.transition = 'none';
            carouselContainerInnerRef.current.style.transform = `translateX(-${
                carouselStatusStash.current.currentIndex * 100
            }%)`;
        } else if (carouselStatusStash.current.currentIndex == 0) {
            // jump to the last item, mind the clone item
            carouselStatusStash.current.currentIndex = carouselStatusStash.current.childrenCount - 2;
            carouselContainerInnerRef.current.style.transition = 'none';
            carouselContainerInnerRef.current.style.transform = `translateX(-${
                carouselStatusStash.current.currentIndex * 100
            }%)`;
        }
        setTimeout(() => {
            if (carouselContainerInnerRef.current) {
                carouselContainerInnerRef.current.style.transition = 'transform 0.5s ease-in-out';
            }
        }, 0);
    };
    return (
        <div className={styles['carousel_wrapper']}>
            <div className={styles['carousel_scroll_wrapper']}>
                <div
                    className={styles['carousel_scroll_inner']}
                    ref={carouselContainerInnerRef}
                    onTransitionEnd={onTransitionEnd}
                >
                    {children}
                </div>
            </div>

            {showControls && (
                <div className={styles['carousel_controls']}>
                    <button
                        className={classNames(styles['carousel_control_prev'], styles['control_btn'])}
                        onClick={showPrev}
                    >
                        &#10094;
                    </button>
                    <button
                        className={classNames(styles['carousel_control_next'], styles['control_btn'])}
                        onClick={showNext}
                    >
                        &#10095;
                    </button>
                </div>
            )}
        </div>
    );
};
