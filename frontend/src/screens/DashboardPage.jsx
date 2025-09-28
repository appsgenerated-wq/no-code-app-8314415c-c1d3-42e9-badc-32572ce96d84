import React, { useEffect, useState, useCallback } from 'react';
import config from '../constants.js';

const DashboardPage = ({ user, onLogout, manifest }) => {
  const [theories, setTheories] = useState([]);
  const [newTheory, setNewTheory] = useState({ title: '', description: '', foundingScientist: 'Isaac Newton' });
  const [loading, setLoading] = useState(true);

  const loadTheories = useCallback(async () => {
    setLoading(true);
    try {
      const response = await manifest.from('Theory').find({ 
        include: ['author'],
        sort: { createdAt: 'desc' }
      });
      setTheories(response.data);
    } catch (error) {
      console.error('Failed to load theories:', error);
    } finally {
      setLoading(false);
    }
  }, [manifest]);

  useEffect(() => {
    loadTheories();
  }, [loadTheories]);

  const handleCreateTheory = async (e) => {
    e.preventDefault();
    if (!newTheory.title) return;
    try {
      await manifest.from('Theory').create(newTheory);
      setNewTheory({ title: '', description: '', foundingScientist: 'Isaac Newton' });
      loadTheories();
    } catch (error) {
      console.error('Failed to create theory:', error);
      alert('Could not create theory. Please check your input.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Newtonian Chickens Dashboard</h1>
            <p className="text-gray-600">Welcome, Scientist {user.name}!</p>
          </div>
          <div className="flex items-center space-x-4">
             <a 
              href={`${config.BACKEND_URL}/admin`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition"
            >
              Admin Panel
            </a>
            <button 
              onClick={onLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Create New Theory Form */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Propose a New Theory</h2>
          <form onSubmit={handleCreateTheory} className="space-y-4">
            <input
              type="text"
              placeholder="Theory Title (e.g., 'The Principle of Least Pecking Action')"
              value={newTheory.title}
              onChange={(e) => setNewTheory({...newTheory, title: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <textarea
              placeholder="Detailed description of the theory..."
              value={newTheory.description}
              onChange={(e) => setNewTheory({...newTheory, description: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-md h-24 focus:ring-blue-500 focus:border-blue-500"
            />
            <select 
                value={newTheory.foundingScientist}
                onChange={(e) => setNewTheory({...newTheory, foundingScientist: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
                <option>Isaac Newton</option>
                <option>Joseph-Louis Lagrange</option>
            </select>
            <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
              Submit for Peer Review
            </button>
          </form>
        </div>

        {/* Theories List */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Published Theories</h2>
          {loading ? (
            <p className="text-gray-500">Loading theories...</p>
          ) : theories.length === 0 ? (
            <p className="text-gray-500">No theories have been proposed yet. Be the first!</p>
          ) : (
            <div className="space-y-4">
              {theories.map(theory => (
                <div key={theory.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{theory.title}</h3>
                      <p className="text-sm text-gray-500">Authored by: {theory.author?.name || 'Unknown Scientist'}</p>
                      <p className="text-sm text-gray-500">Inspired by: {theory.foundingScientist}</p>
                    </div>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${theory.status === 'Validated' ? 'bg-green-100 text-green-800' : theory.status === 'Debunked' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {theory.status}
                    </span>
                  </div>
                  <div className="mt-2 text-gray-700 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: theory.description }}></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
