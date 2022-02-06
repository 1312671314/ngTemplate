import { Injectable } from '@angular/core';
import { Global } from './global.service';
import { HttpHandler } from './httpHandler.service';

@Injectable()
export class ApiService {
  constructor(private httpHandler: HttpHandler, private global: Global) {}

  // 未绑定网关列表
  getUnbindGateway(data: any): Promise<any> {
    return this.httpHandler.post(
      Global.getApiHost().api + 'deviceInfo/searchUnbind?page=' + data.page + '&size=' + data.size,
      data,
      this.global.getHeader()
    );
  }

  // 添加视频设备
  createDeviceInfo(data: any): Promise<any> {
    return this.httpHandler.post(Global.getApiHost().api + 'deviceInfo/createCamera', data, this.global.getHeader());
  }

  // 网关查询单位
  findById(id: any): Promise<any> {
    return this.httpHandler.get(Global.getApiHost().api + 'gatewayInfo/findById/' + id, this.global.getHeader());
  }

  // 全部设备类型
  findAllDeviceType(): Promise<any> {
    return this.httpHandler.get(Global.getApiHost().api + 'deviceInfo/findAllDeviceType', this.global.getHeader());
  }

  // 企业类型
  orgTypeFindAll() {
    return this.httpHandler.get(Global.getApiHost().api + 'orgType/findAll', this.global.getHeader());
  }
  // 物业类型
  orgAttributeFindAll() {
    return this.httpHandler.get(Global.getApiHost().api + 'orgAttribute/findAll', this.global.getHeader());
  }
  // 行业归属
  industryTypeFindAll() {
    return this.httpHandler.get(Global.getApiHost().api + 'industryType/findAll', this.global.getHeader());
  }
  // 建筑类型
  orgBuildTypeFindAll() {
    return this.httpHandler.get(Global.getApiHost().api + 'orgBuildType/findAll', this.global.getHeader());
  }
  // 建筑材料
  orgBuildMaterialFindAll() {
    return this.httpHandler.get(Global.getApiHost().api + 'orgBuildMaterial/findAll', this.global.getHeader());
  }
  // 设备状态
  getDeviceStatus(id: any): Promise<any> {
    return this.httpHandler.get(Global.getApiHost().api + 'deviceInfo/getStatus/' + id, this.global.getHeader());
  }

  // 更新设备信息
  deviceUpdate(data: any): Promise<any> {
    return this.httpHandler.post(Global.getApiHost().api + 'deviceInfo/update', data, this.global.getHeader());
  }

  // id查询设备
  deviceFindById(id: any): Promise<any> {
    return this.httpHandler.get(Global.getApiHost().api + 'deviceInfo/findById/' + id, this.global.getHeader());
  }

  // 查询网关下的点位
  findByGatewayId(id: any): Promise<any> {
    return this.httpHandler.get(Global.getApiHost().api + 'deviceInfo/findByGatewayId/' + id, this.global.getHeader());
  }

  // 单位详情
  findOrgById(id: any): Promise<any> {
    return this.httpHandler.get(Global.getApiHost().api + 'orgInfo/findById/' + id, this.global.getHeader());
  }
  // 添加建筑信息
  addOrgBuild(data: any): Promise<any> {
    return this.httpHandler.post(Global.getApiHost().api + 'orgBuildInfo/create', data, this.global.getHeader());
  }

  // 编辑建筑信息
  updateOrgBuild(data: any): Promise<any> {
    return this.httpHandler.post(Global.getApiHost().api + 'orgBuildInfo/update', data, this.global.getHeader());
  }
  // 单位建筑信息
  orgBuildInfo(id: any): Promise<any> {
    return this.httpHandler.get(Global.getApiHost().api + 'orgBuildInfo/findByOrgId/' + id, this.global.getHeader());
  }
  // 关闭声光 stopLightAndVoice
  stopLightAndVoice(id: any): Promise<any> {
    return this.httpHandler.get(Global.getApiHost().api + 'deviceInfo/stopLightAndVoice/' + id, this.global.getHeader());
  }

