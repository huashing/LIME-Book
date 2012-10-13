if (typeof(BML) == 'undefined') throw('BML.js not loaded yet');
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
/** browser�������֥������� @name browser @namespace */
var browser = (typeof(browser) != 'undefined') ? browser : {};
BML.Util.extend(browser, (function() {
  /**#@+ @methodOf browser */
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // IPTVFJ STD-0006(Browser�������֥�������)
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** (��������)<br>IP���������ӥ������ܤ��롥** �ܼ����Ǥ��㳰���ꤲ��ư���λ���롥
   *  @name  epgTune
   *  @param {String} serviceRef IP���������ӥ������ͥ�򼨤�ʸ����
   */
  function epgTune(serviceRef) {
    if (typeof(epgTune.caller) != 'function') {
      // called in the global code : don't call onunload event
      BML.Builder.eventHandler['onunload'] = '';
    }
    throw('[!]epgTune called('+serviceRef+'): skip all javascript process');
  }
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** (��������)<br>��³����������Υե��������Ƥ�����Ȥ��Ƽ������롥** �ܼ����Ǥϥǥե�����ͤ��֤���
   *  @name    readPersistentArray
   *  @param   {String} filename  �ե�����̾
   *  @param   {String} structure �����������η�����
   *  @returns {Array}            �ͤ��Ǽ�������󡥼��Ԥ�������null��
   */
  function readPersistentArray(filename, structure) { return([20, false]); } //[ǯ��, ���¾���] 
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** TCP/IP�ץ�ȥ�����Ѥ��ƥƥ����ȥǡ��������������롥
   *  @name    transmitTextDataOverIP
   *  @param   {String} uri       �ǡ���������Ԥ������ӥ�¦��URI
   *  @param   {String} text      ��������ƥ����ȥǡ���
   *  @param   {String} charset   �ǡ�������������Ԥ�ʸ��������
   *  @returns {Array}            ���������
   */
  function transmitTextDataOverIP(url, text, charset) {
    charset = charset || 'EUC-JP';
    var ajax = new BML.Ajax(url,
                            ((text === null) || BML.Util.isUndefined(text)) ?
                            {
                              overrideMimeType : 'text/plane; charset=' + charset,
                              asynchronous     : false,
                              method           : 'GET'
                            } : 
                            {
                              overrideMimeType : 'text/plane; charset=' + charset,
                              asynchronous     : false,
                              method           : 'POST',
                              parameters       : { Denbun : text }
                            });
    var httpStatusCode = ajax.response.statusCode;
    if ((httpStatusCode < 200) || (httpStatusCode >= 300)) {
      if      (httpStatusCode ==  400) return([-1,  httpStatusCode, '']);
      else if (httpStatusCode ==  408) return([-3,  httpStatusCode, '']);
      else if (httpStatusCode !==   0) return([NaN, httpStatusCode, '']);
    }

    return([1, 200, ajax.response.responseText]);
  }
//function setCacheResourceOverIP() {}
//reloadActiveDocument() {}
//getBrowserVersion() {}
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** ���ߡ��󼨤��Ƥ���BML ʸ���URI ���֤���
   *  @name    getActiveDocument
   *  @returns {String}            URI(���Ի�:null)
   */
  function getActiveDocument() {
    var uri = BML.uri;
    return((uri.path || '/') + uri.file +
           ((uri.query    !== '') ? '?'+ uri.query    : '') +
           ((uri.fragment !== '') ? '#'+ uri.fragment : ''));
  }
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** (��������)<br>ɽ���ι�����ػߤ��롥** �ܼ����Ǥϲ���Ԥ�ʤ���
   *  @name    lockScreen */
  function lockScreen()   {}
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** (��������)<br>ɽ���ι����ػߤ������롥** �ܼ����Ǥϲ���Ԥ�ʤ���
   *  @name    unlockScreen */
  function unlockScreen() {}
//function getBrowserSupport() {}
  function launchDocument(url, style) {
    if (url === '') return(NaN);

    var loader = BML.loaderUri;
    url = loader.host+loader.path+loader.file+'?'+BML.Util.combinePath(url, BML.uri);

    location.href=url;
    return(1);
  }
//function quitDocument() {}
//function getResidentAppVersion() {}
//function startResidentApp() {}
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** (��������)<br>��������¢�θ��̲���������롥** �ܼ����Ǥϲ���Ԥ�ʤ���
   *  @name    playRomSound
   *  @param   {String} soundID ̾�����֤ˤ���������¢�����μ��̻�
   */
  function playRomSound(soundID) {}
//function sleep() {}
  function setInterval(func, ms, repeat) {
    // @Todo��Ʊ�����٥���Ԥ����������?
    ms = Math.max(100, Math.floor((ms + 99) / 100) * 100); // �����ͤ�100msñ��
    if (repeat === 0) repeat = -1;
    var timer = window.setInterval(function() {
      eval(func);
      if ((repeat > 0) && (--repeat === 0)) window.clearInterval(timer);
    }, ms);
    return(timer);
  }
  function clearTimer(id) { if (!isNaN(id)) window.clearInterval(id); }
//function pauseTimer() {}
//function resumeTimer() {}
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** �����ȯ�����롥
   *  @name    random
   *  @param   {Number} num ������ϰϻ���
   *  @returns {Number}     1����num�ޤǤδ֤������Ǥ������
   */
  function random(num) { return(1 + Math.floor(Math.random() * num)); }
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** ���ꤷ��Date���֥������Ȥ˻��ꤷ��ñ�̤λ��֤�­������̤���롥
   *  @name    addDate
   *  @param   {Date}   base ���Ȥʤ�Date���֥�������
   *  @param   {Number} time �û��������
   *  @param   {Number} unit time��ñ��(0:ms/1:sec/2:min/3:hour/4:day/5:week)
   *  @returns {Date}        �û�������̤�Date���֥�������(���Ԥ�������base)
   */
  function addDate(base, time, unit) {
    var t = base.getTime();
    if      (unit === 0) t += time;
    else if (unit ==  1) t += time * 1000;
    else if (unit ==  2) t += time * 1000 * 60;
    else if (unit ==  3) t += time * 1000 * 60 * 60;
    else if (unit ==  4) t += time * 1000 * 60 * 60 * 24;
    else if (unit ==  5) t += time * 1000 * 60 * 60 * 24 * 7;
    var ret = new Date; ret.setTime(t);
    return(ret);
  }
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** ���ꤵ�줿��Ĥ�Date���֥������Ȥλ��ֺ�������ñ�̤ǵ��롥
   *  @name    subDate
   *  @param   {Date}   target �������¦��Date ���֥�������
   *  @param   {Date}   base   ����¦��Date ���֥�������
   *  @param   {Number} unit   ��᤿����̤�ñ��(0:ms/1:sec/2:min/3:hour/4:day/5:week)
   *  @returns {Number}        ���ꤷ��ñ�̤Ǥλ��ֺ�(���Ԥ�������NaN)
   */
  function subDate(target, base, unit) {
    var diff = target.getTime() - base.getTime();
    if      (unit == 1) diff = Math.floor(diff /  1000);
    else if (unit == 2) diff = Math.floor(diff / (1000 * 60));
    else if (unit == 3) diff = Math.floor(diff / (1000 * 60 * 60));
    else if (unit == 4) diff = Math.floor(diff / (1000 * 60 * 60 * 24));
    else if (unit == 5) diff = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
    return(diff);
  }
  /** ���ꤷ�����ͤ�3�头�Ȥ�","����������ʸ�������롥
   *  @name    formatNumber
   *  @param   {Number} value ʸ���󲽤������
   *  @returns {String}       ���ͤ�ʸ���󲽤������(���Ԥ�������null)
   */
  function formatNumber(value) {
    value = String(value);
    var len = value.length;
    if (len < 3) return(value);
    
    var odd = len % 3, buf = [];
    if (odd > 0) buf.push(value.substring(0, odd));
    for(var i = odd; i < len; i+=3) {
      buf.push(value.substring(i, i+3));
    }
    return(buf.join(','));
  }
//function getPrinterStatus() {}
//function printFile() {}
//function printTemplate() {}
//function printURI() {}
//function printStaticScreen() {}
//function saveImageToMemoryCard() {}
//function saveHttpServerImageToMemoryCard() {}
//function saveStaticScreenToMemoryCard() {}
//function launchDynamicDocument() {}
//function getMetadataElement() {}
//function getSynopsis() {}
//function searchMetadata() {}
//function searchMetadataOnServer() {}

  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // IPTVFJ STD-0006(IPTV�ɲó�ĥ�ؿ�)
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** (��������)<br>�饤���󥹤�������롥** �ܼ����Ǥϲ���Ԥ鷺���ｪλ���֤���
   *  @name    getIPTVLicense
   *  @param   {String} drmSystem CAS/DRM�����򼨤�ʸ����
   *  @param   {String} id        �����ӥ����ȼ�ID(ip_service_provider_id)
   *  @param   {Array}  licenseId �饤����ID������
   *  @returns {Number}           �¹Դ�λ�����ơ�����
   */
  function getIPTVLicense(drmSystem, id, licenseId) { return(1); }
//function getIPTVLicenseInfo() {}
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** (��������)<br>���ꤷ��DRM�������б�����CAS/DRM���饤����ȼ��̻Ҥ�������롥** �ܼ����Ǥϵ���ʸ������֤���
   *  @name    getDRMID
   *  @param   {String} drmSystem CAS/DRM�����򼨤�ʸ����
   *  @returns {String}           DRMID
   */
  function getDRMID(str)  { return('1234567890abcdef'); }
//function launchIPTVContent() {}
//function launchUnmanagedDocument() {}
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** (��������)<br>ʸ��Υޥ͡������Ⱦ��֤�������롥** �ܼ����Ǥ�managed����(1)���֤���
   *  @name    getDocManagementStat
   *  @returns {Number}           ʸ��Υޥ͡������Ⱦ���(1:managed/0:unmanaged)
   */
  function getDocManagementStat()     { return(1); }
//function marqueeText() {}
//function setIPTVServiceRegistrationInfo() {}
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** (��������)<br>IP������VOD�����ӥ��δ�����Ͽ������ǧ���롥** �ܼ����Ǥϵ���Ū��������֤���
   *  @name    checkIPTVServiceRegistrationInfo
   *  @param   {String} id        �����ӥ����ȼ�ID(ip_service_provider_id)
   *  @returns {Number}           �ǡ������Ƥ��Ǽ��������(key,expire_date,license_uri)
   */
  function checkIPTVServiceRegistrationInfo(id) { return([12345678, 0, 'license']); } // key,expire_date,license_uri
//function setTBServiceRegistrationInfo() {}
//function checkTBServiceRegistrationInfo() {}
//function setContentPackageInfo() {}
//function setSelectedLicenseInfo() {}
//function updatePackageLicenseInfo() {}
//function checkParentalCtrlPassword() {}

  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // IPTVFJ(IPRetransmission);
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** (��������)<br>�����������ꤹ�뤿��μ��̻Ҥ�������롥** �ܼ����Ǥϵ���ʸ������֤���
   *  @name    getIRDID
   *  @param   {String} type      �������׵᤹�뼱�̻Ҥμ���
   *  @returns {String}           ��������ͭ���̻�
   */
  function getIRDID(type) { return('1234567890abcdef'); }
  /**#@-*/

  return({
    //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // IPTVFJ STD-0006(Browser�������֥�������)
    epgTune                          : epgTune,
    readPersistentArray              : readPersistentArray,
    transmitTextDataOverIP           : transmitTextDataOverIP,
//  setCacheResourceOverIP           : setCacheResourceOverIP,
//  reloadActiveDocument             : reloadActiveDocument,
//  getBrowserVersion                : getBrowserVersion,
    getActiveDocument                : getActiveDocument,
    lockScreen                       : lockScreen,
    unlockScreen                     : unlockScreen,
//  getBrowserSupport                : getBrowserSupport,
    launchDocument                   : launchDocument,
//  quitDocument                     : quitDocument,
//  getResidentAppVersion            : getResidentAppVersion,
//  startResidentApp                 : startResidentApp,
    playRomSound                     : playRomSound,
//  sleep                            : sleep,
    setInterval                      : setInterval,
    clearTimer                       : clearTimer,
//  pauseTimer                       : pauseTimer,
//  resumeTimer                      : resumeTimer,
    random                           : random,
    addDate                          : addDate,
    subDate                          : subDate,
    formatNumber                     : formatNumber,
//  getPrinterStatus                 : getPrinterStatus,
//  printFile                        : printFile,
//  printTemplate                    : printTemplate,
//  printURI                         : printURI,
//  printStaticScreen                : printStaticScreen,
//  saveImageToMemoryCard            : saveImageToMemoryCard,
//  saveHttpServerImageToMemoryCard  : saveHttpServerImageToMemoryCard,
//  saveStaticScreenToMemoryCard     : saveStaticScreenToMemoryCard,
//  launchDynamicDocument            : launchDynamicDocument,
//  getMetadataElement               : getMetadataElement,
//  getSynopsis                      : getSynopsis,
//  searchMetadata                   : searchMetadata,
//  searchMetadataOnServer           : searchMetadataOnServer,
    //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // IPTVFJ STD-0006(IPTV�ɲó�ĥ�ؿ�)
    getIPTVLicense                   : getIPTVLicense,
//  getIPTVLicenseInfo               : getIPTVLicenseInfo,
    getDRMID                         : getDRMID,
//  launchIPTVContent                : launchIPTVContent,
//  launchUnmanagedDocument          : launchUnmanagedDocument,
    getDocManagementStat             : getDocManagementStat,
//  marqueeText                      : marqueeText,
//  setIPTVServiceRegistrationInfo   : setIPTVServiceRegistrationInfo,
    checkIPTVServiceRegistrationInfo : checkIPTVServiceRegistrationInfo,
//  setTBServiceRegistrationInfo     : setTBServiceRegistrationInfo,
//  checkTBServiceRegistrationInfo   : checkTBServiceRegistrationInfo,
//  setContentPackageInfo            : setContentPackageInfo,
//  setSelectedLicenseInfo           : setSelectedLicenseInfo,
//  updatePackageLicenseInfo         : updatePackageLicenseInfo,
//  checkParentalCtrlPassword        : checkParentalCtrlPassword,
    //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // IPTVFJ STD-0005
    getIRDID                         : getIRDID
  });
})());
