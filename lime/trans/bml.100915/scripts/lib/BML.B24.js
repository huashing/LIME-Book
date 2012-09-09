if (typeof(BML) == 'undefined') throw('BML.js not loaded yet');
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
var browser = (typeof(browser) != 'undefined') ? browser : {};
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
BML.Util.extend(browser, (function() {
  /** @class Ureg����������������饹 ** ���󥰥�ȥ�Ȥ���browser.Ureg�˥��󥹥��󥹲�����롥
   *  @name  browser-UregClass */  
  function UregClass() { this.data = new Array(64); }
  // browser.Ureg�ε������֥�������
  // ���ͤϲ����ΤȤ���ʤΤǡ�getteer/setter���Ѥ��Ƶ���Ū��������������
  // ʸ����ĹȽ��ʤɤ�ϥ�ɥ뤹�롥
  // @Todo��UserData�Ȥ��ƥ֥饦��¦����¸����
  //
  // B24 ������ 7.6.15 Ureg �������֥�����������
  // ��Ureg �ϡ�0��63 �ޤǤ�64 �Ĥ��ͤ��ݻ������ס�ʸ����Υ������Ϻ���256 �Х���
  // �Ǥ��롣�ס�256 �Х��ȤޤǤ��Ǽ���롣256 �Х����ܤ�2 �Х���ʸ����1 �Х�����
  // ���ä����ϡ�����ʸ���ϳ�Ǽ����ʤ�����
  for(var i = 0; i < 64; i++) {
    /** �����Ʊ�ͤ�Ureg�γ���(Ureg[i])�˥����������뤿���getter/setter�ץ�ѥƥ���i��0��63�ο��͡� @propertyEx browser-UregClass.prototype.i|String|read/write */
    /** UregClass�γ���(Ureg[i])�˥����������뤿���getter̵̾�ؿ��� @name browser.$anonymous0 @methodOf browser */
    UregClass.prototype.__defineGetter__(i, function() {
      return(this.data[i]);
    });
    /** UregClass�γ���(Ureg[i])�˥����������뤿���setter̵̾�ؿ��� @name browser.$anonymous1 @methodOf browser */
    UregClass.prototype.__defineSetter__(i, function(val) {
      if (val.length <= 128) {
        // ʸ����ĹȽ�꤬���פʾ��
        this.data[i] = val;
      } else {
        // ʸ����ĹȽ��
        var pos = 0;
        for(var cl, len = 0, max = val.length; pos < max; pos++) {
          cl = val.charCodeAt(pos);
          if ((len + cl) > 256) break;
          len += cl;
        }
        this.data[i] = val.substring(0, pos - 1);
      }
    });
  }
  
  return({
    /** Ureg�������֥����������� @propertyEx browser.Ureg|browser-UregClass|new UregClass @static */
    Ureg : new UregClass()
  });
})());


/** @class BinaryTable���饹
 *  ���Τ�BinaryTable-BinaryTableClass
 *  @name  BinaryTable
 *  @param {Sting} table_ref ɽ�ե�����λ���
 *  @param {Sting} structure ɽ�Υե����ޥåȻ���
 *  @throw {BinaryTableInvalidStructure} �ե����ޥåȤε��Ҥ��������ʤ����
 */