  // 启动声光 stopLightAndVoice
  startLightAndVoice(id: any): Promise<any> {
    return this.httpHandler.get(Global.getApiHost().api + 'deviceInfo/startLightAndVoice/' + id, this.global.getHeader());
  }

  // 绑定历史
  getbindHistory(data: any): Promise<any> {
    return this.httpHandler.get(Global.getApiHost().api + 'gatewayInfo/findAllBindLog', this.global.getHeader());
  }
  // 单位列表
  getOrgList(data: any): Promise<any> {
    return this.httpHandler.post(
      Global.getApiHost().api + 'orgInfo/search?page=' + data.page + '&size=' + data.size,
      data,
      this.global.getHeader()
    );
  }
  // 单位添加
  addOrg(data: any): Promise<any> {
    return this.httpHandler.post(Global.getApiHost().api + 'orgInfo/create', data, this.global.getHeader());
  }

  // 单位编辑
  updateOrg(data: any): Promise<any> {
    return this.httpHandler.post(Global.getApiHost().api + 'orgInfo/update', data, this.global.getHeader());
  }

  // 单位删除
  deleteOrg(id: any): Promise<any> {
    return this.httpHandler.post(Global.getApiHost().api + 'orgInfo/delete/' + id, this.global.getHeader());
  }

  // 运营中心列表
  getOperationList(): Promise<any> {
    return this.httpHandler.get(Global.getApiHost().api + 'operateInfo/findAll', this.global.getHeader());
  }
  // 运营中心
  getOperationById(id: number): Promise<any> {
    return this.httpHandler.get(Global.getApiHost().api + 'operateInfo/findById/' + id, this.global.getHeader());
  }

  // 运营中心添加
  addOperation(data: any): Promise<any> {
    return this.httpHandler.post(Global.getApiHost().api + 'operateInfo/create', data, this.global.getHeader());
  }
  // 运营中心编辑
  updateOperation(data: any): Promise<any> {
    return this.httpHandler.post(Global.getApiHost().api + 'operateInfo/update', data, this.global.getHeader());
  }
  // 运营中心删除
  deleteOperation(id: number): Promise<any> {
    return this.httpHandler.post(Global.getApiHost().api + 'operateInfo/remove/' + id, this.global.getHeader());
  }

  // 网关单位绑定
  bindGateway(data: any) {
    return this.httpHandler.post(Global.getApiHost().api + 'deviceInfo/bind', data, this.global.getHeader());
  }

  // 获取点位
  getDevice(data: any) {
    return this.httpHandler.post(
      Global.getApiHost().api + 'deviceInfo/searchBindedDTO?page=' + data.page + '&size=' + data.size,
      this.searchDataAddId(data),
      this.global.getHeader()
    );
  }

  //警情实时报警
  getWireless(data: any) {
    return this.httpHandler.post(
      Global.getApiHost().api + 'fireAlarm/search?page=' + data.page + '&size=' + data.size,
      this.searchDataAddId(data),
      this.global.getHeader()
    );
  }

  //警情确认
  bacthCheck(data: any) {
    return this.httpHandler.post(Global.getApiHost().api + 'situation/batchCheck', data, this.global.getHeader());
  }

  // 隔离
  batchIsolate(data: any) {
    return this.httpHandler.post(Global.getApiHost().api + 'situation/batchIsolate', data, this.global.getHeader());
  }

  // 解除隔离
  batchIsolateCancel(data: any) {
    return this.httpHandler.post(Global.getApiHost().api + 'situation/batchIsolateCancel', data, this.global.getHeader());
  }
  // 风险源单位列表
  getOrgRiskSource(id: any): Promise<any> {
    return this.httpHandler.get(Global.getApiHost().api + 'orgRiskSource/findByOrgId/' + id, this.global.getHeader());
  }

  //添加风险源
  createRiskSource(data: any) {
    return this.httpHandler.post(Global.getApiHost().api + 'orgRiskSource/create', data, this.global.getHeader());
  }
  // 编辑风险源
  updateRiskSource(data: any) {
    return this.httpHandler.post(Global.getApiHost().api + 'orgRiskSource/update', data, this.global.getHeader());
  }
  // 风险源列表
  getRiskSourceAll(): Promise<any> {
    return this.httpHandler.get(Global.getApiHost().api + 'riskSource/findAll', this.global.getHeader());
  }

