// Supabase client loaded from supabase-client.js

// State
let editingIndex = null;
let currentTools = [];
let currentUser = null;

// DOM Elements
const clientList = document.getElementById('clientList');
const addClientBtn = document.getElementById('addClientBtn');
const overlay = document.getElementById('clientFormOverlay');
const saveClientBtn = document.getElementById('saveClientBtn');
const cancelBtn = document.getElementById('cancelBtn');
const colorBtns = document.querySelectorAll('.color-btn');
const addToolBtn = document.getElementById('addToolBtn');
const toolsListContainer = document.getElementById('toolsList');
const loadingOverlay = document.getElementById('loadingOverlay');
const authPrompt = document.getElementById('authPrompt');
const signInBtn = document.getElementById('signInBtn');
const signUpBtn = document.getElementById('signUpBtn');
const authEmail = document.getElementById('authEmail');
const authPassword = document.getElementById('authPassword');
const authError = document.getElementById('authError');

// Inputs
const clientNameInput = document.getElementById('clientName');
const googleAccountIndexInput = document.getElementById('googleAccountIndex');
const googleUrlPasteInput = document.getElementById('googleUrlPaste');
const urlPasteHint = document.getElementById('urlPasteHint');

// Initialize app
document.addEventListener('DOMContentLoaded', initializeApp);

async function initializeApp() {
    showLoading();

    try {
        // Check if user is authenticated
        const authenticated = await isAuthenticated();

        if (!authenticated) {
            hideLoading();
            showAuthPrompt();
            return;
        }

        // Get current user
        currentUser = await getCurrentUser();
        hideAuthPrompt();
        loadClients();

    } catch (error) {
        console.error('Init error:', error);
        hideLoading();
        showAuthPrompt();
    }
}

// Event Listeners
addClientBtn.addEventListener('click', () => openForm());
cancelBtn.addEventListener('click', closeForm);
saveClientBtn.addEventListener('click', saveClient);
addToolBtn.addEventListener('click', () => addToolRow());
googleUrlPasteInput.addEventListener('input', handleUrlPaste);

// Autosave form draft (keep in local storage - drafts are temporary)
clientNameInput.addEventListener('input', saveDraft);
googleAccountIndexInput.addEventListener('input', saveDraft);
googleUrlPasteInput.addEventListener('input', saveDraft);

// Auth event listeners
signInBtn.addEventListener('click', () => handleAuth('signin'));
signUpBtn.addEventListener('click', () => handleAuth('signup'));

// Color Picker Logic
colorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        colorBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
    });
});

// --- Auth Functions ---

async function handleAuth(mode) {
    const email = authEmail.value.trim();
    const password = authPassword.value.trim();

    if (!email || !password) {
        showAuthError('Please enter email and password');
        return;
    }

    showLoading();
    hideAuthError();

    try {
        let result;

        if (mode === 'signup') {
            result = await supabase.auth.signUp({ email, password });
        } else {
            result = await supabase.auth.signInWithPassword({ email, password });
        }

        if (result.error) throw result.error;

        // Successfully authenticated
        currentUser = result.data.user;
        hideAuthPrompt();
        await loadClients();

    } catch (error) {
        hideLoading();
        showAuthError(error.message || 'Authentication failed');
    }
}

function showAuthPrompt() {
    authPrompt.style.display = 'flex';
    document.querySelector('.container').style.display = 'none';
}

function hideAuthPrompt() {
    authPrompt.style.display = 'none';
    document.querySelector('.container').style.display = 'block';
}

function showAuthError(message) {
    authError.textContent = message;
    authError.style.display = 'block';
}

function hideAuthError() {
    authError.style.display = 'none';
}

// --- Loading Functions ---

function showLoading() {
    loadingOverlay.style.display = 'flex';
}

function hideLoading() {
    loadingOverlay.style.display = 'none';
}

// --- Core Logic with Supabase ---

