import { Component } from '@angular/core';

import { BoutiqueService } from '../services/boutique.service';
import { LoadingController, NavController } from '@ionic/angular';
import { Router } from '@angular/router'
import { AlertController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  boutiques : any;
  api : BoutiqueService;
  private showOptions;

  constructor(public restapi: BoutiqueService, 
    public loadingController: LoadingController, 
    public navController : NavController, 
    public router : Router,
    private alertController: AlertController,
    private toastController: ToastController
    ) {
      // Ecoute les événéments de clic sur le bouton physique de retour Android
      document.addEventListener('ionBackButton', () => {
        if (this.showOptions) {
          // Fermeture ou ouverture des options
          // this.showOrHideAddOptions();
          // Récupère le composant maître de la page
          const appContainer = window.document.getElementById("app-root");
          if (appContainer !== null) {
            appContainer.classList.remove("hidden");
          }
        } else {
          // Sinon, on quitte l'application
          navigator['app'].exitApp();
        }
      })

    this.api = restapi;
  }

  async getboutiques() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });

    await loading.present();
    await this.api.getBoutiques()
      .subscribe(res => {
        console.log(res);
        this.boutiques = res.filter((aBoutique) => {
          return this.boutiques;
        });
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });

  }

  async deleteBoutique(id:any){
    await this.api.deleteBoutique(id)
    .subscribe(res => {
        console.log(res);
        this.ngOnInit();
      }, (err) => {
        console.log(err);
      });
  }

  async doneBoutique(id:any){
    await this.api.doneBoutique(id)
    .subscribe(res => {
        console.log(res);
        this.ngOnInit();
      }, (err) => {
        console.log(err);
      });
  }

  done(id: any) {
    console.log("done");
    this.doneBoutique(id);
  }

  delete(id:any) {
    this.deleteBoutique(id);
  }

  ngOnInit() {
    this.getboutiques();
  }

  ionViewWillEnter() {
    this.ngOnInit();
  }

  async createBoutique(data)
  {
    await this.api.createBoutique(data)
    .subscribe(res => {
        this.getboutiques();
      }, (err) => {
        console.log(err);
      });
  }

   async addBoutique() 
   {
    const alert = await this.alertController.create({
      cssClass: 'edit-alert',
      header: 'Nouveau',
      inputs: [
        {
          name: 'nom',
          type: 'text',
          placeholder: 'Nom',
        },
        {
          name: 'departement',
          type: 'number',
          placeholder : '01',
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Action annulée');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            this.createBoutique(JSON.stringify(data));
          }
        }
      ]
    });

    await alert.present();
  }

  async saveBoutique(id, data){
    await this.api.updateBoutique(id, data)
    .subscribe(res => {
        console.log(res);
        this.getboutiques();
      }, (err) => {
        console.log(err);
      });
  }

  async editBoutique(boutique) {
    const alert = await this.alertController.create({
      cssClass: 'edit-alert',
      header: 'Edit',
      inputs: [
        {
          name: 'nom',
          type: 'text',
          placeholder: boutique[0].nom,
        },
        {
          name: 'departement',
          type: 'number',
          placeholder: boutique[0].departement,
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Action annulée');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            this.saveBoutique(boutique[0]._id, JSON.stringify(data));
          }
        }
      ]
    });

    await alert.present();
  }

}
