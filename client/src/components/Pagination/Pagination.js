import React, { useState, useEffect } from 'react'
import './Pagination.scss'

export default function Pagination({ totalPages, onPageChange }) {
  const [pages, setPages] = useState([])
  const [selectedPage, setSelectedPage] = useState(1)

  useEffect(() => {
    getNumbersPages(totalPages)
  }, [totalPages])

  const getNumbersPages = totalPages => {
    let pagesNumber = [];
    for (let i = 0; i < totalPages; i++) {
      pagesNumber.push(i + 1);
    }
    setPages(pagesNumber)
  };

  const handlePageChangeLeft = (e) => {
    onPageChange(e)
    if (selectedPage <= 1) {
      return
    } else {
      setSelectedPage(selectedPage - 1)
    }
  }

  const handlePageChangeRight = (e) => {
    onPageChange(e)
    if (selectedPage >= pages.length) {
      return
    } else {
      setSelectedPage(selectedPage + 1)
    }
  }

  const handlePageChange = (e, page) => {
    onPageChange(e)
    setSelectedPage(Number(page))
  }

  return (
    <div className='pagination'>
      <div className="pagination__content">
        <button className="pagination__btn pagination__btn--left" data-page={selectedPage} onClick={(e) => handlePageChangeLeft(e)}>{selectedPage === 1 ? selectedPage : selectedPage - 1}</button>
        <div className="pagination__numbers">
          {pages.map((page, i) => ( // [25].slice(selectedPage - 1,selectedPage+10).push(pages[pages.length])  как вариант добавить в конец последний елемент массива if(selectedPage > 5 unsift()) , if(selectedPage < 10) pop()
            <div>                    
              {
                i < selectedPage + 11 || i === totalPages ?
                <div key={page} data-page={selectedPage} className={selectedPage === page ? 'pagination__page pagination__page--active' : 'pagination__page'} onClick={(e) => handlePageChange(e, page)}>
                  {page === selectedPage + 10 ? '...' : page}
                </div>
                : null
              }
            </div>
          ))}
        </div>
        <button className="pagination__btn pagination__btn--right" data-page={selectedPage} onClick={(e) => handlePageChangeRight(e)}>{selectedPage === totalPages ? selectedPage : selectedPage + 1}</button>
      </div>

    </div>
  )
}
