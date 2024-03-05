const utilsStorage = {
  // Fonction pour stocker un élément dans le localStorage
  setLocalStorageItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },

  // Fonction pour récupérer un élément depuis le localStorage
  getLocalStorageItem: (key) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },

  // Fonction pour supprimer un élément du localStorage
  removeLocalStorageItem: (key) => {
    localStorage.removeItem(key);
  }
};

export default utilsStorage;