async function loadClients() {
    showLoading();

    try {
        // Fetch clients from Supabase
        const { data: clients, error } = await supabase
            .from('clients')
            .select('*')
            .eq('user_id', currentUser.id)
            .order('updated_at', { ascending: false });

        if (error) throw error;

        hideLoading();

        if (!clients || clients.length === 0) {
            clientList.innerHTML = `
          <div style="text-align: center; color: #6b7280; padding: 20px;">
            <p>No clients yet.</p>
            <p style="font-size: 12px;">Click "+ New Client" to start.</p>
          </div>`;
            return;
        }

        clientList.innerHTML = '';

        clients.forEach((client) => {
            const card = document.createElement('div');
            card.className = 'client-card';
            card.style.borderLeftColor = client.color;

            // Summary of tools
            const toolCount = client.tools ? client.tools.length : 0;
            const googleAccount = client.google_index !== '' && client.google_index !== null && client.google_index !== undefined
                ? `Account ${client.google_index}`
                : 'Account 0';

            card.innerHTML = `
          <div class="client-header">
            <span class="client-name">${client.name}</span>
            <div class="card-actions">
              <button class="edit-btn" data-id="${client.id}" title="Edit">✎</button>
              <button class="delete-btn" data-id="${client.id}" title="Delete">×</button>
            </div>
          </div>
          <div class="client-meta">
            ${toolCount} tools • ${googleAccount}
          </div>
        `;

            card.addEventListener('click', (e) => {
                if (!e.target.classList.contains('delete-btn') && !e.target.classList.contains('edit-btn')) {
                    openClientWorkspace(client);
                }
            });

            card.querySelector('.edit-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                openForm(client);
            });

            card.querySelector('.delete-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                deleteClient(client.id);
            });

            clientList.appendChild(card);
        });

    } catch (error) {
        hideLoading();
        console.error('Load error:', error);
        clientList.innerHTML = `
        <div style="text-align: center; color: #ef4444; padding: 20px;">
          <p>Error loading clients</p>
          <p style="font-size: 12px;">${error.message}</p>
        </div>`;
    }
}

async function openForm(client = null) {
    editingIndex = client ? client.id : null;
    overlay.style.display = 'flex';

    // Update form title
    const formTitle = overlay.querySelector('h2');
    formTitle.textContent = client ? 'Edit Client' : 'Add Client';

    if (client) {
        // Editing existing client - populate with client data
        clientNameInput.value = client.name;
        googleAccountIndexInput.value = client.google_index || '';
        googleUrlPasteInput.value = '';
        urlPasteHint.textContent = 'e.g. https://drive.google.com/drive/u/1/...';
        urlPasteHint.style.color = '';

        // Set color
        document.querySelector('.color-btn.selected')?.classList.remove('selected');
        document.querySelector(`.color-btn[data-color="${client.color}"]`)?.classList.add('selected');

        // Populate tools
        toolsListContainer.innerHTML = '';
        if (client.tools && client.tools.length > 0) {
            client.tools.forEach(tool => addToolRow(tool.name, tool.url));
        } else {
            addToolRow();
        }
    } else {
        // Creating new client - check for draft
        const draft = await loadDraft();

        if (draft) {
            // Restore draft
            clientNameInput.value = draft.name || '';
            googleAccountIndexInput.value = draft.googleIndex || '';
            googleUrlPasteInput.value = '';

            // Set color
            document.querySelector('.color-btn.selected')?.classList.remove('selected');
            const colorToSelect = draft.color || '#3b82f6';
            document.querySelector(`.color-btn[data-color="${colorToSelect}"]`)?.classList.add('selected');

            // Populate tools
            toolsListContainer.innerHTML = '';
            if (draft.tools && draft.tools.length > 0) {
                draft.tools.forEach(tool => addToolRow(tool.name, tool.url));
            } else {
                addToolRow();
            }
        } else {
            // Fresh form
            clientNameInput.value = '';
            googleAccountIndexInput.value = '';
            googleUrlPasteInput.value = '';
            urlPasteHint.textContent = 'e.g. https://drive.google.com/drive/u/1/...';
            urlPasteHint.style.color = '';

            document.querySelector('.color-btn.selected')?.classList.remove('selected');
            document.querySelector('.color-btn[data-color="#3b82f6"]')?.classList.add('selected');

            toolsListContainer.innerHTML = '';
            addToolRow();
        }
    }
}

