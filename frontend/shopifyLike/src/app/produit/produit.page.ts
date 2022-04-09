import { Component } from '@angular/core';

import { ProduitService } from '../services/produit.service';
import { CategorieService } from '../services/categorie.service';
import { LoadingController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router'
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-produit',
  templateUrl: './produit.page.html',
  styleUrls: ['./produit.page.scss'],
})
export class ProduitPage {

  categorie : any;
  produits : any;
  api : ProduitService;
  categorieApi: CategorieService;
  private showOptions;

  constructor(public restapi: ProduitService, 
    public categorieapi: CategorieService,
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
    this.categorieApi = categorieapi;
  }

  async getCategorie(idCategorie) {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });

    await loading.present();
    await this.categorieApi.getCategorie(idCategorie)
      .subscribe(res => {
        this.categorie = res;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }


  async getProduits() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });

    await loading.present();
    await this.api.getProduits()
      .subscribe(res => {
        console.log(res);
        this.produits = res.filter(prod => this.categorie.produits.includes(prod._id));
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });

  }

  async deleteProduit(id:any){
    await this.api.deleteProduit(id)
    .subscribe(res => {
        console.log(res);
        this.ngOnInit();
      }, (err) => {
        console.log(err);
      });
  }

  async doneProduit(id:any){
    await this.api.doneProduit(id)
    .subscribe(res => {
        console.log(res);
        this.ngOnInit();
      }, (err) => {
        console.log(err);
      });
  }

  done(id: any) {
    console.log("done");
    this.doneProduit(id);
  }

  delete(id:any) {
    this.deleteProduit(id);
  }

  ngOnInit() {
    this.categorie = this.getCategorie(this.route.snapshot.paramMap.get('id_categorie'));
    this.getProduits();
  }

  ionViewWillEnter() {
    this.ngOnInit();
  }

  async createProduit(data)
  {
    await this.api.createProduit(data, this.categorie._id)
    .subscribe(res => {
      this.getCategorie(this.categorie._id)
        this.getProduits();
      }, (err) => {
        console.log(err);
      });
  }

   async addProduit() 
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
          name: 'prix',
          type: 'number',
          placeholder : '10.00',
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
            this.createProduit(JSON.stringify(data));
          }
        }
      ]
    });

    await alert.present();
  }

  async saveProduit(id, data){
    await this.api.updateProduit(id, data)
    .subscribe(res => {
        console.log(res);
        this.getProduits();
      }, (err) => {
        console.log(err);
      });
  }

  async editProduit(produit) {
    const alert = await this.alertController.create({
      cssClass: 'edit-alert',
      header: 'Edit',
      inputs: [
        {
          name: 'nom',
          type: 'text',
          placeholder: produit[0].nom,
        },
        {
          name: 'prix',
          type: 'number',
          placeholder: produit[0].prix,
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
            this.saveProduit(produit[0]._id, JSON.stringify(data));
          }
        }
      ]
    });

    await alert.present();
  }

}
