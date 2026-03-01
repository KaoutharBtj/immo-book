import React, { useState } from 'react';
import { validateImages } from '../../../utils/validators';
import { Camera } from 'lucide-react';
const getImageUrl = (imagePath) => {
  if (!imagePath) return '/placeholder-project.jpg';
  if (imagePath.startsWith('http')) return imagePath;
  return `http://localhost:3000/${imagePath}`;
};

const ImageUploader = ({ 
  existingImages = [], 
  onImagesChange, 
  onImageDelete,
  maxImages = 10,
  label = "Images"
}) => {
  const [previewImages, setPreviewImages] = useState([]);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    
    console.log('Fichiers sélectionnés:', files.length);
    
    const validation = validateImages(files, maxImages - existingImages.length);
    
    if (!validation.isValid) {
      setError(validation.errors.join(', '));
      return;
    }

    setError('');

    const previews = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
      size: file.size
    }));

    setPreviewImages(prev => [...prev, ...previews]);
    console.log('Aperçus créés:', previews.length);
  };

  const handleRemovePreview = (index) => {
    setPreviewImages(prev => {
      const newPreviews = [...prev];
      URL.revokeObjectURL(newPreviews[index].preview);
      newPreviews.splice(index, 1);
      return newPreviews;
    });
  };

  const handleUpload = async () => {
    if (previewImages.length === 0) {
      console.log('preview images:', previewImages);
      console.log('files to upload:', previewImages.map(p => p.file));
      setError('Aucune image à uploader');
      return;
    }

    try {
      setUploading(true);
      setError('');
      
      const files = previewImages.map(p => p.file);
      
      console.log('Fichiers à uploader:', files.map(f => ({
        name: f.name,
        size: f.size,
        type: f.type
      })));
      
      await onImagesChange(files);
      
      console.log('Upload terminé avec succès');
      
      previewImages.forEach(p => URL.revokeObjectURL(p.preview));
      setPreviewImages([]);
      
    } catch (err) {
      console.error('Erreur dans ImageUploader.handleUpload:', err);
      setError(err.message || 'Erreur lors de l\'upload');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteExisting = (imageUrl) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette image ?')) {
      console.log('Demande suppression:', imageUrl);
      onImageDelete(imageUrl);
    }
  };

  const totalImages = existingImages.length + previewImages.length;
  const canAddMore = totalImages < maxImages;

  return (
    <div className="space-y-4">
      {label && (
        <label className="block text-lg font-semibold text-gray-800">{label}</label>
      )}
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded">
          {error}
        </div>
      )}

      {existingImages.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Images actuelles ({existingImages.length}/{maxImages})
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {existingImages.map((imageUrl, index) => (
              <div key={`existing-${index}`} className="relative group">
                <img 
                  src={getImageUrl(imageUrl)}
                  alt={`Image ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg shadow"
                  onError={(e) => {
                    console.error('Erreur chargement:', imageUrl);
                    e.target.src = '/placeholder-project.jpg';
                  }}
                />
                <button
                  type="button"
                  onClick={() => handleDeleteExisting(imageUrl)}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  title="Supprimer"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {previewImages.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Nouvelles images ({previewImages.length})
          </h4>
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
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  title="Retirer"
                >
                  ✕
                </button>
                
              </div>
            ))}
          </div>
          
          <button
            type="button"
            onClick={handleUpload}
            disabled={uploading}
            className="mt-4 w-full bg-[#1d4370] hover:bg-[#27578F] disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Upload en cours...
              </>
            ) : (
              <>
                Uploader {previewImages.length} image{previewImages.length > 1 ? 's' : ''}
              </>
            )}
          </button>
        </div>
      )}

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
            <Camera size={48} className="text-gray-400 mb-3" />
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
          Limite de {maxImages} images atteinte
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
