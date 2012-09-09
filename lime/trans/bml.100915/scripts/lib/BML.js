//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
/** 
 * @fileOverview BMLʸ���xhtmlʸ��Ȥ��ƺƹ��ۤ��ƶ�ư���뤿��δؿ������������ե�����
 * @author       NTT Syber Solution Labs.
 * @version      0.1.5
 */
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// ����
//   ��String.prototype.charCodeAt()�ʤɤˤ����ơ�ɽ�̾塤ʸ�������ɤ�EUC-JP��
//     ����ɬ�פ����뤿�ᳰ���饤�֥��(ecl.js)����Ѥ��Ƥ��롥BML.js���ɤ߹���
//     �����ɤ߹��ळ�ȡ�
// ��ա�
//   ��String.prototype.charCodeAt()��String.fromCharCode()��override���Ƥ���
//     �Τǻ��Ѥ��ʤ����ȡ����Υ᥽�åɤˤϡ�String.prototype._charCodeAt_()��
//     String._fromCharCode_()�ǥ����������뤳�ȡ�
// ����
//   ����colorIndex�Φ��ͤ����Ǥ�Ʃ��Ψ(CSS��opacity����)�Ƕ��̤Ȥ��롥��äơ�
//     ʸ�����طʡ��ܡ����ξ岼������Ʃ���٤��̡��˻��Ĥ��ȤϤǤ��ʤ���
//     #�ޤ�����б������sytle���Ǥβ��ϡ������Ǥ��Ф����ɾ���ʤɤ�ɬ�פȤʤ�
//     #��������Ϻ��ΤȤ�������
//   ��colorIndex�ͤϺ����2��(ʸ�������طʿ�)�򵭽Ҳ�ǽ(�ʤ褦�˸�����)�����ط�
//     ����̵�뤹��
//   ��Number.MAX_VALUE != 2147483647(����Բ�)
//   ��Number.MIN_VALUE != 1(����Բ�)
//   ��PNG�ե�����Υإå��񤭴����ϤǤ��ʤ��Τ�PLTE����󥯤����ä�PNG��
//     ���֤���ɬ�פ�����(ARIB B24?������Ǥ�"PLTE����󥯤�̵�뤹��"�Ϥ�
//     �ʤΤ�DTV�Ǥ�ư���Ȼפ��뤬���ե�����ǡ����̤�������Τ��ɤ�
//     ���ߤ��٤��ʤ�����Ϥ���)
//   ��IE�ϲ��������ѤǤ��ʤ��Τ����б�(���λ����Ǿܺٸ�Ƥ̤)
//     - getter/setter��̤����
//     - XHR.overrideMimetype��̤����
//   ��Opera10.53(�ǿ��ǰ���)�Ǽ����Զ�礬�������б�
//     - XHR.overrideMimetype��ͭ����ư��ʤ����ᡤ�������б��Ǥ��ʤ�
//       = �Х��ʥ�ǡ���(CLUT)�������Ǥ��ʤ�
//       = �����ե������ʸ�������ɤ�(��񤭤Ǥ��ʤ�����)������ǧ���Ǥ��ʤ�
//       = ������¦�ǲ����Τ褦�����Ƥ�.htaccess��������Ƥ����а��ư������?
//         (js��ʸ�������ɤ��ޤ�����������ʬ�����롥Ĵ����)
//           AddCharset EUC-JP .tsv
//           AddCharset x-user-defined .clt
//           AddType text/plain .clt
//   ���桼�������Object����data�ץ�ѥƥ����Ѥ��ʤ�����
//     - ECMAScript���������.data��.dataInterface�˽񤭴�������
// ���б���
//   ��grayscale-color-index�����Ϥ��٤�̵��
//     - grayscale-color-index�����ˤ��ɽ������ϹԤ�ʤ�
//     - normalStyle/focusStyle/activeStyle.grayscaleColorIndex ��getter��default�ͤ��֤�
//     - normalStyle/focusStyle/activeStyle.grayscaleColorIndex ��setter��̤����(���⤷�ʤ�)
// ��Ƥ���ࡧ
//   ���ڡ��������ܤ�������(�֥饦���Υ���ɤ���Ѥ�����)�������ܤ���ǽ��?
//     �� ECMAScript�ǤϤ��٤ƥ����Х���ѿ�/�ؿ�����������ΤߤʤΤǡ�ECMA��
//        ɾ�������window�Υ��ʥåץ���åȤ���к�����٤��ѿ�/�ؿ���ʬ����Ϥ���
//        body�ʲ���node��remove������ɤ��Τǡ������̵�������ܤϲ�ǽ�ʵ���...
//   ��Style�ե�����Υ��ɤ�Ʊ�������ǹԤäƤ��뤿�ᡤ�������JavaScript�ν�����
//     ��å����졤�������֤�Ĺ���ʤ�Ȼפ��롥��Ʊ�����ɤ߹��ߡ��ɤ߹��ߴ�λ��
//     �˽�����Ԥ��褦�ˤ��������ɤ�����Style������礬�ͤ�"�Ѿ�"�˱ƶ�����Τ�
//     �������˹�θ��ɬ�ס���������BMLʸ�񤫤鳰��CSS�ե�����򻲾Ȥ��뤳�Ȥϵ���
//     ���ᡤ����ͥ���̤��㤤��
// ��뤳�ȡ�
//   ��Bevent����μ���(���ʤ��Ȥ�DataButtonPressed)
//   ��Ureg/Greg��UserData�ؤγ�Ǽ
//   ��IPTVFJ��BML��ARIB��BML�Ȥ�(�С������Ƚ��ˤ�ä�)ư����Ѥ���٤���?
//   ��input�μ���(�ե������������ޤ��)
//   ��margin/paddingƱ�ͤ�BML�Ǳ��Ѥ���ʤ�(�����ͤˤʤäƤ�����)CSS�����ν�������
//     (BML����ƥ��¦�Υߥ��Ǳ��Ѥ���ʤ��ͤ����ꤵ��Ƥ����礬���ꡤ�����å�����
//     ��̵����̵����Ŭ�Ѥ���Ƥ��ޤ� -> ����ɽ�����տޤ��ʤ���Τˤʤ�
// ����
//  0.1.0��2010/06/09���פ��ǥ⥳��ƥ�Ĥ�ư�����(IPTVFJ+IptvUUI�б�)
//  0.1.1��2010/06/15��DNP�ǥ⥳��ƥ�Ĥ�ư�����(Ureg�ʤɤ�B24�б�)
//  0.1.2��2010/06/25��ECMAScript�μ�������Ʊ�����������Τ��®��
//  0.1.3��2010/06/28��CSS�������margin/padding����������Ԥ�������褦�˼���
//                     getInlineCurrentXPosition()�ν���(�Ƥ�p���Ǥʤ��̵����
//                     0���֤��Ƥ���)
//                     handleInlineCtrlString()�ν���(����ľ��/��λ����ľ��������
//                     �������ξ������ߥ�)
//  0.1.4��2010/07/02��BML.Clut.load()�ν���(�ѡ�������alpha�ͤμ����ߥ�)
//  0.1.5��2010/08/09��BML.Builder.onunload�θƤӽФ���window.addEventListener�˰ܾ�
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
/**  BMLʸ���ư�Ѥδؿ�/���饹/�����ͷ��Υ͡��ॹ�ڡ��� @namespace @name BML */
var BML = (typeof(BML) == 'undefined') ? {} : BML;

//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
/** ������ץȲ�ᳫ�ϻ���(ms)���ݻ����롥<br>
 *  �����1970ǯ1��1��0��0ʬ0��(UTC)����Υߥ��ÿ���<br>
 *  BML.Debug.startTime�������delete����롥<br>
 *  HTMLʸ��¦���������Ƥ��ʤ����ϡ��ե�����Υ��ɴ�λ��λ���Ȥʤ�������ա�
 *  @name _bml_start_time_ @type Number */
var _bml_start_time_ = (typeof(_bml_start_time_) == 'undefined') ? (new Date).getTime() : _bml_start_time_;

