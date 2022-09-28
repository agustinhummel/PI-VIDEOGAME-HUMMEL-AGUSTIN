import React, { useState } from "react";

import '../style/paginated.css'

export default function Paginated({ page, setPage, max }) {

    const [input, setInput] = useState(1);

    const nextPage = () => {
        setInput(parseInt(input) + 1);
        setPage(parseInt(page) + 1);
    };

    const backPage = () => {
        setInput(parseInt(input) - 1);
        setPage(parseInt(page) - 1);
    };

    const onKeyDown = (e) => {
        if (e.keyCode === 13) {
            setPage(parseInt(e.target.value))
            if (parseInt(e.target.value < 1) || parseInt(e.target.value) > Math.ceil(max) || isNaN(parseInt(e.target.value))) {
                setPage(1)
                setInput(1)
            } else {
                setPage(parseInt(e.target.value))
            }
        }
    }

    const onChange = (e) => {
        setInput(e.target.value);
    }

    return (
        <div className="pagination">
            <button className="pageBtn" disabled={page === 1 || page < 1} onClick={backPage}>Back</button>
            <input className="pages" onChange={(e) => onChange(e)} onKeyDown={(e) => onKeyDown(e)} name='page' autoComplete="off" value={input}></input>
            <p className="pages1">de {max}</p>
            <button className="pageBtn" disabled={page === max || page > max} onClick={nextPage}>Next</button>
        </div>
    )
}