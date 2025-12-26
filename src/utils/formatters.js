// utils/formatters.js

/**
 * Formate un prix en dirham marocain
 */
export const formatPrice = (price) => {
  if (!price) return '0 DH';
  return new Intl.NumberFormat('fr-MA', {
    style: 'currency',
    currency: 'MAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price).replace('MAD', 'DH');
};

/**
 * Formate une surface en m²
 */
export const formatSurface = (surface) => {
  if (!surface) return '0 m²';
  return `${surface} m²`;
};

/**
 * Formate une date au format français
 */
export const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

/**
 * Formate une date complète avec heure
 */
export const formatDateTime = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Obtient le label d'un statut de projet
 */
export const getStatutLabel = (statut) => {
  const labels = {
    en_cours: 'En cours',
    termine: 'Terminé',
    planifie: 'Planifié',
    suspendu: 'Suspendu',
    non_commence: 'Non commencé',
    en_retard: 'En retard'
  };
  return labels[statut] || statut;
};

/**
 * Obtient la classe CSS d'un statut
 */
export const getStatutClass = (statut) => {
  const classes = {
    en_cours: 'status-active',
    termine: 'status-completed',
    planifie: 'status-planned',
    suspendu: 'status-suspended',
    non_commence: 'status-pending',
    en_retard: 'status-late'
  };
  return classes[statut] || 'status-default';
};

/**
 * Obtient le label d'un type de bien
 */
export const getTypeBienLabel = (type) => {
  const labels = {
    appartement: 'Appartement',
    villa: 'Villa',
    terrain: 'Terrain',
    commerce: 'Commerce',
    bureau: 'Bureau'
  };
  return labels[type] || type;
};

/**
 * Calcule le pourcentage de progression
 */
export const calculateProgress = (current, total) => {
  if (!total || total === 0) return 0;
  return Math.round((current / total) * 100);
};

/**
 * Tronque un texte
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};