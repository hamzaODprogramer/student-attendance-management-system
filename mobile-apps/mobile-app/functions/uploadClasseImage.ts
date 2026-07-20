import { Platform } from 'react-native';
import { cloud_name, upload_perset  } from '../constants/global';

export default async function uploadClasseImage(imageUri : string){
  try {
    const formData = new FormData();
    const uriParts = imageUri.split('.');
    const fileType = uriParts[uriParts.length - 1];

    formData.append('file', {
      uri: imageUri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });
    formData.append('upload_preset', upload_perset || '');
    formData.append('cloud_name', cloud_name || '');
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    const dataCloud = await response.json();
    return dataCloud.url;
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw new Error('Failed to upload image to Cloudinary.');
  }
};
