import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { ApiService } from 'src/app/modules/app/services/api.service';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { Global } from '../../app/services/global.service';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  // tableType;
  allChecked = false;
  indeterminate = false;
  displayData: any;

  // fileList: NzUploadFile[] = [
  //   {
  //     uid: '-1',
  //     name: 'xxx.png',
  //     status: 'done',
  //     url: 'http://www.baidu.com/xxx.png'
  //   }
  // ];
  @Input() imgSize: any;
  @Input() uploadType: any;
  @Output() editFuncOut = new EventEmitter();
  @Output() fileListOut = new EventEmitter();

  formData: any;
  previewVisible = false;
  previewImage: any;
  @Input() fileList: any;
  upUrl: any;
  fileSize: any;
  constructor(private apiService: ApiService, private msg: NzMessageService, private global: Global, private cdr: ChangeDetectorRef) {
    this.fileList = [];
    this.imgSize = this.imgSize ? this.imgSize : 1;
    this.uploadType = this.uploadType ? this.uploadType : 'img';
    this.fileSize = 1;
    this.upUrl = Global.getApiHost().api;
  }

  removeImg = (file: any) => {
    // console.log(file);
    const index = this.fileList.findIndex((item: any) => item === file.uid);
    this.fileList.splice(index, 1);
    this.getFileList();
    return true;
  };

  getFileList() {
    this.fileListOut.emit(this.fileList);
  }
  editFun(item: any, index = null) {
    item.btnIndex = index;
    this.editFuncOut.emit(item);
  }

  getData() {}

  customReq = (item: NzUploadFile) => {
    this.formData = new FormData();
    this.formData.append('file', item, item.name);
    this.upFile(this.formData);
    // return false;
  };

  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]) =>
    new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      this.formData = new FormData();
      this.formData.append('file', file, file.name);
      this.upFile(this.formData);
    });

  upFile(formData: NzUploadFile) {
    this.apiService.uploadFile(formData).then(response => {
      if (response && response.success) {
        console.log(response);
        if (this.imgSize == 1) {
          this.fileList = [
            {
              uid: 3,
              name: 3,
              status: 'done',
              url: response.data
            }
          ];
        } else {
          let arr = this.fileList;
          arr.push({
            uid: String(this.fileList.length + 1),
            name: String(this.fileList.length + 1),
            status: 'done',
            url: response.data
          });
          this.fileList = [...arr];
        }

        this.getFileList();
      } else {
        this.msg.error('上传失败');
      }
    });
  }

  handlePreview = (file: NzUploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  };

  handleChange(info: NzUploadChangeParam): void {
    let fileList = [...info.fileList];
    fileList = fileList.map(file => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.data;
        file.linkProps = {
          download: file.response.data
        };
      }
      return file;
    });
    console.log(fileList);
    this.fileList = fileList;
    this.getFileList();
  }

  downFun = (item: any) => {
    console.log(item);
    console.log('down');
  };
}