async function closeForm() {
    // Save draft before closing (unless editing)
    if (editingIndex === null) {
        await saveDraft();
    }
    overlay.style.display = 'none';
}

function addToolRow(name = '', url = '') {
    const row = document.createElement('div');
    row.className = 'tool-row';

    row.innerHTML = `
    <input type="text" class="tool-name" placeholder="Name (e.g. Drive)" value="${name}">
    <input type="url" class="tool-url" placeholder="URL (e.g. https://...)" value="${url}">
    <button class="remove-tool-btn">×</button>
  `;

    row.querySelector('.remove-tool-btn').addEventListener('click', () => {
        row.remove();
    });

    toolsListContainer.appendChild(row);
}

async function saveClient() {
    const name = clientNameInput.value.trim();
    const colorBtn = document.querySelector('.color-btn.selected');
    const color = colorBtn ? colorBtn.dataset.color : '#3b82f6';
    const googleIndex = googleAccountIndexInput.value;

    // Collect tools
    const tools = [];
    document.querySelectorAll('.tool-row').forEach(row => {
        const toolName = row.querySelector('.tool-name').value.trim();
        const toolUrl = row.querySelector('.tool-url').value.trim();

        // Basic URL validation
        if (toolName && toolUrl) {
            if (!isValidUrl(toolUrl)) {
                alert(`Invalid URL for "${toolName}". Please enter a valid URL starting with http:// or https://`);
                throw new Error('Invalid URL');
            }
            tools.push({ name: toolName, url: toolUrl });
        }
    });

    if (!name) {
        alert('Client Name is required');
        return;
    }

    showLoading();

    try {
        const clientData = {
            name,
            color,
            google_index: googleIndex,
            tools,
            user_id: currentUser.id,
            updated_at: new Date().toISOString()
        };

        if (editingIndex) {
            // Update existing client
            const { error } = await supabase
                .from('clients')
                .update(clientData)
                .eq('id', editingIndex)
                .eq('user_id', currentUser.id);

            if (error) throw error;
        } else {
            // Insert new client
            const { error } = await supabase
                .from('clients')
                .insert([clientData]);

            if (error) throw error;

            // Clear draft after successful save
            await clearDraft();
        }

        await loadClients();
        closeForm();

    } catch (error) {
        hideLoading();
        alert(`Error saving client: ${error.message}`);
        console.error('Save error:', error);
    }
}

async function deleteClient(clientId) {
    if (!confirm('Delete this client?')) return;

    showLoading();

    try {
        const { error } = await supabase
            .from('clients')
            .delete()
            .eq('id', clientId)
            .eq('user_id', currentUser.id);

        if (error) throw error;

        await loadClients();

    } catch (error) {
        hideLoading();
        alert(`Error deleting client: ${error.message}`);
        console.error('Delete error:', error);
    }
}

