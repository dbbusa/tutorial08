import {Component, OnInit} from '@angular/core';
import {IVideo} from '../models/videos';
import {AuthService} from '../auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  constructor(private _authService: AuthService) {
  }

  dataRes: IVideo[];
  video = {
    _id: '',
    title: '',
    desc: '',
    posted_by: '',
    cat: '',
    likes: '',
    url: '',
  };
  addVideo = {
    cat: [],
    title: '',
    desc : '',
    posted_by : '',
    url : '',
    likes: null,
  };
  p = 1;
  title = '';

  videos: any;
  isAdd = false;
  key = '_id';
  reverse = false;

  ngOnInit(): void {
    this.showData();
  }
  showData(): void {
    this._authService.getVideo().subscribe(res => {
      this.videos = res;
      this.videos.forEach((element) => {
        element.isEdit = false;
      });
    });
  }
  // tslint:disable-next-line:typedef
  edit = (video: { isEdit: boolean; }) => {
    video.isEdit = true;
  }

  cancel = (video: { isEdit: boolean; }) => {
    video.isEdit = false;
  }

  addrec(): void {
    this.isAdd = true;
  }

  cancelAdd(): void {
    this.isAdd = false;
  }

  // tslint:disable-next-line:typedef
  postVideo(video: any) {
    this._authService.postVideo(video).subscribe(res => {
      this.isAdd = false;
      this.showData();
    });
  }

  // tslint:disable-next-line:typedef
  update = (video: any) => {
    this._authService.updateVideo(video).subscribe(res => {
      video.isEdit = false;
      this.showData();
    });
  }

  // tslint:disable-next-line:typedef
  delete(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this record!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your record has been deleted.',
          'success'
        );
        this._authService.deleteVideo(id).subscribe(res => {
          this.showData();
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your record is safe :)',
          'error'
        );
      }
    });
  }

  searchTitle = () => {
    // tslint:disable-next-line:triple-equals
    if (this.title != '') {
      this.videos = this.videos.filter((res: { title: string; }) => {
        return res.title.toLocaleLowerCase().match(this.title);
      });
    } else {
      this.ngOnInit();
    }
  }

  // tslint:disable-next-line:typedef
  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }
}
