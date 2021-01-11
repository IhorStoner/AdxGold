import React, { useState, useEffect } from 'react'
import './Pagination.scss'

export default function Pagination({
  totalPages,
  currentPage,
  separator = '...',
  onChange,
}) {

  const showAfterFirst = currentPage < 5;
  const showBeforeLast = currentPage > totalPages - 4;

  const buttons = (num, base) => [...Array(num)].map((n, i) => base + i);
  const buttonsToRender = totalPages > 8
    ? [
      1,
      showAfterFirst && buttons(4, 2),
      !showAfterFirst && separator,
      !(showAfterFirst || showBeforeLast) && buttons(3, currentPage - 1),
      !showBeforeLast && separator,
      showBeforeLast && buttons(4, totalPages - 4),
      totalPages,
    ].flat().filter(Boolean)
    : buttons(totalPages, 1);

  const onClick = ({ target: t }) => t.tagName === 'BUTTON' && onChange(+t.dataset.page);

  return (
    <div className="pagination" onClick={onClick}>
      <div className="pagination__content">
        <button className='pagination__btn pagination__btn--left' data-page={currentPage - 1} disabled={currentPage === 1}></button>
        <div className="pagination__numbers">
          {buttonsToRender.map(n => n === separator
            ? <div>{separator}</div>
            : <button data-page={n} className={n === currentPage ? 'pagination__page pagination__page--active' : 'pagination__page'}>{n}</button>
          )}
        </div>
        <button className='pagination__btn pagination__btn--right' data-page={currentPage + 1} disabled={currentPage === totalPages}></button>
      </div>

    </div>
  );
}