  // 单位账号列表
  getAccountList(data: any): Promise<any> {
    return this.httpHandler.post(
      Global.getApiHost().api + 'account/searchDTO?page=' + data.page + '&size=' + data.size,
      this.searchDataAddId(data),
      this.global.getHeader()
    );
  }
  // 单位账号列表
  getAccountList2(data: any): Promise<any> {
    return this.httpHandler.post(
      Global.getApiHost().api + 'account/searchDTO?page=' + data.page + '&size=' + data.size,
      data,
      this.global.getHeader()
    );
  }
  getAccountList3 (data: any): Promise<any> {
    return this.httpHandler.post(
      Global.getApiHost().api + 'account/searchDTOList?page=' + data.page + '&size=' + data.size,
      data,
      this.global.getHeader()
    );
  }

  // 创建账号
  createAccount(data: any): Promise<any> {
    return this.httpHandler.post(Global.getApiHost().api + 'account/create', data, this.global.getHeader());
  }
  accountUpdate(data: any): Promise<any> {
    return this.httpHandler.post(Global.getApiHost().api + 'account/update', data, this.global.getHeader());
  }

  // 角色查询
  charactarSearch(): Promise<any> {
    return this.httpHandler.post(Global.getApiHost().api + 'charactar/searchList', this.global.getHeader());
  }

  // 公司联系人
  orgContactInfo(data: any): Promise<any> {
    return this.httpHandler.post(
      Global.getApiHost().api + 'contactInfo/searchDTOList?page=' + data.page + '&size=' + data.size,
      data,
      this.global.getHeader()
    );
  }

  // 查询规则
  searchLevel(data = {}): Promise<any> {
    return this.httpHandler.post(Global.getApiHost().api + 'notifyRule/searchLevel', data, this.global.getHeader());
  }

  //创建规则
  createLevel(data = {}): Promise<any> {
    return this.httpHandler.post(Global.getApiHost().api + 'notifyRule/createLevel', data, this.global.getHeader());
  }

  orgContactInfoCreate(data: any): Promise<any> {
    return this.httpHandler.post(Global.getApiHost().api + 'contactInfo/create', data, this.global.getHeader());
  }
  orgContactInfoUpdate(data: any): Promise<any> {
    return this.httpHandler.post(Global.getApiHost().api + 'contactInfo/update', data, this.global.getHeader());
  }
  orgContactInfoDelete(data: any): Promise<any> {
    return this.httpHandler.post(Global.getApiHost().api + 'contactInfo/delete', data, this.global.getHeader());
  }
  // 告警
  searchFireAlarm(data: any): Promise<any> {
    return this.httpHandler.post(
      Global.getApiHost().api + 'situation/searchFireAlarmDTO?page=' + data.page + '&size=' + data.size,
      this.searchDataAddId(data),
      this.global.getHeader()
    );
  }
  // 预警
  searchFireWarn(data: any): Promise<any> {
    return this.httpHandler.post(
      Global.getApiHost().api + 'situation/searchFireWarnDTO?page=' + data.page + '&size=' + data.size,
      this.searchDataAddId(data),
      this.global.getHeader()
    );
  }
  // 故障
  searchDeviceFault(data: any): Promise<any> {
    return this.httpHandler.post(
      Global.getApiHost().api + 'situation/searchDeviceFaultDTO?page=' + data.page + '&size=' + data.size,
      this.searchDataAddId(data),
      this.global.getHeader()
    );
  }
  // 事件
  searchDeviceEvent(data: any): Promise<any> {
    return this.httpHandler.post(
      Global.getApiHost().api + 'situation/searchDeviceEventDTO?page=' + data.page + '&size=' + data.size,
      this.searchDataAddId(data),
      this.global.getHeader()
    );
  }
  // 报受操作日志接口
  processLogSearch(data: any): Promise<any> {
    return this.httpHandler.post(
      Global.getApiHost().api + 'processLog/search?page=' + data.page + '&size=' + data.size,
      this.searchDataAddId(data),
      this.global.getHeader()
    );
  }

