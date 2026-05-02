const dataFile = 'C:\Users\Elek Dániel\Documents\GitHub\WebProg-el-ad-s-beadand-\klub.txt';

document.addEventListener('DOMContentLoaded', loadDataFromTxt);

async function loadDataFromTxt() {
    try {
        const response = await fetch(dataFile);
        
        if (!response.ok) {
            throw new Error(`Nem sikerült betölteni a ${dataFile} fájlt!`);
        }

        const text = await response.text();
        
        const rows = text.trim().split('\n').filter(row => row.trim() !== '');
        
        const clubs = rows.slice(1).map(row => {
            const columns = row.split(/\t+/);
            return {
                id: columns[0] ? columns[0].trim() : "?",
                csapatnev: columns[1] ? columns[1].trim() : "Névtelen csapat"
            };
        });

        renderTable(clubs);
    } catch (error) {
        console.error("Hiba:", error);
        document.getElementById('tableBody').innerHTML = `<tr><td colspan="3" style="color:red;">Hiba: ${error.message}</td></tr>`;
    }
}

function renderTable(data) {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = data.map(club => `
        <tr>
            <td>${club.id}</td>
            <td><strong>${club.csapatnev}</strong></td>
            <td>
                <button class="action-btn btn-edit" onclick="editClub('${club.id}', '${club.csapatnev}')">Módosít</button>
                <button class="action-btn btn-delete" onclick="alert('Fájl adat nem törölhető!')">Töröl</button>
            </td>
        </tr>
    `).join('');
}

function editClub(id, nev) {
    document.getElementById('editId').value = id;
    document.getElementById('csapatnev').value = nev;
    document.getElementById('formTitle').innerText = 'Csapat szerkesztése';
    document.getElementById('submitBtn').innerText = 'Mentés';
    document.getElementById('cancelBtn').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetForm() {
    document.getElementById('clubForm').reset();
    document.getElementById('editId').value = '';
    document.getElementById('formTitle').innerText = 'Csapat rögzítése';
    document.getElementById('submitBtn').innerText = 'Hozzáadás';
    document.getElementById('cancelBtn').style.display = 'none';
}