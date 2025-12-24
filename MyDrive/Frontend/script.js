const API_URL = 'http://localhost:8080/api/files';
let currentView = 'grid';

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

function formatSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function getIcon(type) {
    return type === 'image' ? '🖼️' : '📄';
}

function switchView(view) {
    currentView = view;
    const gridView = document.getElementById('gridView');
    const listView = document.getElementById('listView');
    const buttons = document.querySelectorAll('.view-btn');

    if (view === 'grid') {
        gridView.classList.remove('hidden');
        listView.classList.add('hidden');
        buttons[0].classList.add('active');
        buttons[1].classList.remove('active');
    } else {
        gridView.classList.add('hidden');
        listView.classList.remove('hidden');
        buttons[0].classList.remove('active');
        buttons[1].classList.add('active');
    }
    
    loadFiles();
    
}

async function uploadFile() {
    const input = document.getElementById('fileInput');
    const file = input.files[0];
    
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
        const res = await fetch(`${API_URL}/upload`, {
            method: 'POST',
            body: formData
        });
        if (res.ok) {
            showToast('✓ File uploaded');
                input.value = '';
                loadFiles();
        } else {
            showToast('✗ Upload failed');
        }
    } catch (err) {
        showToast('✗ Error uploading');
    }
}

async function loadFiles() {
    const gridView = document.getElementById('gridView');
    const listView = document.getElementById('listView');

    try {
        const res = await fetch(`${API_URL}/list`);
        const files = await res.json();

        if (files.length === 0) {
            const empty = `<div class="empty"><div class="empty-icon">📁</div><h3>No files yet</h3><p>Upload files to get started</p></div>`;
            gridView.innerHTML = empty;
            listView.innerHTML = empty;
            return;
        }

        gridView.innerHTML = files.map(f => `
            <div class="file-card">
            <div class="file-preview">${getIcon(f.type)}</div>
            <div class="file-details">
                <div class="file-name" title="${f.name}">${f.name}</div>
                <div class="file-size">${formatSize(f.size)}</div>
            </div>
            <div class="file-actions">
                <button class="btn" onclick="downloadFile(${f.id}, '${f.name}')">Download</button>
                <button class="btn delete" onclick="deleteFile(${f.id})">Delete</button>
            </div>
            </div>
            `).join('');

        listView.innerHTML = `
            <table class="list-table">
                <thead>
                    <tr>
                        <th>Name</th>
                            <th>Type</th>
                            <th>Size</th>
                            <th>Actions</th>
                        </tr>
                </thead>
            <tbody>
                ${files.map(f => `
                    <tr>
                        <td><div class="list-name"><span>${getIcon(f.type)}</span><span>${f.name}</span></div></td>
                            <td>${f.type}</td>
                            <td>${formatSize(f.size)}</td>
                                 <td>
                                    <button class="btn" onclick="downloadFile(${f.id}, '${f.name}')">⬇</button>
                                    <button class="btn delete" onclick="deleteFile(${f.id})">🗑</button>
                                </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
      `;
    } catch (err) {
         showToast('✗ Error loading files');
    }
}

async function downloadFile(id, name) {
    try {
        const res = await fetch(`${API_URL}/download/${id}`);
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = name;
        a.click();
        URL.revokeObjectURL(url);
        showToast('✓ Downloaded');
    } catch (err) {
        showToast('✗ Download failed');
    }
}

async function deleteFile(id) {
    if (!confirm('Delete this file?')) return;

        try {
                const res = await fetch(`${API_URL}/delete/${id}`, {
                    method: 'DELETE'
            });
            if (res.ok) {
                showToast('✓ File deleted');
                loadFiles();
            } else {
                showToast('✗ Delete failed');
            }
        } catch (err) {
        showToast('✗ Error deleting');
    }
}

loadFiles();