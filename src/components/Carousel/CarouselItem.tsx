interface ICarouselItemProps {
    children?: React.ReactNode;
}
import styles from './scss/CarouselItem.module.scss';
export const CarouselItem = (props: ICarouselItemProps) => {
    const { children } = props;
    return <div className={styles['carousel_item']}>{children}</div>;
};
