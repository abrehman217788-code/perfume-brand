// Shared functions for CV Studio

const API_BASE = '/api';

// Fetch all CVs
async function fetchCvs() {
    try {
        const response = await fetch(`${API_BASE}/cvs`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching CVs:', error);
        return [];
    }
}

// Fetch a single CV
async function fetchCv(id) {
    try {
        const response = await fetch(`${API_BASE}/cvs/${id}`);
        if (!response.ok) throw new Error('CV not found');
        return await response.json();
    } catch (error) {
        console.error('Error fetching CV:', error);
        return null;
    }
}

// Save a CV
async function saveCv(cv) {
    try {
        const response = await fetch(`${API_BASE}/cvs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cv)
        });
        return await response.json();
    } catch (error) {
        console.error('Error saving CV:', error);
        return null;
    }
}

// Delete a CV
async function deleteCv(id) {
    try {
        const response = await fetch(`${API_BASE}/cvs/${id}`, {
            method: 'DELETE'
        });
        return response.ok;
    } catch (error) {
        console.error('Error deleting CV:', error);
        return false;
    }
}

// Helper to get URL parameters
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// UI Helpers
function showNotification(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
