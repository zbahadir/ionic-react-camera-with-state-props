import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import React from 'react';
import './Home.css';
import { isPlatform } from '@ionic/react';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { Plugins, CameraResultType, CameraSource, FilesystemDirectory, Capacitor  } from '@capacitor/core';
const { Camera, Filesystem } = Plugins;

const INITIAL_STATE = {
  photo: '',
};

export class Home extends React.Component { 
  
  state: any = {};
  // props: any = {};
  
  constructor(props: any) {
      super(props)      
      this.state = { ...INITIAL_STATE };
      defineCustomElements(window);
  }
    
  async takePicture() {

    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      source: CameraSource.Prompt,
      resultType: CameraResultType.Uri,
      saveToGallery: false
    });
      const fileName = new Date().getTime() + '.jpeg';
      const savedFileImage = await this.savePicture(image, fileName); 
      console.log('Filename: ', savedFileImage);      
  }  

  savePicture = async (photo: any, fileName: string): Promise<any> => {
       
    if (isPlatform('hybrid')) {
      // hibrit mode
      const savedFile = await Filesystem.writeFile({
        path: fileName,
        data: photo.base64String,
        directory: FilesystemDirectory.Data // save filesystem directory
      });

      // konvert weburl
      let photourl = Capacitor.convertFileSrc(savedFile.uri)

      // save state  
      this.setState({ photo: photourl });
      return photourl;

    } else {
      // web mode url
      this.setState({ photo: photo.webPath })
    } 
  }  

  render() {
    const { photo } = this.state;
   
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Super Props Example 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
        <IonImg style={{ 'border': '1px solid black', 'minHeight': '100px' }} src={photo} ></IonImg>
          <IonFab color="primary" vertical="bottom" horizontal="center" slot="fixed">
            <IonFabButton color="primary" onClick={() => this.takePicture()}>
              <IonIcon name="add" />
            </IonFabButton>
          </IonFab>
        </IonContent>
      </IonPage>
    );
  };

};

export default Home;
