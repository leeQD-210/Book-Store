import { IBook } from '@/interface/book';

export const booksData: IBook[] = [
    {
        id: 1,
        title: 'Book 1',
        author: 'Author 1',
        genre: 'Fiction',
        price: 19.99,
        releaseDate: '2024-01-01',
        reviewRating: 4.5,
        cover: '/images/book1.jpg',
    },
    {
        id: 2,
        title: 'Book 2',
        author: 'Author 2',
        genre: 'Non-Fiction',
        price: 24.99,
        releaseDate: '2025-02-15',
        reviewRating: 4.7,
        cover: '/images/book2.jpg',
    },
    {
        id: 3,
        title: 'Book 3',
        author: 'Author 3',
        genre: 'Non-Fiction',
        price: 24.99,
        releaseDate: '2006-02-15',
        reviewRating: 3.2,
        cover: '/images/book3.jpg',
    },
    {
        id: 4,
        title: 'Book 4',
        author: 'Author 4',
        genre: 'Non-Fiction',
        price: 24.99,
        releaseDate: '2013-02-15',
        reviewRating: 4.9,
        cover: '/images/book4.jpg',
    },
    {
        id: 5,
        title: 'Book 5',
        author: 'Author 5',
        genre: 'Non-Fiction',
        price: 24.99,
        releaseDate: '2017-02-15',
        reviewRating: 4.1,
        cover: '/images/book5.jpg',
    },
    {
        id: 6,
        title: 'Book 6',
        author: 'Author 6',
        genre: 'Non-Fiction',
        price: 24.99,
        releaseDate: '2019-02-15',
        reviewRating: 4.2,
        cover: '/images/book6.jpg',
    },
    {
        id: 7,
        title: 'Book 7',
        author: 'Author 7',
        genre: 'Non-Fiction',
        price: 24.99,
        releaseDate: '2022-02-15',
        reviewRating: 4.1,
        cover: '/images/book7.jpg',
    },
];

export const getCarouselData = () => {
    return booksData.slice(0, 3);
};
export const getReviewsRatedData = () => {
    return booksData.sort((a, b) => b.reviewRating - a.reviewRating).slice(0, 5);
};
export const getNewDateData = () => {
    return booksData.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()).slice(0, 5);
};
export const getBookData = () => {

    return {
        carouselData: getCarouselData(),
        reviewsRateData: getReviewsRatedData(),
        newReleaseData: getNewDateData(),
    };
};