var BinaryTable = (function() {
  /** @class �Х����󤫤�Ǥ�դΥХ���/�ӥå����������뤿����������饹 @inner
   *  @name  BinaryTable-ByteHandler
   *  @param {Array<Number>} [bytes] �Х�����γƥХ����ͤ�������ɽ����������
   */
  function ByteHandler(bytes) {
    /**#@+ @memberOf BinaryTable-ByteHandler.prototype */
    /** �оݥХ�����γƥХ���ñ�̤�������ɽ���������� @propertyEx  BinaryTable-ByteHandler.prototype.bytes  |Array<Number>|new Array() */
    this.bytes   = bytes || [];
    /** �Х�������θ��ߤΥХ��Ȱ��֡��Ǻ���0��          @propertyEx  BinaryTable-ByteHandler.prototype.byteIdx|Number|0 */
    this.byteIdx = 0;
    /** ���ߤΥХ��Ȱ��֤ˤ�����ӥåȰ��֡��Ǻ���0��    @propertyEx  BinaryTable-ByteHandler.prototype.bitPos |Number|0 */
    this.bitPos  = 0;
    /**#@-*/
  }
  /**#@+ @methodOf BinaryTable-ByteHandler */
  /** �ݻ�����Х�����κǸ����˻���ΥХ����ͤ��ɲä��롥
   *  @name    BinaryTable-ByteHandler.prototype.push
   *  @param   {Number} b �ɲä���Х����ͤ�������ɽ��(0��255)
   */
  ByteHandler.prototype.push = function(b) {
    this.bytes.push(b);
  };
  /** �Х����󤫤鼡�˼�������ӥå��ͤ�¸�ߤ��뤫��Ƚ�ꤹ�롥
   *  @name    BinaryTable-ByteHandler.prototype.hasNextBit
   *  @returns {Boolean} �ӥå��ͤ�¸��̵ͭ(ͭ=true)
   */
  ByteHandler.prototype.hasNextBit = function() {
    var max = this.bytes.length - 1;
    return( (this.byteIdx <  max) ||
           ((this.byteIdx == max) && (this.bitPos < 8)));
  };
  /** �Х����󤫤鼡�˼�������Х����ͤ�¸�ߤ��뤫��Ƚ�ꤹ�롥
   *  @name    BinaryTable-ByteHandler.prototype.hasNextByte
   *  @returns {Boolean} �Х����ͤ�¸��̵ͭ(ͭ=true)
   */
  ByteHandler.prototype.hasNextByte = function() {
    var max = this.bytes.length - 1;
    return( (this.byteIdx <  max) ||
           ((this.byteIdx == max) && (this.bitPos === 0)));
  };
  /** �Х����󤫤�����Ĺ���ΥХ�����򡤳ƥХ���ñ�̤�������ɽ�����Ǽ��������Ȥ��Ƽ������롥
   *  @name    BinaryTable-ByteHandler.prototype.getBytes
   *  @param   {Number}        len �Х���Ĺ
   *  @returns {Array<Number>} �ƥХ���ñ�̤�������ɽ�����Ǽ��������
   */
  ByteHandler.prototype.getBytes = function(len) {
    len = isNaN(len) ? 1 : len;

    var ret = [], i;
    var bytes = this.bytes, idx = this.byteIdx, pos = this.bitPos;
    if (pos === 0) {
      for(i = 0; i < len; i++) {
        ret[i] = (bytes[idx++] || 0x00);
      }
    } else {
      for(i = 0; i < len; i++) {
        var buf = ((bytes[idx++] || 0x00) << 8) | (bytes[idx] || 0x00);
        ret[i] = (buf >> (8 - pos)) & 0xff;
      }
    }
    this.byteIdx = idx;
    
    return(ret);
  };
  /** �Х����󤫤�1�Х����ͤ�������ɽ����������롥
   *  @name    BinaryTable-ByteHandler.prototype.getByte
   *  @returns {Number} �Х����ͤ�������ɽ��
   */
  ByteHandler.prototype.getByte = function() {
    return(this.getBytes(1)[0]);
  };
  /** �Х����󤫤�����Ĺ���ΥХ����������դ������ͤȤ��Ƽ������롥
   *  @name    BinaryTable-ByteHandler.prototype.getBytesAsInteger
   *  @param   {Number} len �Х��ȿ�
   *  @returns {Number}     �Х����ͤ�����դ�������ɽ��
   */
  ByteHandler.prototype.getBytesAsInteger = function(len) {
    var bytes = this.getBytesAsUnsignedInteger(len);

    var msb = 0x80;
    for(var i = 1; i < len; i++) {
      msb  = (msb  << 8) | 0x00;
    }
    // �Ǿ�̥ӥåȥ����å�(��������å�)
    if ((ret & msb) > 0) ret = (ret & ~msb) - msb;
    
    return(ret);
  };
  /** �Х����󤫤�����Ĺ���ΥХ���������ʤ������ͤȤ��Ƽ������롥
   *  @name    BinaryTable-ByteHandler.prototype.getBytesAsUnsignedInteger
   *  @param   {Number} len �Х��ȿ�
   *  @returns {Number}     �Х����ͤ����ʤ�������ɽ��
   */
  ByteHandler.prototype.getBytesAsUnsignedInteger = function(len) {
    var bytes = this.getBytes(len);
    var ret = 0;
    for(var i = 0; i < len; i++) {
      ret = (ret << 8) | (bytes[i] || 0x00);
    }
    return(ret);
  };
  /** �Х����󤫤�ӥå�������ʤ�������ɽ���Ǽ������롥
   *  @name    BinaryTable-ByteHandler.prototype.getBits
   *  @param   {Number} len    �ӥå�Ĺ
   *  @param   {Number} [mask] �ӥå�Ĺ�Υޥ���ɽ��
   *  @returns {Number}        �ӥå�������ʤ�������ɽ��
   */
  ByteHandler.prototype.getBits = function(len, mask) {
    var i, l;
    if (!mask) {
      for(mask = 0x01, i = 1; i < len; i++) { mask = (mask << 1) | 0x01; }
    }
  
    var ret, shift;
    var bytes = this.bytes, idx = this.byteIdx, pos = this.bitPos;
    if (len < 8) { // 1byte̤���ʤ�
      shift = 8 - pos - len;
      if (shift >= 0) {
        ret = (bytes[idx] || 0x00);
        ret = (ret >>> shift) & mask;
        this.bitPos += len;
      } else {
        ret = ((bytes[idx++] || 0x00) << 8) & (bytes[idx] || 0x00);
        ret = (ret >>> (8 + shift)) & mask;
        this.pos = -shift;
      }
      this.byteIdx = idx;
    } else { // 1byte�ʾ�ʤ�
      ret = (bytes[idx] || 0x00);
      for(i = 1, l = Math.ceil((pos + len) / 8); i < l; i++) {
        ret = (ret << 8) & (bytes[++idx] || 0x00);
      }
      this.bitPos  = (pos + len) % 8;
      shift        = (8 - this.bitPos) % 8;
      ret          = (ret >>> shift) & mask;
      this.byteIdx = idx;
    }
    return(ret);
  };
  /** �Х����󤫤�ӥå�������ʤ�������ɽ���Ǽ������롥
   *  @name    BinaryTable-ByteHandler.prototype.getBitsAsUnsignedInteger
   *  @param   {Number} len    �ӥå�Ĺ
   *  @param   {Number} [mask] �ӥå�Ĺ�Υޥ���ɽ��
   *  @returns {Number}        �ӥå�������ʤ�������ɽ��
   */
  ByteHandler.prototype.getBitsAsUnsignedInteger = function(len, mask) {
    return(this.getBits(len, mask));
  };
  /** �Х����󤫤�ӥå��������դ�������ɽ���Ǽ������롥<br>
   *  �ӥå�Ĺ�κǾ�̥ӥåȤ����ӥåȤȤ���Ƚ�ꤷ���Х��ȥ��饤���ȤϹ�θ���ʤ���
   *  @name    BinaryTable-ByteHandler.prototype.getBitsAsInteger
   *  @param   {Number} len    �ӥå�Ĺ
   *  @param   {Number} [mask] �ӥå�Ĺ�Υޥ���ɽ��
   *  @returns {Number}        �ӥå��������դ�������ɽ��
   */
  ByteHandler.prototype.getBitsAsInteger = function(len) {
    var msb = 0x01;
    for(i = 1; i < len; i++) {
      msb  = (msb  << 1) | 0x00;
    }
    var mask = ~msb;
    
    var bits = this.getBits(len, msb | mask);
    // �Ǿ�̥ӥåȥ����å�(��������å�)
    if ((bits & msb) > 0) bits = (bits & mask) - msb;
    
    return(bits);
  };
  /**#@-*/

  /**#@+ @methodOf BinaryTable @inner @static @description (̵̾�ؿ���ǤΥ桼�ƥ���ƥ��ؿ��Ǥ��ꡤ�������׳�����ϸ����ʤ���)<br> */
  /** BinaryTable�Υե����ޥåȤ���Ϥ��롥
   *  @name    BinaryTable.parseStructure
   *  @param   {String}        structure     BinaryTable�Υե����ޥåȤ򵭽Ҥ���ʸ����
   *  @returns {Array<Object>}               �����ͤ�ץ�ѥƥ��˻��ĥ��֥������Ȥν���<br>
   *                                         [.type]    �ե�����ɤη�(B/U/I/S/Z/P)
   *                                         [.length]  �ե�����ɤ�Ĺ��
   *                                         [.unit]    �ե�����ɤ�Ĺ����ɽ��ñ��(B/b/V)
   *                                         [.mask]    �ӥå�Ĺ�Υޥ���ɽ��(unit��b(�ӥå�)�ξ��)
   *  @throw   {BinaryTableInvalidStructure} �ե����ޥåȤε��Ҥ��������ʤ����
   */
  function parseStructure(structure) {
    var columns    = structure.split(',');
    var lengthByte = columns.shift();

    structure = [];
    var length, unit, mask;
    for(i = 0, l = columns.length; i < l; i++) {
      var match = /^(\w):(\d+)(\w)$/.exec(columns[i]);
      if (!match) throw('[BinaryTableInvalidStructure] : '+columns[i]);

      
      length = parseInt(match[2], 10);
      unit   = match[3];
      mask   = 0x01;
      
      if (unit == 'b') {
        for(i = 1; i < length; i++) {
          mask = ((mask << 1) | 0x01);
        }
      }
      structure.push({
        type   : match[1],
        length : length,
        unit   : unit,
        mask   : mask
      });
    }
    structure.lengthByte = lengthByte;
    return(structure);
  }
  /** ͹���ֹ��������ɽ�����Ѵ����롥
   *  @name    BinaryTable.zipCodeToInteger
   *  @param   {Number} digit ͹���ֹ�ξ��2��
   *  @param   {Number} a     ͹���ֹ�ξ��3����
   *  @param   {Number} b     ͹���ֹ�β���1����
   *  @param   {Number} c     ͹���ֹ�β���2����
   *  @param   {Number} d     ͹���ֹ�β���3����
   *  @param   {Number} e     ͹���ֹ�β���4����
   *  @returns {Number}       ͹���ֹ��������ɽ��
   */
  function zipCodeToInteger(digit, a, b, c, d, e) {
    return(digit * 100000 + a * 10000 + b * 1000 + c * 100 * d * 10 * e);
  }
  /** ͹���ֹ��������ɽ����list��˴ޤޤ�Ƥ��뤫��Ƚ�ꤹ�롥
   *  @name    BinaryTable.includeZipCode
   *  @param   {Number}        zipCode ͹���ֹ��������ɽ��
   *  @param   {Array<Object>} list    �����ͤ���ĥ��֥������ȤΥꥹ��<br>
   *                                   [.from] �ϰϤβ�����
   *                                   [.to]   �ϰϤξ����
   *  @returns {Boolean}               ���̵ͭ(ͭ=true)
   */
  function includeZipCode(zipCode, list) {
    for(var i = 0, l = list.length; i < l; i++) {
      var condition = list[i];
      if ((condition.from <= zipCode) && (zipCode <= condition.to)) return(true);
    }
    return(false);
  }

//  String.prototype.toBoolean = function() { return((this.toString() !== '')); };
//  Number.prototype.toBoolean = function() { return(this !== 0); };
  /** String���֥������Ȥ����ɽ�����Ѵ����롥
   *  @name BinaryTable.stringToNumber
   *  @param   {String} s �оݤ�String���֥�������
   *  @returns {Number}   String���֥������Ȥο���ɽ��
   */
  var stringToNumber  = function(s) { return((s.toString() === '') ? 0 : parseInt(s, 10)); };
  /** Boolean���֥������Ȥ����ɽ�����Ѵ����롥
   *  @name BinaryTable.booleanToNumber
   *  @param   {Boolean} b �оݤ�Boolean���֥�������
   *  @returns {Number}    Boolean���֥������Ȥο���ɽ��
   */
  var booleanToNumber = function(b) { return(b ? 1 : 0); };
  /**#@-*/
  
  // BinaryTable�μ���
  // @param {Sting} table_ref ɽ�ե�����λ���
  // @param {Sting} structure ɽ�Υե����ޥåȻ���
  // @throw {BinaryTableInvalidStructure} �ե����ޥåȤε��Ҥ��������ʤ����
  function BinaryTableClass(table_ref, structure) {
    // ARIB STD-B24 �����ԡ�7.5.2.2 BinaryTable ���֥������ȤΥ��󥹥ȥ饯����
    // �ǡ����μ���
    var uri = BML.Util.combinePath(table_ref, BML.uri);
    var ajax = new BML.Ajax(uri, {
    overrideMimeType : 'text/plain; charset=x-user-defined',
    asynchronous     : false,
    method           : 'GET'
    });
    // @Todo�����ơ����������ɤΰ��������󥶥�
    if (ajax.response.statusCode != 200) throw('[FileNotFound] :'+uri);

    // �Х�����Ȥ��ƥХåե�
    var byteHandler = new ByteHandler(), i, l;
    var stream = ajax.response.responseText;
    for(i = 0, l = stream.length; i < l; i++) {
      byteHandler.push(stream._charCodeAt_(i) & 0x00ff);
    }
    
    // structure�β���
    structure = parseStructure(structure);
    
    // �ơ��֥�κ���
    var table = [], entry;
    while(1) {
      if (!byteHandler.hasNextBit()) break;
      // @Todo��lengthByte������Ƥ��ʤ�������ʤ���?
      
      entry = [];
      for(i = 0, l = structure.length; i < l; i++) {
        var field = structure[i];
        
        switch(field.type) {
          case('B') : {
            // Boolean
            entry.push(new Boolean((byteHandler.getBits(1) > 0)));
          } break;
          case('U') : {
            // Unsigned Integer
            entry.push(new Number((field.unit == 'b') ?
                                  byteHandler.getBitsAsUnsignedInteger (field.length, field.mask) :
                                  byteHandler.getBytesAsUnsignedInteger(field.length)));
            } break;
          case('I') : {
            entry.push(new Number(byteHandler.getBytesAsInteger(field.length)));
          } break;
          case('S') : {
            if (field.unit == 'B') { // ����Ĺ��ʸ������������
              entry.push(String.charCodeFrom.apply(null,
                                                      byteHandler.getBytes(field.length)));
            } else { // 'V'������Ĺ��ʸ����ν��֤Ǽ�������
              length = byteHandler.getBytesAsUnsignedInteger(field.length);
              entry.push(String.charCodeFrom.apply(null,
                                                   byteHandler.getBytes(length)));
            }
          } break;
          case('P') : {
            (field.unit == 'b') ?
              byteHandler.getBitsAsUnsignedInteger (field.length, field.mask) :
              byteHandler.getBytesAsUnsignedInteger(field.length);
          } break;
          case('Z') : {
            length    = byteHandler.getBytesAsUnsignedInteger(field.length);
            var whole = { include : {}, exclude : {} };

            var includeListNum = byteHandler.getBytesAsUnsignedInteger(1) - 1;
            var excludeListNum = byteHandler.getBytesAsUnsignedInteger(1) / 4;
            includeListNum = includeListNum / 4 - excludeListNum;

            BML.Util.each.call([[whole.exclude, excludeListNum],
                                [whole.include, includeListNum]], function(param) {
              var list = param[0], rangeFrom, msb, from, to, digits, flag, a, b, c, d, e;
              for(var i = 0, l = param[1];  i < l; i++) {
                msb = byteHandler.getBits(1);

                if (!msb) {
                  from = byteHandler.getBitsAsUnsignedInteger(7) * 10;
                  msb  = byteHandler.getBits(1);
                  to   = byteHandler.getBitsAsUnsignedInteger(7) * 10;
                  list.push({
                    from  : (from + 0) * 10000 +     0,
                    to    : (to   + 9) * 10000 +  9999
                  });
                  if (msb) {
                    from = byteHandler.getBitsAsUnsignedInteger(7) * 10;
                    msb  = byteHandler.getBits(1);
                    to   = byteHandler.getBitsAsUnsignedInteger(7) * 10;
                    list.push({
                      from  : (from + 0) * 10000 +     0,
                      to    : (to   + 9) * 10000 +  9999
                    });
                  } else {
                    byteHandler.getBytesAsInteger(2);
                  }

                } else {
                  digits = byteHandler.getBitsAsUnsignedInteger(7);
                  flag   = byteHandler.getBitsAsUnsignedInteger(4);
                  a      = byteHandler.getBitsAsUnsignedInteger(4);
                  b      = byteHandler.getBitsAsUnsignedInteger(4);
                  c      = byteHandler.getBitsAsUnsignedInteger(4);
                  d      = byteHandler.getBitsAsUnsignedInteger(4);
                  e      = byteHandler.getBitsAsUnsignedInteger(4);
                  
                  switch(flag) {
                    case(0x08) : {  // 3digit list
                      BML.Util.each.call([a, b, c, d, e], function(num) {
                        if (num == 0x0f) return;
                        list.push({
                          from  : zipCodeToInteger(digits, num, 0, 0, 0, 0),
                          to    : zipCodeToInteger(digits, num, 9, 9, 9, 9)
                        });
                      });
                      rangeFrom = null;
                    } break;
                    case(0x09) : { // 3digit range
                      BML.Util.each.call([[b, c], [d, e]], function(num) {
                        if ((num[0] == 0x0f) || (num[1] == 0x0f)) return;
                        list.push({
                          from  : zipCodeToInteger(digits, num[0], 0, 0, 0, 0),
                          to    : zipCodeToInteger(digits, num[1], 9, 9, 9, 9)
                        });
                      });
                      rangeFrom = null;
                    } break;
                    case(0x0a) : { // 5digit list
                      BML.Util.each.call([[b, c], [d, e]], function(num) {
                        if ((num[0] == 0x0f) || (num[1] == 0x0f)) return;
                        list.push({
                          from  : zipCodeToInteger(digits, a, num[0], num[1], 0, 0),
                          to    : zipCodeToInteger(digits, a, num[0], num[1], 9, 9)
                        });
                      });
                      rangeFrom = null;
                    } break;
                    case(0x0b) : { // 5digit range from
                      rangeFrom = zipCodeToInteger(digits, a, b, c, 0, 0);
                    } break;
                    case(0x0c) : { // 5digit range to
                      if (!rangeFrom) throw('[InvalidFieldFormat] : 5 digit range from not defined');
                      list.push({
                        from  : rangeFrom,
                        to    : zipCodeToInteger(digits, a, b, c, 9, 9)
                      });
                      rangeFrom = null;
                    } break;
                    case(0x0d) : { // 7digit range from
                      rangeFrom = zipCodeToInteger(digits, a, b, c, d, e);
                    } break;
                    case(0x0e) : { // 7digit range to
                      if (!rangeFrom) throw('[InvalidFieldFormat] : 7 digit range from not defined');
                      list.push({
                        from  : rangeFrom,
                        to    : zipCodeToInteger(digits, a, b, c, d, e)
                      });
                      rangeFrom = null;
                    } break;
                    case(0x0f) : { // 7digit list
                      list.push({
                        from  : zipCodeToInteger(digits, a, b, c, d, e),
                        to    : zipCodeToInteger(digits, a, b, c, d, e)
                      });
                      rangeFrom = null;
                    } break;
                    default : { break; }
                  }
                }
              }
            });
            entry.push(whole);
          } break;
        default : { break; }
        }
      }
      table.push(entry);
    }
    var buf = []; // remove padding field
    for(i = 0, l = structure.length; i < l; i++) {
      entry = structure[i];
      if (entry.type != 'P') buf.push(entry);
    }
    /**#@+ @memberOf BinaryTable.prototype */
    /** �ơ��֥�Υե����ޥåȤβ��Ϸ�̤��ݻ����롥     @propertyEx BinaryTable.prototype.structure|Array<Object>       |���Ϸ�� */
    this.structure = buf;
    /** ɽ�ե�����β��Ϸ�̤��󼡸�����Ȥ����ݻ����롥 @propertyEx BinaryTable.prototype.table    |Array<Array<Object>>|���Ϸ�� */
    this.table     = table;
    /** ɽ�ե�����ιԿ����ݻ����롥                     @propertyEx BinaryTable.prototype.nrow     |Number              |ɽ�ե�����ιԿ� */
    this.nrow      = table.length;
    /** ɽ�ե������������ݻ����롥                     @propertyEx BinaryTable.prototype.ncolumn  |Number              |ɽ�ե��������� */
    this.ncolumn   = buf.length;
    
    return(this);
  }

  /**#@+ @methodOf BinaryTable.prototype */
  /** BinaryTable���֥������Ȥΰ����ν�λ��������롥
   *  @name BinaryTable.prototype.close
   */
  BinaryTableClass.prototype.close = function() {
    this.structure = null;
    this.table     = null;
    return(1);
  };
  /** ɽ��1�ե�����ɤ�ʸ����Ȥ��ƽ��Ϥ��롥
   *  @name    BinaryTable.prototype.toString
   *  @param   {Number} row    �оݥե�����ɤι԰���
   *  @param   {Number} column �оݥե�����ɤ������
   *  @returns {String}        �ե�����ɤ�ʸ����ɽ��
   */
  BinaryTableClass.prototype.toString = function(row, column) {
    if (((row    < 0) || (this.nrow    <= row   )) ||
        ((column < 0) || (this.ncolumn <= column))) return(null);

    var value = this.table[row][column];
    switch(this.structure[column].type) {
      case('B') : return(value.toString());
      case('U') : return(value.toString());
      case('I') : return(value.toString());
//    case('S') : return(value);
      case('Z') : return(null);
      default   : return(value);
    }
    return(value);
  };
  /** ɽ��1�ե�����ɤ���ͤȤ��ƽ��Ϥ��롥
   *  @name    BinaryTable.prototype.toNumber
   *  @param   {Number} row    �оݥե�����ɤι԰���
   *  @param   {Number} column �оݥե�����ɤ������
   *  @returns {Number}        �ե�����ɤο���ɽ��
   */
  BinaryTableClass.prototype.toNumber = function(row, column) {
    if (((row    < 0) || (this.nrow    <= row   )) ||
        ((column < 0) || (this.ncolumn <= column))) return(NaN);

    var value = this.table[row][column];
    switch(this.structure[column].type) {
      case('B') : return(booleanToNumber());
//    case('U') : return(value);
//    case('I') : return(value);
      case('S') : return(stringToNumber());
      case('Z') : return(NaN);
      default   : return(value);
    }
    return(value);
  };
  /** ɽ��Υ쥳���ɤ�����Ȥ��ƽ��Ϥ��롥
   *  @name    BinaryTable.prototype.toArray
   *  @param   {Number} startRow ȴ���Ф��쥳���ɤγ��Ϲ԰���
   *  @param   {Number} numRow   ȴ���Ф��쥳���ɿ�
   *  @returns {Array}           Ϣ³����쥳���ɤ��Ǽ��������
   */
  BinaryTableClass.prototype.toArray = function(startRow, numRow) {
    if (startRow < 0) return(null);

    var ret = [], structure = this.structure;
    var i = startRow, max = startRow + numRow, l = structure.length;
    while((i < this.nrow) && (i < max)) {
      var entry = [], row = this.table[i];
      for(var j = 0; j < l; j++) {
        entry.push((structure[j].type != 'Z') ? row[j] : null);
      }
      ret.push(entry);
      i++;
    }
    for(i = ret.length; i < numRow; i++) {
      ret.push(null); // padding
    }
    
    return(ret);
  };
  /** ����������ɽ��Υ쥳���ɤ���Ϥ��롥
   *  @name    BinaryTable.prototype.search
   *  @param   {Number}  startRow       �����򳫻Ϥ���쥳���ɤι԰���
   *  @param   {Number}  searchedColumn �������оݤȤʤ���ΰ���
   *  @param   {Object}  compared       ��Ӥ��о�(String/Number/Boolean)
   *  @param   {Number}  operator       ��Ӿ��
   *  @param   {Boolean} logic          ʣ���θ������δط�(true:OR/false:AND)
   *  @param   {Number}  limitCount     ������ȴ���Ф����쥳���ɿ���������
   *  @param   {Array}   resultArray    ���ϥ쥳���ɤ��Ǽ��������
   *  @returns {Number}                 Ϣ³����쥳���ɤ��Ǽ��������
   *  @throw   {InvalidArguments}       �������������ʤ����
   */
  BinaryTableClass.prototype.search = function() {
    var args = arguments.slice(0);

    var startRow    = args.shift();
    var resultArray = args.pop();
    var limitCount  = args.pop();
    var logic       = args.pop();
    if (args.length % 3) throw('[InvalidArguments] : not enough arguments');

    var conditionList = [];
    for(var i = 0, l = args.length / 3; i < l; i++) {
      conditionList.push({
        searchedColumn : args[i * 3 + 0],
        compared       : args[i * 3 + 1],
        operator       : args[i * 3 + 2]
      });
    }

    for(i = startRow, l = this.nrow; i < l; i++) {
      if (limitCount <= 0) break;

      var row = this.table[i], flag = true;
      for(var j = 0, m = conditionList.length; j < m; j++) {
        var condition = conditionList[j];
        var value     = row[condition.searchedColumn];
        var compared  = condition.compared;

        switch(condition.operator) {
          // Unsigned Integer or Signed Integer
          case( 0) : { flag = value == compared; } break;
          case( 1) : { flag = value != compared; } break;
          case( 2) : { flag = value <  compared; } break;
          case( 3) : { flag = value <= compared; } break;
          case( 4) : { flag = value >  compared; } break;
          case( 5) : { flag = value >= compared; } break;
          case( 6) : { flag = value &  compared; } break;
          case( 7) : { flag = value |  compared; } break;
          case( 8) : { flag = value ^  compared; } break;
          case( 9) : { flag = value & ~compared; } break;
          case(10) : { flag = value | ~compared; } break;
          case(11) : { flag = value ^ ~compared; } break;
          // String
          case(32) : { flag = value == compared;             } break;
          case(33) : { flag = value.indexOf(compared) >=  0; } break;
          case(34) : { flag = value.indexOf(compared) === 0; } break;
          case(35) : { flag =
            value.lastIndexOf(compared) == value.length - compared.length; } break;
          case(36) : { flag = value != compared;             } break;
          case(37) : { flag = value.indexOf(compared) <   0; } break;
          // Boolean
          case(64) : { flag = value == compared; } break;
          case(65) : { flag = value != compared; } break;
          // ZipCode
          case(96) : { flag =  includeZipCode(compared, value.include) &&
                              !includeZipCode(compared, value.exclude); } break;
          case(97) : { flag = !includeZipCode(compared, value.include) &&
                               includeZipCode(compared, value.exclude); } break;
          default  : { flag = true; } break;
        }
//        if ((logic && flag) || (!logic && !flag)) break;
        if (logic == flag) break;
      }

      if (flag) resulutArray.push(row);
      limitCount--;
    }

    return((resultArray.length <=  0) ? NaN : (limitCount <= 0) ? --i : -1);
  };
  /**#@-*/
  return(BinaryTableClass);
})();
