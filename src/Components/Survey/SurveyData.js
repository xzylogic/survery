/**
 *
 * BasicInformation数据（基本信息）
 */

export const hospitalLevel = [
  // {label: '请选择一个选项', value: '请选择一个选项'},
  {label: '二级甲等', value: '二级甲等'},
  {label: '二级乙等', value: '二级乙等'},
  {label: '三级甲等', value: '三级甲等'},
  {label: '三级乙等', value: '三级乙等'},
];

export const mechanNature = [
  // {label: '请选择一个选项', value: '请选择一个选项'},
  {label: '公立机构', value: '公立机构'},
  {label: '社会办机构', value: '社会办机构'},
];

export const hospitalNature = [
  // {label: '请选择一个选项', value: '请选择一个选项'},
  {label: '综合性', value: '综合性'},
  {label: '专科', value: '专科'},
];

export const hospitalType = [
  // {label: '请选择一个选项', value: '请选择一个选项'},
  {label: '中医', value: '中医'},
  {label: '民营', value: '民营'},
  {label: '儿童', value: '儿童'},
  {label: '部队', value: '部队'},
  {label: '其他', value: '其他'},
];

export const area = [
  // {label: '请选择一个选项', value: '请选择一个选项'},
  {label: '黄埔', value: '黄埔'},
  {label: '卢湾', value: '卢湾'},
  {label: '徐汇', value: '徐汇'},
  {label: '静安', value: '静安'},
  {label: '长宁', value: '长宁'},
  {label: '虹口', value: '虹口'},
  {label: '闸北', value: '闸北'},
  {label: '普陀', value: '普陀'},
  {label: '杨浦', value: '杨浦'},
  {label: '闵行', value: '闵行'},
  {label: '宝山', value: '宝山'},
  {label: '金山', value: '金山'},
  {label: '南汇', value: '南汇'},
  {label: '浦东', value: '浦东'},
  {label: '松江', value: '松江'},
  {label: '嘉定', value: '嘉定'},
  {label: '青浦', value: '青浦'},
  {label: '奉贤', value: '奉贤'},
  {label: '崇明', value: '崇明'},
];

/**
 *
 * HeartBasicCondition、HeartPipeHardwareCondition数据（心脏科基本情况、心导管室硬件情况）
 */

export const ifHeartSurgery = [
  {label: '无', value: '无'},
  {label: '有', value: '有'},
];

export const ifThoracotomy = [
  {label: '可开展紧急开胸手术', value: '可开展紧急开胸手术'},
  {label: '从未开展过', value: '从未开展过'},
];

export const pipeDepartment = [
  {label: '心脏科', value: '心脏科'},
  {label: '放射科', value: '放射科'},
  {label: '独立部门', value: '独立部门'},
  {label: '其他科室', value: '其他科室'},
];

export const pipeLocation = [
  {label: '和普通病房同一层楼', value: '和普通病房同一层楼'},
  {label: '和CCU同一层楼', value: '和CCU同一层楼'},
  {label: '和病房同楼不同层', value: '和病房同楼不同层'},
  {label: '和病房不同楼，但有快速通道', value: '和病房不同楼，但有快速通道'},
  {label: '和病房不同楼，需要户外转运病人', value: '和病房不同楼，需要户外转运病人'},
];

/**
 *
 * otherEquipNumber数据(其他设备数量数据)
 */

export const otherEquipNumber = [
  // {label: 'IABP（单位：台）', value: '0'},
  // {label: 'IVUS（单位：台）', value: '1'},
  // {label: 'OCT（单位：台）', value: '2'},
  // {label: 'FFR（单位：台）', value: '3'},
  // {label: '电生理记录仪（单位：台）', value: '4'},
  // {label: '旋磨仪（单位：台）', value: '5'},
  // {label: '呼吸机（单位：台）', value: '6'},
  // {label: '射频消融仪（单位：台）', value: '7'},
  // {label: '冷冻消融仪（单位：台）', value: '8'},
  // {label: 'Carto系统(单位：套）', value: '9'},
  // {label: 'Ensite系统(单位：套）', value: '10'},
  // {label: '电生理刺激仪（单位：台）', value: '11'},
  // {label: '起搏器分析仪（单位：台）', value: '12'},
  // {label: '麻醉机（单位：台）', value: '13'},
  {label: 'IABP（单位：台）', value: 'iabp'},
  {label: 'IVUS（单位：台）', value: 'ivus'},
  {label: 'OCT（单位：台）', value: 'oct'},
  {label: 'FFR（单位：台）', value: 'ffr'},
  {label: '电生理记录仪（单位：台）', value: 'elr'},
  {label: '旋磨仪（单位：台）', value: 'rgi'},
  {label: '呼吸机（单位：台）', value: 'bm'},
  {label: '射频消融仪（单位：台）', value: 'kyky'},
  {label: '冷冻消融仪（单位：台）', value: 'ci'},
  {label: 'Carto系统(单位：套）', value: 'carto'},
  {label: 'Ensite系统(单位：套）', value: 'ensite'},
  {label: '电生理刺激仪（单位：台）', value: 'els'},
  {label: '起搏器分析仪（单位：台）', value: 'pa'},
  {label: '麻醉机（单位：台）', value: 'am'},
];

