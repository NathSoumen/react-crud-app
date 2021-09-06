import React from 'react'
import './pagination.css'
 const  Pagination = ({postsPerPage, totalpost,paginate}) => {

    const pagesNumbers = []
    for(let i = 1; i <= Math.ceil(totalpost/postsPerPage); i++) {
        pagesNumbers.push(i)
    }
    return (
      <nav className="paginations" >
            {pagesNumbers.map( (number)=> (
                <li key={number} className="">
                    <a onClick={() => paginate(number)} href="#" className="page-link">
                        {number}
                    </a>
                </li>
            ))}
      </nav>
    )
}

export default Pagination;