import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Parent() {

    const [notes, getNotes] = useState('')

    const url = 'https://gorest.co.in/public/v1/';
    console.log(url)

    useEffect(() => {
        getAllNotes();
    }, []);

    const getAllNotes = () => {
        axios.get(`${url}users`)
            .then((response) => {
                const allNotes = response.data.data;
                console.log(response)
                getNotes(allNotes);
            })
            .catch(error => console.error(`Error: ${error}`));
    }

    return (
        <NoteTimeline notes={notes} />
    )
}

function NoteTimeline(props) {
    const displayNotes = (props) => {
        const { notes } = props;

        if (notes.length > 0) {
            return (
                notes.map((note, index) => {
                    console.log(note);
                    return (
                        <div className='note' key={note.id}>
                            <h3 className='note_name'>{note.name}</h3>
                            <p className='note_email'>{note.email}</p>
                        </div>
                    )
                })
            )
        } else {
            return (<h3>No notes yet</h3>)
        }
    }
    return (
        <>
            {displayNotes(props)}
        </>
    )
}

// https://levelup.gitconnected.com/fetch-api-data-with-axios-and-display-it-in-a-react-app-with-hooks-3f9c8fa89e7b