  //推送设置规则集
  notifyRuleSearchList(data: any) {
    return this.httpHandler.post(Global.getApiHost().api + 'orgInfo/searchForNotifyRule', data, this.global.getHeader());
  }
  // 所有设备字典
  equipmentInfoFindAll() {
    return this.httpHandler.get(Global.getApiHost().api + 'equipmentInfo/findAll', this.global.getHeader());
  }
  // 编辑设备字典
  equipmentInfoUpdate(data: any) {
    return this.httpHandler.post(Global.getApiHost().api + 'equipmentInfo/update', data, this.global.getHeader());
  }
  // 创建设备字典
  equipmentInfoCreate(data: any) {
    return this.httpHandler.post(Global.getApiHost().api + 'equipmentInfo/create', data, this.global.getHeader());
  }
  // 所有设备字典
  riskSourceFindAll() {
    return this.httpHandler.get(Global.getApiHost().api + 'riskSource/findAll', this.global.getHeader());
  }
  // 编辑设备字典
  riskSourceUpdate(data: any) {
    return this.httpHandler.post(Global.getApiHost().api + 'riskSource/update', data, this.global.getHeader());
  }
  // 创建设备字典
  riskSourceCreate(data: any) {
    return this.httpHandler.post(Global.getApiHost().api + 'riskSource/create', data, this.global.getHeader());
  }
  // 根据事件查询日志
  processLogSearchList(data: any) {
    return this.httpHandler.post(Global.getApiHost().api + 'processLog/searchList', data, this.global.getHeader());
  }

  // 站内信
  informSearch(data: any) {
    return this.httpHandler.post(
      Global.getApiHost().api + 'inform/search?page=' + data.page + '&size=' + data.size,
      this.searchDataAddId(data),
      this.global.getHeader()
    );
  }
  // 站内信已读
  informMarkRead(data: any) {
    return this.httpHandler.post(Global.getApiHost().api + 'inform/markRead', data, this.global.getHeader());
  }
  // 站内信未读
  countMarkRead(data: any) {
    return this.httpHandler.post(Global.getApiHost().api + 'inform/countMarkRead', data, this.global.getHeader());
  }
  // 添加规则集
  createNotifyRuleSet(data: any) {
    return this.httpHandler.post(Global.getApiHost().api + 'notifyRule/createNotifyRuleSet', data, this.global.getHeader());
  }
  updateLevel(data: any) {
    return this.httpHandler.post(Global.getApiHost().api + 'notifyRule/updateLevel', data, this.global.getHeader());
  }

  updateSet(data: any) {
    return this.httpHandler.post(Global.getApiHost().api + 'notifyRule/updateSet', data, this.global.getHeader());
  }
  // 清楚通知规则缓存
  clearNotifyRule() {
    return this.httpHandler.get(Global.getApiHost().task + 'notify/clearNotifyRule', this.global.getHeader());
  }

  // 查询规则集
  notifyRuleSearchSetList(data: any) {
    return this.httpHandler.post(Global.getApiHost().api + 'notifyRule/searchSetList', data, this.global.getHeader());
  }

  // 合同列表
  contractInfoSearch(data: any) {
    return this.httpHandler.post(Global.getApiHost().api + 'contractInfo/searchDTO', data, this.global.getHeader());
  }

  // 合同编辑
  contractInfoUpdate(data: any) {
    return this.httpHandler.post(Global.getApiHost().api + 'contractInfo/update', data, this.global.getHeader());
  }

  // 根据摄像头id查询点位
  findDTOListByCameraId(id: any) {
    return this.httpHandler.get(Global.getApiHost().api + 'deviceInfo/findDTOListByCameraId?cameraId=' + id, this.global.getHeader());
  }

  // 查询设备补充信息 根据设备id
  getByDeviceId(id: any) {
    return this.httpHandler.get(Global.getApiHost().api + 'deviceAdditional/getByDeviceId?deviceId=' + id, this.global.getHeader());
  }

  // 修改设备补充信息
  deviceAdditional(data: any) {
    return this.httpHandler.post(Global.getApiHost().api + 'deviceAdditional/update', data, this.global.getHeader());
  }

