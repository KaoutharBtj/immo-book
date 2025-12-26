// components/promoteur/ImageUploader.jsx
import React, { useState } from 'react';
import { validateImages } from '../../utils/validators';

const ImageUploader = ({ 
  existingImages = [], 
  onImagesChange, 
  onImageDelete,
  maxImages = 10,
  label = "Images du projet"
}) => {
  const [previewImages, setPreviewImages] = useState([]);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    
    const validation = validateImages(files, maxImages - existingImages.length);
    
    if (!validation.isValid) {
      setError(validation.errors.join(', '));
      return;
    }

    setError('');

    const previews = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name
    }));

    setPreviewImages(prev => [...prev, ...previews]);
    
    if (onImagesChange) {
      onImagesChange([...previewImages.map(p => p.file), ...files]);
    }
  };

  const handleRemovePreview = (index) => {
    setPreviewImages(prev => {
      const newPreviews = [...prev];
      URL.revokeObjectURL(newPreviews[index].preview);
      newPreviews.splice(index, 1);
      
      if (onImagesChange) {
        onImagesChange(newPreviews.map(p => p.file));
      }
      
      return newPreviews;
    });
  };

  const handleDeleteExisting = (imageUrl) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette image ?')) {
      onImageDelete(imageUrl);
    }
  };

  const totalImages = existingImages.length + previewImages.length;
  const canAddMore = totalImages < maxImages;

  return (
    <div className="space-y-4">
      <label className="block text-lg font-semibold text-gray-800">{label}</label>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded">
          ⚠️ {error}
        </div>
      )}

      {/* Images existantes */}
      {existingImages.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Images actuelles</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {existingImages.map((imageUrl, index) => (
              <div key={`existing-${index}`} className="relative group">
                <img 
                  src={imageUrl} 
                  alt={`Existante ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg shadow"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteExisting(imageUrl)}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Supprimer"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Aperçus des nouvelles images */}
      {previewImages.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Nouvelles images à ajouter</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {previewImages.map((preview, index) => (
              <div key={`preview-${index}`} className="relative group">
                <img 
                  src={preview.preview} 
                  alt={preview.name}
                  className="w-full h-32 object-cover rounded-lg shadow"
                />
                <button
                  type="button"
                  onClick={() => handleRemovePreview(index)}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Retirer"
                >
                  ✕
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b-lg truncate">
                  {preview.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bouton d'upload */}
      {canAddMore && (
        <div className="border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors">
          <input
            type="file"
            id="image-upload"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
          <label 
            htmlFor="image-upload" 
            className="flex flex-col items-center justify-center py-12 cursor-pointer"
          >
            <span className="text-5xl mb-3">📷</span>
            <span className="text-gray-700 font-medium mb-1">
              Cliquez pour ajouter des images
            </span>
            <span className="text-gray-500 text-sm text-center px-4">
              JPG, PNG ou WEBP - Max {maxImages} images
              <br />
              ({totalImages}/{maxImages} images)
            </span>
          </label>
        </div>
      )}

      {!canAddMore && (
        <div className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded">
          ⚠️ Limite de {maxImages} images atteinte
        </div>
      )}
    </div>
  );
};

export default ImageUploader;