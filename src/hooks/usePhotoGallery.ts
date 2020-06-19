import { useState, useEffect } from "react";
import { isPlatform } from '@ionic/react';
import { Plugins, CameraResultType, CameraSource, Capacitor, FilesystemDirectory } from "@capacitor/core";
import { useCamera } from '@ionic/react-hooks/camera';
const { Camera, Filesystem } = Plugins;

export function usePhotoGallery() {

  const [photo, setPhoto] = useState('');
  const { getPhoto } = useCamera();
  //const { deleteFile, getUri, readFile, writeFile } = useFilesystem();
  //const { get, set } = useStorage();

  useEffect(() => {

  }, []);

  const takePhoto = async () => {
    console.log('takePicture');

    const image = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt,
      quality: 100,
      allowEditing: false,
      saveToGallery: false
    });
      const fileName = new Date().getTime() + '.jpeg';
      const savedFileImage = await savePicture(image, fileName); 
      console.log('Filename: ', savedFileImage); 
      setPhoto(savedFileImage);
  };

  const savePicture = async (photo: any, fileName: string): Promise<any> => {
    
    if (isPlatform('hybrid')) {
      // hibrit mode
      const savedFile = await Filesystem.writeFile({
        path: fileName,
        data: photo.base64String,
        directory: FilesystemDirectory.Data // save filesystem directory
      });

      // konvert weburl
      return Capacitor.convertFileSrc(savedFile.uri)

    } else {
      // web mode url      
      return photo.webPath;
    }      

  };

  const deletePhoto = async (photo: Photo) => {

  };

  return {
    deletePhoto,
    photo,
    takePhoto
  };
}

export interface Photo {
  filepath: string;
  webviewPath?: string;
  base64?: string;
}

