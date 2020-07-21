import axios from 'axios';

// Tipos de acciones
export const FETCH_USERS = 'fetch_users';
export const FETCH_USER = 'fetch_user';

/**
 * Busca todos los usuarios
 */
export function fetchUsers() {
  // Promesa de llamada a la API
  const request = axios.get('https://jsonplaceholder.typicode.com/users');

  return {
    type: FETCH_USERS,
    payload: request,
  };
}

/**
 * Busca un Usuario dado por el id
 * @param {*} id
 */
export function fetchUser(id) {
  // Promesa de llamada a la API
  const request = axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);

  return {
    type: FETCH_USER,
    payload: request,
  };
}
