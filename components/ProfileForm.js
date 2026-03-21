import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import AuthInput from './AuthInput';

export default function ProfileForm() {
  const { user } = useAuth();
  
  // Local state for the form
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState({ text: '', type: '' });

  // Load initial data
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.name || '',
        companyName: user.company || '',
        email: user.email || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage({ text: '', type: '' });
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 800));
      // In a real app, update AuthContext here as well if needed
      setSaveMessage({ text: 'Profile updated successfully.', type: 'success' });
      setIsEditing(false);
    } catch (error) {
      setSaveMessage({ text: 'Failed to update profile.', type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="rounded-xl backdrop-blur bg-white/70 shadow-md p-6 border border-gray-100 h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="text-sm font-medium text-primary-600 hover:text-primary-700 transition"
          >
            Edit Profile
          </button>
        )}
      </div>

      {saveMessage.text && (
        <div className={`mb-4 p-3 rounded-md text-sm ${saveMessage.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {saveMessage.text}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AuthInput
            id="fullName"
            label="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Jane Doe"
            required={isEditing}
            disabled={!isEditing}
          />
          <AuthInput
            id="companyName"
            label="Company Name"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Acme Corp"
            required={false}
            disabled={!isEditing}
          />
        </div>
        
        <AuthInput
          id="email"
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          required={isEditing}
          disabled={!isEditing}
        />

        {isEditing && (
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setSaveMessage({ text: '', type: '' });
                if (user) {
                  setFormData({
                    fullName: user.name || '',
                    companyName: user.company || '',
                    email: user.email || '',
                  });
                }
              }}
              disabled={isSaving}
              className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className={`inline-flex justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${isSaving ? 'bg-primary-400 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'} transition`}
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
