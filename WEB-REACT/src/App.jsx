import { useState } from 'react'
import './App.css'


function App() {
  // 1. Az NB1 adatbázis 
  const [csapatok, setCsapatok] = useState([]);

  // 2. Input mezők állapota az új csapathoz
  const [ujNev, setUjNev] = useState("");
  const [ujVaros, setUjVaros] = useState("");

  // CREATE: Új csapat hozzáadása
  const hozzaadas = () => {
    if (ujNev === "" || ujVaros === "") return;
    const ujCsapat = {
      id: Date.now(),
      nev: ujNev,
      varos: ujVaros,
      alapitva: 2024
    };
    setCsapatok([...csapatok, ujCsapat]);
    setUjNev(""); // Mezők ürítése
    setUjVaros("");
  };

  // DELETE: Csapat törlése
  const torles = (id) => {
    setCsapatok(csapatok.filter(csapat => csapat.id !== id));
  };

  return (
    <div className="container">
      {/* 1. Fejléc */}
      <header>
          <h1>WEB PROGRAMOZÁS-1 ELŐADÁS HÁZI FELADAT</h1>
      </header>

      {/* 2. Menü avigáció  */}
      <nav>
          <a href="C:/Users/marti/Downloads/WEB/index.html">FŐOLDAL</a>
          <a href="../../javascript.html">JAVASCRIPT CRUD</a>
          <a href="#" className="active">REACT CRUD</a>
          <a href="../../spa.html">SPA MENÜ</a>
          <a href="../../fetchapi.html">FETCH API</a>
          <a href="axios.html">Axios Menü</a>
          <a href="oojs.html">OOJS Menü</a>
      </nav>

      <main>
      

        {/* 3. CRUD  */}
        <div className="feature-card" style={{width: '90%', margin: '20px auto'}}>
          <h3>Új csapat felvétele</h3>
          <div style={{display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px'}}>
            <input 
              className="input-field"
              placeholder="Csapat neve" 
              value={ujNev} 
              onChange={(e) => setUjNev(e.target.value)} 
            />
            <input 
              className="input-field"
              placeholder="Város" 
              value={ujVaros} 
              onChange={(e) => setUjVaros(e.target.value)} 
            />
            <button className="nav-button" onClick={hozzaadas}>Hozzáadás</button>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>Név</th>
                <th>Város</th>
                <th>Alapítva</th>
                <th>Műveletek</th>
              </tr>
            </thead>
            <tbody>
              {csapatok.map(csapat => (
                <tr key={csapat.id}>
                  <td>{csapat.nev}</td>
                  <td>{csapat.varos}</td>
                  <td>{csapat.alapitva}</td>
                  <td>
                    <button className="delete-btn" onClick={() => torles(csapat.id)}>Törlés</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <footer>
          <p>Készítők: Fülöp Martin EMD87F, Elek Dániel XZN3PZ</p>
      </footer>
    </div>
  )
}

export default App