// {label: 'IABP（单位：台）', value: 'IABP（单位：台）'},
// {label: 'IVUS（单位：台）', value: 'IVUS（单位：台）'},
// {label: 'OCT（单位：台）', value: 'OCT（单位：台）'},
// {label: 'FFR（单位：台）', value: 'FFR（单位：台）'},
// {label: '电生理记录仪（单位：台）', value: '电生理记录仪（单位：台）'},
// {label: '旋磨仪（单位：台）', value: '旋磨仪（单位：台）'},
// {label: '呼吸机（单位：台）', value: '呼吸机（单位：台）'},
// {label: '射频消融仪（单位：台）', value: '射频消融仪（单位：台）'},
// {label: '冷冻消融仪（单位：台）', value: '冷冻消融仪（单位：台）'},
// {label: 'Carto系统(单位：套）', value: 'Carto系统(单位：套）'},
// {label: 'Ensite系统(单位：套）', value: 'Ensite系统(单位：套）'},
// {label: '电生理刺激仪（单位：台）', value: '电生理刺激仪（单位：台）'},
// {label: '起搏器分析仪（单位：台）', value: '起搏器分析仪（单位：台）'},
// {label: '麻醉机（单位：台）', value: '麻醉机（单位：台）'},

export const pipeLevel = [
  {label: '无', value: '无'},
  {label: '有', value: '有'},
];

export const level = [
  {label: '百级', value: '百级'},
  {label: '千级', value: '千级'},
  {label: '万级', value: '万级'},
];

export const groupSurgeryDoctorsOperationScope = [
  {label: '心血管内科/内科', value: '心血管内科/内科'},
  {label: '心外科', value: '心外科'},
  {label: '中医科', value: '中医科'},
  {label: '其他学科', value: '其他学科'},
];

/**
 *
 * WordLoad2017数据(2017工作量)
 */

export const pciOperation = [
  {label: '未开展', value: '未开展'},
  {label: '已开展', value: '已开展'},
];

export const operaCheckWay = [
  {label: '纸质版', value: '纸质版'},
  {label: '电脑版', value: '电脑版'},
];

export const pcCheckWay = [
  {label: '医院构建下的系统', value: '医院构建下的系统'},
  {label: '专业开发的系统', value: '专业开发的系统'},
  {label: 'excel数据库', value: 'excel数据库'},
];

export const imageManage = [
  {label: '放射科管理', value: '放射科管理'},
  {label: '导管室管理', value: '导管室管理'},
  {label: '医院统一管理', value: '医院统一管理'},
];

export const medium = [
  {label: '光盘', value: '光盘'},
  {label: '独立服务器（云存储）', value: '独立服务器（云存储）'},
  {label: 'PACS', value: 'PACS'},
  {label: '其他', value: '其他'},
];

export const satisfied = [
  {label: '可以满足', value: '可以满足'},
  {label: '不能满足', value: '不能满足'},
];

export const lack = [
  {label: '手术医师', value: '手术医师'},
  {label: '专科护士', value: '专科护士'},
  {label: '放射技师', value: '放射技师'},
  {label: '工勤人员', value: '工勤人员'},
];

export const overtime = [
  {label: '经常（＞3次/周）', value: '经常（＞3次/周）'},
  {label: '偶尔（＜2次/周）', value: '偶尔（＜2次/周）'},
  {label: '几乎不加班', value: '几乎不加班'},
];

export const ca = [
  {label: '无', value: '无'},
  {label: '是', value: '是'},
];

export const pci = [
  {label: '无', value: '无'},
  {label: '是', value: '是'},
];