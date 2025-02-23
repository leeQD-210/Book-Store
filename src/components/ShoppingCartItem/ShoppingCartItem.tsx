import { IBook } from '@/interface/book';
import styles from './scss/index.module.scss';
import { useDispatch } from 'react-redux';
import { changeShoppingCartCount, deleteShoppingCart, selectShoppingCart } from '@/redux/slice/shoppingCart';
interface IBookItemProps {
    book: IBook;
    checked: boolean;
    count: number;
}
export const ShoppingCartItem = (props: IBookItemProps) => {
    const { book, checked } = props;
    const dispatch = useDispatch();
    const deleteCart = () => {
        dispatch(deleteShoppingCart({ id: book.id }));
    };
    const selectChange = () => {
        dispatch(selectShoppingCart({ id: book.id, checked: !checked }));
    };
    const onCountAction = (type: 'pluse' | 'minus') => {
        switch (type) {
            case 'pluse':
                dispatch(changeShoppingCartCount({ id: book.id, count: props.count + 1 }));
                break;
            case 'minus':
                dispatch(changeShoppingCartCount({ id: book.id, count: Math.max(1, props.count - 1) }));

                break;
        }
    };
    const onCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (isNaN(value)) {
            return;
        }
        dispatch(changeShoppingCartCount({ id: book.id, count: Math.max(1, value) }));
    };
    return (
        <div className={styles['shopping_cart_item']}>
            <div className={styles['check_box']}>
                <input type="checkbox" checked={checked} onChange={selectChange} />
            </div>
            <img src={book.cover} className={styles['book_cover']} alt={book.title} />
            <div className={styles['book-info']}>
                <h2 className={styles['book_title']}>{book.title}</h2>
                <p className={styles['book_author']}>author:{book.author}</p>
                <p className={styles['book_price']}>price:${book.price}</p>
                <p className={styles['book_genre']}>genre:{book.genre}</p>
                <p className={styles['book_rate']}>rating:{book.reviewRating}</p>
                <p className={styles['book_date']}>release:{book.releaseDate}</p>
            </div>
            <div className={styles['count_wrap']}>
                <span
                    className={styles['count_btn']}
                    onClick={() => {
                        onCountAction('minus');
                    }}
                >
                    -
                </span>
                <input type="number" value={props.count} className={styles['count_input']} onInput={onCountChange} />
                <span
                    className={styles['count_btn']}
                    onClick={() => {
                        onCountAction('pluse');
                    }}
                >
                    +
                </span>
            </div>
            <div className={styles['addCart_btn']} onClick={deleteCart}>
                <span>Delete</span>
            </div>
        </div>
    );
};
