import { useState, useEffect, useCallback, useMemo } from 'react';
import { fetchUsers } from '../services/api';



export const useUsers = () => {
  // Estados
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Configuración de paginación
  const USERS_PER_PAGE = 6;

  /**
   * Carga inicial de usuarios
   */
  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const userData = await fetchUsers();
      setUsers(userData);
    } catch (err) {
      setError(err.message);
      console.error('Error loading users:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Filtrado de usuarios por nombre (optimizado con useMemo)
   */
  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim()) return users;
    
    return users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  /**
   * Paginación de usuarios filtrados (optimizado con useMemo para no tener que recalcular el mismo slice)
   */
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * USERS_PER_PAGE;
    const endIndex = startIndex + USERS_PER_PAGE;
    return filteredUsers.slice(startIndex, endIndex);
  }, [filteredUsers, currentPage]);

  /**
   * Cálculo del total de páginas
   */
  const totalPages = useMemo(() => {
    return Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  }, [filteredUsers.length]);

  /**
   * Maneja el cambio en el término de búsqueda
   */
  const handleSearchChange = useCallback((term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Resetear a la primera página al buscar
  }, []);

  /**
   * Maneja el cambio de página
   */
  const handlePageChange = useCallback((page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }, [totalPages]);

  /**
   * Reinicia la búsqueda y paginación
   */
  const resetSearch = useCallback(() => {
    setSearchTerm('');
    setCurrentPage(1);
  }, []);

  // Efecto para cargar usuarios al montar el componente
  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  // API pública del hook
  return {
    // Estados
    users: paginatedUsers,
    allUsers: users,
    filteredUsers,
    loading,
    error,
    searchTerm,
    currentPage,
    totalPages,
    
    // Estadísticas útiles
    totalUsers: users.length,
    filteredCount: filteredUsers.length,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
    
    // Métodos
    handleSearchChange,
    handlePageChange,
    resetSearch,
    loadUsers,
  };
};