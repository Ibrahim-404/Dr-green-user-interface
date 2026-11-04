import { SharedService } from './../../shared/services/shared.service';
import { PagesService } from './../services/pages.service';
import { Component } from '@angular/core';
import { NgbCarouselConfig, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { LookUpByStatus } from '../interfaces/look-up-by-status';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  images = [1055, 194, 368].map((n) => `https://picsum.photos/id/${n}/900/500`);
  showNavigationArrows = false;
	showNavigationIndicators = true;
  about:LookUpByStatus|null=null
  vision:LookUpByStatus|null=null;
  mission:LookUpByStatus|null=null;
  ourValue:any[]=[];
  basePath:string='https://Drgreen.wabcgroup.com/LookUpsImages/'

  constructor(config: NgbCarouselConfig,private _PagesService:PagesService,public _SharedService:SharedService){

  }
  ngOnInit(): void {
   this.getAboutUs()

  }
  getAboutUs(){
    this._PagesService.getLookUpByStatus(10).subscribe(res=>{
      // console.log('about us',res.data)
      this.about=res.data;
    })
    this.getOurVision()
    this.getOurMission()
    this.getOurValue()
  }
  getOurVision(){
    this._PagesService.getLookUpByStatus(20).subscribe(res=>{
      // console.log( 'vision',res.data)
      this.vision=res.data

    })
  }
  getOurMission(){
    this._PagesService.getLookUpByStatus(30).subscribe(res=>{
      // console.log( 'Mission',res.data)
      this.mission=res.data
    })
  }
  getOurValue(){
    this._PagesService.getOurValue().subscribe(res=>{
      // console.log( 'our value',res.data)
      this.ourValue=res.data



    })
  }

}
