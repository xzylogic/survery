/**
 *
 * BasicInformation数据（基本信息）
 */

export const hospitalGrade = [
  // {label: '请选择一个选项', value: '请选择一个选项'},
  {label: '二级甲等', value: '0'},
  {label: '二级乙等', value: '1'},
  {label: '三级甲等', value: '2'},
  {label: '三级乙等', value: '3'},
];

export const hospitalOrganizationKind = [
  // {label: '请选择一个选项', value: '请选择一个选项'},
  {label: '公立机构', value: '0'},
  {label: '社会办公机构', value: '1'},
];

export const hospitalKind = [
  // {label: '请选择一个选项', value: '请选择一个选项'},
  {label: '综合性', value: '0'},
  {label: '专科', value: '1'},
];

export const hospitalKindBelong = [
  // {label: '请选择一个选项', value: '请选择一个选项'},
  {label: '中医', value: '0'},
  {label: '民营', value: '1'},
  {label: '儿童', value: '2'},
  {label: '部队', value: '3'},
];

export const hospitalOldArea = [
  // {label: '请选择一个选项', value: '请选择一个选项'},
  {label: '黄埔', value: '0'},
  {label: '卢湾', value: '1'},
  {label: '徐汇', value: '2'},
  {label: '静安', value: '3'},
  {label: '长宁', value: '4'},
  {label: '虹口', value: '5'},
  {label: '闸北', value: '6'},
  {label: '普陀', value: '7'},
  {label: '杨浦', value: '8'},
  {label: '闵行', value: '9'},
  {label: '宝山', value: '10'},
  {label: '金山', value: '11'},
  {label: '南汇', value: '12'},
  {label: '浦东', value: '13'},
  {label: '松江', value: '14'},
  {label: '嘉定', value: '15'},
  {label: '青浦', value: '16'},
  {label: '奉贤', value: '17'},
  {label: '崇明', value: '18'},
];

/**
 *
 * HeartBasicCondition、HeartPipeHardwareCondition数据（心脏科基本情况、心导管室硬件情况）
 */

export const ifHeartSurgery = [
  {label: '无', value: '0'},
  {label: '有', value: '1'},
];

export const ifThoracotomy = [
  {label: '可开展紧急开胸手术', value: '0'},
  {label: '从未开展过', value: '1'},
];

export const pipeBelongDepartment = [
  {label: '心脏科', value: '0'},
  {label: '放射科', value: '1'},
  {label: '独立部门', value: '2'},
  {label: '其他科室', value: '3'},
];

export const pipeHospitalLocation = [
  {label: '和普通病房同一层楼', value: '0'},
  {label: '和CCU同一层楼', value: '1'},
  {label: '和病房同楼不同层', value: '2'},
  {label: '和病房不同楼，但有快速通道', value: '3'},
  {label: '和病房不同楼，需要户外转运病人', value: '4'},
];

/**
 *
 * otherEquipNumber数据(其他设备数量数据)
 */

export const otherEquipNumber = [
  {label: 'IABP（单位：台）', value: '0'},
  {label: 'IVUS（单位：台）', value: '1'},
  {label: 'OCT（单位：台）', value: '2'},
  {label: 'FFR（单位：台）', value: '3'},
  {label: '电生理记录仪（单位：台）', value: '4'},
  {label: '旋磨仪（单位：台）', value: '5'},
  {label: '呼吸机（单位：台）', value: '6'},
  {label: '射频消融仪（单位：台）', value: '7'},
  {label: '冷冻消融仪（单位：台）', value: '8'},
  {label: 'Carto系统(单位：套）', value: '9'},
  {label: 'Ensite系统(单位：套）', value: '10'},
  {label: '电生理刺激仪（单位：台）', value: '11'},
  {label: '起搏器分析仪（单位：台）', value: '12'},
  {label: '麻醉机（单位：台）', value: '13'},
];

export const pipeFlowLevel = [
  {label: '无', value: '0'},
  {label: '有', value: '1'},
];

export const flowLevel = [
  {label: '百级', value: '0'},
  {label: '千级', value: '1'},
  {label: '万级', value: '2'},
];

export const groupSurgeryDoctorsOperationScope = [
  {label: '心血管内科/内科', value: '0'},
  {label: '心外科', value: '1'},
  {label: '中医科', value: '2'},
  {label: '其他学科', value: '3'},
];

/**
 *
 * WordLoad2017数据(2017工作量)
 */

export const pciOperation = [
  {label: '未开展', value: '0'},
  {label: '已开展', value: '1'},
];

export const operaCheckWay = [
  {label: '纸质版', value: '0'},
  {label: '电脑版', value: '1'},
];

export const pipeNumberWork = [
  {label: '可以满足', value: '0'},
  {label: '不能满足', value: '1'},
];

export const pipePersonShortage = [
  {label: '手术医师', value: '0'},
  {label: '专科护士', value: '1'},
  {label: '放射技师', value: '2'},
  {label: '工勤人员', value: '3'},
];

export const pipeOverTime = [
  {label: '经常（＞3次/周）', value: '0'},
  {label: '偶尔（＜2次/周）', value: '1'},
  {label: '几乎不加班', value: '2'},
];

export const CHDCheckOtherOffice = [
  {label: '无', value: '0'},
  {label: '是', value: '1'},
];

export const cardiacCheckOtherOffice = [
  {label: '无', value: '0'},
  {label: '是', value: '1'},
];