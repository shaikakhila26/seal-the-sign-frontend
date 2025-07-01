// src/pages/Dashboard.jsx
import { useState } from 'react';
import UploadForm from '../components/uploadForm';
import DocumentList from '../components/DocumentList';

const Dashboard = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">📂 Document Dashboard</h1>
      
      {/* Upload form will trigger list refresh */}
      <UploadForm onSuccess={() => setRefreshKey(prev => prev + 1)} />

      {/* Passing refreshKey as key will reload the list on change */}
      <DocumentList key={refreshKey} />
    </div>
  );
};

export default Dashboard;