// URL Validation Helper
function isValidUrl(string) {
    try {
        const url = new URL(string);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (err) {
        return false;
    }
}

// --- Draft Autosave Functions (Keep in Chrome Storage - Temporary) ---

async function saveDraft() {
    // Only save draft when creating new client (not editing)
    if (editingIndex !== null) return;

    const colorBtn = document.querySelector('.color-btn.selected');
    const color = colorBtn ? colorBtn.dataset.color : '#3b82f6';

    // Collect tools
    const tools = [];
    document.querySelectorAll('.tool-row').forEach(row => {
        const toolName = row.querySelector('.tool-name').value.trim();
        const toolUrl = row.querySelector('.tool-url').value.trim();
        if (toolName || toolUrl) {  // Save even partial tools
            tools.push({ name: toolName, url: toolUrl });
        }
    });

    const draft = {
        name: clientNameInput.value.trim(),
        googleIndex: googleAccountIndexInput.value,
        color: color,
        tools: tools
    };

    await chrome.storage.local.set({ formDraft: draft });
}

async function loadDraft() {
    const data = await chrome.storage.local.get(['formDraft']);
    return data.formDraft || null;
}

async function clearDraft() {
    await chrome.storage.local.remove(['formDraft']);
}

// URL Extraction functionality
function handleUrlPaste(e) {
    const url = e.target.value;
    if (!url) return;

    // Pattern to match /u/1/ or /u/1
    const match = url.match(/\/u\/(\d+)/);

    if (match && match[1]) {
        const index = match[1];

        if (index) {
            googleAccountIndexInput.value = index;
            urlPasteHint.textContent = `✅ Detected Account ${index}!`;
            urlPasteHint.style.color = '#10b981'; // Green
        }
    } else {
        // No index found yet
        urlPasteHint.textContent = 'No account index detected in this URL.';
        urlPasteHint.style.color = '#6b7280'; // Gray
    }
}

// Context Switching Logic
function openClientWorkspace(client) {
    if (!client.tools || client.tools.length === 0) {
        alert('No tools configured for this client.');
        return;
    }

    client.tools.forEach((tool, index) => {
        let finalUrl = tool.url;

        // Google Account Logic
        const googleDomains = ['drive.google.com', 'mail.google.com', 'calendar.google.com', 'docs.google.com'];
        const isGoogle = googleDomains.some(d => finalUrl.includes(d));

        // Fixed: Handle index 0 properly (it's falsy but valid)
        if (isGoogle && client.google_index !== '' && client.google_index !== null && client.google_index !== undefined) {
            try {
                const urlObj = new URL(finalUrl);
                let path = urlObj.pathname;

                // 1. Remove existing index if present (e.g. /u/0/)
                // Matches /u/123 with optional trailing slash
                path = path.replace(/\/u\/\d+(\/|$)/, '/');

                // Clean up any double slashes from the removal
                path = path.replace(/\/{2,}/g, '/');

                // 2. Insert new index
                // Service prefixes that support /service/u/N/ structure
                const services = ['drive', 'mail', 'calendar', 'document', 'spreadsheets', 'presentation', 'forms'];

                // Check if path starts with one of these services
                // path e.g. "/drive/my-drive"
                const parts = path.split('/').filter(p => p);
                const service = parts[0]; // "drive"

                if (services.includes(service)) {
                    // Reconstruct: /drive + /u/1 + /my-drive
                    // If path was just "/drive", parts slice is empty
                    const rest = parts.slice(1).join('/');
                    path = `/${service}/u/${client.google_index}/${rest}`;
                } else {
                    // Fallback for root paths or unknown services (like Keep)
                    // If no service prefix, prepend /u/N/
                    // e.g. https://keep.google.com/ -> https://keep.google.com/u/1/
                    if (path === '/' || path === '') {
                        path = `/u/${client.google_index}/`;
                    } else {
                        // If path exists but isn't a known service (e.g. /some-other-path),
                        // try prepending /u/N/ as per original logic, 
                        // mostly likely it will work or redirect.
                        path = `/u/${client.google_index}${path}`;
                    }
                }

                // Clean up trailing slashes if needed, though standardizing usually helps
                path = path.replace(/\/{2,}/g, '/');

                urlObj.pathname = path;
                finalUrl = urlObj.toString();
            } catch (e) {
                console.error('URL parse error', e);
            }
        }

        // Open first tool as active tab, rest in background
        chrome.tabs.create({ url: finalUrl, active: index === 0 });
    });
}
