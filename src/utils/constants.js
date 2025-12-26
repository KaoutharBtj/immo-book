// utils/constants.js

export const TYPE_BIEN = {
  APPARTEMENT: 'appartement',
  VILLA: 'villa',
  TERRAIN: 'terrain',
  COMMERCE: 'commerce',
  BUREAU: 'bureau'
};

export const STATUT_PROJET = {
  EN_COURS: 'en_cours',
  TERMINE: 'termine',
  PLANIFIE: 'planifie',
  SUSPENDU: 'suspendu'
};

export const STATUT_PHASE = {
  NON_COMMENCE: 'non_commence',
  EN_COURS: 'en_cours',
  TERMINE: 'termine',
  EN_RETARD: 'en_retard'
};

export const VILLES_MAROC = [
  'Casablanca',
  'Rabat',
  'Marrakech',
  'Fès',
  'Tanger',
  'Agadir',
  'Meknès',
  'Oujda',
  'Kenitra',
  'Tétouan',
  'Safi',
  'Mohammedia',
  'El Jadida',
  'Beni Mellal',
  'Nador'
];

export const API_BASE_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:3000/api/v1';

export const ROLES = {
  PROMOTEUR: 'promoteur',
  CLIENT_PHYSIQUE: 'client_physique',
  CLIENT_ENTREPRISE: 'client_entreprise'
};