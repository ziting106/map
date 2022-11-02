import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DialogComponent } from 'src/widget/dialog/dialog.component';
import { DialogDataDef } from 'src/widget/dialog/dialog.interface';
import {
  ApiActionMode,
  ApiPath,
  FwbTableItemAction,
} from './con-type.interface';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class ConFunsService {
  sysName = environment.sysName;

  constructor(
    private datePipe: DatePipe,
    private titleService: Title,
    private snackBar: MatSnackBar,
    private matDialog: MatDialog,
    private httpService: HttpService
  ) {}

  setPageTitle(str: string) {
    this.titleService.setTitle(str + '-' + this.sysName);
  }

  dateToUTC(date: Date, typeOfTime: 'S' | 'E' | '' = '') {
    // 參數typeOfTime預設為空字串，可以不用輸入，值包含S、E、''。

    let getDate = new Date(date);
    let setDate = new Date();
    let str = '';
    if (typeOfTime!.toUpperCase() == 'S') {
      // Start 時間
      str = this.datePipe.transform(getDate, 'yyyy-MM-dd') + ' 00:00:00 UTC';
      setDate = new Date(str);
    } else if (typeOfTime!.toUpperCase() == 'E') {
      // End 時間
      str = this.datePipe.transform(getDate, 'yyyy-MM-dd') + ' 23:59:59 UTC';
      setDate = new Date(str);
    } else {
      setDate = new Date(getDate + 'UTC');
    }

    return setDate.toJSON() == null ? '' : setDate.toJSON();
  }

  openSnackBar(msg: string, successOrNot: boolean, action?: string) {
    let config: MatSnackBarConfig<any> = {
      verticalPosition: 'top',
      panelClass: successOrNot
        ? ['custom-snackbar-success']
        : ['custom-snackbar-warn'],
    };
    if (action == undefined) {
      action = '';
    }
    if (action.length == 0 || action == '') {
      config.duration = 2000;
    }
    this.snackBar.open(msg, action, config);
  }
  openDialog(id: string, dialogDataDef: DialogDataDef, disableClose?: boolean) {
    let config: MatDialogConfig = {
      id: id === '' ? 'loading' + Math.random().toString() : id,
      data: dialogDataDef,
      disableClose: disableClose ? disableClose : id === '' ? true : false,
    };

    return this.matDialog.open(DialogComponent, config);
  }
  convertObjToDics(obj: any) {
    return Object.keys(obj).map((key) => ({
      name: key,
      value: obj[key],
    }));
  }

  arrayGroupBy(list: any, keyGetter: any) {
    const map = new Map();
    list.forEach((item: any) => {
      // console.log(item);
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }

  async itemFunctions(itemNo: string, level: 'F' | 'T' | 'R') {
    try {
      // 專注在成功
      const queryQ = {
        itemNo: itemNo,
      };

      let funcs = await lastValueFrom(
        this.httpService.apiAction(
          ApiPath.EoUserPerm,
          ApiActionMode.ItemFuncs,
          queryQ,
          true
        )
      );
      let funcsArr: FwbTableItemAction[] = [];
      console.log(funcs);

      let arr = funcs.Data.filter((t: { EOFPS_ToolbarLevel_XX: string }) => {
        return t.EOFPS_ToolbarLevel_XX == level;
      });
      if (arr.length > 0) {
        arr.forEach(
          (f: {
            EOFPS_FunctionCode_XX: string;
            EOFPS_FunctionName_XX: string;
            EOFPS_Icon_XX: string;
          }) => {
            if (f.EOFPS_FunctionCode_XX.toLowerCase().includes('delete')) {
              funcsArr.push(
                new FwbTableItemAction(
                  f.EOFPS_FunctionCode_XX,
                  f.EOFPS_FunctionName_XX,
                  f.EOFPS_Icon_XX,
                  'menu-button-warn'
                )
              );
            } else {
              funcsArr.push(
                new FwbTableItemAction(
                  f.EOFPS_FunctionCode_XX,
                  f.EOFPS_FunctionName_XX,
                  f.EOFPS_Icon_XX
                )
              );
            }
          }
        );
      }
      return funcsArr;
    } catch (err) {
      // 專注在錯誤
      // console.log('catch', err);
      return [];
    }
  }
}
