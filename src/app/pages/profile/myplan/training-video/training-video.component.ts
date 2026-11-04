import { MyplanService } from './../../../../shared/services/myplan.service';
import { PagesService } from './../../../services/pages.service';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import {
  BaseTrainingVideos,
  BaseTrainingVideosModel,
  RecommendedPlanTrainingVideo,
  RecommendedPlanTrainingVideoModel,
} from '../../../interfaces/recommended-meals';
import { environment } from '../../../../../environments/environment.development';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-training-video',
  templateUrl: './training-video.component.html',
  styleUrl: './training-video.component.scss',
})
export class TrainingVideoComponent implements AfterViewInit {
  @Input() trainingVideo: RecommendedPlanTrainingVideo = new RecommendedPlanTrainingVideoModel();
  @Input()planId:number=0

  baseUrl: string = environment.baseURL;
  allVideos: any[] = [];
  selectedVideo: RecommendedPlanTrainingVideo = new RecommendedPlanTrainingVideoModel();
  relativeVideos: BaseTrainingVideos = new BaseTrainingVideosModel();

  @ViewChild('videoPlayer') videoPlayer!: ElementRef;

  constructor(
    private _PagesService: PagesService,
    private modalService: NgbModal,
    private cdr: ChangeDetectorRef,
    private _MyplanService: MyplanService
  ) {

  }

  ngAfterViewInit(): void {

    this.selectedVideo = this.trainingVideo;
    this.updateVideoPlayer();
    this._PagesService.getTrainingVideo(this.planId, null).subscribe({
      next: (res) => {
          this.relativeVideos = res.data;
        }
      });

    }
    onMetadataLoaded(){

      this.videoPlayer.nativeElement.pause(); // Pause video on load
  }
  toggleSelect(item: RecommendedPlanTrainingVideo) {
    this.selectedVideo = item;
    this.updateVideoPlayer();
    console.log(this.selectedVideo);
  }

  updateVideoPlayer() {
    if (this.videoPlayer && this.videoPlayer.nativeElement) {
      const videoElement = this.videoPlayer.nativeElement;
      videoElement.pause();
      videoElement.src = `${this.baseUrl}TrainingProgramVideos/${this.selectedVideo.videoUrl}`;
      videoElement.load();
      videoElement.play();
    }
  }

  logTrainingVideo() {
    const date = new Date();
    const obj = {
      planTrainingVideoId: this.selectedVideo.trainingVideoId,
      isWatched: true,
      date: date,
    };
    this._PagesService.logTrainingVideo(obj).subscribe({
      next: (res) => {
        console.log(res);
        this.modalService.dismissAll();
        this._MyplanService.getTrainingVideo();
      }
    });
  }








}
