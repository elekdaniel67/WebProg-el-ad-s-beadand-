let adatok = [
    { id: 1, vezeteknev: "Haris", utonev: "Attila", mezszam: 18, ertek: 150 },
    { id: 2, vezeteknev: "Németh", utonev: "Márió", mezszam: 31, ertek: 300 },
    { id: 3, vezeteknev: "Jovanovic", utonev: "Aleksandar", mezszam: 77, ertek: 300 },
    { id: 4, vezeteknev: "Kuti", utonev: "Krisztián", mezszam: 14, ertek: 100 },
    { id: 5, vezeteknev: "Diallo", utonev: "Ulysse", mezszam: 9, ertek: 250 }
];

let kovetkezoId = 6;

function tablaRender() {
    const tablaBody = document.getElementById('tabla');
    tablaBody.innerHTML = "";

    adatok.forEach(focista => {
        tablaBody.innerHTML += `
            <tr>
                <td>${focista.id}</td>
                <td>${focista.vezeteknev}</td>
                <td>${focista.utonev}</td>
                <td>${focista.mezszam}</td>
                <td>${focista.ertek} k€</td>
                <td>
                    <button onclick="szerkesztes(${focista.id})" style="background: var(--masodlagosszin); color: black; padding: 5px 10px;">Szerkeszt</button>
                    <button onclick="torles(${focista.id})" style="background: #b62222; color: white; padding: 5px 10px;">Töröl</button>
                </td>
            </tr>
        `;
    });
}

function mentes() {
    const idVal = document.getElementById('editId').value;
    const vnev = document.getElementById('vezeteknev').value;
    const unev = document.getElementById('utonev').value;
    const mez = document.getElementById('mezszam').value;
    const ert = document.getElementById('ertek').value;

    if (!vnev || !unev || !mez || !ert) {
        alert("Minden mezőt ki kell tölteni!");
        return;
    }

    if (idVal === "") {
        
        adatok.push({
            id: kovetkezoId++,
            vezeteknev: vnev,
            utonev: unev,
            mezszam: parseInt(mez),
            ertek: parseInt(ert)
        });
    } else {
        
        const index = adatok.findIndex(a => a.id == idVal);
        adatok[index] = {
            id: parseInt(idVal),
            vezeteknev: vnev,
            utonev: unev,
            mezszam: parseInt(mez),
            ertek: parseInt(ert)
        };
    }

    formReset();
    tablaRender();
}

function szerkesztes(id) {
    const focista = adatok.find(a => a.id == id);
    
    document.getElementById('editId').value = focista.id;
    document.getElementById('vezeteknev').value = focista.vezeteknev;
    document.getElementById('utonev').value = focista.utonev;
    document.getElementById('mezszam').value = focista.mezszam;
    document.getElementById('ertek').value = focista.ertek;

    document.getElementById('formCim').innerText = "Játékos adatainak módosítása";
    document.getElementById('megse').style.display = "inline";
}

function torles(id) {
    if (confirm("Biztosan törölni szeretnéd a listáról?")) {
        adatok = adatok.filter(a => a.id != id);
        tablaRender();
    }
}

function formReset() {
    document.getElementById('editId').value = "";
    document.getElementById('vezeteknev').value = "";
    document.getElementById('utonev').value = "";
    document.getElementById('mezszam').value = "";
    document.getElementById('ertek').value = "";
    document.getElementById('formCim').innerText = "Új játékos hozzáadása";
    document.getElementById('megse').style.display = "none";
}

window.onload = tablaRender;