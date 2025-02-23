import { Carousel, CarouselItem } from '@/components';
import styles from './scss/index.module.scss';
import { getBookData } from '@/data/books';
import { useEffect, useState } from 'react';
import { IBook } from '@/interface/book';
import { BookItem } from '@/components/BookItem/BookItem';
import { useDispatch } from 'react-redux';
import { addShoppingCart } from '@/redux/slice/shoppingCart';
export const HomePage = () => {
    const [reviewsRateData, setReviewsRateData] = useState<IBook[]>([]);
    const [carouselData, setCarouselData] = useState<IBook[]>([]);
    const [newReleaseData, setNewReleaseData] = useState<IBook[]>([]);
    const dispatch = useDispatch();
    useEffect(() => {
        const { carouselData, reviewsRateData, newReleaseData } = getBookData();
        setCarouselData(carouselData);
        setReviewsRateData(reviewsRateData);
        setNewReleaseData(newReleaseData);
    }, []);
    const addCart = (book: IBook) => {
        const newShoppingCart = {
            bookItem: book,
            count: 1,
            checked: true,
        };
        dispatch(addShoppingCart({ shoppingCart: newShoppingCart }));
    };
    return (
        <div className={styles['home_page']}>
            <div className={styles['page_header']}>
                <div className={styles['navigation_bar']}></div>
                <div className={styles['carousel_container']}>
                    {carouselData.length === 0 ? (
                        <div>Loading...</div>
                    ) : (
                        <Carousel autoPlay interval={5000} showControls showIndicators>
                            <>
                                {carouselData.map((book, index) => {
                                    return (
                                        <CarouselItem key={book.id}>
                                            <div className={styles['book_wrap']}>
                                                <div className={styles['book_cover']}>
                                                    <img src={book.cover} alt={book.title} />
                                                </div>
                                                <div className={styles['book_info']}>
                                                    <h2 className={styles['book_title']}>{book.title}</h2>
                                                    <p className={styles['book_author']}>{book.author}</p>
                                                    <p className={styles['book_price']}>${book.price}</p>
                                                    <p className={styles['book_genre']}>{book.genre}</p>
                                                </div>
                                                <div className={styles['addCart_btn']} onClick={() => addCart(book)}>
                                                    <span>ADD CART</span>
                                                    <i className="iconfont icon-tianjia"></i>
                                                </div>
                                            </div>
                                        </CarouselItem>
                                    );
                                })}
                            </>
                        </Carousel>
                    )}
                </div>
            </div>
            <div className={styles['page_content']}>
                <section>
                    <h2>Best Reviews</h2>
                    <div className={styles['reviewRate_book_list']}>
                        {reviewsRateData.map((book, index) => {
                            return <BookItem book={book} key={'review' + book.id}></BookItem>;
                        })}
                    </div>
                </section>
                <section>
                    <h2>Recent Released</h2>
                    <div className={styles['newRelease_book_list']}>
                        {newReleaseData.map((book, index) => {
                            return <BookItem book={book} key={'release' + book.id}></BookItem>;
                        })}
                    </div>
                </section>
            </div>
        </div>
    );
};