  contractInfoByid(id: any) {
    return this.httpHandler.get(Global.getApiHost().api + 'contractInfo/findDTOById/' + id, this.global.getHeader());
  }
  // 关联设备
  findRelative(id: any) {
    return this.httpHandler.get(Global.getApiHost().api + 'deviceInfo/findRelative/' + id, this.global.getHeader());
  }

  yinshiyunGetToken() {
    return this.httpHandler.get(Global.getApiHost().api + 'yingshiyun/getToken', this.global.getHeader());
  }

  // 单位设备设施
  getOrgEquipmentInfo(id: any) {
    return this.httpHandler.get(Global.getApiHost().api + 'orgEquipmentInfo/findByOrgId/' + id, this.global.getHeader());
  }

  // 手动操作
  sendMessageByHand(channel: any, messageId: any, eventId: any) {
    return this.httpHandler.get(
      Global.getApiHost().task + 'notify/sendMessageByHand?channel=' + channel + '&messageId=' + messageId + '&eventId=' + eventId,
      this.global.getHeader()
    );
  }

  //添加公司设备设施
  createEquipment(data: any) {
    return this.httpHandler.post(Global.getApiHost().api + 'orgEquipmentInfo/create', data, this.global.getHeader());
  }
  // 编辑单位设备设施
  updateEquipment(data: any) {
    return this.httpHandler.post(Global.getApiHost().api + 'orgEquipmentInfo/update', data, this.global.getHeader());
  }

  // 删除单位设备设施
  deleteEquipment(id: any) {
    return this.httpHandler.delete(Global.getApiHost().api + 'orgEquipmentInfo/remove/' + id, this.global.getHeader());
  }

  // 添加合同
  contractInfoCreate(data: any) {
    return this.httpHandler.post(Global.getApiHost().api + 'contractInfo/create', data, this.global.getHeader());
  }

  login(loginInfo: any): Promise<any> {
    return this.httpHandler.post(Global.getApiHost().api + 'account/login', loginInfo, this.global.getHeader());
  }

  filterData(obj: any) {
    for (let key in obj) {
      if (((!obj[key] && obj[key] !== 0) || obj[key] == -1 || obj[key] == '-1') && obj[key] !== false && obj[key] !== 'false') {
        delete obj[key];
      }
    }
    return obj;
  }

  uploadFile(data: any): Promise<any> {
    return this.httpHandler.post(Global.getApiHost().api + 'fileUpload/uploadByFormData', data, this.global.getHeader());
  }

  // 首页统计 当前告警预警 故障和 设备数量
  currentNumForHome(data: any): Promise<any> {
    return this.httpHandler.post(
      Global.getApiHost().api + 'statistics/currentNumForHome',
      this.searchDataAddId(data),
      this.global.getHeader()
    );
  }

  //  首页统计 警情趋势（按月）
  eventCurveForHome(data: any): Promise<any> {
    return this.httpHandler.post(
      Global.getApiHost().api + 'statistics/eventCurveForHome',
      this.searchDataAddId(data),
      this.global.getHeader()
    );
  }

  // 后台首页统计 当前事件数量和设备数量等
  webCurrentNumForHome(data: any): Promise<any> {
    return this.httpHandler.post(
      Global.getApiHost().api + 'statistics/webCurrentNumForHome',
      this.searchDataAddId(data),
      this.global.getHeader()
    );
  }

  // 后台首页警情趋势（按天）
  webEventCurveForHome(data: any): Promise<any> {
    return this.httpHandler.post(
      Global.getApiHost().api + 'statistics/webEventCurveForHome',
      this.searchDataAddId(data),
      this.global.getHeader()
    );
  }

  // 早期处置次数
  datevEventCheckResult(data = {}): Promise<any> {
    return this.httpHandler.post(
      Global.getApiHost().api + 'statistics/datevEventCheckResult',
      this.searchDataAddId(data),
      this.global.getHeader()
    );
  }

