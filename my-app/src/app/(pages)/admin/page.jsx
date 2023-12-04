"use client"
import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [activeMenu, setActiveMenu] = useState('');
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    setActiveMenu('rumah');
    setUsers([{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }]);
    setRequests([{ id: 1, request: 'Request 1' }, { id: 2, request: 'Request 2' },{ id: 3, request: 'reques 3'}]);
  }, []);
  
  return (
    <div className="flex h-screen bg-gray-200">
      <div className="p-6 w-64 bg-white border-r">
        <h2 className="text-lg font-semibold text-gray-600 mb-4">Admin Dashboard</h2>
        <nav>
          <a href="#" onClick={() => setActiveMenu('users')} className="text-gray-700 block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white">Lihat User</a>
          <a href="#" onClick={() => setActiveMenu('requests')} className="text-gray-700 block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white">Mengaply Permintaan</a>
          <button>
          <a href="/Dashboard"className="text-gray-700 block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-600 hover:text-white">Keluar</a>
          </button>
        </nav>
      </div>
      <div className="flex-grow p-6">
        <h2 className="text-lg font-semibold text-gray-600 mb-2">Selamat datang di Dashboard Admin</h2>
        <div className="border rounded-lg p-4 bg-white">
          {activeMenu === 'users' && (
            <div>
              <h2 className="text-lg font-semibold text-gray-600 mb-2">Daftar User</h2>
              {users.length > 0 ? (
                <ul>
                  {users.map((user, index) => (
                    <li key={index} className="border-b py-2">
                      <h3 className="font-semibold text-gray-800">{user.id}</h3>
                      <p className="text-sm text-gray-600">{user.name}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Tidak ada user yang terdaftar.</p>
              )}
            </div>
          )}
          {activeMenu === 'requests' && (
            <div>
              <h2 className="text-lg font-semibold text-gray-600 mb-2">Daftar Permintaan</h2>
              {requests.length > 0 ? (
                <ul>
                  {requests.map((request, index) => (
                    <li key={index} className="border-b py-2 flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-gray-800">{request.id}</h3>
                        <p className="text-sm text-gray-600">{request.request}</p>
                      </div>
                      <div>
                        <button className="bg-green-500 text-white px-2 py-1 rounded mr-2">aply</button>
                        <button className="bg-pink-500 text-white px-2 py-1 rounded">Tolak</button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Tidak ada permintaan yang terdaftar.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;