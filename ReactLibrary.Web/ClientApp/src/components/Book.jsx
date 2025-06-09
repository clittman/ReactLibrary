import getAxios from "../AxiosAuth";

const Book = (props) => {
    const { user, book, getFavoriteBooks, favoriteBooks } = props;
    const { coverUrl, title, author } = book;

    const onClick = async () => {
        if (inFavorites) {
            await getAxios().post('/api/book/removebook', book);
        }
        else {
            await getAxios().post('/api/book/addbook', book);
        }
        getFavoriteBooks();
    }
    const inFavorites = favoriteBooks.find(b => b.openLibraryId === book.openLibraryId);


    return <div className="col-md-4 mb-3">
        <div className="card h-100">
            <div className="d-flex align-items-center justify-content-center" style={{ height: 200 }}>
                <img src={coverUrl} className="card-img-top" alt={title} style={{ maxHeight: 200, maxWidth: 150, objectFit: 'contain' }} />
            </div>
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">by {author}</p>
                {!user && <button className="btn btn-success mt-auto" disabled={true}>Sign in to Add to Favorites</button>}
                {!!user && <button className={inFavorites ? "btn btn-danger mt-auto" : "btn btn-success mt-auto"} onClick={onClick} disabled={!user}>{inFavorites ? 'Remove from Favorites' : 'Add to Favorites'}</button>}
            </div>
        </div>
    </div>
}

export default Book;