//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
(function(dst, src) { for(var key in src) { dst[key] = src[key]; } })(BML, {
  /** BMLʸ��Υѡ����Ѥ�URI             @type Object @default {}   @memberOf BML @name uri       */
  uri         : {},
  /** BMLʸ��θƤӽФ����Υѡ����Ѥ�URI @type Object @default {}   @memberOf BML @name loaderUri */
  loaderUri   : {},
  /** BMLʸ���Version                   @type String @default null @memberOf BML @name version   */
  version     : null,
  /** BMLʸ��Υǥե���Ȥ������� @type Object @memberOf BML @name config */
  config      : /** @lends BML.config */ {
    /** �����ǽ��font-family�ؤ��Ѵ��ѥϥå���                       @name usableFontName      @memberOf BML.config
     *  @type Object  @default { '�ݥ����å�' : 'ARISAKA-����', '���ݥ����å�' : 'ARISAKA-����', '�Ѵݥ����å�' : 'ARISAKA-����' } */
    usableFontMap       : { '�ݥ����å�' : 'ARISAKA-����', '���ݥ����å�' : 'ARISAKA-����', '�Ѵݥ����å�' : 'ARISAKA-����' },
    /** BMLʸ���Script�����ɤ߹��������ɤ߹��೰��������ץ�������� @name prefixScriptIncPath @memberOf BML.config
      * @type Array<String>   @default ['../scripts/prefix.js'] */
    prefixScriptIncPath : ['../scripts/prefix.js'],
    /** BMLʸ���Script�����ɤ߹��߸���ɤ߹��೰��������ץ�������� @name suffixScriptIncPath @memberOf BML.config
      * @type Array<String>   @default ['../scripts/prefix.js'] */
    suffixScriptIncPath : ['../scripts/suffix.js'],
    /** �ǥХå�ɽ����̵ͭ�ե饰                                      @name debug               @memberOf BML.config
     *  @type Boolean @default true */
    debug               : true
  }
});
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
(function() {
  ///////////////////////////////////////////////////////////////////////////////////////////
  // ̤������BML��ϢClass��
  /** Bevent��Ϣ�Υ᥽�åɷ���«�ͤ�͡��ॹ�ڡ���
   *  @namespace
   *  @memberOf BML.
   */
  BML.Bevent = {
    /** ���٥����Ͽ�Ѥδؿ�
     * @param {Object} property    beitem���Ǥ˴ؤ�������ѿ�����ä����֥�������(ͽ)
     * @param {String} property.id beitem���Ǥ˴ؤ���ץ�ѥƥ�(ͽ)
     */
    entry : function(property) {},
    /** ���٥����Ͽ̵����
     */
    clear : function() {},
    execEvent : function(type) {
    }
  };
})();
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
/** �桼�ƥ���ƥ��ؿ����Υ͡��ॹ�ڡ��� @namespace @name BML.Util */
BML.Util = (function() {
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /**#@+ @memberOf BML.Util @inner @constant @description (̵̾�ؿ�����ѿ��Ǥ��곰�������Բ�)<br> */
  /** URI�ѡ����Ѥ�����ɽ���� @type RegExp @name uriMatcher */
  var uriMatcher = /^(?:(https?:\/\/[^\/]+)?(\/?(?:[^\/\?]*\/)*))?((?:([^\?\#]*)\.([^\.\?\#]*))|([^\?\#\.]*))?(?:\?([^\#]*))?(?:#(.*))?/;
  /** Array.prototype.slice�ؤΥ��硼�ȥ��åȡ� @type Function @name slice */
  var slice      = Array.prototype.slice;
  /**#@-*/

  /**#@+ @memberOf BML.Util @constant */
  /** �֥饦��(IE)Ƚ����                    @type Boolean @name isIE */
  var isIE     = !!(window.attachEvent && (navigator.userAgent.indexOf('opera') === -1));
  /** �֥饦��(Opera)Ƚ����                 @type Boolean @name isOpera */
  var isOpera  = Object.prototype.toString.call(window.opera) == '[object Opera]';
  /** �֥饦��(Safari)Ƚ����                @type Boolean @name isSafari */
  var isSafari = navigator.userAgent.indexOf('AppleWebKit/') > -1;
  /** �ü��HTMLElement�Υ��ݡ���Ƚ���� @type Boolean @name supportSpecificHTMLElement */
  var supportSpecificHTMLElement = !(isUndefined(window.HTMLSpanElement));
  /** each/hashEach�Υ롼�׽�λ�ѥ����ߥ͡��� @type object  @name $break */
  var $break   = {};
  /**#@-*/

  /**#@+ @methodOf BML.Util @inner @static @description (̵̾�ؿ���ǤΥ桼�ƥ���ƥ��ؿ��Ǥ��ꡤ�������׳�����ϸ����ʤ�)<br> */
  /** ���饹̾�����������ؿ���
   *  @name    BML.Util.getClass
   *  @param   {Object} obj ���饹̾�μ����оݥ��֥�������
   *  @returns {String}     ���饹̾(Array/Data/Math/Number/Object/RegExp/String/...?)
   */
  function getClass(obj) {
    return(Object.prototype.toString.call(obj).match(/^\[object\s(.*)\]$/)[1]);
  }
  /** ���󥳥ԡ��������ؿ���<br>
   *  ��������������Ǥ򼫿�(����)���������ɲä��롥
   *  append.call()/append.apply()�Ǽ¹ԡ����뤤��Array.prototype�Υ��Х᥽�åɤȤ��Ƥ��ɤ���
   *  @name    BML.Util.append
   *  @param   {Array<Object>} array ���ԡ���������
   *  @returns {Array<Object>} ����
   */
  function append(array) {
    var thisLength = this.length, length = array.length;
    while(length--) this[thisLength + length] = array[length];
    return(this);
  }
  /**#@-*/

  /**#@+ @methodOf BML.Util @public */
  /** ���ؿ�
   *  @name    BML.Util.emptyFunction
   */
  function emptyFunction()   { }
  /** �������֤��ؿ�
   *  @name    BML.Util.K
   */
  function K(arg)   { return(arg); }
  /** ����Ƚ���Ѵؿ�
   *  @name    isArray
   *  @param   {Object}  obj Ƚ���о�
   *  @returns {Boolean}     Ƚ����
   */
  function isArray(obj)      { return(getClass(obj) == 'Array'); }
  /** undefinedȽ���Ѵؿ�
   *  @name    isFunction
   *  @param   {Object}  obj Ƚ���о�
   *  @returns {Boolean}     Ƚ����
   */
  function isFunction(obj)   { return(typeof(obj) == 'function'); }
  /** undefinedȽ���Ѵؿ�
   *  @name    isUndefined
   *  @param   {Object}  obj Ƚ���о�
   *  @returns {Boolean}     Ƚ����
   */
  function isUndefined(obj)  { return(typeof(obj) == 'undefined'); }
  /** src�����ƤΥץ�ѥƥ�(̾����)��dst�˾�񤭤���
   *  @name    extend
   *  @param   {Object} dst �����Υ��֥�������
   *  @param   {Object} src ��񤭸��Υ��֥�������
   *  @returns {Object}     �ץ�ѥƥ����񤭤��줿dst
   */
  function extend(dst, src)  { for(k in src) { dst[k] = src[k]; } return(dst); }
  /** ������this�Ȥ��ƴؿ�(����)��¹Ԥ��롥<br>
   *  bind.call()/bind.apply()�Ǽ¹ԡ����뤤��Function.prototype�Υ��Х᥽�åɤȤ��Ƥ��ɤ���
   *  @name    bind
   *  @param   {Object} context this�����ꤹ�륪�֥�������
   *  @returns {Void}           �ؿ�(����)�μ¹Է��
   */
  function bind(context) {
    if ((arguments.length < 2) && isUndefined(arguments[0])) return(this);
    
    var __method = this, args = slice.call(arguments, 1);
    return(function() {
      var a = append.call(slice.call(args, 0), arguments);
      return(__method.apply(context, a));
    });
  }
  /** ���������ꤷ�����ַв��˴ؿ�(����)��¹Ԥ��롥<br>
   *  wait.call()/wait.apply()�Ǽ¹ԡ����뤤��Function.prototype�Υ��Х᥽�åɤȤ��Ƥ��ɤ���
   *  @name    wait
   *  @param   {Number} timeout   �Ԥ�����(sec)
   *  @param   {Object} [context] �¹Ԥ���ؿ���this�����ꤹ�륪�֥������ȡ�̤�������null��
   *  @returns {Number}           window.setTimeout()�¹Ի��Υ�����ID
   */
  function wait(timeout, context) {
    var __method = this, args = slice.call(arguments, 2);
    return(window.setTimeout(function() {
      return(__method.apply(context || null, args));
    }, timeout * 1000));
  }
  /** ����(����)�γ����Ǥ�����Ȥ��ƻ��ꤷ���ؿ���¹Ԥ��롥<br>
   *  each.call()/each.apply()�Ǽ¹ԡ����뤤��Array.prototype�Υ��Х᥽�åɤȤ��Ƥ��ɤ���
   *  @name    each
   *  @param   {Function} iterator  ����γ����Ǥ�Ŭ�Ѥ���ؿ����ؿ��ΰ�����[����, ���Ǥΰ���]��
   *  @param   {Object}   [context] �¹Ԥ���ؿ���this�����ꤹ�륪�֥������ȡ�̤�����������(����)��
   *  @returns {Array<Object>}      ����(����)
   */
  function each(iterator, context) {
   context = context || this;
    try {
      for(var i = 0, l = this.length; i < l; i++) {
        iterator.call(context, this[i], i);
      }
    } catch(e) {
      if (e != $break) throw(e);
    }
    return(this);
  }
  /** ���֥�������(����)�γƥץ�ѥƥ�������Ȥ��ƻ��ꤷ���ؿ���¹Ԥ��롥<br>
   *  hashEach.call()/hashEach.apply()�Ǽ¹ԡ����뤤��Object.prototype�Υ��Х᥽�åɤȤ��Ƥ��ɤ���
   *  @name    hashEach
   *  @param   {Function} iterator  �ƥץ�ѥƥ���Ŭ�Ѥ���ؿ����ؿ��ΰ�����[�ץ�ѥƥ�̾���ץ�ѥƥ���]��
   *  @param   {Object}   [context] �¹Ԥ���ؿ���this�����ꤹ�륪�֥������ȡ�̤�����������(����)��
   *  @returns {Array<Object>}      ���֥�������(����)
   */
  function hashEach(iterator, context) {
    context = context || this;
    try {
      for(var key in this) {
        iterator.call(context, key, this[key]);
      }
    } catch(e) {
      if (e != $break) throw(e);
    }
    return(this);
  }
  /** ������URI�Ȥ��Ʋ�ᤷ��host/path/file̾�ʤɤ�ʬ�򤹤롥<br>
   *  @name    paraseURI
   *  @param   {String} uri �����оݤ�URI<br> ex.) http(s)://host(:port)/some/.../path/file.ext?query#fragment
   *  @returns {Object}     ���Ϸ�̤��ݻ�����ϥå��塥<br>
                            [.host] URI�Υۥ�����ʬ���ݡ��Ȥ�ޤ� ex.) http(s)://host(:port)<br>
                            [.path] URI�Υѥ���ʬ ex.) /some/.../path/<br>
                            [.file] URI�Υե�����̾��ʬ����ĥ�Ҵޤ� ex.) file.ext<br>
                            [.name] URI�Υե�����̾�γ�ĥ�Ұʳ� ex.) file<br>
                            [.ext]  URI�Υե�����̾�γ�ĥ����ʬ ex.) ext<br>
                            [.query]    URI�Υ�������ʬ��URI�ǥ����ɺѤ� ex.) query<br>
                            [.fragment] URI�Υե�����̾�γ�ĥ�Ұʳ� ex.) fragment
   */
  function parseURI(uri) {
    if (!uri) return({});

    var org = uri;
    uri = uri.replace(/\\/g, '/');
    var match = uriMatcher.exec(uri);

    return(match ? {
      full     : uri,
      host     : match[1] || '',
      path     : match[2] || '',
      file     : match[3] || '',
      name     : match[4] || match[6] || '',
      ext      : match[5] || '',
      query    : decodeURIComponent(match[7] || ''),
      fragment : match[8] || ''}
    : {
      full     : uri
    });
  }
  /** �����ȥѥ��ȥ����Ȥ�������Хѥ�����������ѥ����������롥<br>
   *  @name    combinePath
   *  @param   {String} relative �����Ȥ�������Хѥ�
   *  @param   {Object} current  �ѡ����ѤߤΥ����ȥѥ�
   *  @returns {String}          ������Υѥ���relative�����Хѥ�(��Ƭ��http)�ξ���relative���֤���
   */
  function combinePath(relative, current) {
    if (relative.indexOf('http') >= 0) return(relative);

    var path = current.host+current.path+relative;
    path = path.split('/');

    var buf = [];
    for(var i = 0, l = path.length; i < l; i++) {
      var p = path[i];
      ((p == '..') && (buf.length > 0)) ? buf.pop() : buf.push(p);
    }
    return(buf.join('/'));
  }
  /** ���ꤷ��Ĺ���������ʤ�ʸ����κ�¦������ʸ��������롥<br>
   *  @name    toPaddedString
   *  @param   {String} str       �о�ʸ����
   *  @param   {String} [pad=' '] ���������ʸ��
   *  @param   {Number} [len=2]   ʸ����˴��Ԥ����Ĺ��
   *  @returns {String}           �������᤿ʸ����
   */
  function toPaddedString(str, pad, len) {
    var ret = ''; str = String(str); pad = pad || ' ';
    for(var i = str.length, l = len || 2; i < l; i++) ret += pad;
    return(ret + str);
  }
  /** RGB�򼨤���������(0��255)��ơ�16��2��(2��̤���ξ���0���)���Ѵ����Ʒ�礹�롥
   *  @name    toColorCode
   *  @param   {Number} r ��(R)�򼨤�������
   *  @param   {Number} g ��(G)�򼨤�������
   *  @param   {Number} b ��(B)�򼨤�������
   *  @returns {String}   RGB���򼨤�16��6���ʸ����
   */
  function toColorCode(r, g, b) {
    return(toPaddedString(Number(r).toString(16), '0')+
           toPaddedString(Number(g).toString(16), '0')+
           toPaddedString(Number(b).toString(16), '0'));
  }
  /** ʸ�������Ƭʸ������ʸ�������롥<br>
   *  ex) anchor -> Anchor
   *  @name    capitalize
   *  @param   {String} str �о�ʸ����
   *  @returns {String}     �Ѵ����ʸ����
   */
  function capitalize(str) {
    return(str.charAt(0).toUpperCase() + str.substring(1).toLowerCase());
  }
  /** '-'�Ƿ�礵�줿ʸ�����ʬ�򤷡�'-'ľ���1ʸ������ʸ�������Ʒ�礹�롥<br>
   *  ex) color-index -> colorIndex
   *  @name    camelize
   *  @param   {String} str �о�ʸ����
   *  @returns {String}     �Ѵ����ʸ����
   */
  function camelize(str) {
    var parts = str.split('-');
    if (parts.length <= 1) return(str);

    var buf = String(parts[0]).toLowerCase();
    for(var i = 1, l = parts.length; i < l; i++) {
      var part = String(parts[i]);
      if (!part) continue;
      part = part.toLowerCase();
      buf += part.charAt(0).toUpperCase() + part.substring(1);
    }
    return(buf);
  }
  /** ���֥������Ȥ����ץ�ѥƥ���'[key:value]'�η���Ϣ�뤷��ʸ������������롥
   *  @name    hashToString
   *  @param   {Object} obj �оݥ��֥�������
   *  @returns {String}     �оݥ��֥������Ȥ����ץ�ѥƥ���ʸ����ɽ��
   */
  function hashToString(obj) {
    var s = '';
    for(var k in obj) { s += '['+k+':'+obj[k]+'] '; }
    return(s);
  }
  /** Element�λ���Υ������������ͤ�������롥<br>
   *  currentStyle(IE)��getComputedStyle(Firefox/Opera/Safari)���Ѥ��������֥饦��������ץȡ�
   *  @name    getStyle
   *  @param   {HTMLElement} elm   �о�Element
   *  @param   {String}      style ������������̾
   *  @returns {String}            ��������������
   */
  function getStyle(elm, style) {
    var value = elm.style[style];
    if (!value || (value == 'auto')) {
      var css = elm.currentStyle || document.defaultView.getComputedStyle(elm, null);
      value = css ? css[style] : null;
    }
    return((value == 'auto') ? null : value);
  }
  /**#@-*/
  return({
    $break         : $break,
    isIE           : isIE,
    isOpera        : isOpera,
    isSafari       : isSafari,
    emptyFunction  : emptyFunction,
    K              : K,
    isArray        : isArray,
    isFunction     : isFunction,
    isUndefined    : isUndefined,
    extend         : extend,
    bind           : bind,
    wait           : wait,
    each           : each,
    hashEach       : hashEach,
    parseURI       : parseURI,
    combinePath    : combinePath,
    toPaddedString : toPaddedString,
    toColorCode    : toColorCode,
    capitalize     : capitalize,
    camelize       : camelize,
    hashToString   : hashToString,
    getStyle       : getStyle,
    supportSpecificHTMLElement : supportSpecificHTMLElement
  });
})();
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
(function() { // ���ܥ��֥������ȤΥ᥽�åɤ�Override
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** ���ꥸ�ʥ��String.prototype.charCodeAt�ӥ�ȥ���ؿ����ݻ�������Х᥽�å�
   *  @name String.prototype._charCodeAt_ @methodOf String.prototype @public */
  String.prototype._charCodeAt_ = String.prototype.charCodeAt;
  /** ���ꥸ�ʥ��String.fromCodeAt�ӥ�ȥ���ؿ����ݻ�������Х᥽�å�
   *  @name String._fromCharCode_         @type function @memberOf String. @public */
  String._fromCharCode_         = String.fromCharCode;

  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /**#@+ @inner @description (̵̾�ؿ���ǤΥ桼�ƥ���ƥ��ؿ��Ǥ��ꡤ�������׳�����ϸ����ʤ�)<br> */
  /** String.prototype.charCodeAt�ؿ����ѹ���ȼ��ecl.js�δ�Ϣ�ؿ���Wrapper��<br>
   *  ���ؿ������ؤ������뤿����ǽŪ�ˤϤ��ޤ깥�ޤ���̵�����������饤�֥���Ϯ��ʤ�����ν��֡�
   *  @function
   *  @name    escapeECUJPWrapper
   *  @param   {String} c EUC-JPʸ�������ɤ���������о�ʸ��
   *  @returns {Number}   �о�ʸ����EUC-JPʸ��������(������)
   */
  function escapeEUCJPWrapper(c) {
    var old = String.prototype.charCodeAt;
    String.prototype.charCodeAt = String.prototype._charCodeAt_;
    var ret = EscapeEUCJP(c);
    String.prototype.charCodeAt = old;
    return(ret);
  }
  /** String.fromCharCode�ؿ����ѹ���ȼ��ecl.js�δ�Ϣ�ؿ���Wrapper��<br>
   *  ���ؿ������ؤ������뤿����ǽŪ�ˤϤ��ޤ깥�ޤ���̵�����������饤�֥���Ϯ��ʤ�����ν��֡�
   *  @function
   *  @name    unescapeECUJPWrapper
   *  @param   {String} c EUC-JPʸ����������
   *  @returns {String}   UTF-8ʸ����������
   */
  function unescapeEUCJPWrapper(c) {
    var old = String.fromCharCode;
    String.fromCharCode = String._fromCharCode_;
    var ret = UnescapeEUCJP(c);
    String.fromCharCode = old;
    return(ret);
  }
  /**#@-*/
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** EUC-JPʸ�������ɤ��б�����String.prototype.charCodeAt��<br>
   *  �ӥ�ȥ���ؿ�����Ѥ������String.prototype._charCodeAt_����Ѥ��뤳�ȡ�
   *  @name     charCodeAt
   *  @methodOf String.prototype
   *  @param    {Number} pos ʸ�������ɤ��������ʸ���ΰ���
   *  @returns  {String} ����ʸ����EUC-JPʸ��������
   */
  String.prototype.charCodeAt = function(pos) {
    var c = this.charAt(pos);
    return(/[\*+.-9A-Z_a-z-]/.test(c) ?
           c._charCodeAt_(0) : parseInt(escapeEUCJPWrapper(c).replace(/%/g, ''), 16));
  };
  /** EUC-JPʸ�������ɤ��б�����String.fromCharCode��<br>
   *  �ӥ�ȥ���ؿ�����Ѥ������String._fromCharCode_����Ѥ��뤳�ȡ�
   *  @name     fromCharCode
   *  @methodOf String.
   *  @param    {String} code[��code��] EUC-JPʸ��������
   *  @returns  {String} ʸ����
   */
  String.fromCharCode = function() {
    var buf = '';
    for(var i = 0, l = arguments.length; i < l; i++) {
      var n = Number(arguments[i]).toString(16);
      if (n.length % 2) n = '0' + n;
      // ecl.js�˶��碌�뤿�������(%����������)�����Τ�����Ͼ�����Ĺ����...
      for(var j = 0, m = n.length; j < m; j += 2) {
        buf += '%' + n.substring(j, j + 2);
      }
    }
    return(unescapeEUCJPWrapper(buf));
  };

  var ps = BML.Util.toPaddedString; // ���硼�ȥ��å�
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /**#@+ @methodOf Date.prototype @public */
  /** ���ꥸ�ʥ��Date.prototype.toString�ӥ�ȥ���ؿ����ݻ�������Х᥽�å�
   *  @name Date.prototype._toString_ @public */
  Date.prototype._toString_ = Date.prototype.toString;
  /** ARIB���ͤ�����ʸ�������Ϥ��롥<br>
   *  �ӥ�ȥ���ؿ�����Ѥ������Date.prototype._toString_����Ѥ��뤳�ȡ�
   *  @name     Date.prototype.toString
   *  @returns  {String} ARIB���ͤ�����ʸ����
   */
  Date.prototype.toString = function() {
    return(this.getFullYear()         + '-' + 
           ps(this.getMonth()+1, '0') + '-' + 
           ps(this.getDate(),    '0') + 'T' + 
           ps(this.getHours(),   '0') + ':' + 
           ps(this.getMinutes(), '0') + ':' + 
           ps(this.getSeconds(), '0'));
  };
  /** ARIB���ͤ�toLocalString(ARIB���ͤ�toString�򻲾�) @name toLocalString @returns {String} ARIB���ͤ�����ʸ���� */
  Date.prototype.toLocalString = Date.prototype.toString;
  /** ARIB���ͤ�toUTCString(ARIB���ͤ�toString�򻲾�)   @name toUTCString   @returns {String} ARIB���ͤ�����ʸ���� */
  Date.prototype.toUTCString   = Date.prototype.toString;
  /**#@-*/

  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /**#@+ @methodOf Function.prototype @public */
  /** ���ꥸ�ʥ��Function.prototype.toString�ӥ�ȥ���ؿ����ݻ�������Х᥽�å�
   *  @name Function.prototype._toString_ @public */
  Function.prototype._toString_ = Function.prototype.toString;
  /** ARIB���ͤδؿ����֥������Ȥ�ʸ����ɽ������Ϥ��롥<br>
   *  �ӥ�ȥ���ؿ�����Ѥ������Function.prototype._toString_����Ѥ��뤳�ȡ�
   *  @name     Function.prototype.toString
   *  @returns  {String} ARIB���ͤ�ʸ����ɽ��
   */
  Function.prototype.toString = function() {
    var str = Function.prototype._toString_.call(this);
    str = str.replace(/\{[^\}]*?\}/, '{}');
    return(str);
  };
  /**#@-*/
//  Object.prototype.toBoolean = function() { return(true); };
//  Object.prototype.toNumber  = function() { return(this.valueOf()); };
})();
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
/** Ajax(Ʊ��/��Ʊ��HTTP�̿����󥿥ե�����)�ѥ��饹��<br>
 * options�ˤ��ѥ�᥿�ν����������Ԥ���url�����ꤵ��Ƥ������request������Ԥ�.<br>
 * ���Τ�BML.Ajax-Ajax��
 * @class Ajax(Ʊ��/��Ʊ��HTTP�̿����󥿥ե�����)�ѥ��饹
 * @name BML.Ajax
 * @param {String}  [url]     �ꥯ��������URL
 * @param {Object}  [options] �ꥯ�����Ȥ˴ؤ��륪�ץ����
 * @param {String}  [options.method='POST']                �������Υ᥽�å�(POST|GET)
 * @param {Boolean} [options.asynchronous=true]            Ʊ��/��Ʊ���̿��ե饰(true:��Ʊ��)
 * @param {String}  [options.contentType='application/x-www-form-urlencoded'] �ꥯ�����Ȥ�MIME������
 * @param {String}  [options.overrideMimeType='']          ������MIME�����פλ��ꡥ��������transport��overrideMimeType�᥽�åɤ�ͭ���ʤ�����̵�뤹�롥
 * @param {String}  [options.encoding='UTF-8']             ��������ʸ�������ɤλ��ꡥ
 * @param {Object}  [options.parameters={}]                URL�Υ�������(GET)���뤤��body(POST)�����ꤹ����������ץ�ѥƥ�̾��key���ץ�ѥƥ��ͤ�value�Ȥ��롥
 * @param {String}  [options.postBody='']                  POST����body�����ꤹ��ʸ����options.parameters���ͥ�褵��롥
 * @param {Funcion} [options.onSuccess=undefined]          �ꥯ�������������˼¹Ԥ��륳����Хå��ؿ��λ��ꡥ������Хå��ؿ��ΰ�����[BML.Ajax-Response]��
 * @param {Funcion} [options.onFailure=undefined]          �ꥯ�����ȼ��Ի��˼¹Ԥ��륳����Хå��ؿ��λ��ꡥ������Хå��ؿ��ΰ�����[BML.Ajax-Response]��
 * @param {Funcion} [options.onUninitialized=undefined]    �ꥯ�����Ƚ�������˼¹Ԥ��륳����Хå��ؿ��λ��ꡥ������Хå��ؿ��ΰ�����[BML.Ajax-Response]��
 * @param {Funcion} [options.onLoading=undefined]          �ꥯ�����ȱ���������˼¹Ԥ��륳����Хå��ؿ��λ��ꡥ������Хå��ؿ��ΰ�����[BML.Ajax-Response]��
 * @param {Funcion} [options.onLoaded=undefined]           �ꥯ�����ȱ���������λ���˼¹Ԥ��륳����Хå��ؿ��λ��ꡥ������Хå��ؿ��ΰ�����[BML.Ajax-Response]��
 * @param {Funcion} [options.onInteractive=undefined]      �ꥯ�����ȱ������ϸ�˼¹Ԥ��륳����Хå��ؿ��λ��ꡥ������Хå��ؿ��ΰ�����[BML.Ajax-Response]��
 * @param {Funcion} [options.onComplete=undefined]         �ꥯ�����ȴ�λ���˼¹Ԥ��륳����Хå��ؿ��λ��ꡥ������Хå��ؿ��ΰ�����[BML.Ajax-Response]��
 * @param {Funcion} [options.on"HTTPStatusCode"=undefined] readyState�Ѳ�����HTTP�Υ��ơ����������ɤ��б����륳����Хå��ؿ��λ��ꡥ������Хå��ؿ��ΰ�����[BML.Ajax-Response]��
 * @param {Funcion} [options.onError=undefined]            �㳰ȯ�����˼¹Ԥ��륳����Хå��ؿ��λ��ꡥ������Хå��ؿ��ΰ�����[BML.Ajax, Exception]��
 */
BML.Ajax = (function() {
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /**#@+ @memberOf BML.Ajax @inner @static @constant @description (̵̾�ؿ��������Ǥ��곰�������Բ�)<br> */
  /** �ꥯ�����Ȼ���readyState���б�����̾�Τ��ݻ��������� @name EVENTS  @type Array<String> */
  var EVENTS = ['Uninitialized', 'Loading', 'Loaded', 'Interactive', 'Complete'];

  /** BML.Util�ؤΥ��硼�ȥ��å� @name util @type Function */
  var util = BML.Util;
  /**#@-*/

  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /**#@+ @methodOf BML.Ajax @inner @description (̵̾�ؿ���ǤΥ桼�ƥ���ƥ��ؿ��Ǥ��ꡤ�������׳�����ϸ����ʤ���)<br> */
  /** URI���󥳡��ɤ��줿key-value�ڥ�ʸ�����������롥
   *  @name    toQueryPair
   *  @param   {String} k   key��URI���󥳡��ɤ���Ƥ�������
   *  @param   {String} [v] value��URI���󥳡����оݡ�
   *  @returns {String} "key=value"���֤���value��undefined�ξ���"key"�Τߡ�
   */
  function toQueryPair(k, v) {
    return(util.isUndefined(v)? k : k+'='+encodeURIComponent(v===null? '' : v));
  }
  /** HTTP�̿��Ѥ��Ȥ߹��ߥ��֥������Ȥ�������롥
   *  @name    getTransport
   *  @returns {Object} HTTP�̿��Ѥ��Ȥ߹��ߥ��֥�������
   */
  function getTransport() {
    var transport = ['XMLHttpRequest()',
                     "ActiveXObject('Msxml2.XMLHTTP')",
                     "ActiveXObject('Microsoft.XMLHTTP')"];
    for(var i = 0, l = transport.length; i < l; i++) {
      try      { return(eval('new ' + transport[i])); }
      catch(e) { }
    }
    return(null);
  }
  /**#@-*/
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** Ajax(Ʊ��/��Ʊ��HTTP�̿����󥿥ե�����)�ѥ��饹�Υ��󥹥ȥ饯����*/
  var Ajax = function(url, options) {
    /**#@+ @memberOf BML.Ajax.prototype @private */
    /** �ꥯ�����ȱ�����λ�ե饰          @propertyEx _complete|Boolean|false */
    this._complete  = false;
    /** �ꥯ��������URL                   @propertyEx _url     |String |'' */
    this._url       = '';
    /** �ꥯ�����Ȼ��Υ��ץ����<br> ** �����ͤȥǥե�����ͤϥ��󥹥ȥ饯���ΰ����򻲾ȡ� @propertyEx _options|Object|(��ά) */
    this._options = util.extend({
      method           : 'POST',
      asynchronous     : true,
      contentType      : 'application/x-www-form-urlencoded',
      overrideMimeType : '',
      encoding         : 'UTF-8',
      parameters       : {},
      postBody         : ''
    }, options || {});
    /** �������Υ᥽�å�                  @propertyEx _method  |String |'POST' */
    this._method    = this._options.method.toUpperCase() || 'POST';
    /**#@-*/
    /**#@+ @memberOf BML.Ajax.prototype */
    /** HTTP�̿��Ѥ��Ȥ߹��ߥ��֥�������  @propertyEx BML.Ajax.prototype.transport|Object |BML.Ajax.getTransport()���֤��� */
    this.transport = getTransport();
    /** �ꥯ�����Ȥ��Ф������<br>        @propertyEx BML.Ajax.prototype.response |BML.Ajax-Response|null */
    this.response  = null;
    /**#@-*/

    if (url) this.request(url);
  };
  /**#@+ @methodOf BML.Ajax.prototype */
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** �ꥯ��������URL���Ф��ƥꥯ�����Ȥ�ȯ�Ƥ��롥<br>
   *  ���Τ�BML.Ajax-Ajax.prototype.request��
   *  @name     BML.Ajax.prototype.request
   *  @methodOf BML.Ajax.prototype
   *  @param    {String} url �ꥯ��������URL
   */
  Ajax.prototype.request = function(url) {
    if (!url) return;

    this._url      = url;
    this.response  = null;

    var accessUrl  = url;
    var query      = '';
    var body       = null;
    
    // ������κ���
    var p = [], params = this._options.parameters || {}, val;
    for(var key in params) {
      val = params[key];
      key = encodeURIComponent(key);
      if (!BML.Util.isArray(val)) {
        util.each.call(val, function(v) { p.push(toQueryPair(key, v)); });
      } else {
        p.push(toQueryPair(key, val));
      }
    }
    query = p.join('&');

    // ����������н���(GET:URI������/POST:body��)
    if ((this._method == 'GET') && (query.length > 0))  {
      accessUrl += ((url.indexOf('?') > 0) ? '&' : '?') + query;
    } else {
      if (/Konqueror|Safari|KHTML/.test(navigator.userAgent)) query += '&_=';
      body = this._options.postBody || query;
    }

    try {
      var transport = this.transport;
      // ����MIME�����פ�����(transport��open���˼»���)
      if (this._options.overrideMimeType && transport.overrideMimeType)
        transport.overrideMimeType(this._options.overrideMimeType);
      // �ꥯ��������URL�ؤ���³(��Ʊ���ξ���readyState���ö����)
      transport.open(this._method, accessUrl, this._options.asynchronous);
      if (this._options.asynchronous) util.wait.call(this._respondToReadyState, 0.01, this, 1);

      // �إå�������
      var headers = this._getRequestHeaders();
      for(key in headers) transport.setRequestHeader(key, headers[key]);
      // callback�ؿ�������
      transport.onreadystatechange = util.bind.call(this._onStateChange, this);

      // �ꥯ�����Ȥ�����
      transport.send(body);
      if (!this._options.asynchronous && transport.overrideMimeType) this._onStateChange();

    } catch(e) {
      this._dispatchException(e);
    }
  };
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** transport��onreadystatechange���Ф��륳����Хå��ؿ���<br>
   *  ���Τ�BML.Ajax-Ajax.prototype._onStateChange��
   *  @name     BML.Ajax.prototype._onStateChange
   */
  Ajax.prototype._onStateChange = function() {
    var readyState = this.transport.readyState;
    if ((readyState > 1) && ((readyState != 4) || !this._complete))
      this._respondToReadyState(readyState);
  };
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** transport�Υ��ơ�����(readyState)���б����륳����Хå�������»ܡ�<br>
   *  ���Τ�BML.Ajax-Ajax.prototype._respondToReadyState��
   *  @name     BML.Ajax.prototype._respondToReadyState
   */
  Ajax.prototype._respondToReadyState = function(readyState) {
    var state     = EVENTS[readyState];
    var response  = new Response(this);

    try {
      (this._options['on' + state] || util.emptyFunction)(response);
    } catch(e) {
      this.dispatchException(e);
    }

    if (state == 'Complete') {
      try {
        this._complete = true;
        (this._options['on' + response.statusCode] ||
         this._options['on' + (this.isSuccess() ? 'Success' : 'Failure')] ||
         util.emptyFunction)(response);
      } catch(e) {
        this.dispatchException(e);
      }

      this.transport.onreadystatechange = util.emptyFunction;

      BML.Debug('[Ajax]:'+this._url+' ->['+(this.isSuccess() ? 'OK' : 'NG')+']');
    }
    this.response = response;
  };
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** HTTP���ơ����������ɤ���HTTP�̿������ݤ�Ƚ�ꤹ�롥<br>
   *  ���Τ�BML.Ajax-Ajax.prototype.isSuccess��
   *  @name     BML.Ajax.prototype.isSuccess
   *  @returns  {Boolean} HTTP���ơ����������ɤ�200�ʾ�300̤���ξ��Ͽ���
   */
  Ajax.prototype.isSuccess = function() {
    var status = this._getHttpStatusCode();
    return(!status || ((status >= 200) && (status < 300)));
  };
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** �ꥯ��������������HTTP�إå������ꤹ�٤��إå�̾���ͤ�������롥<br>
   *  ���Τ�BML.Ajax-Ajax.prototype._getRequestHeaders
   *  @name     BML.Ajax.prototype._getRequestHeaders
   *  @returns  {Object} �إå�̾��ץ�ѥƥ�̾���إå������ꤹ���ͤ�ץ�ѥƥ��ͤ˻���̵̾���֥�������
   */
  Ajax.prototype._getRequestHeaders = function() {
    var headers = {
      'X-Requested-With' : 'XMLHttpRequest',
      'Accept'           : "text/javascript, text/html, application/xml, text/xml, */*"
    };
    if (this._method == 'POST') {
      headers['Content-type'] = this._options.contentType +
        (this._options.encoding ? '; charset=' + this._options.encoding : '');
      // Force "Connection: close" for older Mozilla browsers to work. see Mozilla Bugzilla #246651.
      if (this.transport.overrideMimeType &&
          (navigator.userAgent.match(/Gecko\/(\d{4})/) || [0,2005])[1] < 2005)
            headers['Connection'] = 'close';
    }

    return(headers);
  };
  /**#@-*/
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /**#@+ @methodOf BML.Ajax.prototype @private */
  /** HTTP���ơ����������ɤ�������롥          @name _getHttpStatusCode @return {Number} HTTP���ơ����������ɡ������Ǥ��ʤ�����0��*/
  Ajax.prototype._getHttpStatusCode = function()  { try { return(this.transport.status || 0); } catch(e) { return(0); } };
  /** �㳰ȯ�����Υ�����Хå��ؿ���¹Ԥ��롥  @name _dispatchException @param {Exception} e �㳰 */
  Ajax.prototype._dispatchException = function(e) { (this._options.onError || util.emptyFunction)(this, e); };
  /**#@-*/
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** Ajax�Υ쥹�ݥ󥹤򰷤�BML.Ajax���������饹
   * @class Ajax(Ʊ��/��Ʊ��HTTP�̿����󥿥ե�����)�ˤ�����쥹�ݥ��ѥ��饹
   * @name  BML.Ajax-Response
   * @param {BML.Ajax} request �ꥯ�����Ȥ�Ԥ�ajax���饹�Υ��󥹥���
   */
  var Response = function(request) {
    /**#@+ @memberOf BML.Ajax-Response.prototype @public */
    /** �ꥯ�����Ȼ���HTTP���ơ�����������                     @propertyEx statusCode  |Number     |0 */
    this.statusCode   = 0;
    /** �ꥯ�����Ȼ���HTTP���ơ�������ɽ��ʸ����               @propertyEx statusText  |String     |'' */
    this.statusText   = '';
    /** �ꥯ�����ȱ�����ʸ����ɽ��                             @propertyEx responseText|String     |'' */
    this.responseText = '';
    /** �ꥯ�����ȱ�����XML�Ȥ��Ʋ�ᤷ������DOM���֥������� @propertyEx responseXML |XMLDocument|null */
    this.responseXML  = null;
    /**#@-*/
      
    var transport   = request.transport;
    var readyState  = transport.readyState;

    if (((readyState > 2) && !util.isIE) || (readyState == 4)) {
      // to avoid firebugs error(cannot access optimized closure)
      var f = function() { try {return(transport.statusText); } catch(e){} return(''); };

      this.statusCode   = Ajax.prototype._getHttpStatusCode.call(request);
      this.statusText   = f();
      this.responseText = (transport.responseText === null) ? '' : transport.responseText;
    }

    if (readyState == 4) {
      var xml = transport.responseXML;
      this.responseXML = util.isUndefined(xml) ? null : xml;
    }
  };
  
  return(Ajax);
})();
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
/** �ǥХå���ʸ����ɽ���ؿ����Υ͡��ॹ�ڡ��� @static @namespace @name BML.Debug */
BML.Debug = (function() {
  /**#@+ @memberOf BML.Debug @inner @static @description (̵̾�ؿ��������Ǥ��곰�������Բ�)<br> */
  /** BML.js�Υ�����ץ�ɾ�����ϻ��� @name startTime @type Number @default _global_._bml_start_time_ */
  var startTime  = _bml_start_time_; delete(_bml_start_time_);
  /** ��ɽ���Ѥ����� @name plane @type HTMLElement @default null */
  var plane      = null;
  /** ��ɽ�������ط��Ѥ����� @name bgPlane @type HTMLElement @default null */
  var bgPlane    = null;
  /** ����Կ� @name maxLine @type Number @default 20 */
  var maxLine    = 20;
  /** ����å������Хåե� @name strBuf @type Array<String> @default new Array() */
  var strBuf     = [];
  /** �����ϹԿ� @name count @type Number @default 0 */
  var count      = 0;
  /** ɽ������ @name visible @type Boolean @default false */
  var visible    = false;
  /** initialize()��load���٥�ȥꥹ�ʤؤ���Ͽ̵ͭ @name entryEvent @type Boolean @default false */
  var entryEvent = false;
  /** ����٥����ɽ������ @name level @type Object
    * @field {Boolean}(false) .debug debug��٥�
    * @field {Boolean}(true)  .info  info��٥�
    * @field {Boolean}(true)  .warn  warning��٥�
    * @field {Boolean}(true)  .error error��٥�
    */
  var level      = { debug : false, info : true, warn : true, error : true };
  /**#@-*/
  /**#@+ @methodOf BML.Debug @public @static */
  /** ������ؿ���<br>
   *  �ǥХå���ɽ���Ѥ�plane(div����)��ưŪ�˺��������������(Esc����)��եå����롥<br>
   *  plane�������Ǥ��ʤ����ϡ�ʸ��Υ��ɥ��٥�Ȥ�ȯ�Ф��줿�ݤ˼��Ȥ�ƸƤӽФ����롥
   * @name initialize
   */
  function initialize() {
    if (plane) return;

    var body = document.getElementsByTagName('body');
    if (body.length > 0) {
      bgPlane = document.createElement('div');
      bgPlane.setAttribute('id', '_bml_debug_bgplane_');

      plane = document.createElement('div');
      plane.setAttribute('id', '_bml_debug_plane_');

      body[0].appendChild(bgPlane);
      body[0].appendChild(plane);

      setVisible(visible);

      document.addEventListener('keydown', function(event) {
        if (event.keyCode == 0x1b) {
          setVisible(!visible);
          event.cancelBubble = true;
        }
      }, false);
      draw();
    } else if (!entryEvent) {
      window.addEventListener('load', arguments.callee, false);
      entryEvent = true;
    }
  }
  /** �ǥХå�����õ����ɽ����ꥻ�åȤ��롥 @name reset */
  function reset() { strBuf = []; count = 0; draw(); }
  /** ���ꤷ���ǥХå���٥�Ǥ�ɽ�����ݤ����ꤹ�롥
   *  @name  setDebugLevel
   *  @param {String} type ���ꤹ��ǥХå���٥�(debug/info/warn/error)
   *  @param {String} bool ɽ������
   */
  function setDebugLevel(type, bool) { level[type] = bool || false; }
  /** BML.js�ե������ɾ�����ϻ����������롥
   *  @name    getLoadStartTime
   *  @returns {Number} �¹Գ��ϻ���(ms)
   */
  function getLoadStartTime() { return(startTime); }
  /**#@-*/

  /**#@+ @methodOf BML.Debug @inner @static @description (̵̾�ؿ���ǤΥ桼�ƥ���ƥ��ؿ��Ǥ��ꡤ�������׳�����ϸ����ʤ���)<br> */
  /** �ǥХå����̤�ɽ��/��ɽ�������椹�롥
   *  @name  setVisible
   *  @param {Boolean} bool ɽ����ɽ���ե饰(ɽ��=��)
   */
  function setVisible(bool) {
    visible = bool;
    if (plane) bgPlane.style.visibility = plane.style.visibility =
      visible ? 'visible' : 'hidden';
    draw();
  }
  /** ���ꤷ��Ĺ���������ʤ�ʸ����κ�¦��'&amp;nbsp;'�����롥<br>
   *  BML.Util.toPaddedString�Υ��꡼����
   *  @name    padNBSP
   *  @param   {String} str   �о�ʸ����
   *  @param   {String} [len] ʸ����˴��Ԥ����Ĺ��
   *  @returns {String}       '&amp;nbsp;'�ǥѥǥ��󥰤���ʸ����
   */
   function padNBSP(str, len) { return(BML.Util.toPaddedString(str, '&#160;', len)); }
  /** ���ꤷ��Ĺ���������ʤ�ʸ����κ�¦��' '�����롥<br>
   *  BML.Util.toPaddedString�Υ��꡼����
   *  @name    padBrank
   *  @param   {String} str   �о�ʸ����
   *  @param   {String} [len] ʸ����˴��Ԥ����Ĺ��
   *  @returns {String}       ' '�ǥѥǥ��󥰤���ʸ����
   */
  function padBrank(str, len) { return(BML.Util.toPaddedString(str, ' ',      len)); }
  /** �ǥХå����̤˥ǥХå��������褹�롥
   *  @name draw */
  function draw() {
    if (plane && visible) {
      plane.innerHTML = (BML.config.debug) ? strBuf.join("<br/>\n") : '';
    }
  }
  /** HTML�Ȥ���ɾ�������ʸ��������ü�ʸ������λ��Ȥ��ѹ����롥
   *  @name escapeHTML */
  function escapeHTML(str) {
    return(String(str || '').replace(/[&\"<>]/g, function(c) {
      return {
        "&": "&amp;",
        '"': "&quot;",
        "<": "&lt;",
        ">": "&gt;"
        }[c];
    }));
  }
  /** ��å����������٥�˹�碌�����������ǥХå����̤˽��Ϥ��롥<br>
   *  firebug�ʤɤγ������󥽡���(window.console)��¸�ߤ�����ˤϤ�����ˤ���Ϥ��롥
   *  @name  write
   *  @param {String} msg            �ǥХå��ѤΥ�å�����
   *  @param {String} [type='debug'] �ǥХå������ϻ��Υ���٥�(debug/info/warn/error)
   */
  function write(msg, type) {
    type = type || 'debug';

    var t = (new Date).getTime();
    if (!BML.Util.isUndefined(window.console) &&
        !BML.Util.isUndefined(window.console[type])) {
      window.console[type]('['+padBrank(count++, 4)+']('+padBrank(t - startTime, 8)+'ms)'+msg);
    }
    if (level[type]) {
      msg = escapeHTML(msg);
      strBuf.push('<span class="_bml_debug_'+type+'_">'+
                  '['+padNBSP(count++, 4)+']('+padNBSP(t - startTime, 8)+'ms)'+msg+
                  '</span>');
      if (strBuf.length > maxLine) strBuf.shift();
      draw();
    }
  }
  /**#@-*/

  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /**#@+ @methodOf BML.Debug @public @static */
  /** debug��٥�ǤΥǥХå��������Ѵؿ���<br>
   *  BML.Debug.write�Υ��꡼���ؿ��Ǥ��ꡤBML.Debug�μ��Ρ�
   *  @name  BML.Debug.debug
   *  @param {String} msg �ǥХå��ѤΥ�å�����
   */
  function debug(msg) { write(msg, 'debug'); }

  BML.Util.extend(debug, /* @lends BML.Debug */ {
    initialize       : initialize,
    /** �ǥХå����̤�ɽ�����롥    @name show */
    show             : function() { setVisible(true);  },
    /** �ǥХå����̤���ɽ���ˤ��롥@name hide */
    hide             : function() { setVisible(false); },
    reset            : reset,
    setDebugLevel    : setDebugLevel,
    getLoadStartTime : getLoadStartTime,
    debug            : debug,
    /** info��٥�ǤΥǥХå��������Ѵؿ���<br>   ** BML.Debug.write�Υ��꡼���ؿ��� @name info    @param {String} msg �ǥХå��ѤΥ�å����� */
    info             : function(msg) { write(msg, 'info' ); },
    /** warning��٥�ǤΥǥХå��������Ѵؿ���<br> ** BML.Debug.write�Υ��꡼���ؿ��� @name warning @param {String} msg �ǥХå��ѤΥ�å����� */
    warning          : function(msg) { write(msg, 'warn' ); },
    /** error��٥�ǤΥǥХå��������Ѵؿ���<br>  ** BML.Debug.write�Υ��꡼���ؿ��� @name error   @param {String} msg �ǥХå��ѤΥ�å����� */
    error            : function(msg) { write(msg, 'error'); }
  });
  /**#@-*/
  
  return(debug);
})();
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
/** CLUT�򰷤��ؿ����Υ͡��ॹ�ڡ��� @namespace @name BML.Clut */
BML.Clut = (function() {
  /**#@+ @memberOf BML.Clut @inner @static @description (̵̾�ؿ��������Ǥ��곰�������Բ�)<br> */
  /** ���������̸��꿧�����CLUT�ե�����˵��Ҥ��줿��������ݻ�����ѥ�å� @name palette @type Array<Array<Number|String>> @default ���������̸��꿧 */
  var palette = [
    // ARIB TR-B14 �軰�ԡ���2�� ��Ͽ1 ���������̸��꿧�׻���
    [  0,  0,  0,255,1.0,'000000'], [255,  0,  0,255,1.0,'ff0000'], [  0,255,  0,255,1.0,'00ff00'], [255,255,  0,255,1.0,'ffff00'],
    [  0,  0,255,255,1.0,'0000ff'], [255,  0,255,255,1.0,'ff00ff'], [  0,255,255,255,1.0,'00ffff'], [255,255,255,255,1.0,'ffffff'],
    [  0,  0,  0,  0,0.0,'000000'],
    [170,  0,  0,255,1.0,'aa0000'], [  0,170,  0,255,1.0,'00aa00'], [170,170,  0,255,1.0,'aaaa00'], [  0,  0,170,255,1.0,'0000aa'],
    [170,  0,170,255,1.0,'aa00aa'], [  0,170,170,255,1.0,'00aaaa'], [170,170,170,255,1.0,'aaaaaa'], [  0,  0, 85,255,1.0,'000055'],
    [  0, 85,  0,255,1.0,'005500'], [  0, 85, 85,255,1.0,'005555'], [  0, 85,170,255,1.0,'0055aa'], [  0, 85,255,255,1.0,'0055ff'],
    [  0,170, 85,255,1.0,'00aa55'], [  0,170,255,255,1.0,'00aaff'], [  0,255, 85,255,1.0,'00ff55'], [  0,255,170,255,1.0,'00ffaa'],
    [ 85,  0,  0,255,1.0,'550000'], [ 85,  0, 85,255,1.0,'550055'], [ 85,  0,170,255,1.0,'5500aa'], [ 85,  0,255,255,1.0,'5500ff'],
    [ 85, 85,  0,255,1.0,'555500'], [ 85, 85, 85,255,1.0,'555555'], [ 85, 85,170,255,1.0,'5555aa'], [ 85, 85,255,255,1.0,'5555ff'],
    [ 85,170,  0,255,1.0,'55aa00'], [ 85,170, 85,255,1.0,'55aa55'], [ 85,170,170,255,1.0,'55aaaa'], [ 85,170,255,255,1.0,'55aaff'],
    [ 85,255,  0,255,1.0,'55ff00'], [ 85,255, 85,255,1.0,'55ff55'], [ 85,255,170,255,1.0,'55ffaa'], [ 85,255,255,255,1.0,'55ffff'],
    [170,  0, 85,255,1.0,'aa0055'], [170,  0,255,255,1.0,'aa00ff'], [170, 85,  0,255,1.0,'aa5500'], [170, 85, 85,255,1.0,'aa5555'],
    [170, 85,170,255,1.0,'aa55aa'], [170, 85,255,255,1.0,'aa55ff'], [170,170, 85,255,1.0,'aaaa55'], [170,170,255,255,1.0,'aaaaff'],
    [170,255,  0,255,1.0,'aaff00'], [170,255, 85,255,1.0,'aaff55'], [170,255,170,255,1.0,'aaffaa'], [170,255,255,255,1.0,'aaffff'],
    [255,  0, 85,255,1.0,'ff0055'], [255,  0,170,255,1.0,'ff00aa'], [255, 85,  0,255,1.0,'ff5500'], [255, 85, 85,255,1.0,'ff5555'],
    [255, 85,170,255,1.0,'ff55aa'], [255, 85,255,255,1.0,'ff55ff'], [255,170,  0,255,1.0,'ffaa00'], [255,170, 85,255,1.0,'ffaa55'],
    [255,170,170,255,1.0,'ffaaaa'], [255,170,255,255,1.0,'ffaaff'], [255,255, 85,255,1.0,'ffff55'], [255,255,170,255,1.0,'ffffaa'],
    [  0,  0,  0,128,0.5,'000000'], [255,  0,  0,128,0.5,'ff0000'], [  0,255,  0,128,0.5,'00ff00'], [255,255,  0,128,0.5,'ffff00'],
    [  0,  0,255,128,0.5,'0000ff'], [255,  0,255,128,0.5,'ff00ff'], [  0,255,255,128,0.5,'00ffff'], [255,255,255,128,0.5,'ffffff'],
    [170,  0,  0,128,0.5,'aa0000'], [  0,170,  0,128,0.5,'00aa00'], [170,170,  0,128,0.5,'aaaa00'], [  0,  0,170,128,0.5,'0000aa'],
    [170,  0,170,128,0.5,'aa00aa'], [  0,170,170,128,0.5,'00aaaa'], [170,170,170,128,0.5,'aaaaaa'], [  0,  0, 85,128,0.5,'000055'],
    [  0, 85,  0,128,0.5,'005500'], [  0, 85, 85,128,0.5,'005555'], [  0, 85,170,128,0.5,'0055aa'], [  0, 85,255,128,0.5,'0055ff'],
    [  0,170, 85,128,0.5,'00aa55'], [  0,170,255,128,0.5,'00aaff'], [  0,255, 85,128,0.5,'00ff55'], [  0,255,170,128,0.5,'00ffaa'],
    [ 85,  0,  0,128,0.5,'550000'], [ 85,  0, 85,128,0.5,'550055'], [ 85,  0,170,128,0.5,'5500aa'], [ 85,  0,255,128,0.5,'5500ff'],
    [ 85, 85,  0,128,0.5,'555500'], [ 85, 85, 85,128,0.5,'555555'], [ 85, 85,170,128,0.5,'5555aa'], [ 85, 85,255,128,0.5,'5555ff'],
    [ 85,170,  0,128,0.5,'55aa00'], [ 85,170, 85,128,0.5,'55aa55'], [ 85,170,170,128,0.5,'55aaaa'], [ 85,170,255,128,0.5,'55aaff'],
    [ 85,255,  0,128,0.5,'55ff00'], [ 85,255, 85,128,0.5,'55ff55'], [ 85,255,170,128,0.5,'55ffaa'], [ 85,255,255,128,0.5,'55ffff'],
    [170,  0, 85,128,0.5,'aa0055'], [170,  0,255,128,0.5,'aa00ff'], [170, 85,  0,128,0.5,'aa5500'], [170, 85, 85,128,0.5,'aa5555'],
    [170, 85,170,128,0.5,'aa55aa'], [170, 85,255,128,0.5,'aa55ff'], [170,170, 85,128,0.5,'aaaa55'], [170,170,255,128,0.5,'aaaaff'],
    [170,255,  0,128,0.5,'aaff00'], [170,255, 85,128,0.5,'aaff55'], [170,255,170,128,0.5,'aaffaa'], [170,255,255,128,0.5,'aaffff'],
    [255,  0, 85,128,0.5,'ff0055'], [255,  0,170,128,0.5,'ff00aa'], [255, 85,  0,128,0.5,'ff5500'], [255, 85, 85,128,0.5,'ff5555'],
    [255, 85,170,128,0.5,'ff55aa'], [255, 85,255,128,0.5,'ff55ff'], [255,170,  0,128,0.5,'ffaa00'], [255,170, 85,128,0.5,'ffaa55'],
    [255,170,170,128,0.5,'ffaaaa'], [255,170,255,128,0.5,'ffaaff'], [255,255, 85,128,0.5,'ffff55']
  ];
  /** ���ͤ�ޤ�colorCode��(RRGGBBAA)����colorIndex�ͤؤΥϥå��塥 @name codeToIdxHash @type Object @default newObject() */
  var codeToIdxHash = {};
  /**#@-*/
  
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /**#@+ @methodOf BML.Clut @inner @static @description (̵̾�ؿ���ǤΥ桼�ƥ���ƥ��ؿ��Ǥ��ꡤ�������׳�����ϸ����ʤ���)<br> */
  /** ����(0��255)��Ʃ��Ψ(0.00��1.00)���Ѵ����롥
   *  @name alphaToOpacity @param {Number} a ���� */
  function alphaToOpacity(a) { return(Math.round( a * 100 / 255) / 100); }
  /** ���ͤ�16��2���ʸ������Ѵ����롥
   *  @name toHexStr @param {Number} n �оݿ��� @returns {String} 16��2���ʸ���� */
  function toHexStr(n) { return(BML.Util.toPaddedString(Number(n).toString(16), '0')); }
  /** 2��������ʤ�16��ʸ����κ�¦��'0'�����16��2���ʸ������������롥
   *  @name padHex @param {String} h �о�16��ʸ���� @returns {String} 16��2���ʸ���� */
  function padHex(h)   { return(BML.Util.toPaddedString(h, '0')); }
  /**#@-*/
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /**#@+ @memberOf BML.Clut @inner @static @constant @description (̵̾�ؿ��������Ǥ��곰�������Բ�)<br> */
  /** BML.Util.toColorCode�ؤΥ��硼�ȥ��å� @name toCode @type Function */
  var toCode = BML.Util.toColorCode;
  /**#@-*/
  
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** palette�ν����(���������̸��꿧)��codeToIdxHash����Ͽ����̵̾�ؿ��� @name BML.Clut.$anonymous @methodOf BML.Clut @inner */
  BML.Util.each.call(palette, function(entry, idx) {
    var code = (entry[5] + toHexStr(entry[3])).toLowerCase();
    if (!codeToIdxHash[code]) codeToIdxHash[code] = idx;
  });
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  return({
    /**#@+ @methodOf BML.Clut @public @static */
    /** CLUT�ե��������������Ϥ��������ѥ�åȥǡ����Ȥ����ݻ����롥
     *  @name   load
     *  @param  {String} uri   CLUT�ե����������URL
     *  @throws {FileNotFound} CLUT�ե����뤬¸�ߤ��ʤ�
     */
    load : function(uri, pattern) {
      BML.CSS.bmlStyle['clut'] = pattern || uri;

      uri = BML.Util.combinePath(uri, BML.uri);
      var ajax = new BML.Ajax(uri, {
        overrideMimeType : 'text/plain; charset=x-user-defined',
        asynchronous     : false,
        method           : 'GET'
      });
      // @Todo�����ơ����������ɤΰ��������󥶥�
      if (ajax.response.statusCode != 200) throw('[FileNotFound] :'+uri);

      // �Х�����Ȥ��ƥХåե�
      // @Todo���虜�虜����������ɬ�פ�̵���ȸ�����̵����
      var bytes = [];
      var stream = ajax.response.responseText;
      for(var i = 0, l = stream.length; i < l; i++) {
        bytes[i] = stream._charCodeAt_(i) & 0x00ff;
      }
      
      var flags  = bytes.shift(); // flag��̵�뤹�� @Todo���������뤫?
      var sIdx   = bytes.shift(); // ���ϥ���ǥå�����
      var eIdx   = bytes.shift(); // ��λ����ǥå�����
      while(sIdx <= eIdx) {
        var y  = bytes.shift();
        var cb = bytes.shift();
        var cr = bytes.shift();
        // YCbCr�ͤ�RGB�ͤ��Ѵ�
        var r  = Math.floor(1.164 * (y-16)                    + 1.596 * (cr-128));
        var g  = Math.floor(1.164 * (y-16) - 0.391 * (cb-128) - 0.813 * (cr-128));
        var b  = Math.floor(1.164 * (y-16) + 2.018 * (cb-128));

        r = Math.max(0, Math.min(255, r));
        g = Math.max(0, Math.min(255, g));
        b = Math.max(0, Math.min(255, b));

        var code                  = toCode(r,g,b);
        var alpha                 = bytes.shift();
        palette[sIdx]             = [r, g, b, alpha, alphaToOpacity(alpha), code];
        codeToIdxHash[code+alpha] = sIdx++;
      }
    },
    /** colorIndex�ͤ˳������뿧�����������롥<br>
     *  �����ѥ�åȤ˳����ο�����̵������null���֤���
     *  @name    getRGB
     *  @param   {Number} idx colorIndex��
     *  @returns {Object}     ������<br>
                              [.r] ��(0��255)<br>
                              [.g] ��(0��255)<br>
                              [.b] ��(0��255)<br>
                              [.a] ����(0��255)<br>
                              [.opacity] Ʃ��Ψ(0.00��1.00)<br>
                              [.code] colorCode(RGB�γ��ͤ�16��2���ɽ������16��6���ʸ����)
     */
    getRGB : function(idx) {
      idx = Math.floor(idx);
      return(((idx < 0) || (idx >= palette.length)) ? null : 
             (function() {
               var p = palette[idx];
               return({ r : p[0], g : p[1], b : p[2], a : p[3], opacity : p[4], code : p[5] });
             })());
    },
    /** ������(RGB�ͤ����Ʃ��Ψ)�˳����ѥ�åȤΥ���ǥ�����(colorIndex��)��������롥<br>
     *  ��������colorIndex�ͤ�¸�ߤ��ʤ�����-1���֤���
     *  @name    colorToIdx
     *  @param   {Number} r       ��(0��255)
     *  @param   {Number} g       ��(0��255)
     *  @param   {Number} b       ��(0��255)
     *  @param   {Number} opacity Ʃ��Ψ(0.00��1.00)
     *  @returns {Number}         colorIndex��(0�������ѥ�åȤκ��祤��ǥ�����)
     */
    colorToIdx : function(r, g, b, opacity) {
      // @Todo�����׻����ʤ��褦�˥ϥå���κ�������Ѥ��������ɤ����⤷��ʤ���
      var code = toHexStr(r) + toHexStr(g) + toHexStr(b) + toHexStr(Math.floor(opacity * 255));
      var idx = codeToIdxHash[code.toLowerCase()];
      return((idx >= 0)? idx : -1);
    }
    /**#@-*/
  });
})();
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
/** CSS��Ϣ�򰷤��ؿ����Υ͡��ॹ�ڡ��� @namespace @name BML.CSS */
BML.CSS = (function() {
  /** BMLʸ��Υ��������� @type Object @memberOf BML.CSS @name bmlStyle */
  var bmlStyle = {
    /** BMLʸ���resolution����         @name resolution         @memberOf BML.CSS.bmlStyle @type String @default '960x540' @constant */
    resolution          : '960x540',
    /** BMLʸ���displayAspectRatio���� @name displayAspectRatio @memberOf BML.CSS.bmlStyle @type String @default '16v9' */
    displayAspectRatio  : '16v9',
    /** BMLʸ���usedKeyList����        @name usedKeyList        @memberOf BML.CSS.bmlStyle @type String @default 'basic data-button' */
    usedKeyList         : 'basic data-button',
    /** BMLʸ���clut����               @name clut               @memberOf BML.CSS.bmlStyle @type String @default null */
    clut                : null
  };
  /** BMLʸ���:active�������饹��<br> ** ���쥯����ϥå��奭����������̾����������ͤ��ݻ�����ϥå����ϥå����ͤȤ��ƻ��ġ� @type Object @memberOf BML.CSS @name activeStyle */
  var activeStyle = {};
  /** BMLʸ���:focus�������饹��<br> **  ���쥯����ϥå��奭����������̾����������ͤ��ݻ�����ϥå����ϥå����ͤȤ��ƻ��ġ�   @type Object @memberOf BML.CSS @name focusStyle */
  var focusStyle  = {};
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /**#@+ @memberOf BML.CSS @public @static */
  function setAspectRatio(str) {
    bmlStyle.displayAspectRatio = str;
  }
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /**#@+ @memberOf BML.CSS @public @static */
  function setFocusStyle(selector, property) {
    if (!focusStyle[selector]) focusStyle[selector] = {};
    BML.Util.extend(focusStyle[selector], property || {});
  }
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /**#@+ @memberOf BML.CSS @public @static */
  function setActiveStyle(selector, property) {
    if (!activeStyle[selector]) activeStyle[selector] = {};
    BML.Util.extend(activeStyle[selector], property || {});
  }
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /**#@+ @memberOf BML.CSS @public @static */
  function getFocusStyle(element) {
    var ret = {};
    // NetFrontBMLViewer��*:focus��E:focus�Ǿ�񤭤���褦�˸����뤿�ᡤ
    // �����򤽤�˹�碌��(���ʤ��������νи���˰�¸���ʤ�)
    BML.Util.extend(ret, focusStyle['all'] || {});
    BML.Util.extend(ret, focusStyle[element.nodeName] || {});
    return(ret);
  }
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /**#@+ @memberOf BML.CSS @public @static */
  function getActiveStyle(element) {
    var ret = {};
    // NetFrontBMLViewer��*:focus��E:focus�Ǿ�񤭤���褦�˸����뤿�ᡤ
    // �����򤽤�˹�碌��(���ʤ��������νи���˰�¸���ʤ�)
    BML.Util.extend(ret, activeStyle['all'] || {});
    BML.Util.extend(ret, activeStyle[element.nodeName] || {});
    return(ret);
  }
  /**#@-*/
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /**#@+ @memberOf BML.CSS @inner @static @constant @description (̵̾�ؿ��������Ǥ��곰�������Բ�)<br> */
  /** BML.Util.getStyle�ؤΥ��硼�ȥ��åȡ� @type Function  @name BML.CSS.getStyle */
  var getStyle = BML.Util.getStyle;
  /** BML.Util.supportSpecificHTMLElement�ؤΥ��硼�ȥ��åȡ� @type Boolean  @name BML.CSS.supportSpecificHTMLElement */
  var supportSpecificHTMLElement = BML.Util.supportSpecificHTMLElement;
  /** normalStyle°����ͭ����HTMLElement��DOM���󥿥ե�����̾�ν��硥 @type Array<String>  @name normalStyleDOMInterface */
  var normalStyleDOMInterface = supportSpecificHTMLElement ?
    [ HTMLDivElement,    HTMLSpanElement,  HTMLParagraphElement, HTMLBRElement,
      HTMLAnchorElement, HTMLInputElement, HTMLObjectElement,    HTMLBodyElement ] :
    [ HTMLElement ];
  /** focusStyle/activeStyle°����ͭ����HTMLElement��DOM���󥿥ե�����̾�ν��硥 @type Array<String>  @name pseudoStyleDOMInterface */
  var pseudoStyleDOMInterface = supportSpecificHTMLElement ?
    [ HTMLDivElement,    HTMLSpanElement,  HTMLParagraphElement,
      HTMLAnchorElement, HTMLInputElement, HTMLObjectElement ] :
    [ HTMLElement ];
  /** normalStyle��ͳ���ɤ߽񤭲�ǽ������̾��Ƚ��������ɽ���� @type RegExp  @name pseudoClassReadWritePropertyMatcher */
  var pseudoClassReadWritePropertyMatcher = new RegExp('(:?left|top|width|height|visibility|'+
                                                     'fontFamily|fontSize|fontWeight|colorIndex|'+
                                                     'backgroundColorIndex|borderTopColorIndex|'+
                                                     'borderRightColorIndex|borderLeftColorIndex|'+
                                                     'borderBottomColorIndex|grayscaleColorIndex)');
  /** normalStyle��ͳ�ǽ񤭹����ԲĤ�����̾��Ƚ��������ɽ���� @type RegExp  @name pseudoClassReadOnlyPropertyMatcher */
  var pseudoClassReadOnlyPropertyMatcher  = new RegExp('(:?borderStyle|borderWidth)');
  /**#@-*/

  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** normalStyle�����˥�����������CSS���󥿥ե��������󶡤��륯�饹
   *  @class ����normalStyle���֥������ȥ��饹
   *  @name  BML.CSS-NormalStyle
   *  @param {HTMLElement} elm normalStyle���������оݤ�����
   */
  function NormalStyle(elm) {
    /**#@+ @memberOf BML.CSS-NormalStyle.prototype @public */
    /** normalStyle���������оݤ����� @propertyEx element|HTMLElement|���󥹥ȥ饯���ΰ��� */
    this.element = elm;
    /** �оݤ����ǤΥ���̾              @propertyEx tagName|String     |���󥹥ȥ饯���ΰ����Υ���̾ */
    this.tagName = elm.tagName.toLowerCase();
    /**#@-*/
  }
  BML.Util.hashEach.call({ // readOnly properties
    /**#@+ @memberOf BML.CSS-NormalStyle.prototype */
    /** paddingTop����(div,p,input,object���ǤΤ�)         @propertyEx paddingTop   |String|readOnly */
    paddingTop    : /(?:div|p|input|object)/,
    /** paddingBottom����(div,p,input,object���ǤΤ�)      @propertyEx paddingBottom|String|readOnly */
    paddingBottom : /(?:div|p|input|object)/,
    /** paddingLeft����(div,p,input,object���ǤΤ�)        @propertyEx paddingLeft  |String|readOnly */
    paddingLeft   : /(?:div|p|input|object)/,
    /** paddingRight����(div,p,input,object���ǤΤ�)       @propertyEx paddingRight |String|readOnly */
    paddingRight  : /(?:div|p|input|object)/,
    /** broderWidth����(div,p,span,a,input,object���ǤΤ�) @propertyEx borderWidth  |String|readOnly */
    borderWidth   : /(?:div|p|span|a|input|object)/,
    /** broderStyle����(div,p,span,a,input,object���ǤΤ�) @propertyEx borderStyle  |String|readOnly */
    borderStyle   : /(?:div|p|span|a|input|object)/,
    /** lineHeight����(p,br,span,a,input���ǤΤ�)          @propertyEx lineHeight   |String|readOnly */
    lineHeight    : /(?:p|br|span|a|input)/,
    /** textAlign����(p,input���ǤΤ�)                     @propertyEx textAlign    |String|readOnly */
    textAlign     : /(?:p|input)/,
    /** letterSpacing����(p,span,a,input���ǤΤ�)          @propertyEx letterSpacing|String|readOnly */
    letterSpacing : /(?:p|span|a|input)/
    /**#@-*/
    /** ReadOnly��CSS������NormalStyle.prototype��getter�Ȥ������ꤹ��̵̾�ؿ���
     *  @name  BML.CSS.$anonymous1 @methodOf BML.CSS @inner
     *  @param {String} proeprtyName CSS����̾
     *  @param {RegExp} validTagName CSS������Ŭ�Ѳ�ǽ�����ǤΥ���̾��������ɽ�� */
  }, function(propertyName, validTagName) {
    /** style°������CSS����̾�˳��������ͤ��֤�getter��̵̾��������ؿ���
     *  @name    BML.CSS.$anonymous2 @methodOf BML.CSS @inner
     *  @returns {String} CSS����̾�˳�������style������ */
    NormalStyle.prototype.__defineGetter__(propertyName, function() {
      return(validTagName.test(this.tagName) ? getStyle(this.element, propertyName) : '');
    });
  });
  
  BML.Util.hashEach.call({ // readable/writable property
    /**#@+ @memberOf BML.CSS-NormalStyle.prototype */
    /** left����(div,p,input,object���ǤΤ�)                   @propertyEx left       |String|read/write */
    left       : /(?:div|p|input|object)/,
    /** top����(div,p,input,object���ǤΤ�)                    @propertyEx top        |String|read/write */
    top        : /(?:div|p|input|object)/,
    /** width����(div,p,input,object���ǤΤ�)                  @propertyEx width      |String|read/write */
    width      : /(?:div|p|input|object)/,
    /** height����(div,p,input,object���ǤΤ�)                 @propertyEx height     |String|read/write */
    height     : /(?:div|p|input|object)/,
    /** visibility����(div,p,span,a,input,object,body���ǤΤ�) @propertyEx visibility |String|read/write */
    visibility : /(?:div|p|span|a|input|object|body)/,
    /** fontFamily����(p,span,a,input���ǤΤ�)                 @propertyEx fontFamily |String|read/write */
    fontFamily : /(?:p|span|a|input)/,
    /** fontSize����(p,span,a,input���ǤΤ�)                   @propertyEx fontSize   |String|read/write */
    fontSize   : /(?:p|span|a|input)/,
    /** fontWeight����(p,span,a,input���ǤΤ�)                 @propertyEx fontWeight |String|read/write */
    fontWeight : /(?:p|span|a|input)/
    /**#@-*/
    /** �ɤ߽񤭲�ǽ��CSS������NormalStyle.prototype��getter/setter�Ȥ������ꤹ��̵̾�ؿ���
     *  @name  BML.CSS.$anonymous3 @methodOf BML.CSS @inner
     *  @param {String} proeprtyName CSS����̾
     *  @param {RegExp} validTagName CSS������Ŭ�Ѳ�ǽ�����ǤΥ���̾��������ɽ�� */
  }, function(propertyName, validTagName) {
    /** style°������CSS����̾�˳��������ͤ��֤�getter��̵̾��������ؿ���
     *  @name    BML.CSS.$anonymous4 @methodOf BML.CSS @inner
     *  @returns {String} CSS����̾�˳�������style������ */
    NormalStyle.prototype.__defineGetter__(propertyName, function() {
      return(validTagName.test(this.tagName) ? getStyle(this.element, propertyName) : '');
    });
    /** style°�����Ф���CSS����̾�˳��������ͤ����ꤹ��setter��̵̾��������ؿ���
     *  @name    BML.CSS.$anonymous5 @methodOf BML.CSS @inner
     *  @param   {String} value CSS���������ꤹ��CSS������ */
    NormalStyle.prototype.__defineSetter__(propertyName, function(value) {
      if (validTagName.test(this.tagName)) this.element.style[propertyName] = value;
    });
  });

  BML.Util.each.call([
    /**#@+ @memberOf BML.CSS-NormalStyle.prototype */
    /** navUp����(div,p,span,a,input,object���ǤΤ�)    @propertyEx navUp   |String|readOnly */
    'navUp',
    /** navDown����(div,p,span,a,input,object���ǤΤ�)  @propertyEx navDown |String|readOnly */
    'navDown',
    /** navLeft����(div,p,span,a,input,object���ǤΤ�)  @propertyEx navLeft |String|readOnly */
    'navLeft',
    /** navRight����(div,p,span,a,input,object���ǤΤ�) @propertyEx navRight|String|readOnly */
    'navRight',
    /** navIndex����(div,p,span,a,input,object���ǤΤ�) @propertyEx navIndex|String|readOnly */
    'navIndex'
    /**#@-*/
    /** navigation�����˴ؤ��ReadOnly��CSS������NormalStyle.prototype��getter�Ȥ������ꤹ��̵̾�ؿ���
     *  @name  BML.CSS.$anonymous6 @methodOf BML.CSS @inner
     *  @param {String} proeprtyName CSS����̾ */
  ], function(propertyName) {
    /** _navProperty�ץ�ѥƥ�����navigation����̾�˳��������ͤ��֤�getter��̵̾��������ؿ���
     *  @name    BML.CSS.$anonymous7 @methodOf BML.CSS @inner
     *  @returns {String} navigation����̾�˳�������navigation������ */
    NormalStyle.prototype.__defineGetter__(propertyName, function() {
      return(/(?:div|p|span|a|input|object)/.test(this.tagName) ? 
             this.element._navigation[propertyName.substring(3).toLowerCase()] : '');
    });
  });
  
  BML.Util.each.call([
    /**#@+ @memberOf BML.CSS-NormalStyle.prototype */
    /** clut����(body���ǤΤ�)               @propertyEx BML.CSS-NormalStyle.prototype.clut              |String|readOnly */
    'clut',
    /** resolution����(body���ǤΤ�)         @propertyEx BML.CSS-NormalStyle.prototype.resolution        |String|readOnly */
    'resolution',
    /** displayAspectRatio����(body���ǤΤ�) @propertyEx BML.CSS-NormalStyle.prototype.displayAspectRatio|String|readOnly */
    'displayAspectRatio'
    /**#@-*/
    /** body������ͭ��ReadOnly��CSS������NormalStyle.prototype��getter�Ȥ������ꤹ��̵̾�ؿ���
     *  @name  BML.CSS.$anonymous8 @methodOf BML.CSS @inner
     *  @param {String} proeprtyName CSS����̾ */
  ], function(propertyName) {
    /** BML.CSS.bmlStyle�ץ�ѥƥ�����CSS����̾�˳��������ͤ��֤�getter��̵̾��������ؿ���
     *  @name    BML.CSS.$anonymous9 @methodOf BML.CSS @inner
     *  @returns {String}    CSS����̾�˳�������CSS������ */
    NormalStyle.prototype.__defineGetter__(propertyName, function() {
      return(/body/.test(this.tagName) ? BML.CSS.bmlStyle[propertyName] : null);
    });
  });
    
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /**#@+ @memberOf BML.CSS-NormalStyle.prototype */
  /** usedKeyList����(body���ǤΤ�) @propertyEx BML.CSS-NormalStyle.prototype.usedKeyList|String|read/write */
  NormalStyle.prototype.__defineGetter__('usedKeyList', function() {
    return(/body/.test(this.tagName) ? BML.CSS.bmlStyle.usedKeyList : null);
  });
  NormalStyle.prototype.__defineSetter__('usedKeyList', function(val) {
    if (/body/.test(this.tagName)) BML.Navigation.setUsedKeyList(val);
  });
  /**#@-*/

  BML.Util.hashEach.call({
    /**#@+ @memberOf BML.CSS-NormalStyle.prototype */
    /** colorIndex����(p,span,a,input���ǤΤ�)                           @propertyEx colorIndex            |String|read/write */
    colorIndex             : ['color',             /(?:p|span|a|input)/],
    /** backgroundColorIndex����(div,p,span,a,input,object,body���ǤΤ�) @propertyEx backgroundColorIndex  |String|read/write */
    backgroundColorIndex   : ['backgroundColor',   /(?:div|p|span|a|input|object|body)/],
    /** borderTopColorIndex����(div,p,span,a,input���ǤΤ�)              @propertyEx borderTopColorIndexw  |String|read/write */
    borderTopColorIndex    : ['borderTopColor',    /(?:div|p|span|a|input)/],
    /** borderRightColorIndex����(div,p,span,a,input���ǤΤ�)            @propertyEx borderRightColorIndex |String|read/write */
    borderRightColorIndex  : ['borderRightColor',  /(?:div|p|span|a|input)/],
    /** borderLeftColorIndex����(div,p,span,a,input���ǤΤ�)             @propertyEx borderLeftColorIndex  |String|read/write */
    borderLeftColorIndex   : ['borderLeftColor',   /(?:div|p|span|a|input)/],
    /** borderBottomColorIndex����(div,p,span,a,input���ǤΤ�)           @propertyEx borderBottomColorIndex|String|read/write */
    borderBottomColorIndex : ['borderBottomColor', /(?:div|p|span|a|input)/]
    /**#@-*/
    /** �ɤ߽񤭲�ǽ��colorIndex�˴ؤ��CSS������NormalStyle.prototype��getter/setter�Ȥ������ꤹ��̵̾�ؿ���
     *  @name  BML.CSS.$anonymous10 @methodOf BML.CSS @inner
     *  @param {String} proeprtyName    CSS����̾
     *  @param {Array}  condition       CSS����̾���б�����style°��̾�������CSS������Ŭ�Ѳ�ǽ�����ǤΥ���̾��������ɽ�����������*/
  }, function(propertyName, condition) {
    /** style°�����Ф���CSS����̾�˳���������(RGB�͵ڤ�Ʃ��Ψ)�������colorIndex�ͤ��֤�getter��̵̾��������ؿ���
     *  @name    BML.CSS.$anonymous11 @methodOf BML.CSS @inner
     *  @param   {String} value colorIndex�˴ؤ��CSS����̾
     *  @returns {Number}       CSS����̾�˳�������colorIndex�� */
    NormalStyle.prototype.__defineGetter__(propertyName, function() {
      if (!condition[1].test(this.tagName)) return('');
      
      var r = 0, g = 0, b = 0, opacity = 0;
      var color = getStyle(this.element, condition[0]);
      if (/transparent/) {
        r = 0; g = 0; b = 0; opacity = 0;
      } else if (/rgb\((\d+)[^\d]+(\d+)[^\d]+(\d+)(?:[^\d]+(\d+))?\)/.test(color)) {
        r = RegExp.$1; g = RegExp.$2; b = RegExp.$3;
        opacity = (RegExp.$4) ? RegExp.$4: (getStyle(this.element, 'opacity') || 0);
      }
      return(Number(BML.Clut.colorToIdx(r, g, b, opacity)));
    });
    /** style°�����Ф���CSS����̾�˳�������colorIndex�ͤ�RGB�͵ڤ�Ʃ��Ψ���Ѵ������ꤹ��setter��̵̾��������ؿ���
     *  @name    BML.CSS.$anonymous12 @methodOf BML.CSS @inner
     *  @param   {Number} value CSS���������ꤹ��colorIndex�� */
    NormalStyle.prototype.__defineSetter__(propertyName, function(value) {
      if (!condition[1].test(this.tagName)) return;
      var rgb = BML.Clut.getRGB(value);
      if (!rgb) rgb = { code : '000000', opacity : 1.0 };

      if ((rgb.code === '000000') && (rgb.opacity === 0)) {
        this.element.style[condition[0]] = '';
        this.element.style.opacity       = '';
      } else {
        this.element.style[condition[0]] = '#'+rgb.code;
        this.element.style.opacity       = rgb.opacity;
      }
    });
  });
  /**#@+ @memberOf BML.CSS-NormalStyle.prototype */
  /** grayscaleColorIndex����(p,span,a,input���ǤΤ�)<br>
   *  ���������Ǥ��ꡤgrayscaleColorIndex�����Ȥ���ư��ʤ���
   *  @propertyEx grayscaleColorIndex|String|read/write */
  /**#@-*/
  NormalStyle.prototype.__defineGetter__('grayscaleColorIndex', function() {
    /** grayscaleColorIndex�����򰷤�getter��̵̾�ؿ���<br>**���������Ǥ���ǥե�����ͤ��֤���
     *  @name     BML.CSS.$anonymous13 @methodOf BML.CSS @inner
     *  @returns  {String} �ǥե���Ȥ�grayscaleColorIndex��('30 15') */
    return(/(?:p|span|a|input)/.test(this.tagName) ? '30 15' : ''); // return default value
  });
    /** grayscaleColorIndex�����򰷤�setter��̵̾�ؿ���<br>**���������Ǥ��겿��Ԥ�ʤ���
     *  @name    BML.CSS.$anonymous14 @methodOf BML.CSS @inner
     *  @param   {String} value grayscaleColorIndex���������ꤹ��colorIndex�� */
  NormalStyle.prototype.__defineSetter__('grayscaleColorIndex', function(value) {
  });

  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** :active/:focus�������饹��CSS�������Ф��륤�󥿥ե��������󶡤��륯�饹
   *  @class :active/:focus�������饹��CSS�������������Ѷ��̥��֥������ȥ��饹
   *  @name  BML.CSS-PseudoClassStyle
   *  @param {HTMLElement} elm :active/:focus�������饹�ˤ�����CSS���������о�����
   */
  function PseudoClassStyle(elm, isFocusStyle) {
    /**#@+ @memberOf BML.CSS-PseudoClassStyle.prototype @public */
    /** :active/:focus�ˤ�����CSS���������оݤ�����                         @propertyEx BML.CSS-PseudoClassStyle.prototype.element     |HTMLElement|���󥹥ȥ饯���ΰ��� */
    this.element      = elm;
    /** �оݤ����ǤΥ���̾                                                    @propertyEx BML.CSS-PseudoClassStyle.prototype.tagName     |String     |���󥹥ȥ饯���ΰ����Υ���̾ */
    this.tagName      = elm.tagName.toLowerCase();
    /** :active/:focus�ˤ�����CSS�����Τ����줫�򼨤��ե饰                   @propertyEx BML.CSS-PseudoClassStyle.prototype.isFocusStyle|Boolean    |���󥹥ȥ饯���ΰ��� */
    this.isFocusStyle = isFocusStyle;
    /** :active/:focus�ˤ����뼫�Ȥ�CSS�������ݻ�����ϥå���                 @propertyEx BML.CSS-PseudoClassStyle.prototype.sytle       |Object     |null */
    this.style        = null;
    /** :active/:focus��Ŭ�Ѥ����ݤ��֤�������줿sytle�������ݻ�����ϥå��� @propertyEx BML.CSS-PseudoClassStyle.prototype.prevSytle   |Object     |null */
    this.prevStyle    = null;
    /**#@-*/
  }
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /**#@+ @methodOf BML.CSS-PseudoClassStyle.prototype @public */
  /** :active/:focus�������饹�ˤ����뼫�Ȥ�CSS������������롥<br>
   *  @name    BML.CSS-PseudoClassStyle.prototype.getStyle
   *  @returns {Object} :active/:focus�������饹�ˤ�����CSS�����Υϥå���
   */
  PseudoClassStyle.prototype.getStyle = function() {
    var obj = this.isFocusStyle ? this.element._focusStyleObj : this.element._activeStyleObj;
    if (!obj.style) obj.style = this.isFocusStyle ?
      BML.CSS.getFocusStyle(this.element) : BML.CSS.getActiveStyle(this.element);
    return(obj.style);
  };
  /**#@-*/
  BML.Util.hashEach.call({ // readable/writable property
    /**#@+ @memberOf BML.CSS-PseudoClassStyle.prototype */
    /** left����(div,p,input,object���ǤΤ�)                   @propertyEx BML.CSS-PseudoClassStyle.prototype.left       |String|read/write */
    left       : /(?:div|p|input|object)/,
    /** top����(div,p,input,object���ǤΤ�)                    @propertyEx BML.CSS-PseudoClassStyle.prototype.top        |String|read/write */
    top        : /(?:div|p|input|object)/,
    /** width����(div,p,input,object���ǤΤ�)                  @propertyEx BML.CSS-PseudoClassStyle.prototype.width      |String|read/write */
    width      : /(?:div|p|input|object)/,
    /** height����(div,p,input,object���ǤΤ�)                 @propertyEx BML.CSS-PseudoClassStyle.prototype.height     |String|read/write */
    height     : /(?:div|p|input|object)/,
    /** visibility����(div,p,span,a,input,object,body���ǤΤ�) @propertyEx BML.CSS-PseudoClassStyle.prototype.visibility |String|read/write */
    visibility : /(?:div|p|span|a|input|object|body)/,
    /** fontFamily����(p,span,a,input���ǤΤ�)                 @propertyEx BML.CSS-PseudoClassStyle.prototype.fontFamily |String|read/write */
    fontFamily : /(?:p|span|a|input)/,
    /** fontSize����(p,span,a,input���ǤΤ�)                   @propertyEx BML.CSS-PseudoClassStyle.prototype.fontSize   |String|read/write */
    fontSize   : /(?:p|span|a|input)/,
    /** fontWeight����(p,span,a,input���ǤΤ�)                 @propertyEx BML.CSS-PseudoClassStyle.prototype.fontWeight |String|read/write */
    fontWeight : /(?:p|span|a|input)/
    /**#@-*/
    /** �ɤ߽񤭲�ǽ��CSS������PseudoClassStyle.prototype��getter/setter�Ȥ������ꤹ��̵̾�ؿ���
     *  @name  BML.CSS.$anonymous15 @methodOf BML.CSS @inner
     *  @param {String} proeprtyName CSS����̾
     *  @param {RegExp} validTagName CSS������Ŭ�Ѳ�ǽ�����ǤΥ���̾��������ɽ�� */
  }, function(propertyName, validTagName) {
    /** style°������CSS����̾�˳��������ͤ��֤�getter��̵̾��������ؿ���
     *  @name    BML.CSS.$anonymous16 @methodOf BML.CSS @inner
     *  @returns {String} CSS����̾�˳�������style������ */
    PseudoClassStyle.prototype.__defineGetter__(propertyName, function() {
      return(validTagName.test(this.tagName) ? this.getStyle()[propertyName] : '');
    });
    /** style°�����Ф���CSS����̾�˳��������ͤ����ꤹ��setter��̵̾��������ؿ���
     *  @name    BML.CSS.$anonymous17 @methodOf BML.CSS @inner
     *  @param   {String} value CSS���������ꤹ��CSS������ */
    PseudoClassStyle.prototype.__defineSetter__(propertyName, function(value) {
      if (validTagName.test(this.tagName)) this.getStyle()[propertyName] = value;
    });
  });
  BML.Util.hashEach.call({
    /**#@+ @memberOf BML.CSS-PseudoClassStyle.prototype */
    /** colorIndex����(p,span,a,input���ǤΤ�)                           @propertyEx BML.CSS-PseudoClassStyle.prototype.colorIndex            |String|read/write */
    colorIndex             : /(?:p|span|a|input)/,
    /** backgroundColorIndex����(div,p,span,a,input,object,body���ǤΤ�) @propertyEx BML.CSS-PseudoClassStyle.prototype.backgroundColorIndex  |String|read/write */
    backgroundColorIndex   : /(?:div|p|span|a|input|object|body)/,
    /** borderTopColorIndex����(div,p,span,a,input���ǤΤ�)              @propertyEx BML.CSS-PseudoClassStyle.prototype.borderTopColorIndexw  |String|read/write */
    borderTopColorIndex    : /(?:div|p|span|a|input)/,
    /** borderRightColorIndex����(div,p,span,a,input���ǤΤ�)            @propertyEx BML.CSS-PseudoClassStyle.prototype.borderRightColorIndex |String|read/write */
    borderRightColorIndex  : /(?:div|p|span|a|input)/,
    /** borderLeftColorIndex����(div,p,span,a,input���ǤΤ�)             @propertyEx BML.CSS-PseudoClassStyle.prototype.borderLeftColorIndex  |String|read/write */
    borderLeftColorIndex   : /(?:div|p|span|a|input)/,
    /** borderBottomColorIndex����(div,p,span,a,input���ǤΤ�)           @propertyEx BML.CSS-PseudoClassStyle.prototype.borderBottomColorIndex|String|read/write */
    borderBottomColorIndex : /(?:div|p|span|a|input)/
    /**#@-*/
    /** �ɤ߽񤭲�ǽ��colorIndex�˴ؤ��CSS������PseudoClassStyle.prototype��getter/setter�Ȥ������ꤹ��̵̾�ؿ���
     *  @name  BML.CSS.$anonymous18 @methodOf BML.CSS @inner
     *  @param {String} proeprtyName    CSS����̾
     *  @param {Array}  condition       CSS������Ŭ�Ѳ�ǽ�����ǤΥ���̾��������ɽ����*/
  }, function(propertyName, condition) {
    /** style°�����Ф���CSS����̾�˳���������(RGB�͵ڤ�Ʃ��Ψ)�������colorIndex�ͤ��֤�getter��̵̾��������ؿ���
     *  @name    BML.CSS.$anonymous19 @methodOf BML.CSS @inner
     *  @param   {String} value colorIndex�˴ؤ��CSS����̾
     *  @returns {Number}       CSS����̾�˳�������colorIndex�� */
    PseudoClassStyle.prototype.__defineGetter__(propertyName, function() {
      if (!condition.test(this.tagName)) return(8);

      var index = this.getStyle()[propertyName];
      return(BML.Util.isUndefined(index) ? 8 : Number(index));
    });
    /** style°�����Ф���CSS����̾�˳�������colorIndex�ͤ�RGB�͵ڤ�Ʃ��Ψ���Ѵ������ꤹ��setter��̵̾��������ؿ���
     *  @name    BML.CSS.$anonymous20 @methodOf BML.CSS @inner
     *  @param   {Number} value CSS���������ꤹ��colorIndex�� */
    PseudoClassStyle.prototype.__defineSetter__(propertyName, function(value) {
      if (!condition.test(this.tagName)) return;
      this.getStyle()[propertyName] = value;
    });
  });
  /**#@+ @memberOf BML.CSS-PseudoClassStyle.prototype */
  /** grayscaleColorIndex����(p,span,a,input���ǤΤ�)<br>
   *  ���������Ǥ��ꡤgrayscaleColorIndex�����Ȥ���ư��ʤ���
   *  @propertyEx BML.CSS-PseudoClassStyle.prototype.grayscaleColorIndex|String|read/write */
  /**#@-*/
  PseudoClassStyle.prototype.__defineGetter__('grayscaleColorIndex', function() {
    /** grayscaleColorIndex�����򰷤�getter��̵̾�ؿ���<br>**���������Ǥ���ǥե�����ͤ��֤���
     *  @name     BML.CSS.$anonymous21 @methodOf BML.CSS @inner
     *  @returns  {String} �ǥե���Ȥ�grayscaleColorIndex��('30 15') */
    return(/(?:p|span|a|input)/.test(this.tagName) ? '30 15' : ''); // return default value
  });
    /** grayscaleColorIndex�����򰷤�setter��̵̾�ؿ���<br>**���������Ǥ��겿��Ԥ�ʤ���
     *  @name    BML.CSS.$anonymous22 @methodOf BML.CSS @inner
     *  @param   {String} value grayscaleColorIndex���������ꤹ��colorIndex�� */
  PseudoClassStyle.prototype.__defineSetter__('grayscaleColorIndex', function(value) {
  });

  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** normalStyle����(div,p,br,a,span,input,object,body���ǤΤ�)�� @propertyEx HTMLElement.prototype.normalStyle|BML.CSS-NormalStyle|readOnly */
  /** �����ǽ�����Ǥ��Ф���normalStyle������HTMLElement.prototype��getter�Ȥ������ꤹ��̵̾�ؿ���
   *  @name  BML.CSS.$anonymous23 @methodOf BML.CSS @inner
   *  @param {DOMInterface} dom normalStyle�����������ǽ��DOM���󥿥ե����� */
  BML.Util.each.call(normalStyleDOMInterface, function(dom) {
    try {
      /** normalStyle�������Ф���getter��̵̾�ؿ���
       *  @name  BML.CSS.$anonymous24 @methodOf BML.CSS @inner */
      dom.prototype.__defineGetter__('normalStyle', function() {
        /** NormalStyle���֥������Ȥ��ݻ�����ץ饤�١��ȥץ�ѥƥ���  @public @propertyEx HTMLElement.prototype._normalStyleObj|BML.CSS-NormalStyle|new NormalStyle */
        if (!this._normalStyleObj) this._normalStyleObj = new NormalStyle(this);
        return(this._normalStyleObj);
      });
    } catch(e) { BML.Debug.error(e); }
  });
  /** �����ǽ�����Ǥ��Ф���focusStyle/activeStyle������HTMLElement.prototype��getter�Ȥ������ꤹ��̵̾�ؿ���
   *  @name  BML.CSS.$anonymous25 @methodOf BML.CSS @inner
   *  @param {DOMInterface} dom normalStyle�����������ǽ��DOM���󥿥ե����� */
  BML.Util.each.call(pseudoStyleDOMInterface, function(dom) {
    try {
      /** focusStyle����(div,p,a,span,input,object���ǤΤ�)�� @propertyEx HTMLElement.prototype.focusStyle|BML.CSS-PseudoClassStyle|readOnly */
      /** focusStyle�������Ф���getter��̵̾�ؿ���
       *  @name  BML.CSS.$anonymous26 @methodOf BML.CSS @inner */
      dom.prototype.__defineGetter__('focusStyle',  function() {
        /** PseudoClassStyle���֥������Ȥ��ݻ�����ץ饤�١��ȥץ�ѥƥ���  @public @propertyEx HTMLElement.prototype._focusStyleObj|BML.CSS-PseudoClassStyle|new PseudoClassStyle */
        if (!this._focusStyleObj)  this._focusStyleObj  = new PseudoClassStyle(this, true);
        return(this._focusStyleObj);
      });
      /** activeStyle����(div,p,a,span,input,object���ǤΤ�)�� @propertyEx HTMLElement.prototype.activeStyle|BML.CSS-PseudoClassStyle|readOnly */
      /** activeStyle�������Ф���getter��̵̾�ؿ���
       *  @name  BML.CSS.$anonymous27 @methodOf BML.CSS @inner */
      dom.prototype.__defineGetter__('activeStyle', function() {
        /** PseudoClassStyle���֥������Ȥ��ݻ�����ץ饤�١��ȥץ�ѥƥ���  @public @propertyEx HTMLElement.prototype._activeStyleObj|BML.CSS-PseudoClassStyle|new PseudoClassStyle */
        if (!this._activeStyleObj) this._activeStyleObj = new PseudoClassStyle(this, false);
        return(this._activeStyleObj);
      });
      
      /** :focus�������饹�ˤ��CSS�����򼫿Ȥ�Ŭ�Ѥ��롥
       *  @name HTMLElement.prototype.setFocusStyle @methodOf HTMLElement.prototype */
      dom.prototype.setFocusStyle = function() {
        var style = this.focusStyle.getStyle(), prev = {};
        
        for(var key in style) {
          // @Todo��tagName�ʤɤ⸫�������ɤ����⤷��ʤ���...
          if (pseudoClassReadWritePropertyMatcher.test(key)) {
            prev[key] = this.normalStyle[key];
            this.normalStyle[key] = style[key];
          } else if (pseudoClassReadOnlyPropertyMatcher.test(key)) {
            prev[key] = this.normalStyle[key];
            this.style[key] = style[key];
          }
        }
        this._focusStyleObj.prevStyle = prev;
      };
      /** ���Ȥ��Ф���:focus�������饹�ˤ��CSS�����������롥
       *  @name HTMLElement.prototype.unsetFocusStyle @methodOf HTMLElement.prototype */
      dom.prototype.unsetFocusStyle = function() {
        var style = this.focusStyle.prevStyle || {};
        for(var key in style) {
          if (pseudoClassReadWritePropertyMatcher.test(key)) {
            this.normalStyle[key] = style[key];
          } else if (pseudoClassReadOnlyPropertyMatcher.test(key)) {
            this.style[key] = style[key];
          }
        }
        this._focusStyleObj.prevStyle = null;
      };
      /** :active�������饹�ˤ��CSS�����򼫿Ȥ�Ŭ�Ѥ��롥
       *  @name HTMLElement.prototype.setActiveStyle @methodOf HTMLElement.prototype */
      dom.prototype.setActiveStyle = function() {
        var style = this.activeStyle.getStyle(), prev = {};
        for(var key in style) {
          if (pseudoClassReadWritePropertyMatcher.test(key)) {
            prev[key] = this.normalStyle[key];
            this.normalStyle[key] = style[key];
          } else if (pseudoClassReadOnlyPropertyMatcher.test(key)) {
            prev[key] = this.normalStyle[key];
            this.style[key] = style[key];
          }
        }
        this._activeStyleObj.prevStyle = prev;
      };
      /** ���Ȥ��Ф���:active�������饹�ˤ��CSS�����������롥
       *  @name HTMLElement.prototype.unsetActiveStyle @methodOf HTMLElement.prototype */
      dom.prototype.unsetActiveStyle = function() {
        var style = this.activeStyle.prevStyle || {};
        for(var key in style) {
          if (pseudoClassReadWritePropertyMatcher.test(key)) {
            this.normalStyle[key] = style[key];
          } else if (pseudoClassReadOnlyPropertyMatcher.test(key)) {
            this.style[key] = style[key];
          }
        }
        this._activeStyleObj.prevStyle = null;
      };
    } catch(e) { BML.Debug.error(e); }
  });

  return({
    bmlStyle       : bmlStyle,
    setActiveStyle : setActiveStyle,
    setFocusStyle  : setFocusStyle,
    getActiveStyle : getActiveStyle,
    getFocusStyle  : getFocusStyle,
    setAspectRatio : setAspectRatio
  });
})();
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
/** ��������ե�����������ʤɤ򰷤��ؿ����Υ͡��ॹ�ڡ��� @namespace @name BML.Navigation */
BML.Navigation = (function() {
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /**#@+ @memberOf BML.Navigation @inner @static @constant @description (̵̾�ؿ��������Ǥ��곰�������Բ�)<br> */
  /** ����̾�Τ�ϥå��奭���Ȥ��ơ��б�����ARIB���������ɤν����ϥå����ͤȤ����ݻ����롥 @type Object  @name ARIB_KEYCODE */
  var ARIB_KEYCODE  = {
    UP      :  1,    DOWN    :  2,    LEFT    :  3,    RIGHT   :  4,
    0       :  5,    1       :  6,    2       :  7,    3       :  8,
    4       :  9,    5       : 10,    6       : 11,    7       : 12,
    8       : 13,    9       : 14,    10      : 15,    11      : 16,
    12      : 17,
    ENTER   : 18,    BACK    : 19,    DBUTTON : 20,
    BLUE    : 21,    RED     : 22,    GREEN   : 23,    YELLOW  : 24
  };
  /** ARIB���������ɤ�ϥå��奭���Ȥ��ơ�����̾�ν����ϥå����ͤȤ����ݻ����롥 @type Object  @name KEYCODE_NAME */
  var KEYCODE_NAME = {};
  for(var key in ARIB_KEYCODE) { KEYCODE_NAME[ARIB_KEYCODE[key]] = key; }
  /** �����������������ꤵ���ʸ����ϥå��奭���Ȥ��ơ�ARIB_KEYCODE�ν����ϥå����ͤȤ����ݻ����롥 @type Object  @name ACCESS_KEY_TO_KEYCODE */
  // ARIB STD B-24 ������ ��°2 5.1.8 ��⥳�󥭡��α���
  var ACCESS_KEY_TO_KEYCODE = {
    X : ARIB_KEYCODE.BACK,
    B : ARIB_KEYCODE.BLUE,  R : ARIB_KEYCODE.RED,
    G : ARIB_KEYCODE.GREEN, Y : ARIB_KEYCODE.YELLOW
  };
  /** key-group̾��ϥå��奭���Ȥ��ơ��б����륭�������ɤν��������Ȥ����ݻ����롥 @type Object  @name KEY_GROUP */
  var KEY_GROUP = {
    'basic'          : [ // ��,��,��,��,����,���
      ARIB_KEYCODE.UP,    ARIB_KEYCODE.DOWN,
      ARIB_KEYCODE.LEFT,  ARIB_KEYCODE.RIGHT,
      ARIB_KEYCODE.ENTER, ARIB_KEYCODE.BACK ], 
    'data-button'    : [ // ��,��,��,��,d
      ARIB_KEYCODE.BLUE,  ARIB_KEYCODE.RED,
      ARIB_KEYCODE.GREEN, ARIB_KEYCODE.YELLOW, ARIB_KEYCODE.DBUTTON ],
    'numeric-tuning' : [ // 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
      ARIB_KEYCODE[0],  ARIB_KEYCODE[1],  ARIB_KEYCODE[2],  ARIB_KEYCODE[4],
      ARIB_KEYCODE[5],  ARIB_KEYCODE[6],  ARIB_KEYCODE[7],  ARIB_KEYCODE[8],
      ARIB_KEYCODE[9],  ARIB_KEYCODE[10], ARIB_KEYCODE[11], ARIB_KEYCODE[12] ],
    'other-tuning'   : [],
    'special-1'      : [],
    'special-2'      : [],
    'special-3'      : [],
    'special-4'      : [],
    'misc'           : []
  };
  /** HTML�֥饦���Υ��������ɤ�ARIB�Υ��������ɤ��б��Ť���ϥå��塥 @type Object  @name BROWSER_TO_ARIB_KEYCODE */
  var BROWSER_TO_ARIB_KEYCODE = {
    // see: ARIB-B24 Appendix.2 5.1.8
     38 : ARIB_KEYCODE.UP,     40 : ARIB_KEYCODE.DOWN,    // ��,��
     37 : ARIB_KEYCODE.LEFT,   39 : ARIB_KEYCODE.RIGHT,   // ��,��
     48 : ARIB_KEYCODE[0],     49 : ARIB_KEYCODE[1],      50 : ARIB_KEYCODE[2],  // 0],1],2
     51 : ARIB_KEYCODE[3],     52 : ARIB_KEYCODE[4],      53 : ARIB_KEYCODE[5],  // 3],4],5
     54 : ARIB_KEYCODE[6],     55 : ARIB_KEYCODE[7],      56 : ARIB_KEYCODE[8],  // 6],7],8
     57 : ARIB_KEYCODE[9],    109 : ARIB_KEYCODE[10],    222 : ARIB_KEYCODE[11], // 9],-],^
    220 : ARIB_KEYCODE[12],                               // \
     13 : ARIB_KEYCODE.ENTER,  46 : ARIB_KEYCODE.BACK,    // enter,del
     68 : ARIB_KEYCODE.DBUTTON,                           // d
     66 : ARIB_KEYCODE.BLUE,   82 : ARIB_KEYCODE.RED,     // b,r
     71 : ARIB_KEYCODE.GREEN,  89 : ARIB_KEYCODE.YELLOW   // g,y
  };
  /** BML.Util.supportSpecificHTMLElement�ؤΥ��硼�ȥ��åȡ� @type Boolean  @name BML.Navigation.supportSpecificHTMLElement */
  var supportSpecificHTMLElement = BML.Util.supportSpecificHTMLElement;
  /** focus/blur�ؿ���ͭ����HTMLElement��DOM���󥿥ե�����̾�ν��硥 @type Array<String>  @name focusBlurDOMInterface */
  var focusBlurDOMInterface = supportSpecificHTMLElement  ?
    [ HTMLDivElement,    HTMLSpanElement,  HTMLParagraphElement, 
      HTMLAnchorElement, HTMLInputElement, HTMLObjectElement ] :
    [ HTMLElement ];
  /** navigation������ͭ����HTMLElement��DOM���󥿥ե�����̾�ν��硥 @type Array<String>  @name navigationDOMInterface */
  var navigationDOMInterface = supportSpecificHTMLElement  ?
    [ HTMLDivElement,    HTMLSpanElement,  HTMLParagraphElement, 
      HTMLAnchorElement, HTMLInputElement, HTMLObjectElement ] :
    [ HTMLElement ];
  /**#@-*/
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /**#@+ @memberOf BML.Navigation @inner @static @description (̵̾�ؿ��������Ǥ��곰�������Բ�)<br> */
  /** navIndex�ͤȳ����������Ǥ��б��Ť������� @type Array<HTMLElement>  @name navIdxToElement @default new Array() */
  var navIdxToElement     = [];
  /** accessKey°���ȳ����������Ǥ��б��Ť���ϥå��塥 @type Object  @name accessKeyToElement @default new Object() */
  var accessKeyToElement  = {};
  /** onKeydown/onKeyup/onClick°����������Ǥ�и�����ݻ��������� @type Array<HTMLElement>  @name focusableElement @default new Array() */
  var focusableElement    = [];
  /** ����UsedKeyList���������ꤵ��Ƥ���key-group�ˤ�äƥޥ�������Ƥ���(�֥饦���ǰ���)���������ɷ���ϥå��奭���Ȥ����ݻ����롥 @name keyHash @type Object @default new Object() */
  var validKeyCodeHash    = {};
  /** ���ߥե������������ꤵ��Ƥ������Ǥ��ݻ����롥 @name focusedElement      @type HTMLElement @default null */
  var focusedElement      = null;
  /** �������Ϥ��줿�������٥�ȥ����ס�             @name prevEventType       @type String      @default '' */
  var prevEventType       = '';
  /** �������Ϥ��줿���������ɡ�                     @name prevKeyCode         @type String      @default '' */
  var prevKeyCode         = '';
  /** Ʊ�����ݥ��塼��                               @name syncEventQueue      @type Array       @default new Array() */
  var syncEventQueue      = [];
  /** ���ݤ�Ʊ����������Ƚ��ե饰��                 @name isEventSynchronized @type Boolean     @default false */
  var isEventSynchronized = false;
  /**#@-*/

  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /**#@+ @methodOf BML.Navigation @public @static */
  /** �ե������������ǽ�����Ƿ�����ǽ�˥ե����������٤����Ǥ���������ե����������롥<br>
   *  navIndex�ͤ����������ǡ�onKeydown°���ʤɤ�������ǡ������������������ꤵ��Ƥ�������
   *  �ν�˥ե����������٤����Ǥ򸡺����롥
   *  @name BML.Navigation.initialize
   */
  function initialize() {
    document.currentFocus = null; // HTMLElement
    document.currentEvent = {     // BMLEvent
      type   : {}.undefined,
      target : null
    };
    
    var elm, key, i;
    for(i = 0, l = navIdxToElement.length; i < l; i++) {
      elm = navIdxToElement[i];
      if (elm) break;
    }
    if (!elm && (focusableElement.length > 0)) {
      elm = focusableElement[0];
    }
    if (!elm && (accessKeyToElement.length > 0)) {
      key = []; for(i in accessKeyToElement) { key.push(i); } key = key.sort();
      elm = accessKeyToElement[key[0]];
    }
    if (elm) elm.focus();
    // @Todo��?
  }
  /** usedKeyList��������Ͽ���롥<br>
   *  ��Ͽ���줿�����˱�����ͭ���ʥ��������ɤν�����������ݻ����롥
   *  @name  setUsedKeyList
   *  @param {String} list usedKeyList���������ꤵ�줿ʸ����ʣ�����ͤ���ľ���' '�Ƕ��ڤ롥̤�������'basic data-button'��
   */
  function setUsedKeyList(list) {
    list = list || 'basic  data-button';
    BML.CSS.bmlStyle.usedKeyList = list;

    validKeyCodeHash = {};
    BML.Util.each.call(list.split(/\s+/), function(group) {
      BML.Util.each.call(KEY_GROUP[group] || [], function(code) {
        validKeyCodeHash[code] = 1;
      });
    });
  }
  /** �������٥�Ȥ�եå����롥<br>
   *  �������٥�Ȥ�BML.Navigation.processKeyEvent���Ϥ���
   *  @name grabInput
   */
  function grabInput()    {
    document.addEventListener('keydown', processKeyEvent, true);
    document.addEventListener('keyup',   processKeyEvent, true);
    document.addEventListener('click',   processKeyEvent, true);
    BML.Debug('[grab input]');
  }
  /** �������٥�ȤΥեå��������롥
   *  @name releaseInput
   */
  function releaseInput() {
    document.removeEventListener('keydown', processKeyEvent);
    document.removeEventListener('keyup',   processKeyEvent);
    document.removeEventListener('click',   processKeyEvent);
    BML.Debug('[release input]');
  }
  /** navIndex�ͤ�������Ǥ��������ݻ����롥
   *  @name  entryNavIndex
   *  @param {HTMLElement} elm navIndex�ͤ��������
   *  @param {Number}      idx navIndex��
   */
  function entryNavIndex(elm, idx) {
    navIdxToElement[idx] = elm;
  }
  /** ������������°����������Ǥ��������ݻ����롥
   *  @name  entryAccessKey
   *  @param {HTMLElement} elm navIndex�ͤ��������
   *  @param {String}      key �������������򼨤�ʸ����
   */
  function entryAccessKey(elm, key) {
    accessKeyToElement[ACCESS_KEY_TO_KEYCODE[key]] = elm;
  }
  /** onKeydown/onKeyup/onClick°���Τ����줫1�İʾ��������Ǥ��������ݻ����롥
   *  @name  entryFocusable
   *  @param {HTMLElement} elm navIndex�ͤ��������
   */
  function entryFocusable(elm) {
    focusableElement.push(elm);
  }
  /** ��������Ǥ�ե����������롥<br>
   *  ���Ǥ�focus�ؿ�����ƤФ�롤focus�ؿ��μ��Ρ�
   *  @name  BML.Navigation.focus
   *  @param {HTMLElement} element �ե���������������(focus�ؿ���call��������)
   */
  function focus(element) {
    if (focusedElement && (focusedElement == element)) return;
    
    var doSync = false;
    if (!isEventSynchronized) doSync = isEventSynchronized = true;
    
    if (focusedElement && (focusedElement != element)) {
      // �ե�����������(X,Y)
      focusedElement.unsetFocusStyle();
      syncEventQueue.push({ type : 'blur', target : focusedElement });
    }
    // �ե�����������(X)
    element.setFocusStyle();
    document.currentEvent = { type : 'focus', target : element };
    document.currentFocus = focusedElement = element;
    syncEventQueue.push(document.currentEvent);

    if (doSync) {
      processSynchronizedEvent();
      isEventSynchronized = false;
    }
  }
  /** ��������ǤΥե��������򳰤���<br>
   *  ���Ǥ�blur�ؿ�����ƤФ�롤blur�ؿ��μ��Ρ�
   *  @name  BML.Navigation.blur
   *  @param {HTMLElement} elm �ե��������򳰤�����(blur�ؿ���call��������)
   */
  function blur(element) {
    if (!fousedElement || (focusedElement != element)) return;

    var doSync = false;
    if (!isEventSynchronized) doSync = isEventSynchronized = true;

    focusedElement = null;
    // �ե��������ü�(X)
    element.unsetFocusStyle();
    document.currentEvent = { type : 'blur', target : element };
    document.currentFocus = focusedElement = null;
    syncEventQueue.push(document.currentEvent);

    if (doSync) {
      processSynchronizedEvent();
      isEventSynchronized = false;
    }
  }
  /**#@-*/
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /**#@+ @methodOf BML.Navigation @inner @static @description (̵̾�ؿ���ǤΥ桼�ƥ���ƥ��ؿ��Ǥ��ꡤ�������׳�����ϸ����ʤ���)<br> */
  /** �������ꤵ��Ƥ���usedKeyList�����塤���������ɤ�ͭ���Ǥ��뤫��Ƚ�ꤹ�롥
   *  @name    isValidCode
   *  @param   {String} code ��ARIB-B24 Appendix.2 5.1.8�פ��������륭��������
   *  @returns {Boolean}     ͭ��/̵��Ƚ����(ͭ��=��)
   */
  function isValidCode(code) {
    return(!BML.Util.isUndefined(validKeyCodeHash[code]));
  }
  /** Ʊ�����٥�ȥ��塼�����Ѥ��줿Ʊ�����٥�Ȥ�������롥<br>
   *  Ʊ�����٥�ȥ��塼�����ˤʤ�ޤǥ��٥�Ȥ���Ф��ƽ�����Ԥ���<br>
   *  �ܴؿ���¹Ԥ��륿���ߥ󥰤ǥ֥饦��¦�Υ��٥�ȥ��塼��ί�ޤä�������
   *  �¹Ԥ���Ƥ��ޤ�����������̵�뤹�뤳�ȤȤ���(ARIBŪ�ˤϡ��㤨��setInterval
   *  �Υ�����Хå��ؿ���Ʊ�����٥�Ȥν����������ޤ��Ԥ�ɬ�פ����뤬���ܼ���
   *  �Ǥ��ܴؿ���call�����ʳ��ǽ������Ԥ��Ƥ��ޤ����Ϥ�)
   *  @name  BML.Navigation.processSynchronizedEvent
   */
  function processSynchronizedEvent() {
    // focus/blur�κ����ϹԤ��ʤ��������ǰ�Τ�����¸���Ƥ���
    var currentFocus = document.currentFocus;
    var currentEvent = document.currentEvent;
    
    while(1) {
      var event  = syncEventQueue.shift();
      if (!event) break;

      var target = event.target;
      switch(event.type) {
        case('focus') : {
          if (target.onFocus) {
            document.currentFocus = event.target;
            document.currentEvent = event;
            target.onFocus();
          }
        } break;
        case('blur') : {
          if (target.onBlur) {
            document.currentFocus = event.target;
            document.currentEvent = event;
            target.onBlur();
          }
        } break;
        case('click') : {
          if (target.onClick) {
            document.currentFocus = event.target;
            document.currentEvent = event;
            target.onClick();
          }
        } break;
        default : break;
      }
    }

    document.currentFocus = currentFocus;
    document.currentEvent = currentEvent;
  }
  /** �������ϥ��٥�Ȥ�������롥<br>
   *  ���٥�Ȥ��ܵ�ǽ�˰ͤ꽪ü���졤¾�Υ��٥�ȥꥹ�ʤˤ�dispatch����ʤ���
   *  @name processKeyEvent
   *  @param {KeyboardEvent} event �������٥��
   */
  function processKeyEvent(event) {
    var type = event.type.toLowerCase();
    var code = event.keyCode;

    // ������ԡ���/�ޥ�������å������
    if (((prevEventType == type) && (prevKeyCode == code)) || (type == 'click')) return;
    // ����Ʊ���������֤�̵��
    if ((prevEventType == type) ||
        ((prevEventType == 'keydown') && (prevKeyCode != code))) return;

    prevEventType = type;
    prevKeyCode   = code;

    // ARIB���������ɤμ�����UsedKeyList�ˤ��ͭ��/̵�������å�
    code = BROWSER_TO_ARIB_KEYCODE[code];
    if (!isValidCode(code)) return;

//    event.cancelBubble = true;
    isEventSynchronized = true;
    var accessElement = accessKeyToElement[code];
    switch(type) {
      case('keydown') : {
        if (code == ARIB_KEYCODE.DBUTTON) {
          // DataButtonPressed���٥�Ȥ�ȯ��
          BML.Bevent.execEvent('DataButtonPressed'); // currentEvent�ϴؿ�¦�Ǽ»�
          
        } else if (accessElement && (BML.Util.getStyle(accessElement, 'visibility') == 'visible')) {
          // A���Ǥ�keydown�����߻��ݤ�ȯ��
          if (focusedElement && focusedElement.onKeydown) {
            document.currentFocus = focusedElement;
            document.currentEvent = { type : 'keydown', target : focusedElement, keyCode : code };
            focusedElement.onKeydown();
          }
          // A'(A)���Ǥ���B���ǤؤΥե�����������
          accessElement.focus();
          processSynchronizedEvent();

          // B���Ǥؤε���Ū��keyup�����߻��ݤ�ȯ��
          if (accessElement.onKeyup) {
            document.currentEvent = { type : 'keyup', target : accessElement, keyCode : code };
            document.currentFocus = accessElement;
            accessElement.onKeyup();
            processSynchronizedEvent(); // ������ɬ��?
          }
          accessElement.setActiveStyle();
          // B���Ǥؤε���Ū��keydown�����߻��ݤ�ȯ��
          if (accessElement.onKeydown) {
            document.currentEvent = { type : 'keydown', target : accessElement, keyCode : ARIB_KEYCODE.ENTER };
            document.currentFocus = accessElement;
            accessElement.onKeydown();
            processSynchronizedEvent();
          }
          // B'(B)���Ǥ�click�����߻��ݤ�Ʊ�����٥�ȥ��塼�ؤ�����
          if (focusedElement) {
            document.currentEvent = { type : 'click', target : focusedElement, keyCode : ARIB_KEYCODE.ENTER };
            document.currentFocus = focusedElement;
            syncEventQueue.push(document.currentEvent);
          }

        } else {
          // A���Ǥؤ�keydown�����߻��ݤ�ȯ��
          if (focusedElement && focusedElement.onKeydown) {
            document.currentEvent = { type : 'keydown', target : focusedElement, keyCode : code };
            document.currentFocus = focusedElement;
            focusedElement.onKeydown();
            processSynchronizedEvent();
          }
          // A'���Ǥ�¸�ߤ�����
          if (focusedElement) {
            if (code == ARIB_KEYCODE.ENTER) {
              // �ե����������֤Ǥη��ꥭ��������
              focusedElement.setActiveStyle();
              if (focusedElement.onClick) {
                document.currentFocus = focusedElement;
                document.currentEvent = { type : 'click', target : focusedElement, keyCode : code };
                focusedElement.onClick();
              }
            } else if ((1 <= code) && (code <= 4)) {
              // �ʥӥ���������Ϣ������Ŭ��
              var navElement = navIdxToElement[
                focusedElement._navigation[KEYCODE_NAME[code].toLowerCase()]
              ];
              if (navElement) {
                navElement.focus();
              }
            }
          }
        }
      } break;
      case('keyup') : {
        if (code == ARIB_KEYCODE.DBUTTON) {
          // nothing to do
        } else if (accessElement && (BML.Util.getStyle(accessElement, 'visibility') == 'visible')) {
          if (focusedElement) {
            if (focusedElement.onKeyup) {
              document.currentFocus = focusedElement;
              document.currentEvent = { type : 'keyup', target : focusedElement, keyCode : ARIB_KEYCODE.ENTER };
              focusedElement.onKeyup();
            }
            focusedElement.unsetActiveStyle();
            focusedElement.setFocusStyle();
          }
        } else {
          if (focusedElement) {
            if (focusedElement.onKeyup) {
              document.currentFocus = focusedElement;
              document.currentEvent = { type : 'keyup', target : focusedElement, keyCode : code };
              focusedElement.onKeyup();
            }
            if (code == ARIB_KEYCODE.ENTER) {
              focusedElement.unsetActiveStyle();
              focusedElement.setFocusStyle();
            }
          }
        }
      } break;
      default : break;
    }
    // Ʊ�������߻��ݤ��б����륤�٥�Ȥμ¹�
    processSynchronizedEvent();
    isEventSynchronized = false;
  }

  /** focus/blur�ؿ���HTMLElement�����ꤹ��̵̾�ؿ���
   *  @name  $anonymous1
   *  @param {DOMInterface} dom focus/blur�ؿ������ꤹ��DOM���󥿥ե�����
   */
  /**#@-*/
  BML.Util.each.call(focusBlurDOMInterface, function(dom) {
    try {
      /** �ե�������������(div,p,a,span,input,object���ǤΤ�)�� @name HTMLElement.prototype.focus @methodOf HTMLElement.prototype */
      dom.prototype.focus = function() { BML.Navigation.focus(this); };
      /** �ե��������򳰤�(div,p,a,span,input,object���ǤΤ�)�� @name HTMLElement.prototype.blur  @methodOf HTMLElement.prototype */
      dom.prototype.blur  = function() { BML.Navigation.blur (this); };
    } catch(e) { BML.Debug.error(e); }
  });
  BML.Util.each.call(navigationDOMInterface, function(dom) {
    try {
      /** �ʥӥ���������������ݻ���������륪�֥�������(div,p,a,span,input,object���ǤΤ�)��<br>
       *  @type Object @name _navigation @memberOf HTMLElement.prototype
       *  @field {Number} .index navIndex��
       *  @field {Number} .up    navUp��
       *  @field {Number} .down  navDown��
       *  @field {Number} .left  navLeft��
       *  @field {Number} .right navRight��
       */
      dom.prototype.__defineGetter__('_navigation', function() {
        if (!this._navigationObj) {
          this._navigationObj = { 
            index : -1,
            up    : -1,
            down  : -1,
            left  : -1,
            right : -1
          };
        }
        return(this._navigationObj);
      });
    } catch(e) { BML.Debug.error(e); }
  });

  setUsedKeyList(BML.CSS.bmlStyle.usedKeyList);
  
  return({
    /**#@+ @methodOf BML.Navigation @public @static */
    initialize     : initialize,
    setUsedKeyList : setUsedKeyList,
    grabInput      : grabInput,
    releaseInput   : releaseInput,
    entryNavIndex  : entryNavIndex,
    entryAccessKey : entryAccessKey,
    entryFocusable : entryFocusable,
    focus          : focus, 
    blur           : blur
    /**#@-*/
  });
})();
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
/** BMLʸ��μ������ѡ��������ۤ�Ԥ��ؿ����Υ͡��ॹ�ڡ��� @namespace @name BML.Builder */
BML.Builder = (function() {
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /**#@+ @memberOf BML.Builder @inner @static @constant @description (̵̾�ؿ��������Ǥ��곰�������Բ�)<br> */
  /** �Ρ��ɼ��̤򼨤������ͤν������������ϥå��塥 @name NODETYPE @type Object */
  var NODETYPE = {
    UNKNOWN_NODE           :  0,
    ELEMENT_NODE           :  1,
    ATTRIBUTE_NODE         :  2,
    TEXT_NODE              :  3,
    CDATA_SECTION_NODE     :  4,
    ENTITY_REFERENCE_NODE  :  5,
    ENTITY_NODE            :  6,
    PROC_INSTRUCTION_NODE  :  7,
    COMMENT_NODE           :  8,
    DOCUMENT_NODE          :  9,
    DOCUMENT_TYPE_NODE     : 10,
    DOCUMENT_FRAGMENT_NODE : 11,
    NOTATION_NODE          : 12
  };
  /** ARIB�ˤ�����MIME�����פ�W3C��MIME�����פ��б��ط�����������ϥå��塥 @name MIME_TYPE_MAP @type Object */
  var MIME_TYPE_MAP = {
    'image/jpeg'                            : 'image/jpeg',
    'image/X-arib-png'                      : 'image/png', 
    'image/X-arib-mng'                      : 'video/mng',
    'audio/X-arib-mpeg2-aac'                : null,
//    'audio/X-arib-aiff'                     : 'audio/aiff',
    'audio/X-arib-aiff'                     : null,
    'application/X-arib-contentPlayControl' : null,
    'application/X-aribmpeg2-tts'           : null
  };
  /** ARIB/IPTVFJ�ˤ�����DTD(publicID/systemID)��BML Version���б�������������󽸹硥 @name DTD_DECLARATIONS @type Array<Array<String>> */
  var DTD_DECLARATIONS    = [
    ['-//ARIB STD-B24:1999//DTD BML Document for IPTV//JA', 'http://www.arib.or.jp/B24/DTD/bml_x_x_iptv.dtd', '100.0'], // IPTVFJ
    ['+//ARIB STD-B24:1999//DTD BML Document//JA',          'http://www.arib.or.jp/B24/DTD/bml_1_1.dtd',      '3.0'],   // B-14
    ['-//ARIB//DTD BML Document//JA',                       'http://www.arib.or.jp/B24/DTD/bml_1_0.dtd',      '1.0'],   // B-24
    ['+//ARIB STD-B24:1999//DTD BML Document//JA',          'bml_1_0.dtd',                                    '1.0']    // B-24???
  ];
  /** HTML�֥饦����JavaScript���󥸥�Ǥ�ͽ��̾�Ȼפ���ؿ�̾�ν��硥 @name RESERVED_FUNC_NAME @constant @type Array<String> */
  var RESERVED_FUNC_NAME  = [ 'onload', 'onunload' ];

  /** CSS������clut�����ѡ����Ѥ�����ɽ���� @type RegExp @name clutMatcher */
  var clutMatcher         = /([^\w])clut[^\w:]*:[^\w]*(url\([^\w]*([^\)\s]+\s*)\));?/m;
  /** CSS������usedKyeList�����ѡ����Ѥ�����ɽ����         @type RegExp @name usedKeyListMatcher */
  var usedKeyListMatcher  = /([^\w])used-key-list[^\w:]*:\s*([^;\}]+)\s*;?/m;
  /** CSS������resolution�����ѡ����Ѥ�����ɽ����          @type RegExp @name resolutionMatcher */
  var resolutionMatcher   = /([^\w])resolution[^\w:]*:[^;\}]*;?/mg;
  /** CSS������aspectRatio�����ѡ����Ѥ�����ɽ����         @type RegExp @name aspectRatioMatcher */
  var aspectRatioMatcher  = /([^\w])display-aspect-ratio[^\w:]*:\s*([^;\}]+)\s*;?/mg;
  /** CSS������margin/padding��������Ѥ�����ɽ����        @type RegExp @name marginPaddingMatcher */
  var marginPaddingMatcher= /([^\w])(?:margin|padding)[^\w:]*:[^;\}]*;?/mg;
  /** CSS������grayscaleColorIndex�����ѡ����Ѥ�����ɽ���� @type RegExp @name grayscaleMatcher */
  var grayscaleMatcher    = /([^\w])grayscale-color-index[^\w:]*:[^;\}]*;?/mg;
  /** CSS������colorIndex��Ϣ�����ѡ����Ѥ�����ɽ����        @type RegExp @name colorIndexMatcher */
  var colorIndexMatcher   = /color-index[^\w:]*:\s*(\d+)(?:\s+(?:\d+))?[^;\}]*;?/m;
  /** CSS������fontFamily�����ѡ����Ѥ�����ɽ����            @type RegExp @name fontFamilyMatcher */
  var fontFamilyMatcher   = /([^\w]font-family[^\w:]*:)\s*([^;\}]+)\s*;?/m;
  /** CSS������navigation��Ϣ�����ѡ����Ѥ�����ɽ����        @type RegExp @name navAttributeMatcher */
  var navAttributeMatcher = /nav-(\w+)[^:]*:[^\d]*(\d+)[^;\}]*;?/m;
  /** CSS������:focus�������饹�ѡ����Ѥ�����ɽ����          @type RegExp @name focusPropMatcher */
  var focusPropMatcher    = /[^\w](\w+)?:focus[^\w]*\{([^\}]+)\}/m;
  /** CSS������:active�������饹�ѡ����Ѥ�����ɽ����         @type RegExp @name activePropMatcher */
  var activePropMatcher   = /[^\w](\w+)?:active[^\w]*\{([^\}]+)\}/m;
  /**#@-*/
  
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /**#@+ @memberOf BML.Builder @inner @static @description (̵̾�ؿ��������Ǥ��곰�������Բ�)<br> */
  /** Script���ǽи�̵ͭ�ե饰���и���=����           @type Boolean @name isFirstScript      @default true */
  var isFirstScript       = true;
  /** ����饤��ECMAScript�и�̵ͭ�ե饰���и���=���� @type Boolean @name isFirstInnerScript @default true */
  var isFirstInnerScript  = true;
  /** ͽ��̾����ä��ؿ�̾���ݻ�����ϥå��塥        @type Object  @name reservedNameFuncs  @default new Object() */
  var reservedNameFuncs   = {};
  /** onload/onunload���٥�ȥϥ�ɥ�Ȥ��ƻ��ꤵ�줿�ؿ�̾���ݻ�����ϥå��塥                         @type Object @name eventHandlers @default new Object() */
  var eventHandlers       = {};
  /** ���٤Ƥ�ECMA(Java)Script��BMLʸ����ɸ�˰�礷��ɾ�����¹Ԥ��뤿���ECMAScript�ݻ��ѥХåե��� @type Array  @name scriptBuffer  @default new Array() */
  var scriptBuffer        = [];
  /** �������ECMAS(Java)cript�ե���������ݻ����륫���󥿡�                                            @type Number @name scriptBuffer.count  @default 0 */
  scriptBuffer.count      = 0;
  /**#@-*/

  /**#@+ @methodOf BML.Builder @inner @static @description (̵̾�ؿ���ǤΥ桼�ƥ���ƥ��ؿ��Ǥ��ꡤ�������׳�����ϸ����ʤ���)<br> */
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** style°���ͤ򼨤�ʸ��������Ǥ����ꤹ�롥<br>
   *  style.cssText(IE)��setAttribute(Firefox/Opera/Safari)���Ѥ��������֥饦��������ץȡ�
   *  @name  setCssStyle
   *  @param {HTMLElement} elm   style°�������ꤹ������
   *  @param {String}      style style°���ͤ򵭽Ҥ���ʸ����('name:value;...')
   */
  function setCssStyle(elm, style) {
    if (BML.Util.isIE) elm.style.cssText = style;
    else               elm.setAttribute('style', style);
  }
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** getElementsByTagName�Ǽ�����������Ƿ��κǽ�����Ǥ�������롥
   *  @name    getFirstElementByTagName
   *  @param   {String}      name            �����������ǤΥ���̾
   *  @param   {Node}        [node=document] ���Ǥ򸡺�����롼�ȤΥΡ���
   *  @returns {HTMLElement}                 �������줿���Ƿ��κǽ�����ǡ��������ξ���null��
   */
  function getFirstElementByTagName(name, node) {
    node = node || document;
    var children = node.getElementsByTagName(name);
    return((children.length > 0) ? children[0] : null);
  }
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** ECMAScriptʸ���JavaScript�Ȥ��Ƽ¹ԤǤ���褦���Զ����ʬ�������롥
   *  @name    toValidJavaScript
   *  @param   {String} script ECMAScriptʸ��
   *  @returns {String}        �������줿ECMAScriptʸ��(JavaScriptʸ��)
   */
  function toValidJavaScript(script) {
    if (!script) return('');

    // @Todo������Ū�ʥХ��β�ǽ��ͭ�ꡥ�桼�������data�ץ�ѥƥ��Ȥζ��̤��Ĥ��ʤ���
    script = script.replace(/\.data([^\w])/g, "\.dataInterface$1");

    // onload°���ʤɤ�Ʊ��̾�Τδؿ���̵�¥롼�פ��Ƥ��ޤ������̾���롥
    // @Todo������Ū�ʥХ��β�ǽ��ͭ�ꡥ
    // @Todo��������ץȤ򤹤٤��Ӥ�뤿�����˽Ť����ʤ�Ȥ��ʤ�ʤ���Τ�...
    BML.Util.each.call(RESERVED_FUNC_NAME, function(name) {
      // ͽ��̾���ؿ��Ȥ����������Ƥ��뤫������å�
      var defMatcher = new RegExp('[^\w]function\s+'+name+'[^\w]', 'm');
      if (!defMatcher.test(script)) return;

      // ͽ��̾���ؿ��Ȥ����������Ƥ����硤���ؿ��θƤӽФ�����񤭴���
      var buf = '';
      var funcMatcher = new RegExp('([^\w]'+name+')([^\w])', 'm');
      while(1) {
        if (!funcMatcher.test(script)) break;
        buf   += RegExp.leftContext + RegExp.$1 + '_mod' + RegExp.$2;
        script = RegExp.rightContext;
      }
      script = buf + script;
      
      // �������Ƥ����ؿ�̾�ΤȲ�̾�Τ��ݻ�
      reservedNameFuncs[name] = name+'_mod';
      BML.Debug.warning('[rename function :"'+name+'"->"'+name+'_mod"]');
      
    });

    return(script);
  }
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** ���٥�ȥϥ�ɥ�˻��ꤵ��Ƥ���ؿ�̾����;ʬ��ʸ���������롥<br>
   *  IPTVFJ�Ǥϥ��٥�ȥϥ�ɥ��"func();"�Ȥ��ƻ��ꤹ�뤿�ᡤ"func"��ʬ������ȴ���Ф���
   *  @name    stripEventHandlerString
   *  @param   {String} str ���٥�ȥϥ�ɥ����ʸ����
   *  @returns {String}     ���٥�ȥϥ�ɥ�˻��ꤵ�줿�ؿ�̾
   */
  function stripEventHandlerString(str) {
    return(str.replace(/^\s*([^\s\(]+)\([^\)]*\)\s*;/, "$1"));
  }
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** style°���ͤ˵��Ҥ��줿colorIndex������color�����˾�񤭤��롥<br>
   *  "xxx-color-index:n" �� "xxx-color:#cccccc;opacity:��;"�Ȥʤ롥<br>
   *  colorIndex�ͤ˳������뿧���󤬤ʤ�����"xxx-color:#000000;opacity:1.0"�Ȥ��롥
   *  @name    colorIndexToColorCode
   *  @param   {String} style style°���ͤ򵭽Ҥ���ʸ����
   *  @returns {String}       colorIndex������color�������Ѵ�����style°����ʸ����
   */
  function colorIndexToColorCode(style) {
    var buf = '';
    while(1) {
      if (!colorIndexMatcher.test(style)) break;
      var rgb = BML.Clut.getRGB(RegExp.$1) || { code : '000000', opacity : 1.0 };

      buf  += RegExp.leftContext + 
        (((rgb.code === '000000') && (rgb.opacity === 0)) ?
          '' : 'color:#' + rgb.code + ';opacity:' + rgb.opacity) + ';';
      style = RegExp.rightContext;
    }
    return(buf + style);
  }
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** CSS�����򵭽Ҥ���ʸ����������̾�������ͤ�ڥ��Ȥ����ϥå����ʬ�򤹤롥<br>
   *  @name    parseStyleString
   *  @param   {String}      style CSS�����򵭽Ҥ���ʸ����
   *  @returns {Object}            ����̾�������ͤ�ڥ��Ȥ����ϥå���
   */
  function parseStyleString(style) {
    if (!style) return({});

    var ret = {}, camelize = BML.Util.camelize;
    var matcher = /([\w-]+)[^:]*:([^;]+)/;
    while(1) {
      if (!matcher.test(style)) break;
      style = RegExp.rightContext;
      ret[camelize(RegExp.$1)] = RegExp.$2;
    }

    return(ret);
  }
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** style°���ͤ��뤤��style���Ǥ�����(link���ǤΥ������ե�����ޤ�)�˵��Ҥ��줿CSS������������롥<br>
   *  body������ͭ�������ͤ�navigation�����ͤϡ�������˲��ϡ��ݻ��ʤɤ��̽����˰��ꤹ�롥
   *  @name    processARIBCSSProperty
   *  @param   {String}      style CSS�����򵭽Ҥ���ʸ����
   *  @param   {HTMLElement} [elm] style°�������ꤹ������<br>��ά���줿������1������"style°���ͤǤ�̵��"��Ƚ�Ǥ��롥
   *  @returns {String}            �����Ѥߤ�style°���ͤ��뤤��style����ʸ����
   */
  function processARIBCSSProperty(style, elm) {
    //grayscaleColorIndex�����Ϻ������ @Todo�������Τ�?
    style = style.replace(grayscaleMatcher,     "$1");
    style = style.replace(marginPaddingMatcher, "$1");
    
    var buf = '';
    if (!elm || (elm.nodeName.toLowerCase() == 'body')) {
      // style���Ǥ��뤤��body��style°���ͤξ��
      if (clutMatcher.test(style)) {
        // CLUT�������������BML.Clut����(�ե�����ѥ�)���Ϥ�
        style = RegExp.leftContext + RegExp.$1 + RegExp.rightContext;
        var pattern = RegExp.$2, file = RegExp.$3;
        BML.Clut.load(file, pattern);
        BML.Debug.info('[CLUT:'+pattern+'] -> BML.Clut.load('+file+')');
      }
      if (usedKeyListMatcher.test(style)) {
        // usedKeyList�������������BML.UsedKeyList���ͤ��Ϥ�
        style = RegExp.leftContext + RegExp.$1 + RegExp.rightContext;
        var k = RegExp.$2;
        BML.Navigation.setUsedKeyList(k);
        BML.Debug.info('[UsedKeyList:'+k+']');
      }
      if (aspectRatioMatcher.test(style)) {
        // displayAspectRatio�������������BML.CSS.bmlStyle�Ȥ����ͤ��ݻ�����
        // @Todo������ư������Ū�˲����򤷤ʤ��Ƥ褤��?
        style = RegExp.leftContext + RegExp.$1 + RegExp.rightContext;
        BML.CSS.setAspectRatio(RegExp.$2);
      }
      // resolution�����ϸ����ͤʤΤǺ������
      style = style.replace(resolutionMatcher, "$1");

      // :foucs�������饹����������BML.CSS.focusStyle���ݻ�����
      buf = '';
      var selector;
      while(1) {
        if (!focusPropMatcher.test(style)) break;
        buf  += RegExp.leftContext;
        style = RegExp.rightContext;
        selector = (RegExp.$1 || 'all').toLowerCase();
        if (selector == '*') selector = 'all';

        BML.CSS.setFocusStyle(selector, parseStyleString(RegExp.$2));
      }
      style = buf + style;

      // :active�������饹����������BML.CSS.activeStyle���ݻ�����
      buf = '';
      while(1) {
        if (!activePropMatcher.test(style)) break;
        buf  += RegExp.leftContext;
        style = RegExp.rightContext;
        selector = (RegExp.$1 || 'all').toLowerCase();
        if (selector == '*') selector = 'all';

        BML.CSS.setActiveStyle(selector, parseStyleString(RegExp.$2));
      }
      style = buf + style;
    }

    if (elm) {
      // navigation�������������BML.Navigation����Ͽ����
      buf = '';
      var nav = {}, camelize = BML.Util.camelize;
      while(1) {
        if (!navAttributeMatcher.test(style)) break;
        nav[(RegExp.$1).toLowerCase()] = Number(RegExp.$2);
        buf  += RegExp.leftContext;
        style = RegExp.rightContext;
      }
      style = buf + style;
      
      BML.Util.extend(elm._navigation, nav);
      if (nav['index'] >= 0) BML.Navigation.entryNavIndex(elm, nav['index']);
    }

    // @Todo��font-family�ΰ����������ø���
    // ʣ���������Ƥ����硤ARIB�������ǽ��ʸ����ξ��ν����ˤĤ��ƹ�θ��ɬ��
    if (fontFamilyMatcher.test(style)) {
      style = RegExp.leftContext + RegExp.$1;
      var r = RegExp.rightContext;
      buf     = [];
      BML.Util.each.call((RegExp.$2).split("\s*,\s*"), function(fontName) {
        if      (/^\'([^\']+)\'$/.test(fontName)) fontName = RegExp.$1;
        else if (/^\"([^\']+)\"$/.test(fontName)) fontName = RegExp.$1;

        var newName = BML.config.usableFontMap[fontName];
        buf.push(newName ? newName : fontName);

      });
      style = style + "'" + buf.join("','") + "';" + r;
    }
    style = colorIndexToColorCode(style);

    return(style);
  }
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** ͭ����JavaScriptʸ��Ȥ��ƥ�����ץȤȤ��Ƴ���������ץȥե���������Ƥ�������롥
   *  @name    getExternalScript
   *  @param   {String} src                     ����������ץȥե������URI
   *  @param   {Object} [currentPath='BML.uri'] ����������ץȥե�����Υѡ����Ѥߥ����ȥѥ�
   *  @returns {String}                         �����Ѥߤ�JavaScriptʸ��
   *  @throws  {FileNotFound}                   ����������ץȥե����뤬¸�ߤ��ʤ�
   */
  function getExternalScript(src, currentPath) {
    currentPath = currentPath || BML.uri;
    src = BML.Util.combinePath(src, currentPath);

    var idx = scriptBuffer.length;
    scriptBuffer[idx]  = '// not loaded:'+src+"\n";
    scriptBuffer.count++;
    var ajax = new BML.Ajax(src, {
      overrideMimeType : 'application/javascript; charset=EUC-JP',
      method           : 'GET',
      onSuccess        : function(response) {
        scriptBuffer[idx] = '//'+src+"\n" + toValidJavaScript(response.responseText);
        scriptBuffer.count--;

        // �����ե������������BMLʸ��ι��ۤ���˽���äƤ������
        if ((scriptBuffer.count <= 0) && BML.Builder.complete) {
          BML.Builder.finish();
        }
      },
      onFailure        : function(response) {
        BML.Debug.error('[JavaScript : load failed('+src+'): '+
                        response.statusCode + ':'+response.statusText+']');
      }
    });
  }

  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** ʣ����°�������Ǥ����ꤹ�롥
   *  @name    setDefaultAttributes
   *  @param   {HTMLElement} elm  °�������ꤹ������
   *  @param   {Object}      prop °��̾��ץ�ѥƥ�̾��°���ͤ�ץ�ѥƥ��ͤ˻��ĥ��֥�������
   *  @returns {HTMLElement}      °�������ꤷ������
   */
  function setDefaultAttributes(elm, prop) {
    for(var k in prop) { elm.setAttribute(k, prop[k]); }
    return(elm);
  }
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** ARIB TR-B14��5.7.3 °���פ���������Core Attributes�����Ǥ����ꤹ�롥
   *  @name    setCoreAttributes
   *  @param   {HTMLElement} htmlElm  °�������ꤹ��HTML����
   *  @param   {Element}     bmlElm   °���ͤλ������BML(XML)����
   *  @returns {HTMLElement}          °�������ꤷ��HTML����
   */
  function setCoreAttributes(htmlElm, bmlElm) {
    var tmp;
    tmp = bmlElm.getAttribute('id');    if (tmp) htmlElm.setAttribute('id',    tmp);
    tmp = bmlElm.getAttribute('class'); if (tmp) htmlElm.setAttribute('class', tmp);
    return(htmlElm);
  }
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** ARIB TR-B14��5.7.3 °���פ���������I18N Attributes�����Ǥ����ꤹ�롥
   *  @name    setI18nAttributes
   *  @param   {HTMLElement} htmlElm  °�������ꤹ��HTML����
   *  @param   {Element}     bmlElm   °���ͤλ������BML(XML)����
   *  @returns {HTMLElement}          °�������ꤷ��HTML����
   */
  function setI18nAttributes(htmlElm, bmlElm) {
    htmlElm.setAttribute('xml:lang', 'ja');
    return(htmlElm);
  }
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** ARIB TR-B14��5.7.3 °���פ���������Style Attributes�����Ǥ����ꤹ�롥
   *  @name    setStyleAttributes
   *  @param   {HTMLElement} htmlElm  °�������ꤹ��HTML����
   *  @param   {Element}     bmlElm   °���ͤλ������BML(XML)����
   *  @returns {HTMLElement}          °�������ꤷ��HTML����
   */
  function setStyleAttributes(htmlElm, bmlElm) {
    var style = bmlElm.getAttribute('style');
    if (!style) return(htmlElm);

    setCssStyle(htmlElm, processARIBCSSProperty(style, htmlElm));
    return(htmlElm);
  }
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** ARIB TR-B14��5.7.3 °���פ���������Script���Ǥ�°���ͤ����Ǥ����ꤹ�롥
   *  @name    setScriptAttributes
   *  @param   {HTMLElement} htmlElm  °�������ꤹ��HTML����
   *  @param   {String}      srcUri   Script���Ǥ������ե�����򻲾Ȥ�����Υե����������URI<br>�����������ߤ����Ѥ��Ƥ��ʤ���
   *  @returns {HTMLElement}          °�������ꤷ��HTML����
   */
  function setScriptAttributes(htmlElm, srcUri) {
    htmlElm.setAttribute('charset', 'EUC-JP');
    htmlElm.setAttribute('type',    'text/javascript'); // 'text/X-arib-ecmascript; charset="euc-jp"'
    if (srcUri) htmlElm.setAttribute('src', srcUri);
    return(htmlElm);
  }
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** ARIB TR-B14��5.7.3 °���פ���������Event Attributes�����Ǥ����ꤹ�롥
   *  @name    setKeyEventsAttributes
   *  @param   {HTMLElement} htmlElm  °�������ꤹ��HTML����
   *  @param   {Element}     bmlElm   °���ͤλ������BML(XML)����
   *  @returns {HTMLElement}          °�������ꤷ��HTML����
   */
  function setKeyEventsAttributes(htmlElm, bmlElm) {
    var onClick   = bmlElm.getAttribute('onclick');
    var onKeydown = bmlElm.getAttribute('onkeydown');
    var onKeyup   = bmlElm.getAttribute('onkeyup');

    // �ܴؿ��¹Ի��ˤϥ��٥�ȥϥ�ɥ�ؤδؿ��ݥ��󥿤�ĥ��ʤ�����(JavaScript��
    // bmlʸ����ϸ��ɾ������뤿��)��onClick�¹Ի����ٱ�ɾ�����롥
    if (onClick)   htmlElm.onClick   = function() {
      htmlElm.onClick = window[stripEventHandlerString(onClick)];
      htmlElm.onClick();
    };
    if (onKeydown) htmlElm.onKeydown = function() {
      htmlElm.onKeydown = window[stripEventHandlerString(onKeydown)];
      htmlElm.onKeydown();
    };
    if (onKeyup)   htmlElm.onKeyup   = function() {
      htmlElm.onKeyup = window[stripEventHandlerString(onKeyup)];
      htmlElm.onKeyup();
    };

    // �ե�����������ǽ�����ǤȤ���BML.Navigation����Ͽ����
    if (onClick || onKeydown || onKeyup)
      BML.Navigation.entryFocusable(htmlElm);
    
    return(htmlElm);
  }
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** ARIB TR-B14��5.7.3 °���פ���������ե������������Ѥ�°��(Event Attributes�ʳ�)�����Ǥ����ꤹ�롥
   *  @name    setFocusCtrlAttributes
   *  @param   {HTMLElement} htmlElm  °�������ꤹ��HTML����
   *  @param   {Element}     bmlElm   °���ͤλ������BML(XML)����
   *  @returns {HTMLElement}          °�������ꤷ��HTML����
   */
  function setFocusCtrlAttributes(htmlElm, bmlElm) {
    var aKey    = bmlElm.getAttribute('accesskey');
    var onFocus = bmlElm.getAttribute('onfocus');
    var onBlur  = bmlElm.getAttribute('onblur');

    // �������������������BML.Navigation����Ͽ���롥
    if (aKey)    BML.Navigation.entryAccessKey(htmlElm, aKey);
    if (onFocus) htmlElm.onFocus = stripEventHandlerString(onFocus);
    if (onBlur)  htmlElm.onBlur  = stripEventHandlerString(onBlur);
    
    return(htmlElm);
  }
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** Document�Ρ��ɤ�������������å����롥<br>
   *  ̵���ʾ����㳰���ꤲ�롥
   *  @name    checkDocNode
   *  @param   {Node}               node  ʸ��ΥΡ���
   *  @returns {Boolean}                  �Ρ��ɤ�������
   *  @throws  {InvalidXmlEncoding}       ʸ�����󥳡��ǥ��󥰤�EUC-JP�ǤϤʤ�
   *  @throws  {InvalidXmlVersion}        XML�ΥС������1.0�ǤϤʤ�
   */
  function checkDocNode(node) {
    // Opera�ξ���������������å��Ǥ��ʤ�����true���֤���
    if (BML.Util.isOpera) return(true);
    
    if (String(node.xmlEncoding).toUpperCase() != 'EUC-JP')
      throw('[InvalidXmlEncoding] : '+node.xmlEncoding);
    if (node.xmlVersion != '1.0')
      throw('[InvalidXmlVersion] : ' +node.Version);

    return(true);
  }
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** DocumentType�Ρ��ɤ�������������å����롥<br>
   *  ̵���ʾ����㳰���ꤲ�롥
   *  @name    checkDocTypeNode
   *  @param   {Node}               node  ʸ��ΥΡ���
   *  @returns {Boolean}                  �Ρ��ɤ�������
   *  @throws  {InvalidDocTypeName}       ʸ�񷿤�BML�ǤϤʤ�
   *  @throws  {InvalidDocTypeID}         ʸ�񷿤�PublicID��SystemID������
   */
  function checkDocTypeNode(node) {
    if (String(node.name).toLowerCase() != 'bml')
      throw('[InvalidDocTypeName] : '     +node.name);

    BML.Util.each.call(DTD_DECLARATIONS, function(dtd) {
      if ((node.publicId == dtd[0]) && (node.systemId == dtd[1])) {
        BML.version = dtd[2];
        BML.Util.$break;
      }
    });
    if (!BML.version)
      throw('[InvalidDocTypeID] : publicID : "'+node.publicId +
            '" / systemID : "' + node.systemId +'"');

    return(true);
  }
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** ProcessingInstruction�Ρ��ɤ�������������å����롥<br>
   *  ̵���ʾ����㳰���ꤲ�롥
   *  @name    checkPINode
   *  @param   {Node}               node  ʸ��ΥΡ���
   *  @returns {Boolean}                  �Ρ��ɤ�������
   *  @throws  {InvalidPITraget}          �������å�°����BML�ǤϤʤ�
   *  @throws  {InvalidPINodeValue}       BMLʸ��ΥС����������
   */
  function checkPINode(node) {
    if (String(node.target).toLowerCase() != 'bml')
      throw('InvalidPITarget] : target:['+node.target+']');

    var versionMatcher = /bml-version=\"([\d\.]+)\"/;
    var match = versionMatcher.exec(node.nodeValue);
    if (!match || (match[1] != BML.version))
      throw('[InvalidPINodeValue] : '+node.nodeValue);

    return(true);
  }
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** Comment�Ρ��ɤ�������������å����롥<br>
   *  �ºݤˤϲ��������Ԥ�ʤ���
   *  @name    checkCommentNode
   *  @param   {Node}               node  ʸ��ΥΡ���
   *  @returns {Boolean}                  �Ρ��ɤ�������
   */
  function checkCommentNode(node) { return(true); }

  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // structure module
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** BMLʸ���Body���Ǥ���Ϥ���HTMLʸ���Body���Ǥ����������ƥΡ��ɤλҤȤ����ɲä��롥
   *  @name    processBodyElement
   *  @param   {Element}     bmlElm          ���Ȥ���BMLʸ�������
   *  @param   {Node}        parentHtmlNode  bmlElm�οƥΡ��ɤ��б�����HTMLʸ��¦�ΥΡ���
   *  @returns {HTMLElement}                 ��������HTML����
   */
  function processBodyElement(bmlElm, parentHtmlNode) {
    var elm = getFirstElementByTagName('body', parentHtmlNode);
    if (!elm) elm = document.appendChild(document.createElement('body'));

    setCoreAttributes (elm, bmlElm);
    setI18nAttributes (elm, bmlElm);
    setStyleAttributes(elm, bmlElm);

    var func;
    func = bmlElm.getAttribute('onload');
    if (func) { // onload���٥�ȥϥ�ɥ���ݻ�����
      func = stripEventHandlerString(func);
      eventHandlers['onload'] = reservedNameFuncs[func] || func;
    }
    func = bmlElm.getAttribute('onunload');
    if (func) { // onunload���٥�ȥϥ�ɥ���ݻ�����
      func = stripEventHandlerString(func);
      eventHandlers['onunload'] = reservedNameFuncs[func] || func;
      window.addEventListener('unload', BML.Builder.onunload, false);
    }
    return(elm);
  }
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** BMLʸ���Head���Ǥ���Ϥ���HTMLʸ���Head���Ǥ����������ƥΡ��ɤλҤȤ����ɲä��롥
   *  @name    processHeadElement
   *  @param   {Element}     bmlElm          ���Ȥ���BMLʸ�������
   *  @param   {Node}        parentHtmlNode  bmlElm�οƥΡ��ɤ��б�����HTMLʸ��¦�ΥΡ���
   *  @returns {HTMLElement}                 ��������HTML����
   */
  function processHeadElement(bmlElm, parentHtmlNode) {
    var elm  = getFirstElementByTagName('head', parentHtmlNode) ||
               parentHtmlNode.appendChild(document.createElement('head'));
    setI18nAttributes(elm, bmlElm);
    return(elm);
  }
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** BMLʸ���Title���Ǥ���Ϥ���HTMLʸ���Title���Ǥ����������ƥΡ��ɤλҤȤ����ɲä��롥
   *  @name    processTitleElement
   *  @param   {Element}     bmlElm          ���Ȥ���BMLʸ�������
   *  @param   {Node}        parentHtmlNode  bmlElm�οƥΡ��ɤ��б�����HTMLʸ��¦�ΥΡ���
   *  @returns {HTMLElement}                 ��������HTML����
   */
  function processTitleElement(bmlElm, parentHtmlNode) {
    var elm = getFirstElementByTagName('title', parentHtmlNode) ||
              parentHtmlNode.appendChild(document.createElement('title'));
    setI18nAttributes(elm, bmlElm);
    return(elm);
  }
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // text module
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** BMLʸ���Div���Ǥ���Ϥ���HTMLʸ���Div���Ǥ����������ƥΡ��ɤλҤȤ����ɲä��롥
   *  @name    processDivElement
   *  @param   {Element}     bmlElm          ���Ȥ���BMLʸ�������
   *  @param   {Node}        parentHtmlNode  bmlElm�οƥΡ��ɤ��б�����HTMLʸ��¦�ΥΡ���
   *  @returns {HTMLElement}                 ��������HTML����
   */
  function processDivElement(bmlElm, parentHtmlNode) {
    var elm = parentHtmlNode.appendChild(document.createElement('div'));
    setCoreAttributes (elm, bmlElm);
    setI18nAttributes (elm, bmlElm);
    setStyleAttributes(elm, bmlElm);
    setKeyEventsAttributes(elm, bmlElm);
    setFocusCtrlAttributes(elm, bmlElm);
    return(elm);
  }
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** BMLʸ���BR���Ǥ���Ϥ���HTMLʸ���BR���Ǥ����������ƥΡ��ɤλҤȤ����ɲä��롥
   *  @name    processBrElement
   *  @param   {Element}     bmlElm          ���Ȥ���BMLʸ�������
   *  @param   {Node}        parentHtmlNode  bmlElm�οƥΡ��ɤ��б�����HTMLʸ��¦�ΥΡ���
   *  @returns {HTMLElement}                 ��������HTML����
   */
  function processBrElement(bmlElm, parentHtmlNode) {
    var elm = parentHtmlNode.appendChild(document.createElement('br'));
    setCoreAttributes (elm, bmlElm);
    setStyleAttributes(elm, bmlElm);
    return(elm);
  }
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** BMLʸ���Paragraph���Ǥ���Ϥ���HTMLʸ���Paragraph���Ǥ����������ƥΡ��ɤλҤȤ����ɲä��롥
   *  @name    processPElement
   *  @param   {Element}     bmlElm          ���Ȥ���BMLʸ�������
   *  @param   {Node}        parentHtmlNode  bmlElm�οƥΡ��ɤ��б�����HTMLʸ��¦�ΥΡ���
   *  @returns {HTMLElement}                 ��������HTML����
   */
  function processPElement(bmlElm, parentHtmlNode) {
    var elm = parentHtmlNode.appendChild(document.createElement('p'));
    setCoreAttributes (elm, bmlElm);
    setI18nAttributes (elm, bmlElm);
    setStyleAttributes(elm, bmlElm);
    setKeyEventsAttributes(elm, bmlElm);
    setFocusCtrlAttributes(elm, bmlElm);
    return(elm);
  }
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** BMLʸ���Span���Ǥ���Ϥ���HTMLʸ���Span���Ǥ����������ƥΡ��ɤλҤȤ����ɲä��롥
   *  @name    processSpanElement
   *  @param   {Element}     bmlElm          ���Ȥ���BMLʸ�������
   *  @param   {Node}        parentHtmlNode  bmlElm�οƥΡ��ɤ��б�����HTMLʸ��¦�ΥΡ���
   *  @returns {HTMLElement}                 ��������HTML����
   */
  function processSpanElement(bmlElm, parentHtmlNode) {
    var elm = parentHtmlNode.appendChild(document.createElement('span'));
    setCoreAttributes (elm, bmlElm);
    setI18nAttributes (elm, bmlElm);
    setStyleAttributes(elm, bmlElm);
    setKeyEventsAttributes(elm, bmlElm);
    setFocusCtrlAttributes(elm, bmlElm);
    return(elm);
  }
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // hypertext module
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** BMLʸ���Anchor���Ǥ���Ϥ���HTMLʸ���Anchor���Ǥ����������ƥΡ��ɤλҤȤ����ɲä��롥
   *  @name    processAElement
   *  @param   {Element}     bmlElm          ���Ȥ���BMLʸ�������
   *  @param   {Node}        parentHtmlNode  bmlElm�οƥΡ��ɤ��б�����HTMLʸ��¦�ΥΡ���
   *  @returns {HTMLElement}                 ��������HTML����
   */
  function processAElement(bmlElm, parentHtmlNode) {
    // @Todo��a���ǤϽ�ʬ�ʸ��ڤ��Ԥ��Ƥ��ʤ���NetFrontViewer�Ȥθ��ڤ�ɬ��
    var elm = parentHtmlNode.appendChild(document.createElement('a'));
    setCoreAttributes (elm, bmlElm);
    setI18nAttributes (elm, bmlElm);
    setStyleAttributes(elm, bmlElm);
    setKeyEventsAttributes(elm, bmlElm);
    setFocusCtrlAttributes(elm, bmlElm);

    elm.setAttribute('charset', 'EUC-JP');
    var href = bmlElm.getAttribute('href');
    if (href) elm.setAttribute('href', href);
    
    return(elm);
  }
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // form module
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** BMLʸ���Input���Ǥ���Ϥ���HTMLʸ���Input���Ǥ����������ƥΡ��ɤλҤȤ����ɲä��롥
   *  @name    processInputElement
   *  @param   {Element}     bmlElm          ���Ȥ���BMLʸ�������
   *  @param   {Node}        parentHtmlNode  bmlElm�οƥΡ��ɤ��б�����HTMLʸ��¦�ΥΡ���
   *  @returns {HTMLElement}                 ��������HTML����
   */
  function processInputElement(bmlElm, parentHtmlNode) {
    // @Todo��input���ǤϽ�ʬ�ʸ��ڤ��Ԥ��Ƥ��ʤ���NetFrontViewer�Ȥθ��ڤ�ɬ��
    var elm = parentHtmlNode.appendChild(document.createElement('input'));
    setCoreAttributes (elm, bmlElm);
    setI18nAttributes (elm, bmlElm);
    setStyleAttributes(elm, bmlElm);
    setKeyEventsAttributes(elm, bmlElm);
    setFocusCtrlAttributes(elm, bmlElm);

    var tmp;
//  tmp = bmlElm.getAttribute('defaultValue'); elm.setAttribute('defaultValue', tmp);
    tmp = bmlElm.getAttribute('disabled');     elm.setAttribute('disabled',     tmp);
    tmp = bmlElm.getAttribute('maxLength');    elm.setAttribute('maxLength',    tmp);
    tmp = bmlElm.getAttribute('readOnly');     elm.setAttribute('readOnly',     tmp);
    tmp = bmlElm.getAttribute('type');         elm.setAttribute('type',         tmp);
    tmp = bmlElm.getAttribute('value');        elm.setAttribute('value',        tmp);
    
    return(elm);
  }
  
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // object module
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** BMLʸ���Object���Ǥ���Ϥ���HTMLʸ���Object���Ǥ����������ƥΡ��ɤλҤȤ����ɲä��롥
   *  @name    processObjectElement
   *  @param   {Element}     bmlElm          ���Ȥ���BMLʸ�������
   *  @param   {Node}        parentHtmlNode  bmlElm�οƥΡ��ɤ��б�����HTMLʸ��¦�ΥΡ���
   *  @returns {HTMLElement}                 ��������HTML����
   */
  function processObjectElement(bmlElm, parentHtmlNode) {
    var elm = parentHtmlNode.appendChild(document.createElement('object'));
    setCoreAttributes (elm, bmlElm);
    setI18nAttributes (elm, bmlElm);
    setStyleAttributes(elm, bmlElm);
    setKeyEventsAttributes(elm, bmlElm);
    setFocusCtrlAttributes(elm, bmlElm);

    // @Todo��Object���Ǥ�°���ˤĤ��������Ȱ������ˤĤ��Ƹ�Ƥ��ɬ��
    var tmp;
    tmp = MIME_TYPE_MAP[bmlElm.getAttribute('type')]; if (tmp) elm.setAttribute('type', tmp);
    tmp = bmlElm.getAttribute('data');                if (tmp) elm.dataInterface = tmp;
    // streamposition
    // streamlooping : 1
    // streamstatus
    // remain

    return(elm);
  }
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // metainformation module
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** BMLʸ���Meta���Ǥ���Ϥ���HTMLʸ���Meta���Ǥ����������ƥΡ��ɤλҤȤ����ɲä��롥<br>
   *  ��������Meta���Ǥϲ��������Ԥ�ʤ���
   *  @name    processMetaElement
   *  @param   {Element}     bmlElm          ���Ȥ���BMLʸ�������
   *  @param   {Node}        parentHtmlNode  bmlElm�οƥΡ��ɤ��б�����HTMLʸ��¦�ΥΡ���
   *  @returns {HTMLElement}                 ��������HTML����
   */
  function processMetaElement(bmlElm, parentHtmlNode) {
    return(parentHtmlNode);
  }
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // scripting module
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** BMLʸ���Script���Ǥ���Ϥ���HTMLʸ���Script���Ǥ����������ƥΡ��ɤλҤȤ����ɲä��롥<br>
   *  @name    processScriptElement
   *  @param   {Element}     bmlElm          ���Ȥ���BMLʸ�������
   *  @param   {Node}        parentHtmlNode  bmlElm�οƥΡ��ɤ��б�����HTMLʸ��¦�ΥΡ���
   *  @returns {HTMLElement}                 ��������HTML����
   */
  function processScriptElement(bmlElm, parentHtmlNode) {
    if (isFirstScript) {
      // Script���Ǥ����ƽи��������ϡ��������˻����Script�ե�������ɤ߹��ࡥ
      BML.Util.each.call(BML.config.prefixScriptIncPath, function(v) {
        getExternalScript(v, BML.loaderUri);
      });
      isFirstScript = false;
    }

    var elm = null;
    var src = bmlElm.getAttribute('src');
    if (src) {
      getExternalScript(src, BML.uri);
    } else {
      if (isFirstInnerScript) {
        // ���Ǥ����Script���Ǥ��и�������硤�������˻����Script�ե�������ɤ߹��ࡥ
        BML.Util.each.call(BML.config.suffixScriptIncPath, function(v) {
          getExternalScript(v, BML.loaderUri);
        });
        isFirstInnerScript = false;
      }
      // ������(Script����)��¸�ߤ����ǽ�������뤿�ᡤ���顼����򤹤뤿���Script���Ǥ�ҥΡ��ɤȤ����ɲä��롥
      // Script�������(TextNode��CDATASectionNode��)Script���Τ�����scriptBuffer���ɲä���뤿�ᡤ
      // ��Script���Ǽ��ΤϤ��ޤ��̣��̵����
      elm = setScriptAttributes(document.createElement('script'));
      parentHtmlNode.appendChild(elm);
    }

    return(elm);
  }
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // style module
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** BMLʸ���Style���Ǥ���Ϥ���HTMLʸ���Style���Ǥ����������ƥΡ��ɤλҤȤ����ɲä��롥<br>
   *  @name    processStyleElement
   *  @param   {Element}     bmlElm          ���Ȥ���BMLʸ�������
   *  @param   {Node}        parentHtmlNode  bmlElm�οƥΡ��ɤ��б�����HTMLʸ��¦�ΥΡ���
   *  @returns {HTMLElement}                 ��������HTML����
   */
  function processStyleElement(bmlElm, parentHtmlNode) {
    var elm = parentHtmlNode.appendChild(document.createElement('style'));
    setI18nAttributes(elm, bmlElm);
    setDefaultAttributes(elm, {
      type  : 'text/css',
      media : 'all' // 'tv'
    });
    return(elm);
  }
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // link module
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** BMLʸ���Link���Ǥ���Ϥ���HTMLʸ���Style���Ǥ����������ƥΡ��ɤλҤȤ����ɲä��롥<br>
   *  Link���Ǥ����Ȥ��볰��Style�ե����������������Ƥ�ARIB CSS����W3C CSS���Ѵ����ƻ����ǤȤ����ɲä���style���Ǥ��������롥
   *  @name    processLinkElement
   *  @param   {Element}      bmlElm          ���Ȥ���BMLʸ�������
   *  @param   {Node}         parentHtmlNode  bmlElm�οƥΡ��ɤ��б�����HTMLʸ��¦�ΥΡ���
   *  @returns {HTMLElement}                  ��������HTML����
   *  @throws  {FileNotFound}                 Link���Ǥ����Ȥ��볰���ե����뤬¸�ߤ��ʤ�
   */
  function processLinkElement(bmlElm, parentHtmlNode) {
    var elm  = document.createElement('style');
    setI18nAttributes(elm, bmlElm);
    setDefaultAttributes(elm, {
      type  : 'text/css',
      media : 'all' // 'tv'
    });
    
    var href = BML.Util.combinePath(bmlElm.getAttribute('href'), BML.uri);
    var ajax = new BML.Ajax(href, {
      overrideMimeType : 'text/css; charset=EUC-JP',
      asynchronous     : false,
      method           : 'GET'
    });
    // @Todo�����ơ����������ɤΰ��������󥶥� -> ajax.isSuccess()
    if (ajax.response.statusCode != 200) throw('[FileNotFound] :'+href);

    elm.appendChild(document.createTextNode('/*'+href+'*'+"/\n"+
                                            processARIBCSSProperty(ajax.response.responseText)));
    parentHtmlNode.appendChild(elm);
    elm = parentHtmlNode;
    return(elm);
  }
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // bml module
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** BMLʸ���Bml���Ǥ���Ϥ���HTMLʸ���Html���Ǥ����������ƥΡ��ɤλҤȤ����ɲä��롥<br>
   *  @name    processBmlElement
   *  @param   {Element}     bmlElm          ���Ȥ���BMLʸ�������
   *  @param   {Node}        parentHtmlNode  bmlElm�οƥΡ��ɤ��б�����HTMLʸ��¦�ΥΡ���
   *  @returns {HTMLElement}                 ��������HTML����
   */
  function processBmlElement(bmlElm, parentHtmlNode) {
    var elm = getFirstElementByTagName('html', parentHtmlNode) ||
              parentHtmlNode.appendChild(document.createElement('html'));
    setI18nAttributes(elm, bmlElm);
    setDefaultAttributes(elm, {
      xmlns : 'http://www.w3.org/1999/xhtml',
      lang  : 'ja'
    });
    return(elm);
  }
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** BMLʸ���Bevent���Ǥ���Ϥ��롥<br>
   *  Bevent���ǤˤĤ��Ƥϲ��������Ԥ鷺���ƥΡ��ɤ򤽤Τޤ��֤���
   *  @name    processBeventElement
   *  @param   {Element}     bmlElm          ���Ȥ���BMLʸ�������
   *  @param   {Node}        parentHtmlNode  bmlElm�οƥΡ��ɤ��б�����HTMLʸ��¦�ΥΡ���
   *  @returns {HTMLElement}                 HTML����(�ƥΡ���)
   */
  function processBeventElement(bmlElm, parentHtmlNode) { return(parentHtmlNode); }
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** BMLʸ���Beitem���Ǥ���Ϥ���BML.Bevent����Ͽ���롥<br>
   *  ���ǤˤĤ��Ƥϲ��������Ԥ鷺���ƥΡ��ɤ��֤���
   *  @name    processBeitemElement
   *  @param   {Element}     bmlElm          ���Ȥ���BMLʸ�������
   *  @param   {Node}        parentHtmlNode  bmlElm�οƥΡ��ɤ��б�����HTMLʸ��¦�ΥΡ���
   *  @returns {HTMLElement}                 HTML����(�ƥΡ���)
   */
  function processBeitemElement(bmlElm, parentHtmlNode) {
    var prop = {};
    BML.Util.each.call([
      'id',      'time_mode',  'message_id',       'language_tag',
      'type',    'time_value', 'message_group_id', 'module_ref',
      'onoccur', 'object_id',  'message_version',  'subscribe',    'es_ref'
    ], function(v) {
      prop[v] = bmlElm.getAttribute(v);
    });
    BML.Bevent.entry(prop);
    return(parentHtmlNode);
  }
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** BMLʸ���Text�Ρ��ɤ���Ϥ���HTMLʸ���Text�Ρ��ɤ����������ƥΡ��ɤλҤȤ����ɲä��롥<br>
   *  @name    processTextNode
   *  @param   {Element}     bmlElm          ���Ȥ���BMLʸ�������
   *  @param   {Node}        parentHtmlNode  bmlElm�οƥΡ��ɤ��б�����HTMLʸ��¦�ΥΡ���
   *  @returns {Node}                        ��������HTML����
   */
  function processTextNode(bmlNode, parentHtmlNode) {
    var node = document.createTextNode(bmlNode.nodeValue);
    parentHtmlNode.appendChild(node);
    return(node);
  }
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** BMLʸ���CDATASection�Ρ��ɤ���Ϥ���HTMLʸ���CDATASection�Ρ��ɤ����������ƥΡ��ɤλҤȤ����ɲä��롥<br>
   *  @name    processCDATASection
   *  @param   {Element}     bmlElm          ���Ȥ���BMLʸ�������
   *  @param   {Node}        parentHtmlNode  bmlElm�οƥΡ��ɤ��б�����HTMLʸ��¦�ΥΡ���
   *  @returns {Node}                        ��������HTML����
   */
  function processCDATASection(bmlNode, parentHtmlNode) {
    var node = (BML.Util.supportSpecificHTMLElement) ? 
      document.createCDATASection(bmlNode.nodeValue) :
      document.createTextNode    (bmlNode.nodeValue);
    parentHtmlNode.appendChild(node);
    return(node);
  }
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** BMLʸ���Style���Ǥλ����ǤǤ���CDATASection�Ρ��ɤ���Ϥ���HTMLʸ���CDATASection�Ρ��ɤ����������ƥΡ��ɤλҤȤ����ɲä��롥<br>
   *  @name    processStyleCDATASection
   *  @param   {Element}     bmlElm          ���Ȥ���BMLʸ�������
   *  @param   {Node}        parentHtmlNode  bmlElm�οƥΡ��ɤ��б�����HTMLʸ��¦�ΥΡ���
   *  @returns {Node}                        ��������HTML����
   */
  function processStyleCDATASection(bmlNode, parentHtmlNode) {
    var style = bmlNode.nodeValue;
    var node = (BML.Util.supportSpecificHTMLElement) ? 
      document.createCDATASection(processARIBCSSProperty(style)) :
      document.createTextNode    (processARIBCSSProperty(style));
    parentHtmlNode.appendChild(node);
    return(node);
  }
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** BMLʸ���Script���Ǥλ����ǤǤ���CDATASection�Ρ��ɤ���Ϥ��롥<br>
   *  CDATASection�Ρ��ɤΥΡ�����(Script����)��scriptBuffer���ݻ��������ǤˤĤ��Ƥϲ��������Ԥ鷺���ƥΡ��ɤ��֤���
   *  @name    processScriptCDATASection
   *  @param   {Element}     bmlElm          ���Ȥ���BMLʸ�������
   *  @param   {Node}        parentHtmlNode  bmlElm�οƥΡ��ɤ��б�����HTMLʸ��¦�ΥΡ���
   *  @returns {Node}                        HTML����(�ƥΡ���)
   */
  function processScriptCDATASection(bmlNode, parentHtmlNode) {
    scriptBuffer[scriptBuffer.length] = toValidJavaScript(bmlNode.nodeValue);
    return(parentHtmlNode);
  }
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** ���Ǽ��ȤΥե���ȥ������ȡ����Ȥ�°����֥�å����Ǥ�����������롥<br>
   *  ����p���ǤǤ��뼫�Ȥ�����������黻�Ф��롥
   *  @name    getInlineStyleProperties
   *  @param   {Element}     elm   HTML����
   *  @param   {String}      name  HTML���ǤΥΡ���̾(����̾)
   *  @returns {Array}             ��������������<br>
   *                               [0] �ե���ȥ�����(Number)<br>
   *                               [1] ��(Number)
   */

  function getInlineStyleProperties(elm, name) {
    if (!elm) return([0, 0]);

    var getStyle = BML.Util.getStyle;
    var fontSize = getStyle(elm, 'fontSize') || '';
    var width    = 0;
    while(1) {
      if (name == 'p') {
        width = getStyle(elm, 'width') || 0;
        break;
      }
      elm = elm.parentNode;
      if (elm === null) break;
      name = elm.nodeName.toLowerCase();
    }

    var isUndefined = BML.Util.isUndefined;
    return([!fontSize ? 24  : parseInt(fontSize, 10),
            !width    ? 960 : parseInt(width,    10)]);
  }
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** �ƥ֥�å����Ǥ��Ф������Ǥ�X�������ΰ��֤�������롥<br>
   *  ���֤ϡ����Ȥ��뤤������κ���(previousSibling)����������롥<br>
   *  ���Ȥ��뤤������κ��٤��ʤ������ġ��Ƥ�p���Ǥξ���0�Ȥʤ롥
   *  @name    getInlineCurrentXPosition
   *  @param   {Node}   node       ���֤����������HTML����
   *  @param   {Node}   parent     HTML���ǤοƥΡ���
   *  @param   {String} parentName �ƥΡ��ɤΥΡ���̾(����̾)
   *  @returns {Number}            X�������ˤ��������
   */
  function getInlineCurrentXPosition(node, parent, parentName) {
    var sibling = (!node || !node.parentNode) ? parent.lastChild : node.previousSibling;
    if (!sibling) {
      if (parentName == 'p') return(0);

      while(1) {
        sibling = parent.previousSibling;
        if (sibling) break;
        parent = parent.parentNode;
        if (!parent || (parent.nodeName.toLowerCase() == 'p')) break;
      }
    }
    if (!sibling) return(0);

    var xpos = sibling._curXPos;
    return(isNaN(xpos) ? 0 : xpos);
  }
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** ʸ��������������(����/����/����)����������Ǥ˽����������롥<br>
   *  ���ϥ���ľ��/��λ����ľ��������������̵�뤹��ʤɤΥ롼���§�롥<br>
   *  �롼��ˤĤ��Ƥϡ�ARIB STD-B24 ������ ��°2��5.3.2 �������ʶ��򡢲��ԡ����֡ˤΰ����׻��ȡ�
   *  @name    handleInlineCtrlString
   *  @param   {String} str    �о�ʸ����
   *  @param   {Node}   node   �о�ʸ�����ͭ����Node(TextNode/CDATASectionNode)
   *  @returns {Number}        ���������������ʸ����
   */
  function handleInlineCtrlString(str, node) {
    var prevName  = ((node.previousSibling || {}).nodeName || '').toLowerCase();
    var nextName  = ((node.nextSibling     || {}).nodeName || '').toLowerCase();

    // ���ϥ���ľ��/��λ����ľ�����������ν���
    var prev = (/^[\s\r\n]/.test(str) &&
                ((prevName == 'span') || (prevName == 'a'))) ? ' ' : '';
    var next = (/[\s\r\n]$/.test(str) &&
                ((nextName == 'span') || (nextName == 'a') || (nextName == 'br'))) ? ' ' : '';

    // ���פ����������ִ�/���
    str = str.replace(/^\s+/,     '');
    str = str.replace(/\s+$/,     '');
    str = str.replace(/[\r\n]/mg, ' ');

    // ʸ���֤�����������(2�Х���ʸ���֤���������̵�롥����ʳ��϶���1ʸ��)
    var buf = '';
    while(1) {
      if (!(/([^\s])\s+([^\s])/.test(str))) break;
      var l = RegExp.$1;
      var r = RegExp.$2;
      str  = RegExp.rightContext;
      buf += RegExp.leftContext + l +
        (((l._charCodeAt_(l.length-1) <= 0xff) || (r._charCodeAt_(0) <= 0xff)) ? ' ' : '') + r;
    }
    return(prev + buf + str + next);
  }
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** �֥�å����Ǥ����˹�碌��ʸ�����ǽưŪ���Ԥ�Ԥ����Է�̤�������롥<br>
   *  ����ʸ�����뤤������Ķ������˲��Ԥ�Ԥ������ϿƥΡ��ɤ���������롥
   *  @name    iterateWordBreak
   *  @param   {String} str        �о�ʸ����
   *  @param   {Node}   node       �о�ʸ�����ͭ����Ρ���(TextNode/CDATASectionNode)
   *  @param   {Node}   parent     �Ρ��ɤοƥΡ���
   *  @param   {String} parentName �ƥΡ��ɤΥΡ���̾(����̾)
   *  @returns {Array}             ���Է��<br>
   *                               [0] ���Ԥ�Ԥä�ʸ����(String)
   *                               [1] �֥�å�������ˤ�����ʸ����ü��X�������ΰ���(Number)
   */
  function iterateWordBreak(str, node, parent, parentName) {
    var tmp      = getInlineStyleProperties(parent, parentName);
    var fontSize = tmp[0];
    var width    = tmp[1];
    var pos      = getInlineCurrentXPosition(node, parent, parentName);

    // ���˹�碌��ʸ�����ǽưŪ���ԡ�ʸ���������ե���ȤǤ�������
    // @Todo��character spacing��̤����(��style��������Ǥ���ФǤ�����)
    // @Todo��1ʸ������ʸ����append���Ƥ����Τϸ�Ψ�������ΤǺ�Ŭ���ס�
    var buf = '', halfSize = Math.floor(fontSize / 2);
    for(var i = 0, l = str.length; i < l; i++) {
      var c = str.charAt(i);
      
      if (c == "\n") {
        buf += c;
        pos  = 0;
      } else {
        var cl = (str._charCodeAt_(i) <= 0xff) ? halfSize : fontSize;
        pos   += cl;
        if (pos > width) {
          buf += "\n" + c;
          pos  = cl;
        } else {
          buf += c;
        }
      }
    }
    
    return([buf, pos]);
  }
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** �������ʸ���������������Ǥ����ꤹ�롥<br>
   *  ���Ǥ�TextNode��CDATASectionNode���ˤ�äƽ������Ѥ��롥
   *  @name    processInlineString
   *  @param   {String}  str        �о�ʸ����
   *  @param   {Node}    node       �о�ʸ��������ꤹ��Ρ���
   *  @param   {Node}    refNode    node���б����뻲�ȥΡ���
   *  @param   {Node}    parent     ���ȥΡ��ɤοƥΡ���
   *  @param   {String}  parentName �ƥΡ��ɤΥΡ���̾(����̾)
   *  @param   {Boolean} isCDATA    ���ȥΡ��ɤ�CDATASectionNode��TextNode���򼨤��ե饰(CDATASectionNode=��)
   */
  /**#@-*/
  function processInlineString(str, node, ref, parent, parentName, isCDATA) {
    var broken = str || '';
    broken = isCDATA ? broken.replace(/\r\n?/g, "\n") : handleInlineCtrlString(broken, ref);
    
    var tmp = iterateWordBreak(broken, node, parent, parentName);
    var pos = tmp[1];
    broken  = tmp[0];

    // �����Ǥˤ�����Ǹ�λ����Ǥǹ�ä����ϿƤ˰��֤����Ť���
    if (!ref.nextSibling) {
      var p = parent;
      while(1) {
        p._curXPos = pos;
        if (p.nextSibling) break;
        p = p.parentNode;
        if (!p || p.nodeName.toLowerCase() == 'p') break;
      }
    }

    /** �ƥ֥�å�������ˤ��������ǽ�ü��X�������ΰ��֡� @public @propertyEx HTMLElement.prototype._curXPos |Number|undefined */
    node._curXPos  = pos;
    /** ���Ǥ����ꤵ�줿�����nodeValue�Υ���å��塥     @public @propertyEx HTMLElement.prototype._orgValue|String|undefined  */
    node._orgValue = str;

    node.nodeValue = broken;
  }
  /**#@+ @methodOf BML.Builder @inner @static @description (̵̾�ؿ���ǤΥ桼�ƥ���ƥ��ؿ��Ǥ��ꡤ�������׳�����ϸ����ʤ���)<br> */
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** BMLʸ��Υ֥�å��������TextNode�Ρ��ɤ���Ϥ���HTMLʸ���TextNode�Ρ��ɤ����������ƥΡ��ɤλҤȤ����ɲä��롥<br>
   *  @name    processTextNodeInBlockElement
   *  @param   {Element}     bmlElm         ���Ȥ���BMLʸ�������
   *  @param   {Node}        parentHtmlNode bmlElm�οƥΡ��ɤ��б�����HTMLʸ��¦�ΥΡ���
   *  @param   {String}      parentName     �ƥΡ��ɤΥΡ���̾(����̾)
   *  @returns {Node}                       ��������HTML����
   */
  /**#@-*/
  function processTextNodeInBlockElement(bmlElm, parentHtmlNode, parentName) {
    var elm = document.createTextNode('');
    elm._cdata_section = false;
    parentHtmlNode.appendChild(elm);
    processInlineString(bmlElm.nodeValue, elm, bmlElm, parentHtmlNode, parentName, false);
    return(elm);
  }
  /**#@+ @methodOf BML.Builder @inner @static @description (̵̾�ؿ���ǤΥ桼�ƥ���ƥ��ؿ��Ǥ��ꡤ�������׳�����ϸ����ʤ���)<br> */
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** BMLʸ��Υ֥�å��������CDATASectionNode�Ρ��ɤ���Ϥ���HTMLʸ���CDATASectionNode�Ρ��ɤ����������ƥΡ��ɤλҤȤ����ɲä��롥<br>
   *  @name    processCDATASectionInBlockElement
   *  @param   {Element}     bmlElm         ���Ȥ���BMLʸ�������
   *  @param   {Node}        parentHtmlNode bmlElm�οƥΡ��ɤ��б�����HTMLʸ��¦�ΥΡ���
   *  @param   {String}      parentName     �ƥΡ��ɤΥΡ���̾(����̾)
   *  @returns {Node}                       ��������HTML����
   */
  /**#@-*/
  function processCDATASectionInBlockElement(bmlElm, parentHtmlNode, parentName) {
    var elm = (BML.Util.supportSpecificHTMLElement) ? 
      document.createCDATASection('') : document.createTextNode('');
    /** ���Ǥ�CDATASectionNode�Ǥ��뤳�Ȥ򼨤��ե饰�� @public @propertyEx HTMLElement.prototype._cdata_section |Boolean|undefined */
    elm._cdata_section = true;
    parentHtmlNode.appendChild(elm);
    processInlineString(bmlElm.nodeValue, elm, bmlElm, parentHtmlNode, parentName, true);
    return(elm);
  }

  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /**#@+ @memberOf BML.Builder @inner @static @constant @description (̵̾�ؿ��������Ǥ��곰�������Բ�)<br> */
  /** CharacterData��Ѿ�����DOMInterface���ȿƥΡ��ɤ��б�����DOMInterface�����ݻ���������<br>
   *  @name CharacterDataDOMInterface @type Array<String|Array> */
  var CharacterDataDOMInterface =
    BML.Util.isSafari ?
      [ [Text],                [ HTMLElement ]                                             ] :
   !BML.Util.supportSpecificHTMLElement ? 
      [ [Text, CDATASection ], [ HTMLElement ]                                             ] :
      [ [Text, CDATASection ], [ HTMLSpanElement, HTMLParagraphElement, HTMLAnchorElement] ];
  /**#@-*/

  /** CharacterData��Ѿ��������Ǥ��Ф���ʸ�������ꤹ�뤿���data°����wrapper�ץ�ѥƥ���<br>
   *  @name CharacterData.prototype.dataInterface @memberOf CharacterData.prototype @type Function */
  /**#@+ @methodOf BML.Builder @inner @static @description (̵̾�ؿ���ǤΥ桼�ƥ���ƥ��ؿ��Ǥ��ꡤ�������׳�����ϸ����ʤ���)<br> */
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** CharacterData��Ѿ�����DOMInterface�����Ф���ʸ�������ѤΥ��󥿥ե��������������̵̾�ؿ���
   *  @name  BML.Builder.$anonymous1 @methodOf BML.Builder @inner
   *  @param {DOMInterface} dom ʸ�������ץ��󥿥ե������������ǽ��DOM���󥿥ե����� */
  BML.Util.each.call(CharacterDataDOMInterface[0], function(elm) {
    try {
      //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
      /** CharacterData��Ѿ��������Ǥ����ꤵ�줿ʸ�����������getter��̵̾�ؿ���
       *  @name    BML.Builder.$anonymous2 @methodOf BML.Builder @inner
       *  @returns {String} ���Ǥ����ꤵ�줿ʸ���� */
      elm.prototype.__defineGetter__('dataInterface', function() { return(this._orgValue); });
      //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
      /** CharacterData��Ѿ��������Ǥ��Ф���ʸ�������ꤹ��setter��̵̾�ؿ���
       *  @name  BML.Builder.$anonymous3 @methodOf BML.Builder @inner
       *  @param {String} str �����о�ʸ���� */
      /**#@-*/
      elm.prototype.__defineSetter__('dataInterface', function(str) {
        if (str == this._orgValue) return;
        
        var parent     = this.parentNode;
        var parentName = parent.nodeName.toLowerCase();
        processInlineString(str, this, this, parent, parentName, this._cdata_section);
        
        // ����(pivot)�ʹߤ�����Node���Ф��ƿƤ��̤�ʤ����Layout��»�
        var pivot = this;
        while(1) {
          var nextSibling = pivot.nextSibling;
          while(1) {
            if (!nextSibling) break;
            nextSibling.layout(parent, parentName);
            nextSibling = nextSibling.nextSibling;
          }
          if (parentName == 'p') break;
          
          pivot  = parent;
          parent = pivot.parentNode;
          if (!parent) break;
          parentName = parent.nodeName.toLowerCase();
        }
      });
      /** ���Ȥ�ʸ���κ�����(���԰��֤κƷ׻�)��Ԥ���
       *  @name CharacterData.prototype.layout @methodOf CharacterData.prototype
       *  @param {Node}   parent     ���ȤοƥΡ���
       *  @param {String} parentName �ƥΡ��ɤΥΡ���̾(����̾) */
      elm.prototype.layout = function(parent, parentName) {
        processInlineString(this._orgValue || '', this, this,
                            parent, parentName, this._cdata_section || false);
      };
    } catch(e) {
      BML.Debug.error(e);
    }
  });
  /**#@+ @methodOf BML.Builder @inner @static @description (̵̾�ؿ���ǤΥ桼�ƥ���ƥ��ؿ��Ǥ��ꡤ�������׳�����ϸ����ʤ���)<br> */
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** CharacterData��Ѿ��������Ǥο����Ǥ�DOMInterface�����Ф���ʸ���������Ѵؿ����������̵̾�ؿ���
   *  @name  BML.Builder.$anonymous4 @methodOf BML.Builder @inner
   *  @param {DOMInterface} dom ʸ�������ִؿ��������ǽ��DOM���󥿥ե����� */
  /**#@-*/
  BML.Util.each.call(CharacterDataDOMInterface[1], function(elm) {
    try {
      /** �����Ǥ��Ф���ʸ���κ�����(���԰��֤κƷ׻�)����ꤹ�롥
       *  @name HTMLElement.prototype.layout @methodOf HTMLElement.prototype
       *  @param {Node}   parent     ���ȤοƥΡ���
       *  @param {String} parentName �ƥΡ��ɤΥΡ���̾(����̾) */
      elm.prototype.layout = function(parent, parentName) {
        var name       = this.nodeName.toLowerCase();
        var childNodes = this.childNodes;
        for(var i = 0, l = childNodes.length; i < l; i++) {
          childNodes[i].layout(this, name);
        }
      };
    } catch(e) {
      BML.Debug.error(e);
    }
  });

  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** Object���Ǥ��Ф��ƥǡ��������������ꤹ�뤿���data°����wrapper�ץ�ѥƥ���<br>
   *  @name HTMLObjectElement.prototype.dataInterface @memberOf HTMLObjectElement.prototype @type Function */
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** Object���Ǥ����ꤵ�줿�ǡ������������������getter��̵̾�ؿ���
   *  @name    BML.Builder.$anonymous5 @methodOf BML.Builder @inner
   *  @returns {String} ���Ǥ����ꤵ�줿�ǡ��������� */
  HTMLObjectElement.prototype.__defineGetter__('dataInterface', function()    {
    return(this._orgData);
  });
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** Object���Ǥ����ꤵ�줿�ǡ��������������ꤹ��setter��̵̾�ؿ���
   *  @name  BML.Builder.$anonymous6 @methodOf BML.Builder @inner
   *  @param {String} ���Ǥ����ꤹ��ǡ��������� */
  HTMLObjectElement.prototype.__defineSetter__('dataInterface', function(str) {
    this._orgData = str;
    if (!this.getAttribute('type')) return;
    this.data = BML.Util.combinePath(str, BML.uri);
  });

  if (!BML.Util.isSafari) {
    HTMLBRElement.prototype.layout = function() {};
//  } else if (!BML.Util.supportSpecificHTMLElement) {
//  } else {
  }
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /**#@+ @methodOf BML.Builder @inner @static @description (̵̾�ؿ���ǤΥ桼�ƥ���ƥ��ؿ��Ǥ��ꡤ�������׳�����ϸ����ʤ���)<br> */
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /** BMLʸ��ΥΡ��ɤ򼫿ȤȻҥΡ��ɤ��Ф��ƺƵ�Ū�˲��Ϥ����б�����HTMLʸ��ΥΡ��ɤ����������ƥΡ��ɤλҤȤ����ɲä��롥<br>
   *  @name   buildNode
   *  @param  {Node}   bmlNode             ���Ȥ���BMLʸ��ΥΡ���
   *  @param  {Node}   parentHtmlNode      bmlElm�οƥΡ��ɤ��б�����HTMLʸ��¦�ΥΡ���
   *  @param  {String} parentName          �ƥΡ��ɤΥΡ���̾(����̾)
   *  @throws {UnexpectedElementNodeFound} ͽ�����ʤ����Ǥ��и�
   *  @throws {UnexpectedNodeFound}        ͽ�����ʤ��Ρ��ɤ��и�
   */
  function buildNode(bmlNode, parentHtmlNode, parentName) {
    if (!bmlNode) return;

    var nType = bmlNode.nodeType, func;
    switch(nType) {
      case(NODETYPE.DOCUMENT_NODE)         : checkDocNode    (bmlNode); break;
      case(NODETYPE.DOCUMENT_TYPE_NODE)    : checkDocTypeNode(bmlNode); break;
      case(NODETYPE.PROC_INSTRUCTION_NODE) : checkPINode     (bmlNode); break;
      case(NODETYPE.COMMENT_NODE)          : checkCommentNode(bmlNode); break;
      case(NODETYPE.ELEMENT_NODE)          : {
        var nName = bmlNode.nodeName.toLowerCase();
        switch(nName) {
          case('body'  ) : parentHtmlNode = processBodyElement  (bmlNode, parentHtmlNode); break;
          case('head'  ) : parentHtmlNode = processHeadElement  (bmlNode, parentHtmlNode); break;
          case('title' ) : parentHtmlNode = processTitleElement (bmlNode, parentHtmlNode); break;
          case('div'   ) : parentHtmlNode = processDivElement   (bmlNode, parentHtmlNode); break;
          case('br'    ) : parentHtmlNode = processBrElement    (bmlNode, parentHtmlNode); break;
          case('p'     ) : parentHtmlNode = processPElement     (bmlNode, parentHtmlNode); break;
          case('span'  ) : parentHtmlNode = processSpanElement  (bmlNode, parentHtmlNode); break;
          case('a'     ) : parentHtmlNode = processAElement     (bmlNode, parentHtmlNode); break;
          case('input' ) : parentHtmlNode = processInputElement (bmlNode, parentHtmlNode); break;
          case('object') : parentHtmlNode = processObjectElement(bmlNode, parentHtmlNode); break;
          case('meta'  ) : parentHtmlNode = processMetaElement  (bmlNode, parentHtmlNode); break;
          case('script') : parentHtmlNode = processScriptElement(bmlNode, parentHtmlNode); break;
          case('style' ) : parentHtmlNode = processStyleElement (bmlNode, parentHtmlNode); break;
          case('link'  ) : parentHtmlNode = processLinkElement  (bmlNode, parentHtmlNode); break;
          case('bml'   ) : parentHtmlNode = processBmlElement   (bmlNode, parentHtmlNode); break;
          case('bevent') : parentHtmlNode = processBeventElement(bmlNode, parentHtmlNode); break;
          case('beitem') : parentHtmlNode = processBeitemElement(bmlNode, parentHtmlNode); break;
          default        : throw((/^\[/.test(e) ?
            e : '[UnexpectedElementNodeFound] : "'+nName+'"(parent:"'+parentHtmlNode.nodeName+'"'));
        }
      } break;
      case(NODETYPE.TEXT_NODE)             : {
        switch(parentName) {
          case('title') : parentHtmlNode = processTextNode              (bmlNode, parentHtmlNode, parentName); break;
          case('p'    ) : parentHtmlNode = processTextNodeInBlockElement(bmlNode, parentHtmlNode, parentName); break;
          case('span' ) : parentHtmlNode = processTextNodeInBlockElement(bmlNode, parentHtmlNode, parentName); break;
          case('a'    ) : parentHtmlNode = processTextNodeInBlockElement(bmlNode, parentHtmlNode, parentName); break;
//          case('style') : parentHtmlNode = BML.Util.K(bmlNode, parentHtmlNode, parentName); break; // @Todo��style���Ǥλ����Ǥ�ɬ��CDATASection��?
//          case('html' ) : parentHtmlNode = BML.Util.K(bmlNode, parentHtmlNode, parentName); break; // @Todo��script���Ǥλ����Ǥ�ɬ��CDATASection��?
          default       : break;
        }
      } break;
      case(NODETYPE.CDATA_SECTION_NODE)    : {
        switch(parentName) {
          case('title' ) : parentHtmlNode = processCDATASection              (bmlNode, parentHtmlNode, parentName); break;
          case('p'     ) : parentHtmlNode = processCDATASectionInBlockElement(bmlNode, parentHtmlNode, parentName); break;
          case('span'  ) : parentHtmlNode = processCDATASectionInBlockElement(bmlNode, parentHtmlNode, parentName); break;
          case('a'     ) : parentHtmlNode = processCDATASectionInBlockElement(bmlNode, parentHtmlNode, parentName); break;
          case('script') : parentHtmlNode = processScriptCDATASection        (bmlNode, parentHtmlNode, parentName); break;
          case('style' ) : parentHtmlNode = processStyleCDATASection         (bmlNode, parentHtmlNode, parentName); break;
          default        : break;
        }
      } break;
      default : throw('[UnexpectedNodeFound] : "'+bmlNode.nodeName+'"(parent:"'+parentHtmlNode.nodeName+'")');
    }
  
    var children = bmlNode.childNodes;
    for(var i = 0, l = children.length; i < l; i++) {
      buildNode(children[i], parentHtmlNode, parentHtmlNode.nodeName.toLowerCase());
    }
  }
  /**#@-*/
  //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  return({
    /**#@+ @memberOf BML.Builder @static @public */
    /** BMLʸ��ι��۴�λ�ե饰 @propertyEx BML.Builder.complete|Boolean|false */
    complete : false,
    /**#@-*/
    /**#@+ @methodOf BML.Builder @static */
    //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    /** BMLʸ�����������Ϥ���HTMLʸ��Ȥ��ƹ��ۤ��롥<br>
     *  BMLʸ��μ����塤BML.Ajax�Υ�����Хå��ؿ�(onSuccess)��ǹ��ۤ�Ԥ���
     *  @name  build
     *  @param {String} uri BMLʸ���URI
     */
    build : function(uri) {
      var ajax = new BML.Ajax(uri, {
        overrideMimeType : 'text/xml; charset=EUC-JP',
        asynchronous     : true,
        method           : 'GET',
        onSuccess        : function(response) {
          var buildSTime = (new Date).getTime();
          BML.Debug.info('[xhtml build start]');
          try {
            if (!response.responseXML) throw('[InvalidXMLResponse]:responseXML is null');
            
            buildNode(response.responseXML, document, document.nodeName.toLowerCase());

            if (BML.Util.isSafari) { // body���Ǥ��append����(���褬���ޤ�����ʤ�����)
              var body = getFirstElementByTagName('body', document);
              body.parentNode.appendChild(body.parentNode.removeChild(body));
            }
            
            BML.Debug.info('[xhtml build done :' +
                           ((new Date).getTime() - buildSTime)+'[ms]]');

            // �����ե�����(ECMAScript�ե�����)��������BMLʸ��ι��ۤ���˽���ä�
            // �������ϡ�getExternalScript���̵̾�ؿ����BML.Builder.finish()���¹Ԥ���롥
            if (scriptBuffer.count <= 0) {
              BML.Builder.finish();
            }
            BML.Builder.complete = true;
          } catch(e) {
            BML.Debug.error(e);
          }
        },
        onFailure        : function(response) {
          BML.Debug.error('[BML.Builder.build : load failed('+uri+'): '+
                          response.statusCode + ':'+response.statusText+']');
        }
      });
    },
    //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    /** BMLʸ��ι��۴�λ������Ԥ���<br>
     *  @name  finish
     */
    finish : function() {
      var elm;
      if (scriptBuffer.length > 0) {
        // bml�˵���/���Ȥ����script���Ǥ�Ǹ�ˤޤȤ��append
        elm = setScriptAttributes(document.createElement('script'));
        elm.appendChild(document.createTextNode(scriptBuffer.join('')));
        var head = getFirstElementByTagName('head', document);
        head.appendChild(elm);
      }
      
      // �ʥӥ��������ν����
      BML.Navigation.initialize();
      
      // body�κǸ��Script���Ǥ�append����onload��¹Ԥ���
      elm = setScriptAttributes(document.createElement('script'));
      elm.appendChild(document.createTextNode("BML.Builder.onload();"));
      getFirstElementByTagName('body', document).appendChild(elm);
    },
    //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    /** BMLʸ��˵��Ҥ��줿onload���٥�ȥϥ�ɥ��¹Ԥ��롥<br>
     *  @name  onload
     */
    onload : function() {
      document.currentEvent = {
        type   : 'load',
        target : document.getElementsByTagName('body')[0]
      };
      
      // body��onload���Ǥ�����м¹Ԥ���
      if (window[eventHandlers['onload']]) {
        try      { window[eventHandlers['onload']](); }
        catch(e) { BML.Debug.error(e); }
      }
      BML.Debug.info('[BML onload done: '+
                     ((new Date).getTime() - BML.Debug.getLoadStartTime())+'[ms]]');
    },
    //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    /** BMLʸ��˵��Ҥ��줿onunload���٥�ȥϥ�ɥ��¹Ԥ��롥<br>
     *  @name  onunload
     */
    onunload : function() {
      document.currentEvent = {
        type   : 'unload',
        target : document.getElementsByTagName('body')[0]
      };

      // body��onunload���Ǥ�����м¹Ԥ���
      if (window[eventHandlers['onunload']]) {
        try      { window[eventHandlers['onunload']](); }
        catch(e) { BML.Debug.error(e); }
      }
    }
    /**#@-*/
  });
})();
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// ��ư����(IE̤�б��Τ���IE�ξ��ϲ���Ԥ�ʤ�)
/*@cc_on @if(1) (@_jscript)
  document.write('IE��̤�б��Ǥ�');
@else @*/
/** XHTMLʸ����ɸ��BMLʸ����ϳ��Ͻ�����Ԥ�̵̾�ؿ���<br>
 *  window��load���٥�ȥꥹ�ʤȤ�����Ͽ����롥<br>
 *  HTMLʸ���������URI����Ϥ���BMLʸ���URI���������BML.Builder.build��call���롥
 *  @name $anonymous @function
 */
window.addEventListener('load', function() {
  BML.Debug.initialize();

  var uri;
  uri = BML.Util.parseURI(location.href);
  BML.loaderUri = uri;
  BML.Debug.info('[html url]:'+uri.host + uri.path + uri.file);

  uri = BML.Util.parseURI(uri.query);
  BML.uri = uri;
  BML.Debug.info('[bml url]:'+uri.full);

  BML.Navigation.grabInput();
  BML.Builder.build(uri.full);
}, false);
/*@end @*/
