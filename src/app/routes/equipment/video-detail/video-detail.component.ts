import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { STColumn, STComponent } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { ModalHelper, _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-equipment-video-detail',
  templateUrl: './video-detail.component.html'
})
export class EquipmentVideoDetailComponent implements OnInit {
  constructor(private http: _HttpClient, private modal: ModalHelper, private activatedRoute: ActivatedRoute, private router: Router) {}
  ngOnInit(): void {}

  back() {
    this.router.navigate(['../..'], { relativeTo: this.activatedRoute });
  }
}
