import { useEffect, useState } from "react";
import getAxios from "../AxiosAuth";
import FavoriteBook from "../components/FavoriteBook";

const MyFavorites = () => {
    const [favoriteBooks, setFavoriteBooks] = useState([]);

    useEffect(() => {
        getFavoriteBooks();
    }, [])

    const getFavoriteBooks = async () => {
        const { data } = await getAxios().get('/api/book/getfavbooks');
        setFavoriteBooks(data);
    }

    return <div className="container mt-5">
        <h2 className="mb-4 text-primary" style={{ marginTop: 80 }}>My Favorites</h2>
        <div className="row">
            {favoriteBooks.map(b => <FavoriteBook key={b.id} book={b} getFavoriteBooks={getFavoriteBooks}/>)}
        </div>
    </div>
}

export default MyFavorites;