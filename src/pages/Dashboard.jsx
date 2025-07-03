// src/pages/Dashboard.jsx
import { useState } from 'react';
import UploadForm from '../components/uploadForm';
import DocumentList from '../components/DocumentList';

const Dashboard = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div
      className="min-h-screen bg-cover bg-center p-4"
      style={{ backgroundImage: `url('/bg-dashboard.jpg')` }}
    >
    <div className="bg-white/70 backdrop-blur-sm p-4 rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">📂 Document Dashboard</h1>
      
      {/* Upload form will trigger list refresh */}
      <UploadForm onSuccess={() => setRefreshKey(prev => prev + 1)} />

      {/* Passing refreshKey as key will reload the list on change */}
      <DocumentList key={refreshKey} />
    </div>
    </div>
  );
};

export default Dashboard;
