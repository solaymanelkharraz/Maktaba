import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  livres: [
    { 
      id: 1, 
      titre: "L'Alchimiste", 
      isbn: "9782290004449", 
      nombre_exemplaires: 5, 
      statut: "disponible" 
    },
    { 
      id: 2, 
      titre: "Le Petit Prince", 
      isbn: "9780156012195", 
      nombre_exemplaires: 2, 
      statut: "disponible" 
    }
  ],
  membres: [
    { id: 1, nom_complet: "Jean Dupont", email: "jean.dupont@example.com", telephone: "0612345678" },
    { id: 2, nom_complet: "Marie Martin", email: "marie.martin@example.com", telephone: "0687654321" },
    { id: 3, nom_complet: "Pierre Leroy", email: "pierre.leroy@example.com", telephone: "0711223344" }
  ],
  emprunts: [
    { 
      id: 1, 
      livre_id: 1, 
      membre_id: 1, 
      date_emprunt: "2026-05-20", 
      date_retour_prevue: "2026-06-03", 
      statut: "en cours" 
    }
  ],
  bookFilter: 'tous', // 'tous', 'disponible', 'indisponible'
  locale: 'fr'
};

const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    addBorrowing: (state, action) => {
      const { livre_id, membre_id, date_emprunt, date_retour_prevue } = action.payload;
      
      // Find the book to update inventory
      const book = state.livres.find(b => b.id === Number(livre_id));
      if (!book || book.nombre_exemplaires <= 0) {
        return; // Book not available
      }

      // Generate a new ID for the borrowing
      const nextId = state.emprunts.length > 0 ? Math.max(...state.emprunts.map(e => e.id)) + 1 : 1;

      // Add borrowing
      state.emprunts.push({
        id: nextId,
        livre_id: Number(livre_id),
        membre_id: Number(membre_id),
        date_emprunt,
        date_retour_prevue,
        statut: "en cours"
      });

      // Decrement copies
      book.nombre_exemplaires -= 1;
      if (book.nombre_exemplaires === 0) {
        book.statut = "indisponible";
      }
    },
    setBookFilter: (state, action) => {
      state.bookFilter = action.payload;
    },
    setLocale: (state, action) => {
      state.locale = action.payload;
    }
  }
});

export const { addBorrowing, setBookFilter, setLocale } = librarySlice.actions;
export default librarySlice.reducer;
