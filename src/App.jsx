import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Familias from './pages/Familias';
import Cuidadores from './pages/Cuidadores';
import Admin from './pages/Admin';
import {
  INITIAL_CAREGIVERS,
  loadCaregivers,
  saveCaregivers,
  loadFamilyRequests,
  saveFamilyRequests,
} from './data/initialCaregivers';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [caregivers, setCaregivers] = useState(() => loadCaregivers());
  const [familyRequests, setFamilyRequests] = useState(() => loadFamilyRequests());
  const [preselectedCaregiver, setPreselectedCaregiver] = useState(null);

  useEffect(() => {
    saveCaregivers(caregivers);
  }, [caregivers]);

  useEffect(() => {
    saveFamilyRequests(familyRequests);
  }, [familyRequests]);

  const handleAddCaregiver = (newCaregiver) => {
    setCaregivers((prev) => [newCaregiver, ...prev]);
  };

  const handleAddRequest = (newRequest) => {
    setFamilyRequests((prev) => [newRequest, ...prev]);
  };

  const handleDeleteRequest = (id) => {
    setFamilyRequests((prev) => prev.filter((item) => item.id !== id));
  };

  const handleDeleteCaregiver = (id) => {
    setCaregivers((prev) => prev.filter((item) => item.id !== id));
  };

  const handleResetDemoData = () => {
    setCaregivers((prev) => {
      const existingIds = new Set(prev.map((c) => c.id));
      const missingDefaults = INITIAL_CAREGIVERS.filter((c) => !existingIds.has(c.id));
      return [...prev, ...missingDefaults];
    });
  };

  const handleSelectCaregiverForRequest = (caregiver) => {
    setPreselectedCaregiver(caregiver);
    setCurrentPage('familias');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-shell">
      <Navbar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        requestsCount={familyRequests.length}
      />

      <main className="main-content">
        {currentPage === 'home' && (
          <Home
            caregivers={caregivers}
            onNavigate={setCurrentPage}
            onSelectCaregiverForRequest={handleSelectCaregiverForRequest}
          />
        )}

        {currentPage === 'familias' && (
          <Familias
            onAddRequest={handleAddRequest}
            preselectedCaregiver={preselectedCaregiver}
            onClearPreselected={() => setPreselectedCaregiver(null)}
          />
        )}

        {currentPage === 'cuidadores' && (
          <Cuidadores
            onAddCaregiver={handleAddCaregiver}
            onNavigate={setCurrentPage}
          />
        )}

        {currentPage === 'admin' && (
          <Admin
            requests={familyRequests}
            caregivers={caregivers}
            onDeleteRequest={handleDeleteRequest}
            onDeleteCaregiver={handleDeleteCaregiver}
            onResetDemoData={handleResetDemoData}
          />
        )}
      </main>

      <Footer onNavigate={setCurrentPage} />
    </div>
  );
}
