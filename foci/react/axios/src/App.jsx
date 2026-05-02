import { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost/foci-api/"; 

export default function App() {
  const [jatekosok, setJatekosok] = useState([]);
  const [mezszam, setMezszam] = useState("");
  const [vezeteknev, setVezeteknev] = useState("");
  const [utonev, setUtonev] = useState("");
  const [szulido, setSzulido] = useState("");
  const [ertek, setErtek] = useState("");
  const [szerkesztettID, setSzerkesztettID] = useState(null);

  const betoltJatekosokat = () => {
    axios.get(API + "api.php").then(valasz => setJatekosok(valasz.data));
  };

  useEffect(() => {
    betoltJatekosokat();
  }, []);

  const ujJatekosHozzaadas = () => {
    axios.post(API + "api.php", {
      mezszam,
      vezeteknev,
      utonev,
      szulido,
      ertek
    }).then(() => {
      alaphelyzet();
      betoltJatekosokat();
    });
  };

  const jatekosTorles = (id) => {
    axios.delete(`${API}api.php?id=${id}`).then(() => betoltJatekosokat());
  };

  const jatekosModositas = () => {
    axios.put(`${API}api.php?id=${szerkesztettID}`, {
      mezszam,
      vezeteknev,
      utonev,
      szulido,
      ertek
    }).then(() => {
      alaphelyzet();
      betoltJatekosokat();
    });
  };

  const alaphelyzet = () => {
    setMezszam("");
    setVezeteknev("");
    setUtonev("");
    setSzulido("");
    setErtek("");
    setSzerkesztettID(null);
  };

  const szerkesztesInditasa = (j) => {
    setSzerkesztettID(j.id);
    setMezszam(j.mezszam);
    setVezeteknev(j.vezeteknev);
    setUtonev(j.utonev);
    setSzulido(j.szulido);
    setErtek(j.ertek);
  };

  return (
    <div style={stilus.oldal}>
      <header style={stilus.header}>
        <h1 style={{margin: 0}}>⚽ Stadion Manager – Keret Kezelés</h1>
        <p>Labdarúgó adatbázis CRUD adminisztráció</p>
      </header>

      <div style={stilus.kartya}>
        <h3 style={{marginTop: 0}}>{szerkesztettID ? "Játékos módosítása" : "Új igazolás rögzítése"}</h3>
        <div style={stilus.inputContainer}>
          <input style={stilus.input} type="number" placeholder="Mezszám" value={mezszam} onChange={e => setMezszam(e.target.value)} />
          <input style={stilus.input} placeholder="Vezetéknév" value={vezeteknev} onChange={e => setVezeteknev(e.target.value)} />
          <input style={stilus.input} placeholder="Utónév" value={utonev} onChange={e => setUtonev(e.target.value)} />
          <input style={stilus.input} placeholder="Születés (éééé.hh.nn)" value={szulido} onChange={e => setSzulido(e.target.value)} />
          <input style={stilus.input} type="number" placeholder="Érték (ezer €)" value={ertek} onChange={e => setErtek(e.target.value)} />
          
          <div style={{display: 'flex', gap: '10px'}}>
            {szerkesztettID === null ? (
              <button style={stilus.gombHozzaad} onClick={ujJatekosHozzaadas}>Szerződtetés</button>
            ) : (
              <>
                <button style={stilus.gombModosit} onClick={jatekosModositas}>Frissítés</button>
                <button style={stilus.gombMegse} onClick={alaphelyzet}>Mégse</button>
              </>
            )}
          </div>
        </div>
      </div>

      <div style={stilus.tablaWrapper}>
        <table style={stilus.tabla}>
          <thead>
            <tr style={stilus.fejlecSor}>
              <th style={stilus.th}>Mez</th>
              <th style={stilus.th}>Név</th>
              <th style={stilus.th}>Született</th>
              <th style={stilus.th}>Érték</th>
              <th style={stilus.th}>Műveletek</th>
            </tr>
          </thead>
          <tbody>
            {jatekosok.map(j => (
              <tr key={j.id} style={stilus.sor}>
                <td style={stilus.td}><strong>#{j.mezszam}</strong></td>
                <td style={stilus.td}>{j.vezeteknev} {j.utonev}</td>
                <td style={stilus.td}>{j.szulido}</td>
                <td style={stilus.td}>{j.ertek} 000 €</td>
                <td style={stilus.td}>
                  <button style={stilus.akcioGomb} onClick={() => szerkesztesInditasa(j)}>✏️</button>
                  <button style={stilus.akcioGomb} onClick={() => jatekosTorles(j.id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const stilus = {
  oldal: {
    fontFamily: "'Segoe UI', Roboto, sans-serif",
    backgroundColor: "#1a472a", // Stadion zöld
    minHeight: "100vh",
    padding: "20px",
    color: "#fff"
  },
  header: {
    textAlign: "center",
    marginBottom: "30px",
    textShadow: "2px 2px 4px rgba(0,0,0,0.5)"
  },
  kartya: {
    backgroundColor: "#fff",
    color: "#333",
    padding: "20px",
    borderRadius: "12px",
    maxWidth: "800px",
    margin: "0 auto 30px auto",
    boxShadow: "0 10px 20px rgba(0,0,0,0.3)"
  },
  inputContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px"
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    flex: "1 1 150px"
  },
  gombHozzaad: {
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold"
  },
  gombModosit: {
    backgroundColor: "#ffc107",
    color: "#000",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold"
  },
  gombMegse: {
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    cursor: "pointer"
  },
  tablaWrapper: {
    maxWidth: "1000px",
    margin: "0 auto",
    overflowX: "auto"
  },
  tabla: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.95)",
    color: "#333",
    borderCollapse: "collapse",
    borderRadius: "10px",
    overflow: "hidden"
  },
  fejlecSor: {
    backgroundColor: "#0d2b18",
    color: "#fff"
  },
  th: { padding: "15px", textAlign: "left" },
  td: { padding: "12px", borderBottom: "1px solid #ddd" },
  akcioGomb: {
    background: "none",
    border: "none",
    fontSize: "1.2rem",
    cursor: "pointer",
    marginRight: "10px"
  }
};