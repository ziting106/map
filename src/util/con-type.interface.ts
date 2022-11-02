export interface CodeName {
  name: string;
  value: string | number;
}
// table2.interface移至此處暫放
export class FwbTableItemAction {
  constructor(code: string, name: string, icon?: string, cssclass?: string) {
    this.Code = code;
    this.Name = name;
    this.Icon = icon === undefined ? '' : icon;
    this.CssClass = cssclass === undefined ? '' : cssclass;
  }

  Code: string = '';
  Name: string = '';
  Icon: string = '';
  CssClass: string = '';
  public Disabled(data: any): boolean {
    return false;
  }
  public Hidden(data: any): boolean {
    return false;
  }
}
// --------------------------------
export enum ApiActionMode {
  None = '',
  Auth = 'Auth',
  List = 'List',
  Edit = 'Edit',
  Cancel = 'Cancel',
  Update = 'Update',
  Remove = 'Remove',
  UserMenu = 'UserMenu',
  UpdateByDept = 'UpdateByDept',
  UpdateByUser = 'UpdateByUser',
  UpdateByArray = 'UpdateByArray',
  AddDefault = 'AddDefault',
  Reload = 'Reload',
  RunTask = 'RunTask',
  UpdateWithFuncs = 'UpdateWithFuncs',
  ListWithMFPermSet = 'ListWithMFPermSet',
  RemoveByMenuPermSetId = 'RemoveByMenuPermSetId',
  MenuPermSetWithFuncs = 'MenuPermSetWithFuncs',
  ItemFuncs = 'ItemFuncs',
  Upload = 'Upload',
}

export enum ApiPath {
  None = '',
  Account = 'Account',
  AppCommon = 'AppCommon',
  CodeType = 'CodeType',
  // CF契作管理start
  CfCrop = 'CfCrop',
  CfContract = 'CfContract',
  CfContractLand = 'CfContractLand',
  CfFarmer = 'CfFarmer',
  CfSeedlingField = 'CfSeedlingField',
  CfSeedlingReserve = 'CfSeedlingReserve',
  CfSeedlingSchedule = 'CfSeedlingSchedule',
  CfTrayRecycle = 'CfTrayRecycle',
  CfWorkRecord = 'CfWorkRecord',
  CfFertilizerRecord = 'CfFertilizerRecord', //未使用
  CfPesticideRecord = 'CfPesticideRecord', //未使用
  // 契作管理end
  EoDepartment = 'EoDepartment',
  EoDeptMember = 'EoDeptMember',
  EoEmployee = 'EoEmployee',
  EoEmployeeTitle = 'EoEmployeeTitle',
  EoFunPermSet = 'EoFunPermSet',
  EoMenu = 'EoMenu',
  EoMenuFun = 'EoMenuFun',
  EoMenuPerm = 'EoMenuPerm',
  EoMenuPermSet = 'EoMenuPermSet',
  EoMenuStruct = 'EoMenuStruct',
  EoPermission = 'EoPermission',
  EoPermissionSetting = 'EoPermissionSetting',
  EoUserEvent = 'EoUserEvent',
  EoUserEventLog = 'EoUserEventLog',
  File = 'File',
  SyCode = 'SyCode',
  SyCodeKind = 'SyCodeKind',
  SyLand = 'SyLand',
  SyDevice = 'SyDevice',
  SyParameter = 'SyParameter',
  SySerialNo = 'SySerialNo',
  WtBulletin = 'WtBulletin',
  WtEventLog = 'WtEventLog',
  WtNews = 'WtNews',
  WtNotifyLog = 'WtNotifyLog',
  WtScheduleDate = 'WtScheduleDate',
  WtScheduleLog = 'WtScheduleLog',
  WtScheduleTask = 'WtScheduleTask',
  MenuPermSetWithFuncs = 'MenuPermSetWithFuncs',
  WtUserSettings = 'WtUserSettings',
  EoUserPerm = 'EoUserPerm',
}

export class ApiResult {
  Data: any = {};
  Success: boolean = false;
  Code: string = '';
  Message: string = '';
  DataTime: string = '';
}

export class FormValue {
  path: ApiPath;
  action: ApiActionMode;
  isParam?: boolean;
  formValue: any;

  constructor(
    options: {
      path?: ApiPath;
      action?: ApiActionMode;
      isParam?: boolean;
      formValue?: any;
    } = {}
  ) {
    this.path = options.path == undefined ? ApiPath.None : options.path;
    this.action =
      options.action == undefined ? ApiActionMode.None : options.action;
    this.isParam = options.isParam == undefined ? false : options.isParam;
    this.formValue = options.formValue == undefined ? {} : options.formValue;
  }
}

export enum CodeTypeName {
  CTN_WTB_Type = 'CTN_WTB_Type',
  CTN_Period = 'CTN_Period',
}
