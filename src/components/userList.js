import React, { useState } from 'react';
import { useUsers } from '../hooks/useUsers';
import SearchBar from './searchBar';
import UserCard from './userCard';
import Pagination from './pagination';
import UserModal from './userModal';


const UserList = () => {
  // Estado local para el modal
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hook personalizado con toda la lógica para llevar los usuarios
  const {
    users,
    loading,
    error,
    searchTerm,
    currentPage,
    totalPages,
    totalUsers,
    filteredCount,
    hasNextPage,
    hasPrevPage,
    handleSearchChange,
    handlePageChange,
    resetSearch,
    loadUsers,
  } = useUsers();

  /**
   * Maneja la apertura del modal con detalles del user
   */
  const handleUserClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  /**
   * Maneja el cierre del modal
   */
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  /**
   * Componente de estado de carga
   */
  const LoadingState = () => (
    <div className="space-y-6">
      <div className="animate-pulse">
        <div className="h-12 bg-gray-200 rounded-lg mb-6"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="user-card animate-pulse">
            <div className="flex items-center space-x-4 mb-4">
              <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  /**
   * Componente de estado de error
   */
  const ErrorState = () => (
    <div className="text-center py-12">
      <div className="mx-auto w-24 h-24 mb-6">
        <svg className="w-full h-full text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.768 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Error al cargar usuarios
      </h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        {error || 'Ocurrió un error inesperado al cargar la lista de usuarios.'}
      </p>
      <button
        onClick={loadUsers}
        className="btn-primary"
      >
        Intentar de nuevo
      </button>
    </div>
  );

  /**
   * Componente de estado vacío (en caso de que jno llegemos a encontrar un usuario)
   */
  const EmptyState = () => (
    <div className="text-center py-12">
      <div className="mx-auto w-24 h-24 mb-6">
        <svg className="w-full h-full text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        No se encontraron usuarios
      </h3>
      <p className="text-gray-600 mb-6">
        No hay usuarios que coincidan con "{searchTerm}". 
        Intenta con otros términos de búsqueda.
      </p>
      <button
        onClick={resetSearch}
        className="btn-secondary"
      >
        Limpiar búsqueda
      </button>
    </div>
  );

  /**
   * Renderizado condicional basado en estado
   */
  if (loading) return <LoadingState />;
  if (error) return <ErrorState />;

  return (
    <div className="space-y-6">
      {/* Header con estadísticas y búsqueda */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">
                Lista de Usuarios
              </h2>
              <p className="text-sm text-gray-600">
                 Da clic en el campo de búsqueda para encontrar usuarios en esta API.
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-sigma-blue">
                  {totalUsers}
                </div>
                <div className="text-xs text-gray-500">
                  usuarios totales
                </div>
              </div>
            </div>
          </div>

          {/* Barra de búsqueda */}
          <SearchBar
            value={searchTerm}
            onChange={handleSearchChange}
            onReset={resetSearch}
            placeholder="Buscar usuarios por nombre..."
            showStats={true}
            totalCount={totalUsers}
            filteredCount={filteredCount}
          />
        </div>
      </div>

      {/* Contenido principal */}
      {users.length === 0 && searchTerm ? (
        <EmptyState />
      ) : (
        <>
          {/* Grid de usuarios */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onClick={handleUserClick}
                showDetailsButton={true}
              />
            ))}
          </div>

          {/* Paginación */}
          {totalPages > 1 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                showInfo={true}
                showFirstLast={true}
              />
            </div>
          )}

          {/* Información adicional */}
          {users.length > 0 && (
            <div className="text-center text-sm text-gray-500">
              {searchTerm ? (
                <>
                  Mostrando {users.length} de {filteredCount} resultados
                  {currentPage < totalPages && (
                    <span className="block mt-1">
                      Hay {totalPages - currentPage} páginas más disponibles
                    </span>
                  )}
                </>
              ) : (
                <>
                  Página {currentPage} de {totalPages}
                  {hasNextPage && (
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      className="ml-2 text-sigma-blue hover:underline"
                    >
                      Ver siguiente →
                    </button>
                  )}
                </>
              )}
            </div>
          )}
        </>
      )}

      {/* Modal de detalles */}
      {isModalOpen && selectedUser && (
        <UserModal
          user={selectedUser}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default UserList;