import React from 'react';


const SearchBar = ({
  value = '',
  onChange,
  onReset,
  placeholder = 'Buscar...',
  disabled = false,
  showStats = false,
  totalCount = 0,
  filteredCount = 0,
  className = '',
}) => {
  /**
   * Maneja el cambio en el input de búsqueda
   */
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    onChange?.(newValue);
  };

  /**
   * Maneja el reset de la búsqueda
   */
  const handleReset = () => {
    onReset?.();
  };

  /**
   * Maneja el envío del formulario (previene refresh)
   */
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Barra de búsqueda */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          {/* Icono de búsqueda */}
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Input de búsqueda */}
          <input
            type="text"
            value={value}
            onChange={handleInputChange}
            placeholder={placeholder}
            disabled={disabled}
            className="search-input pl-10 pr-12"
            aria-label="Campo de búsqueda"
            aria-describedby={showStats ? "search-stats" : undefined}
          />

          {/* Botón de limpiar */}
          {value && (
            <button
              type="button"
              onClick={handleReset}
              disabled={disabled}
              className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors duration-200"
              aria-label="Limpiar búsqueda"
            >
              <svg
                className="h-5 w-5 text-gray-400 hover:text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </form>

      {/* Estadísticas de búsqueda */}
      {showStats && (
        <div id="search-stats" className="mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            {value ? (
              <>
                <span className="font-medium text-sigma-blue">
                  {filteredCount}
                </span>
                <span>
                  de {totalCount} usuarios encontrados
                </span>
                {filteredCount === 0 && (
                  <span className="text-orange-600 font-medium">
                    (Sin resultados)
                  </span>
                )}
              </>
            ) : (
              <span>
                Mostrando {totalCount} usuarios totales
              </span>
            )}
          </div>

          {/* Indicador de búsqueda activa */}
          {value && (
            <div className="mt-1 sm:mt-0 flex items-center space-x-1">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-600 font-medium">
                Filtro activo
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;