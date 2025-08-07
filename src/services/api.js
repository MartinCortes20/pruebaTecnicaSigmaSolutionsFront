const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

/**
 * Configuración base para fetch con manejo de errores
 * @param {string} url - URL de la API
 * @param {object} options - Opciones de fetch
 * @returns {Promise} - Respuesta de API
 */
const fetchWithErrorHandling = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw new Error(`Error al conectar con la API: ${error.message}`);
  }
};

/**
 * Para obtener la lista completa de usuarios
 * @returns {Promise<Array>} - Array de usuarios
 */
export const fetchUsers = async () => {
  const users = await fetchWithErrorHandling(`${API_BASE_URL}/users`);
  
  // Transformamos los datos para tener una estructura mejor para su manejo
  return users.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    city: user.address?.city || 'Ciudad no disponible',
    phone: user.phone,
    website: user.website,
    company: user.company?.name || 'Empresa no disponible',
    username: user.username,
  }));
};

/**
 * Obtiene un usuario por su ID
 * @param {number} userId - ID del usuario
 * @returns {Promise<Object>} - Datos del usuario
 */
export const fetchUserById = async (userId) => {
  const user = await fetchWithErrorHandling(`${API_BASE_URL}/users/${userId}`);
  
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    city: user.address?.city || 'Ciudad no disponible',
    phone: user.phone,
    website: user.website,
    company: user.company?.name || 'Empresa no disponible',
    username: user.username,
  };
};