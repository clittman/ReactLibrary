import { useEffect, useState } from "react";
import getAxios from "../AxiosAuth";
import Book from "../components/Book";
import { useAuth } from "../AuthContext";

const Search = () => {
    const { user } = useAuth();

    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [favoriteBooks, setFavoriteBooks] = useState([]);

    useEffect(() => {
        getFavoriteBooks();
    })

    const onFormSubmit = (e) => {
        e.preventDefault();
        search();
    }

    const search = async () => {
        setLoading(true);
        const { data } = await getAxios().get(`/api/book/search?searchText=${searchText}`);
        setSearchResults(data);
        setLoading(false);
    }

    const getFavoriteBooks = async () => {
        const { data } = await getAxios().get('/api/book/getfavbooks');
        setFavoriteBooks(data);
    }


    return <div style={{ marginTop: 80 }}>
        <h2>Search for Books</h2>
        <form onSubmit={onFormSubmit}>
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Enter book title, author, or ISBN" value={searchText} onChange={e => setSearchText(e.target.value)} />
                <button className="btn btn-primary" type="submit">Search</button>
            </div>
        </form>
        {loading && <div className="d-flex justify-content-center"><div className="spinner-border" style={{ height: 100, width: 100 }} role="status"><span className="sr-only"></span></div></div>}
        {!loading &&
            <div className="row" style={{ display: 'flex' }}>
                {searchResults.map(b => {
                    return <Book
                        key={b.openLibraryId}
                        book={b}
                        user={user}
                        favoriteBooks={favoriteBooks}
                        getFavoriteBooks={getFavoriteBooks}
                    />
                })}
            </div>}
    </div>
}

export default Search;