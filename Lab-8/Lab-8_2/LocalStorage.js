class TLocalStorage {
  constructor(namespace) {
    this.namespace = namespace || 'app_data';
  }

  setValue(key, value) {
    try {
      const data = this.getAll();
      data[key] = value;
      localStorage.setItem(this.namespace, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error('LocalStorage error:', e);
      return false;
    }
  }

  getValue(key) {
    const data = this.getAll();
    return data[key] || null;
  }

  removeValue(key) {
    const data = this.getAll();
    delete data[key];
    localStorage.setItem(this.namespace, JSON.stringify(data));
  }

  getAll() {
    const data = localStorage.getItem(this.namespace);
    return data ? JSON.parse(data) : {};
  }

  clear() {
    localStorage.removeItem(this.namespace);
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = TLocalStorage;
}