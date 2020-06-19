import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonFab, IonFabButton, IonIcon, IonActionSheet } from '@ionic/react';
import { usePhotoGallery, Photo } from '../hooks/usePhotoGallery';
import { trash, close } from 'ionicons/icons';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

const Test: React.FC = () => {

  const { deletePhoto, photo, takePhoto } = usePhotoGallery();
  const [photoToDelete, setPhotoToDelete] = useState<Photo>();
  defineCustomElements(window);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Photo Gallery</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonImg style={{ 'border': '1px solid black', 'minHeight': '100px' }} src={photo} ></IonImg>

        <IonFab color="primary" vertical="bottom" horizontal="center" slot="fixed">
            <IonFabButton color="primary" onClick={() => takePhoto()}>
              <IonIcon name="add" />
            </IonFabButton>
          </IonFab>

        <IonActionSheet
          isOpen={!!photoToDelete}
          buttons={[{
            text: 'Delete',
            role: 'destructive',
            icon: trash,
            handler: () => {
              if (photoToDelete) {
                deletePhoto(photoToDelete);
                setPhotoToDelete(undefined);
              }
            }
          }, {
            text: 'Cancel',
            icon: close,
            role: 'cancel'
          }]}
          onDidDismiss={() => setPhotoToDelete(undefined)}
        />


      </IonContent>
    </IonPage>
  );
};


export default Test;
