import { useState } from "react";
import getAxios from "../AxiosAuth";

const FavoriteBook = (props) => {
    const { book, getFavoriteBooks } = props;
    const { coverUrl, title, author } = book;

    const [addingNote, setAddingNote] = useState(false);
    const [showingNote, setShowingNote] = useState(false);
    const [editingNote, setEditingNote] = useState(false);
    const [notes, setNotes] = useState(book.notes || '');

    const onDeleteClick = async () => {
        await getAxios().post('/api/book/removebook', book);
        getFavoriteBooks();
    }

    const onSaveClick = async () => {
        await getAxios().post('/api/book/addnote', { ...book, notes });
        setAddingNote(false);
        setEditingNote(false);
    }

    const showAddEdit = editingNote || addingNote;

    return <div className="col-md-4 mb-3">
        <div className="card h-100">
            <div className="d-flex align-items-center justify-content-center" style={{ height: 200 }}>
                <img src={coverUrl} className="card-img-top" alt={title} style={{ maxHeight: 200, maxWidth: 150, objectFit: 'contain' }} />
                <button className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2" onClick={onDeleteClick}><i className="bi bi-trash"></i></button>
            </div>
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">by {author}</p>

                {!!notes ? <div className="mt-auto">
                    <button className="btn btn-outline-primary w-100 mb-2" onClick={() => { setEditingNote(true), setShowingNote(false) }}>Edit Note</button>
                    <button className="btn btn-outline-dark w-100" onClick={() => { setShowingNote(!showingNote), setEditingNote(false) }}>{showingNote ? 'Hide Note' : 'Show Note'}</button>
                </div> : <div className="mt-auto"><button className="btn btn-outline-primary w-100 mb-2" onClick={() => setAddingNote(true)}>Add Note</button></div>
                }

                {showAddEdit && <div className="mt-3">
                    <textarea className="form-control" rows="3" placeholder="Add your notes here..." value={notes} onChange={e => setNotes(e.target.value)}></textarea>
                    <div className="d-flex justify-content-between mt-2">
                        <button className="btn btn-success" onClick={onSaveClick}>Save Note</button>
                        <button className="btn btn-outline-secondary ms-2" onClick={() => { setAddingNote(false), setEditingNote(false) }}>Cancel</button>
                    </div>
                </div>}

                {showingNote && <div className="mt-3"><h6>Note</h6><p>{notes}</p></div>}
            </div>
        </div>
    </div>
}

export default FavoriteBook;