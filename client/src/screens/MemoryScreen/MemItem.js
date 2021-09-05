import React from 'react'

export default function MemItem(props) {
    return (
        <div className='memo_item'>
            <div className="memo-image-container-head">
                <img className="memo-img-head" src={`/uploads/${props.memo.Image}`} alt="..."/>
            </div>
            <div className="memoray-desc">
                <h1>{props.memo.title}</h1>
                <p className="desc">{props.memo.Description.substring(0, 50)}  ....</p>
                <h5 className="author">{props.memo.author}</h5>
                <a  href={`/memo/${props.memo._id}`}><h4 className="read-more">read more</h4></a>
            </div>

        </div>
    )
}
