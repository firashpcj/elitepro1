
import React, { useState, useEffect } from 'react';
import { CompanyProfile } from '../types';
import { Input } from './Input';
import { Textarea } from './Textarea';
import { Button } from './Button';

interface ProfileFormProps {
  existingProfile: CompanyProfile | null;
  onSave: (profile: CompanyProfile) => void;
  onCancel: () => void;
}

const initialProfileState: Omit<CompanyProfile, 'id'> = {
  name: '',
  logoBase64: '',
  tagline: '',
  address: '',
  vatNumber: '',
  crNumber: '',
  contactPerson: '',
  bankDetails: '',
  primaryColor: '#007bff', // A default color
};

export const ProfileForm: React.FC<ProfileFormProps> = ({ existingProfile, onSave, onCancel }) => {
  const [profile, setProfile] = useState<CompanyProfile | Omit<CompanyProfile, 'id'>>(
    existingProfile || initialProfileState
  );
  
  const [logoPreview, setLogoPreview] = useState<string | undefined>(existingProfile?.logoBase64);

  useEffect(() => {
    if (existingProfile) {
      setProfile(existingProfile);
      setLogoPreview(existingProfile.logoBase64);
    } else {
      setProfile(initialProfileState);
      setLogoPreview(undefined);
    }
  }, [existingProfile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfile(prev => ({ ...prev, logoBase64: base64String }));
        setLogoPreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const profileToSave: CompanyProfile = {
        ...profile,
        id: 'id' in profile ? profile.id : new Date().toISOString(),
    };
    onSave(profileToSave);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Company Name"
          id="name"
          name="name"
          value={profile.name}
          onChange={handleChange}
          required
        />
        <Input
          label="Tagline / Slogan"
          id="tagline"
          name="tagline"
          value={profile.tagline}
          onChange={handleChange}
        />
      </div>

      <Textarea
        label="Address"
        id="address"
        name="address"
        value={profile.address}
        onChange={handleChange}
        rows={3}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="VAT Number"
          id="vatNumber"
          name="vatNumber"
          value={profile.vatNumber}
          onChange={handleChange}
        />
        <Input
          label="CR Number"
          id="crNumber"
          name="crNumber"
          value={profile.crNumber}
          onChange={handleChange}
        />
      </div>

      <Input
        label="Contact Person"
        id="contactPerson"
        name="contactPerson"
        value={profile.contactPerson}
        onChange={handleChange}
        required
      />

      <Textarea
        label="Bank Details"
        id="bankDetails"
        name="bankDetails"
        value={profile.bankDetails}
        onChange={handleChange}
        rows={3}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <div className="md:col-span-2">
            <label htmlFor="logo" className="block text-sm font-medium text-gray-700">Company Logo</label>
            <input type="file" id="logo" name="logo" onChange={handleFileChange} accept="image/*" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-secondary"/>
        </div>
        {logoPreview && (
            <div className="flex justify-center items-center">
                <img src={logoPreview} alt="Logo Preview" className="h-16 w-16 object-contain border p-1 rounded-md" />
            </div>
        )}
      </div>

       <Input
          label="Primary Color"
          id="primaryColor"
          name="primaryColor"
          type="color"
          value={profile.primaryColor}
          onChange={handleChange}
          className="p-1 h-10 w-full block"
        />

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Save Profile
        </Button>
      </div>
    </form>
  );
};
