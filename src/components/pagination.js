import React from 'react';



const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  maxVisiblePages = 5,
  showInfo = true,
  showFirstLast = true,
  disabled = false,
  className = '',
}) => {
  /**
   * Genera el rango de páginas que se van a mostar
   */
  const getPageRange = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(currentPage - half, 1);
    let end = Math.min(start + maxVisiblePages - 1, totalPages);

    // Ajustar el inicio si estamos cerca del final
    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(end - maxVisiblePages + 1, 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  /**
   * Maneja el cambio de pagina
   */
  const handlePageChange = (page) => {
    if (page !== currentPage && page >= 1 && page <= totalPages && !disabled) {
      onPageChange?.(page);
    }
  };

  /**
   * Maneja la navegación por teclado
   */
  const handleKeyDown = (e, page) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handlePageChange(page);
    }
  };

  // No renderizar si no hay páginas
  if (totalPages <= 1) {
    return null;
  }

  const pageRange = getPageRange();
  const showEllipsisStart = pageRange[0] > 1;
  const showEllipsisEnd = pageRange[pageRange.length - 1] < totalPages;

  return (
    <nav 
      className={`flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 ${className}`}
      aria-label="Navegación de páginas"
    >
      {/* Información de paginas */}
      {showInfo && (
        <div className="text-sm text-gray-700 order-2 sm:order-1">
          Página{' '}
          <span className="font-medium text-sigma-blue">{currentPage}</span>
          {' '}de{' '}
          <span className="font-medium">{totalPages}</span>
        </div>
      )}

      {/* Controles de paginacion */}
      <div className="flex items-center space-x-1 order-1 sm:order-2">
        {/* Botón Primera página */}
        {showFirstLast && currentPage > 1 && (
          <>
            <button
              onClick={() => handlePageChange(1)}
              onKeyDown={(e) => handleKeyDown(e, 1)}
              disabled={disabled}
              className="pagination-btn"
              aria-label="Primera página"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button>
            {pageRange[0] > 2 && (
              <span className="px-2 py-1 text-gray-500">...</span>
            )}
          </>
        )}

        {/* Botón Anterior */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          onKeyDown={(e) => handleKeyDown(e, currentPage - 1)}
          disabled={currentPage === 1 || disabled}
          className="pagination-btn"
          aria-label="Página anterior"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Números de página */}
        {pageRange.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            onKeyDown={(e) => handleKeyDown(e, page)}
            disabled={disabled}
            className={`
              px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-sigma-blue focus:ring-offset-1
              ${
                page === currentPage
                  ? 'bg-sigma-blue text-white shadow-sm'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-sigma-blue'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
            aria-label={`Página ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        ))}

        {/* Botón Siguiente */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          onKeyDown={(e) => handleKeyDown(e, currentPage + 1)}
          disabled={currentPage === totalPages || disabled}
          className="pagination-btn"
          aria-label="Página siguiente"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Botón Última página */}
        {showFirstLast && currentPage < totalPages && (
          <>
            {pageRange[pageRange.length - 1] < totalPages - 1 && (
              <span className="px-2 py-1 text-gray-500">...</span>
            )}
            <button
              onClick={() => handlePageChange(totalPages)}
              onKeyDown={(e) => handleKeyDown(e, totalPages)}
              disabled={disabled}
              className="pagination-btn"
              aria-label="Última página"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Pagination;