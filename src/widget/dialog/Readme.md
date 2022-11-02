# Dialog套件
使用Angular Material套件`Dialog`進行開發，相關文件詳見：[https://material.angular.io/components/dialog/overview](https://material.angular.io/components/dialog/overview)。

## 模式
* loading模式 (id == '')
    * 全頁覆蓋，避免API處理資料時，重複按下送出鍵。
* 一般互動 (id 請給值)
    * 訊息確認用
    * 刪除確認用
    * 資料傳輸用

## 參數設定
詳見 `dialog.interface.ts`

## 使用方式
1. 引入 `WidgetModule`。
2. 共用觸發涵式：
``` typescript

// con-funs.service.ts

...

openDialog(id: string, dialogDataDef: DialogDataDef, disableClose?: boolean){
    let config: MatDialogConfig = {
      id: id === '' ? 'loading' : id,
      data: dialogDataDef,
      disableClose: disableClose ? disableClose : false
    };

    return this.matDialog.open(DialogComponent, config);
}

...

```
2. 元件：
``` html
<button mat-button (click)="openDialog()">Open dialog</button>

```
3. 主要動作函式撰寫：
``` typescript

    dialogRef_loading!: MatDialogRef<DialogComponent>;
    dialogRef_dialog!: MatDialogRef<DialogComponent>;
    constructor(
        private conFunsService: ConFunsService,
    ) { }

    ngOnInit(): void {

    }

    openDialog(){
        let dataset: DialogDataDef = new DialogDataDef();
        
        // 開啟Loading 
        this.dialogRef_loading = this.conFunsService.openDialog('', dataset);

        // 資料仔入完畢，執行關閉語法如下
        this.dialogRef_loading.close();


        // 開啟一般Dialog
        this.dialogRef_dialog = this.conFunsService.openDialog('123', dataset);
        
        // 訂閱Dialog關閉事件及訂閱資料，以進行下一個動作
        this.dialogRef_dialog.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        });
    }
```