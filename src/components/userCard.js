import React from 'react';


const UserCard = ({
  user,
  onClick,
  showDetailsButton = true,
  variant = 'default',
  className = '',
}) => {
  /**
   * Maneja el click en la tarjeta
   */
  const handleCardClick = () => {
    onClick?.(user);
  };

  /**
   * Maneja el click en el botón de detalles
   */
  const handleDetailsClick = (e) => {
    e.stopPropagation(); // Previene el click de la tarjeta
    onClick?.(user);
  };

  /**
   * Genera las iniciales del usuario para el avatar
   */
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  /**
   * Genera un color de fondo basado en el ID del usuario
   */
  const getAvatarColor = (id) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500', 
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-red-500',
      'bg-yellow-500',
      'bg-teal-500'
    ];
    return colors[id % colors.length];
  };

  // Validación de props
  if (!user) {
    return (
      <div className="user-card animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
    );
  }

  const cardClasses = `
    user-card cursor-pointer transform hover:scale-105 active:scale-95
    ${variant === 'compact' ? 'p-4' : 'p-6'}
    ${onClick ? 'hover:bg-gray-50' : ''}
    ${className}
  `;

  return (
    <article
      className={cardClasses}
      onClick={onClick ? handleCardClick : undefined}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      } : undefined}
      aria-label={`Tarjeta de ${user.name}`}
    >
      {/* Header con Avatar */}
      <div className="flex items-start space-x-4 mb-4">
        {/* Avatar */}
        <div className={`
          flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm
          ${getAvatarColor(user.id)}
        `}>
          {getInitials(user.name)}
        </div>

        {/* Info básica */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate mb-1">
            {user.name}
          </h3>
          <p className="text-sm text-gray-500 truncate">
            @{user.username || user.name.toLowerCase().replace(/\s+/g, '')}
          </p>
        </div>

        {/* Badge de estado */}
        <div className="flex-shrink-0">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Activo
          </span>
        </div>
      </div>

      {/* Información de contacto */}
      <div className="space-y-3">
        {/* Email */}
        <div className="flex items-center space-x-2">
          <svg className="h-4 w-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
          </svg>
          <span className="text-sm text-gray-600 truncate" title={user.email}>
            {user.email}
          </span>
        </div>

        {/* Ciudad */}
        <div className="flex items-center space-x-2">
          <svg className="h-4 w-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm text-gray-600 truncate" title={user.city}>
            {user.city}
          </span>
        </div>

        {/* Compañía (solo en variant normal) */}
        {variant !== 'compact' && user.company && (
          <div className="flex items-center space-x-2">
            <svg className="h-4 w-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className="text-sm text-gray-600 truncate" title={user.company}>
              {user.company}
            </span>
          </div>
        )}
      </div>

      {/* Botón de detalles */}
      {showDetailsButton && onClick && (
        <div className="mt-4 pt-4 border-t border-gray-300">
          <button
            onClick={handleDetailsClick}
            className="w-full btn-primary text-sm py-3 px-4"
            aria-label={`Ver detalles de ${user.name}`}
          >
            Ver Detalles
          </button>
        </div>
      )}
    </article>
  );
};

export default UserCard;