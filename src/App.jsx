import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Home from './pages/Home';
import Familias from './pages/Familias';
import Cuidadores from './pages/Cuidadores';
import Admin from './pages/Admin';
import {
  INITIAL_CAREGIVERS,
  INITIAL_DEMO_REQUESTS,
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

  const handleUpdateCaregiverStatus = (id, novoStatus) => {
    setCaregivers((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: novoStatus } : item))
    );
  };

  const handleAddRequest = (newRequest) => {
    setFamilyRequests((prev) => [newRequest, ...prev]);
  };

  const handleUpdateRequestStatus = (id, novoStatus) => {
    setFamilyRequests((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: novoStatus } : item))
    );
  };

  const handleDeleteRequest = (id) => {
    setFamilyRequests((prev) => prev.filter((item) => item.id !== id));
  };

  const handleDeleteCaregiver = (id) => {
    setCaregivers((prev) => prev.filter((item) => item.id !== id));
  };

  const handleResetDemoData = () => {
    setCaregivers((prev) => {
      const defaultMap = new Map(INITIAL_CAREGIVERS.map((c) => [c.id, c]));
      const updatedExisting = prev.map((item) =>
        defaultMap.has(item.id) ? { ...defaultMap.get(item.id), status: 'aprovado' } : item
      );
      const existingIds = new Set(updatedExisting.map((c) => c.id));
      const missingDefaults = INITIAL_CAREGIVERS.filter((c) => !existingIds.has(c.id));
      return [...updatedExisting, ...missingDefaults];
    });

    setFamilyRequests((prev) => {
      const existingIds = new Set(prev.map((r) => r.id));
      const missingDemos = INITIAL_DEMO_REQUESTS.filter((r) => !existingIds.has(r.id));
      return [...prev, ...missingDemos];
    });
  };

  const handleSelectCaregiverForRequest = (caregiver) => {
    setPreselectedCaregiver(caregiver);
    setCurrentPage('familias');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isPublicPage = currentPage !== 'admin';

  return (
    <div className="app-shell">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />

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
            onAddRequest={handleAddRequest}
            onUpdateRequestStatus={handleUpdateRequestStatus}
            onDeleteRequest={handleDeleteRequest}
            onUpdateCaregiverStatus={handleUpdateCaregiverStatus}
            onDeleteCaregiver={handleDeleteCaregiver}
            onResetDemoData={handleResetDemoData}
            onNavigate={setCurrentPage}
          />
        )}
      </main>

      {isPublicPage && <FloatingWhatsApp />}

      <Footer onNavigate={setCurrentPage} />
    </div>
  );
}
