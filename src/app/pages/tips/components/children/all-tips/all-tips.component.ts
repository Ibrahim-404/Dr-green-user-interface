import { TipsService } from './../../../services/tips.service';
import { Component } from '@angular/core';
import { AllTips } from '../../../interfaces/all-tips';
import { SharedService } from '../../../../../shared/services/shared.service';

@Component({
  selector: 'app-all-tips',
  templateUrl: './all-tips.component.html',
  styleUrl: './all-tips.component.scss'
})
export class AllTipsComponent {
  constructor(public _TipsService:TipsService,public _SharedService:SharedService) {

  }

}
