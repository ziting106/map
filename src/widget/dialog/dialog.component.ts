import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SafeHtml } from '@angular/platform-browser';
import { decode } from 'html-entities';
import { ApiActionMode, ApiPath } from 'src/util/con-type.interface';
import { DialogDataDef } from './dialog.interface';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  dialogId: string = '';
  rawHtml!: SafeHtml;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogDataDef
  ) {}

  ngOnInit(): void {
    this.dialogId = this.dialogRef.id;

    if (this.dialogData.msg == 'ckeditor') {
      this.rawHtml = decode(decode(this.dialogData.model.WTB_Content));
    }

    // this.setFileData(<string>this.dialogData.sys, this.dialogRef.id);
  }

  // setFileData(sys: string, objectId: string) {
  //   this.fileData = {
  //     sys: sys,
  //     objectId: objectId,
  //     groupCode: '',
  //     onlyRead: true,
  //     apiUrl: ApiPath.File,
  //     apiAction: ApiActionMode.List,
  //     // # 是否全自動處理
  //     isAutoHandle: true,
  //   };
  // }
}