  // 后台首页 故障趋势（按天）
  webEventFaultCurveForHome(data: any): Promise<any> {
    return this.httpHandler.post(
      Global.getApiHost().api + 'statistics/webEventFaultCurveForHome',
      this.searchDataAddId(data),
      this.global.getHeader()
    );
  }
  // 后台首页 设备在线离线数
  webDeviceOnlineCurveForHome(data: any): Promise<any> {
    return this.httpHandler.post(
      Global.getApiHost().api + 'statistics/webDeviceOnlineCurveForHome',
      this.searchDataAddId(data),
      this.global.getHeader()
    );
  }

  webSmsAndPhoneCurveForHome(data: any): Promise<any> {
    return this.httpHandler.post(
      Global.getApiHost().api + 'statistics/webSmsAndPhoneCurveForHome',
      this.searchDataAddId(data),
      this.global.getHeader()
    );
  }
  // 救援力量
  rescuePointAdd(data: any): Promise<any> {
    return this.httpHandler.post(Global.getApiHost().api + 'rescuePoint/create', data, this.global.getHeader());
  }
  rescuePointGetList(data: any): Promise<any> {
    return this.httpHandler.post(
      Global.getApiHost().api + 'rescuePoint/search?page=' + data.page + '&size=' + data.size,
      data,
      this.global.getHeader()
    );
  }
  rescuePointUpdate(data: any): Promise<any> {
    return this.httpHandler.post(Global.getApiHost().api + 'rescuePoint/update', data, this.global.getHeader());
  }
  rescuePointDelete(data: any): Promise<any> {
    return this.httpHandler.post(Global.getApiHost().api + 'rescuePoint/delete', data, this.global.getHeader());
  }
  // 社区，接到查询
  provinceCityDistrict(id: any): Promise<any> {
    return this.httpHandler.get(Global.getApiHost().api + 'provinceCityDistrict/searchCascade?pid=' + id, this.global.getHeader());
  }
  // dataV建筑物间数
  datevRoomsNum(data = {}): Promise<any> {
    return this.httpHandler.post(Global.getApiHost().api + 'statistics/datevRoomsNum', this.searchDataAddId(data), this.global.getHeader());
  }
  // 探测器总数
  datevDeviceNum(data = {}): Promise<any> {
    return this.httpHandler.post(
      Global.getApiHost().api + 'statistics/datevDeviceNum',
      this.searchDataAddId(data),
      this.global.getHeader()
    );
  }
  // 总预警条数
  datevAlarmAndWarnNum(data = {}): Promise<any> {
    return this.httpHandler.post(Global.getApiHost().api + 'statistics/datevAlarmAndWarnNum', data, this.global.getHeader());
  }
  // 安全态势图
  datevEventCurveForHome(data = {}): Promise<any> {
    return this.httpHandler.post(Global.getApiHost().api + 'statistics/datevEventCurveForHome', data, this.global.getHeader());
  }
  // 火情高发业态
  datevEventGroupByIndustryCategory(data = {}): Promise<any> {
    return this.httpHandler.post(
      Global.getApiHost().api + 'statistics/datevEventGroupByIndustryCategory',
      this.searchDataAddId(data),
      this.global.getHeader()
    );
  }
  // 火情时间段分布
  datevEventGroupByHour(data = {}): Promise<any> {
    return this.httpHandler.post(Global.getApiHost().api + 'statistics/datevEventGroupByHoursAndType', data, this.global.getHeader());
  }

  // 获取天气
  getWeather(): Promise<any> {
    // return this.httpHandler.get('http://wthrcdn.etouch.cn/weather_mini?city=%E6%9D%AD%E5%B7%9E');
    return this.httpHandler.get('https://restapi.amap.com/v3/weather/weatherInfo?city=330100&key=f654b9eee4b2256ca910b46c300b389b');
  }

  // 救援力量图
  getResucerCharts(data = {}): Promise<any> {
    return this.httpHandler.post(
      Global.getApiHost().api + 'statistics/datevRescuePointGroupByStreetAndType',
      data,
      this.global.getHeader()
    );
  }

  searchDataAddId(data: any) {
    if (this.global.getUserInfo()) {
      switch (this.global.getUserInfo().category) {
        case 'ORG':
          data.orgId = this.global.getUserInfo().orgId;
          break;
        case 'OP':
          data.operateId = this.global.getUserInfo().operateId;
          break;
      }
      return data;
    } else {
      return data;
    }
  }

  
}
