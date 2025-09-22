import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { CompanyProfile } from '../types';
import { LOCAL_STORAGE_PROFILES_KEY } from '../constants';
import { Modal } from '../components/Modal';
import { ProfileForm } from '../components/ProfileForm';
import { Button } from '../components/Button';
import { PlusIcon, TrashIcon } from '../components/icons/Icons';

export const ProfileManager: React.FC = () => {
  const [profiles, setProfiles] = useLocalStorage<CompanyProfile[]>(LOCAL_STORAGE_PROFILES_KEY, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState<CompanyProfile | null>(null);

  const handleOpenModal = (profile: CompanyProfile | null = null) => {
    setEditingProfile(profile);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProfile(null);
  };

  const handleSaveProfile = (profile: CompanyProfile) => {
    if (editingProfile) {
      setProfiles(profiles.map(p => p.id === profile.id ? profile : p));
    } else {
      setProfiles([...profiles, profile]);
    }
    handleCloseModal();
  };

  const handleDeleteProfile = (profileId: string) => {
    if (window.confirm('Are you sure you want to delete this profile? This action cannot be undone.')) {
        setProfiles(profiles.filter(p => p.id !== profileId));
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Company Profiles</h2>
        <Button onClick={() => handleOpenModal()}>
          <PlusIcon className="h-5 w-5 mr-2" />
          Add New Profile
        </Button>
      </div>

      {profiles.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500">No company profiles found.</p>
          <p className="text-gray-400 mt-2">Click "Add New Profile" to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {profiles.map((profile, index) => (
            <div 
              key={profile.id} 
              className="p-4 border border-gray-200 rounded-lg flex justify-between items-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'backwards' }}
            >
              <div className="flex items-center space-x-4">
                {profile.logoBase64 && <img src={profile.logoBase64} alt={`${profile.name} logo`} className="h-12 w-12 object-contain rounded-md bg-gray-100 p-1" />}
                <div>
                  <p className="font-semibold text-primary">{profile.name}</p>
                  <p className="text-sm text-gray-500">{profile.address}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="secondary" onClick={() => handleOpenModal(profile)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDeleteProfile(profile.id)}>
                  <TrashIcon className="h-5 w-5"/>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingProfile ? 'Edit Company Profile' : 'Add New Company Profile'}>
        <ProfileForm existingProfile={editingProfile} onSave={handleSaveProfile} onCancel={handleCloseModal} />
      </Modal>
    </div>
  );
};