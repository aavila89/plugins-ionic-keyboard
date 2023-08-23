import { Component, OnInit, inject } from '@angular/core';
import { Keyboard, KeyboardStyle  } from '@capacitor/keyboard';
import { IonToast, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  activeStyle: any = KeyboardStyle.Light;
  toastController = inject(ToastController);
  constructor() {
  }

  ngOnInit(): void {
    Keyboard.addListener('keyboardWillShow', async (info) => {
      console.log('keyboard will show with height:', info.keyboardHeight);
      await this.presentToast('Keyboard Will Show ','top');
    });

    Keyboard.addListener('keyboardWillHide', async () => {
      await this.presentToast('Keyboard Will Hide ','top');
    });
  }

  async showKeyboard() {
    await this.presentToastEvents('Tab Show Keyboard button.', 'top');
    const toast = await this.toastController.getTop();
    toast?.onDidDismiss().then( async () => {
        await Keyboard.show();
    });
  }
  async hideKeyboard() {
    await this.presentToastEvents('Tab Hide Keyboard button.', 'top');
    const toast = await this.toastController.getTop();
    toast?.onDidDismiss().then( async () => {
        await Keyboard.hide();
    });
  }

  async setStyle() {
    await this.presentToastEvents('Tab Set Style Keyboard button.', 'top');
    if (this.activeStyle === KeyboardStyle.Dark) {
      this.activeStyle = KeyboardStyle.Light;
    } else {
      this.activeStyle = KeyboardStyle.Dark;
    }
    Keyboard.setStyle({style: this.activeStyle});
  }

  async presentToast(message: string, position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      color: 'success',
      message,
      duration: 1800,
      position
    });

    await toast.present();
  }

  async presentToastEvents(message: string, position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      color: 'medium',
      message,
      duration: 1500,
      position
    });

    await toast.present();
  }
}
