import React from 'react';
import UserList from './components/userList';


function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sigma-gray to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Lista de Usuarios Sigma Solutions
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Prueba Técnica Sigma - Gestión de usuarios con API por Martin Cortes
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <UserList />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 text-sm">
            07/09/2025 Prueba Técnica Sigma. Prueba Tecnica con React y Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;