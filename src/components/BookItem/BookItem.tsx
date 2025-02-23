import { IBook } from '@/interface/book';
import styles from './scss/index.module.scss';
import { useDispatch } from 'react-redux';
import { addShoppingCart } from '@/redux/slice/shoppingCart';
interface IBookItemProps {
    book: IBook;
}
export const BookItem = (props: IBookItemProps) => {
    const { book } = props;
    const dispatch = useDispatch();
    const addCart = () => {
        const newShoppingCart = {
            bookItem: book,
            count: 1,
            checked: true,
        };
        dispatch(addShoppingCart({ shoppingCart: newShoppingCart }));
    };
    return (
        <div className={styles['book_item']}>
            <img src={book.cover} className={styles['book_cover']} alt={book.title} />
            <div className={styles['book-info']}>
                <h2 className={styles['book_title']}>{book.title}</h2>
                <p className={styles['book_author']}>author:{book.author}</p>
                <p className={styles['book_price']}>price:${book.price}</p>
                <p className={styles['book_genre']}>genre:{book.genre}</p>
                <p className={styles['book_rate']}>rating:{book.reviewRating}</p>
                <p className={styles['book_date']}>release:{book.releaseDate}</p>
            </div>
            <div className={styles['addCart_btn']} onClick={addCart}>
                <span>ADD CART</span>
                <i className="iconfont icon-tianjia"></i>
            </div>
        </div>
    );
};
