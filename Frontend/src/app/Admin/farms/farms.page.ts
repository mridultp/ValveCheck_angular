import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../core/Services/Company/company.service';
import { AlertController, NavController } from '@ionic/angular';
import { FarmService } from '../../core/Services/Farm/farm.service';

@Component({
  selector: 'app-farms',
  templateUrl: './farms.page.html',
  styleUrls: ['./farms.page.scss'],
})
export class FarmsPage implements OnInit {

  companyId: number;
  farmsList: Array<object>;

  constructor(private activatedRoute: ActivatedRoute,
    private companyService: CompanyService, private alertCtlr: AlertController,
    private farmService: FarmService, public navCtrl: NavController) { }

  ngOnInit() {
    this.companyId = +this.activatedRoute.snapshot.paramMap.get('selectedId');
    this.getCompanyFarms();
  }

  getCompanyFarms() {
    try {
      this.companyService.getFarmsForCompany({ id: this.companyId }).subscribe(response => {
        if (response.status === "success") {
          this.farmsList = [];
          this.farmsList = response.data.farms;
        }
      })
    } catch (error) {
      alert('Something went wrong');
    }
  }

  async openFarmDialog(value?, id?) {
    const alert = await this.alertCtlr.create({
      cssClass: 'my-custom-class',
      header: value ? 'Edit Farm' : 'New Farm',
      inputs: [
        {
          name: 'name1',
          type: 'text',
          placeholder: 'Farm Name',
          value: value ? value : ''
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // console.log('Confirm Cancel');
          }
        }, {
          text: value ? 'EDIT' : 'ADD',
          handler: (data) => {
            value ? this.editFarm(data.name1, id) : this.createFarm(data.name1);
          }
        }
      ]
    });
    await alert.present();
  }

  createFarm(name: string) {
    if (name != null && name.length > 0) {
      try {
        this.farmService.createFarm({
          "company": this.companyId,
          "farm_name": name.trim()
        }).subscribe(response => {
          if (response.status === "success") {
            alert('Farm added');
            this.getCompanyFarms();
          }
        })
      } catch (error) {
        alert('Something went wrong');
      }
    }
  }

  editFarm(name, id) {
    if (name != null && name.length > 0) {
      try {
        this.farmService.updateFarm({
          "id": id,
          "company": this.companyId,
          "farm_name": name
        }).subscribe(response => {
          if (response.status === "success") {
            alert('Farm updated');
            this.getCompanyFarms();
          }
        })
      } catch (error) {
        alert('Something went wrong');
      }
    }
  }

  viewBlocks(id) {
    this.navCtrl.navigateForward([`/home/companies/farms/${this.companyId}/blocks/${id}`]);
  }

}