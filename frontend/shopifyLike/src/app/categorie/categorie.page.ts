import { Component } from '@angular/core';

import { CategorieService } from '../services/categorie.service';
import { BoutiqueService } from '../services/boutique.service';
import { LoadingController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router'
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.page.html',
  styleUrls: ['./categorie.page.scss'],
})
export class CategoriePage {

  boutique : any;
  categories : any;
  api : CategorieService;
  boutiqueApi : BoutiqueService
  private showOptions;

  constructor(public restapi: CategorieService, 
    public boutiqueapi : BoutiqueService,
    public loadingController: LoadingController, 
    public navController : NavController, 
    private route : ActivatedRoute,
    public router : Router,
    private alertController: AlertController
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
    this.boutiqueApi = boutiqueapi;
  }

  async getBoutique(idBoutique) {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });

    await loading.present();
    await this.boutiqueApi.getBoutique(idBoutique)
      .subscribe(res => {
        this.boutique = res;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }

  async getcategories() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });

    await loading.present();
    await this.api.getCategories()
      .subscribe(res => {        
        this.categories = res.filter(cat => this.boutique.categories.includes(cat._id));
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });

  }

  async deleteCategorie(id:any){
    await this.api.deleteCategorie(id)
    .subscribe(res => {
        console.log(res);
        this.ngOnInit();
      }, (err) => {
        console.log(err);
      });
  }

  async doneCategorie(id:any){
    await this.api.doneCategorie(id)
    .subscribe(res => {
        console.log(res);
        this.ngOnInit();
      }, (err) => {
        console.log(err);
      });
  }

  done(id: any) {
    console.log("done");
    this.doneCategorie(id);
  }

  delete(id:any) {
    this.deleteCategorie(id);
  }

  ngOnInit() {
    this.boutique = this.getBoutique(this.route.snapshot.paramMap.get('id'));
    this.getcategories();
  }

  ionViewWillEnter() {
    this.ngOnInit();
  }

  async createCategorie(data)
  {
    await this.api.createCategorie(data, this.boutique._id)
    .subscribe(res => {
      this.getBoutique(this.boutique._id)
        this.getcategories();
      }, (err) => {
        console.log(err);
      });
  }

   async addCategorie() 
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
          name: 'description',
          type: 'text',
          placeholder : 'Description',
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
            this.createCategorie(JSON.stringify(data));
          }
        }
      ]
    });

    await alert.present();
  }

  async saveCategorie(id, data){
    await this.api.updateCategorie(id, data)
    .subscribe(res => {
        console.log(res);
        this.getcategories();
      }, (err) => {
        console.log(err);
      });
  }

  async editCategorie(categorie) {
    const alert = await this.alertController.create({
      cssClass: 'edit-alert',
      header: 'Edit',
      inputs: [
        {
          name: 'nom',
          type: 'text',
          placeholder: categorie[0].nom,
        },
        {
          name: 'description',
          type: 'text',
          placeholder: categorie[0].description,
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
            this.saveCategorie(categorie[0]._id, JSON.stringify(data));
          }
        }
      ]
    });

    await alert.present();
  }

}
