// utils/validators.js

/**
 * Valide les données d'un projet
 */
export const validateProject = (data) => {
  const errors = {};

  if (!data.titre || data.titre.trim() === '') {
    errors.titre = 'Le titre est requis';
  }

  if (!data.description || data.description.trim() === '') {
    errors.description = 'La description est requise';
  }

  if (!data.typeBien) {
    errors.typeBien = 'Le type de bien est requis';
  }

  if (!data.prix || data.prix <= 0) {
    errors.prix = 'Le prix doit être supérieur à 0';
  }

  if (!data.localisation?.ville || data.localisation.ville.trim() === '') {
    errors.ville = 'La ville est requise';
  }

  if (!data.localisation?.adresse || data.localisation.adresse.trim() === '') {
    errors.adresse = "L'adresse est requise";
  }

  if (!data.caracteristiques?.surfaceTotale || data.caracteristiques.surfaceTotale <= 0) {
    errors.surfaceTotale = 'La surface totale doit être supérieure à 0';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Valide les données d'une phase
 */
export const validatePhase = (data) => {
  const errors = {};

  if (!data.titre || data.titre.trim() === '') {
    errors.titre = 'Le titre de la phase est requis';
  }

  if (!data.description || data.description.trim() === '') {
    errors.description = 'La description de la phase est requise';
  }

  if (!data.dateDebut) {
    errors.dateDebut = 'La date de début est requise';
  }

  if (!data.dateFin) {
    errors.dateFin = 'La date de fin est requise';
  }

  if (data.dateDebut && data.dateFin) {
    if (new Date(data.dateDebut) > new Date(data.dateFin)) {
      errors.dateFin = 'La date de fin doit être après la date de début';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Valide un fichier image
 */
export const validateImage = (file) => {
  const errors = [];
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  if (!file) {
    errors.push('Aucun fichier sélectionné');
    return { isValid: false, errors };
  }

  if (!allowedTypes.includes(file.type)) {
    errors.push('Type de fichier non autorisé. Utilisez JPG, PNG ou WEBP');
  }

  if (file.size > maxSize) {
    errors.push('La taille du fichier ne doit pas dépasser 5MB');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Valide plusieurs images
 */
export const validateImages = (files, maxCount = 10) => {
  const errors = [];

  if (!files || files.length === 0) {
    errors.push('Aucun fichier sélectionné');
    return { isValid: false, errors };
  }

  if (files.length > maxCount) {
    errors.push(`Vous ne pouvez pas uploader plus de ${maxCount} images`);
  }

  files.forEach((file, index) => {
    const validation = validateImage(file);
    if (!validation.isValid) {
      errors.push(`Image ${index + 1}: ${validation.errors.join(', ')}`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors
  };
};