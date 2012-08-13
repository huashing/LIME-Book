/**********************************************************************
 * Copyright (C) 2009 Nippon Telegraph and Telephone Corporation.
 * Copyright (C) 2010 Institute for Infocomm Research.
 * All rights reserved.
 **********************************************************************/

/************************************************************
 * Global variables
 */
var MAZE_W = 13;
var MAZE_H = 13;
var MAZE;
var HERO;
var CHECK;
var ALIEN = new Array();

var MAP = document.getElementById( "map");
var VIEW = document.getElementById( "view");

/************************************************************/
function start() {
	gState.bmltype = 9;
	clockStart();
	hideElem( "loading2");

	MAP.normalStyle.width = MAZE_W * 20 + "px";
	MAP.normalStyle.height = MAZE_H * 20 + "px";

	MAZE = createMaze( MAZE_W, MAZE_H);

	CHECK = new Player( 0, 0, 0, 0, 0);
	HERO = new Player( 1, 1, "H", 0, 1);
//	ALIEN[0] = new Player( MAZE_W-2, MAZE_H-2, "A", 0, 0);
	ALIEN[0] = new Player( MAZE_W-2, 1, "A", 0, 0);
	ALIEN[1] = new Player( 1, MAZE_H-2, "A", 0, 0);

	browser.setInterval( "tick();", 2000, 0);

	drawStop( HERO);
	drawMap( MAZE);
};

/************************************************************
 Internal functions
 ************************************************************/
function tick() {
	moveAlien();
	drawMap( MAZE);
};

/************************************************************/
function moveAlien(){
	drawAlienMove( HERO);

	for( var i = 0; i < ALIEN.length; i++) {
		var alien = ALIEN[i];
		var dx = 0;
		var dy = 0;

		var diffx = HERO.x - alien.x;
		var diffy = HERO.y - alien.y;

		if( (diffx < 3) && (diffy == 0)) {
			alien.move( (diffx < 0) ? -1 : 1 , 0);
			break;
		};
		if( (diffy < 3) && (diffx == 0)) {
			alien.move( 0, (diffy < 0) ? -1 : 1);
			break;
		};

		var flag = browser.random(3);
		if( flag == 1) {
			// �ټ��������ܶ�
			if( diffy < 0) {
				dy--;
			}
			else if( diffy > 0) {
				dy++;
			};
		}
		else if( flag == 2) {
			// �ؼ��������ܶ�
			if( diffx < 0 ) {
				dx--;
			}
			else if( diffx > 0) {
				dx++;
			};
		}
		else {
			// ����ǰ�ư
			var d = browser.random(4);
			if( d == 1) {
				dx = 1;
			}
			else if( d == 2) {
				dx = -1;
			}
			else if( d == 3) {
				dy = 1; 
			}
			else if( d == 4) {
				dy = -1; 
			};
		};
		alien.move( dx, dy);
	};
	drawAlienStop( HERO);
};

/************************************************************/
/**
 * ��ϩ��ʸ����Ȥ��ƽ��Ϥ��롣�ǥХå��ѡ�
 * @param maze ��ϩ�ѣ���������
 */
function dumpMaze( maze){
	for( var y = 0; y < MAZE_H; y++) {
		var str = "";
		for( var x = 0; x < MAZE_W; x++) {
			str += maze[x][y];
		};
	};
};

/************************************************************/
function drawAlienStop( pos) {
	browser.lockScreen();

	CHECK.x = pos.x;
	CHECK.y = pos.y;
	CHECK.dx = pos.dx;
	CHECK.dy = pos.dy;

	var obj = document.getElementById( "enemy_f_5_S");

	for( var i = 0; i < 10; i++) {
		obj.normalStyle.visibility = "hidden";
		obj = obj.nextSibling;
	};

	for( var i = 1; i < 6; i++) {
		var ft = CHECK.getTypeF();
		if( ft == "A") {
			document.getElementById( "enemy_f_" + i + "_S")
					.normalStyle.visibility = "visible";
		}
		else if( ft == 1) {
			break;
		};
		CHECK.moveF();
	};

	browser.unlockScreen();
};

/************************************************************/
function drawAlienMove( pos) {
	browser.lockScreen();

	CHECK.x = pos.x;
	CHECK.y = pos.y;
	CHECK.dx = pos.dx;
	CHECK.dy = pos.dy;
	CHECK.moveB();

	var obj = document.getElementById( "enemy_f_5_S");
	for(var i = 0; i < 10; i++) {
		obj.normalStyle.visibility = "hidden";
		obj = obj.nextSibling;
	};

	for( var i = 1; i < 6; i++) {
		var ft = CHECK.getTypeF();
		if( ft == "A" ){
			document.getElementById( "enemy_f_" + i + "_T")
					.normalStyle.visibility = "visible";
		}
		else if( ft == 1) {
			break;
		};
		CHECK.moveF();
	};

	browser.unlockScreen();
};

/************************************************************/
function drawStop(pos){
	browser.lockScreen();

	VIEW.normalStyle.top = "-10px";
	VIEW.normalStyle.left = "-10px";

	// ��ư���Υ��᡼����hidden��
	var obj = document.getElementById( "l_2_V_T");

	for( var i = 0; i < 17; i++) {
		obj.normalStyle.visibility = "hidden";
		obj = obj.nextSibling;
	};

	// �طʤ�ɬ������
	document.getElementById( "f_5_H_S").normalStyle.visibility = "visible";

	CHECK.x = pos.x;
	CHECK.y = pos.y;
	CHECK.dx = pos.dx;
	CHECK.dy = pos.dy;

	for( var step = 0; step < 4; step++) {
		var rt = CHECK.getTypeR();
		var lt = CHECK.getTypeL();
		var ft = CHECK.getTypeF();

		// ���ɤ�����
		var wall = document.getElementById( "r_" + (step + 1) + "_V_S");
		var path = document.getElementById( "r_" + (step + 1) + "_H_S");
		path.normalStyle.visibility = (rt == 1) ? "hidden" : "visible";
		wall.normalStyle.visibility = (rt == 1) ? "visible" : "hidden";

		// ���ɤ�����
		wall = document.getElementById( "l_" + (step + 1) + "_V_S");
		path = document.getElementById( "l_" + (step + 1) + "_H_S");

		wall.normalStyle.visibility = (lt == 1) ? "visible" : "hidden";
		path.normalStyle.visibility = (lt == 1) ? "hidden" : "visible";

		// ���̤�����
		wall = document.getElementById( "f_" + (step + 2) + "_V_S");

		wall.normalStyle.visibility = (ft == 1) ? "visible" : "hidden";

		if( ft == 1) {
			break;
		};

		CHECK.moveF();
	};

	browser.unlockScreen();
};

/************************************************************/
function drawMove( pos) {
	browser.lockScreen();

	VIEW.normalStyle.top = "-16px";

	// �Ż߻��Υ��᡼����hidden��
	var obj = document.getElementById( "l_1_V_S");
	for( var i = 0; i < 22; i++) {
		obj.normalStyle.visibility = "hidden";
		obj = obj.nextSibling;
	};

	CHECK.x = pos.x;
	CHECK.y = pos.y;
	CHECK.dx = pos.dx;
	CHECK.dy = pos.dy;

	for( var step = 1; step < 4; step++) {
		var rt = CHECK.getTypeR();
		var lt = CHECK.getTypeL();
		var ft = CHECK.getTypeF();

		// ���ɤ�����
		var wall = document.getElementById( "r_" + (step + 1) + "_V_T");
		var path = document.getElementById( "r_" + (step + 1) + "_H_T");
		path.normalStyle.visibility = (rt == 1) ? "hidden" : "visible";
		wall.normalStyle.visibility = (rt == 1) ? "visible" : "hidden";

		// ���ɤ�����
		wall = document.getElementById( "l_" + (step + 1) + "_V_T");
		path = document.getElementById( "l_" + (step + 1) + "_H_T");
		wall.normalStyle.visibility = (lt == 1) ? "visible" : "hidden";
		path.normalStyle.visibility = (lt == 1) ? "hidden" : "visible";

		// ���̤�����
		wall = document.getElementById( "f_" + (step + 2) + "_V_T");
		wall.normalStyle.visibility = (ft == 1) ? "visible" : "hidden";

		if( step == 3 ){
			path = document.getElementById( "f_" + (step + 2) + "_H_T");
			path.normalStyle.visibility = (ft == 1) ? "hidden" : "visible";
		};

		if( ft == 1) {
			break;
		};

		CHECK.moveF();
	};

	browser.unlockScreen();
};

/************************************************************/
function drawMap( maze) {
	var str = "";

	for( var y = 0; y < MAZE_H; y++) {
		for( var x = 0; x < MAZE_W; x++) {
			str += maze[x][y] == 1 ? "��" : "��";
		};
	};
	document.getElementById( "map").firstChild.data = str;

	var hero = document.getElementById( "hero");
	hero.normalStyle.left = HERO.x * 20 + "px";
	hero.normalStyle.top = HERO.y * 20 + "px";

	for( var i = 0; i < ALIEN.length; i++) {
		var alien = ALIEN[i];
		var obj = document.getElementById( "alien"+i);
		obj.normalStyle.left = alien.x * 20 + "px";
		obj.normalStyle.top = alien.y * 20 + "px";
	};
};

/************************************************************/
/**
 * ����ž��β���������
 * @param pos	��͸�����
 * @param phase	0:30�١�1:60�١�2:��ž��������ꥢ
 */
function drawRotateRight( pos, phase) {
	browser.lockScreen();

	// ��ž������򥯥ꥢ
	var obj = document.getElementById( "r1_1_V_R");
	for(var i = 0; i < 10; i++) {
		obj.normalStyle.visibility = "hidden";
		obj = obj.nextSibling;
	};

	// �������򥯥ꥢ
	var obj = document.getElementById( "enemy_f_5_S");
	for(var i = 0; i < 10; i++) {
		obj.normalStyle.visibility = "hidden";
		obj = obj.nextSibling;
	};

	if( phase > 1) {
		return;
	};

	CHECK.x = pos.x;
	CHECK.y = pos.y;
	CHECK.dx = pos.dx;
	CHECK.dy = pos.dy;

	var w0 = CHECK.getTypeF() == 1;	// ���̤��ɡ�
	var w1 = CHECK.getTypeR() == 1;	// �������ɡ�

	CHECK.moveF();

	var w2 = CHECK.getTypeR() == 1;	// ���Ф������ɡ�

	var f = (phase == 0) ? "1" : "2"; // file�Υ���ǥå���

	// ����
	var front = document.getElementById( "r" + f + "f_2_V_R");
	front.normalStyle.visibility = w0 ? "visible" : "hidden";

	// ����
	var wall = document.getElementById( "r" + f + "_1_V_R");
	var path = document.getElementById( "r" + f + "_1_H_R");
	wall.normalStyle.visibility = w1 ? "visible" : "hidden";
	path.normalStyle.visibility = w1 ? "hidden" : "visible";

	// ���Ф���
	wall = document.getElementById("r" + f + "_2_V_R");
	path = document.getElementById("r" + f + "_2_H_R");
	wall.normalStyle.visibility = w2 ? "visible" : "hidden";
	path.normalStyle.visibility = w2 ? "hidden" : "visible";

	browser.unlockScreen();
};

/************************************************************/
/**
 * ����ž��β���������
 * @param pos	��͸�����
 * @param phase	0:30�١�1:60�١�2:��ž��������ꥢ
 */
function drawRotateLeft( pos, phase) {
	browser.lockScreen();

	// ��ž������򥯥ꥢ
	var obj = document.getElementById( "l1_1_V_R");

	for( var i = 0; i < 10; i++) {
		obj.normalStyle.visibility = "hidden";
		obj = obj.nextSibling;
	};

	// �������򥯥ꥢ
	var obj = document.getElementById( "enemy_f_5_S");
	for(var i = 0; i < 10; i++) {
		obj.normalStyle.visibility = "hidden";
		obj = obj.nextSibling;
	};

	if( phase > 1) {
		return;
	};

	CHECK.x = pos.x;
	CHECK.y = pos.y;
	CHECK.dx = pos.dx;
	CHECK.dy = pos.dy;

	var w0 = CHECK.getTypeF() == 1;	// ���̤��ɡ�
	var w1 = CHECK.getTypeL() == 1;	// �������ɡ�

	CHECK.moveF();

	var w2 = CHECK.getTypeL() == 1;	// ���Ф������ɡ�

	var f = (phase == 0) ? "1" : "2"; // file�Υ���ǥå���

	// ����
	var front = document.getElementById( "l" + f + "f_2_V_R");
	front.normalStyle.visibility = w0 ? "visible" : "hidden";

	// ����
	var wall = document.getElementById( "l" + f + "_1_V_R");
	var path = document.getElementById( "l" + f + "_1_H_R");
	wall.normalStyle.visibility = w1 ? "visible" : "hidden";
	path.normalStyle.visibility = w1 ? "hidden" : "visible";

	// ���Ф���
	wall = document.getElementById( "l" + f + "_2_V_R");
	path = document.getElementById( "l" + f + "_2_H_R");
	wall.normalStyle.visibility = w2 ? "visible" : "hidden";
	path.normalStyle.visibility = w2 ? "hidden" : "visible";

	browser.unlockScreen();
};

/************************************************************/
function Player( x, y, t, dx, dy) {
	this.x = x;
	this.y = y;
	this.t = t;
	this.dx = dx;
	this.dy = dy;
	this.move = PosMove;
	this.moveF = PosMoveF;
	this.moveB = PosMoveB;
	this.turnR = PosTurnR;
	this.turnL = PosTurnL;
	this.getTypeR = PosTypeR;
	this.getTypeL = PosTypeL;
	this.getTypeF = PosTypeF;
	MAZE[x][y] = t;
};

/************************************************************/
function PosTypeF() {
	var nx = this.x + this.dx;
	var ny = this.y + this.dy;
	return( MAZE[nx][ny]);
};

/************************************************************/
function PosTypeR() {
	var nx = this.dy * -1 + this.x;
	var ny = this.dx + this.y;
	return( MAZE[nx][ny]);
};

/************************************************************/
function PosTypeL() {
	var nx = this.dy + this.x;
	var ny = this.dx * -1 + this.y;
	return( MAZE[nx][ny]);
};

/************************************************************/
function PosMove( dx, dy) {
	var nx = this.x + dx;
	var ny = this.y + dy;

	if( MAZE[nx][ny] != 1) {
		if( this.t != 0) {
			MAZE[ this.x][ this.y] = 0;
		};
		this.x = nx;
		this.y = ny;
		if( this.t != 0) {
			MAZE[ this.x][ this.y] = this.t;
		};
	};
};

/************************************************************/
function PosMoveF() {
	var nx = this.x + this.dx;
	var ny = this.y + this.dy;

	if( MAZE[nx][ny] != 1) {
		if( this.t != 0) {
			MAZE[ this.x][ this.y] = 0;
		};
		this.x = nx;
		this.y = ny;
		if( this.t != 0) {
			MAZE[ this.x][ this.y] = this.t;
		};
	};
};

/************************************************************/
function PosMoveB() {
	var nx = this.x - this.dx;
	var ny = this.y - this.dy;

	if( MAZE[nx][ny] != 1){
		if( this.t != 0) {
			MAZE[ this.x][ this.y] = 0;
		};
		this.x = nx;
		this.y = ny;
		if( this.t != 0) {
			MAZE[ this.x][ this.y] = this.t;
		};
	};
};

/************************************************************/
function PosTurnR() {
	var nx = this.dy * -1;
	var ny = this.dx;
	this.dx = nx;
	this.dy = ny;
};

/************************************************************/
function PosTurnL() {
	var nx = this.dy;
	var ny = this.dx * -1;
	this.dx = nx;
	this.dy = ny;
};

/************************************************************/
function showMap( flag) {
	var mb = document.getElementById( "mapbase");
	mb.normalStyle.visibility = flag ? "visible" : "hidden";
};

/************************************************************
 DOM event functions
 ************************************************************/
function keyup() {
	showMap( false);
};

/************************************************************/
function keydown() {
	var code = document.currentEvent.keyCode;

	if( code == 1) {
		HERO.moveF();
		drawMove( HERO);
		drawAlienMove( HERO);
		browser.sleep( 100);
	}
	else if( code == 2) {
		drawMove( HERO);
		drawAlienMove( HERO);
		browser.sleep( 100);
		HERO.moveB();
	}
	else if( code == 3) {
		VIEW.normalStyle.left = "0px";
		drawRotateLeft( HERO, 0);
		browser.sleep( 100);
		drawRotateLeft( HERO, 2);

		HERO.turnL();
	}
	else if( code == 4) {
		VIEW.normalStyle.left = "-20px";
		drawRotateRight( HERO, 0);
		browser.sleep( 100);
		drawRotateRight( HERO, 2);
		HERO.turnR();
	}
	else if( code == 21) {
		showMap( true);
		return;
	}
	else if( code == 19) {
		romSound(7);
		launchTop();
	};

	document.getElementById( "walk_2").streamStatus = "stop";
	document.getElementById( "walk_1").streamStatus = "play";

	drawStop( HERO);

	document.getElementById( "walk_1").streamStatus = "stop";
	document.getElementById( "walk_2").streamStatus = "play";

	drawAlienStop( HERO);

	drawMap( MAZE);
};

/************************************************************/
/**
 * ��ϩ�Σ�����������֤���
 * @param w ����(���)
 * @param h ����(���)
 */
function createMaze( w, h) {
	// ��������
	var maze = new Array();

	for( var x = 0; x < w; x++) {
		maze[x] = new Array();
		for( var y = 0; y < h; y++) {
			maze[x][y] = 0;
		};
	};

	// ��������
	for( var x = 0; x < w; x++) {
		maze[x][0] = maze[x][ h - 1] = 1;
	};
	for( var y = 0; y < h; y++) {
		maze[0][y] = maze[ w - 1][y] = 1;
	};

	// ���ݤ�ˡ
	for( var x = 2; x < w - 2; x += 2) {
		for( var y = 2; y < h - 2; y += 2) {
			maze[x][y] = 1;

			// �Ǻ���Ͼ岼�����ġ�����ʳ��Ͼ岼���Τ߲�
			var dir = browser.random( (x == 2) ? 4 : 3);

			var px = x;
			var py = y;
			if( dir == 0 ) { py--; }
			else if( dir == 1 ) { py++; }
			else if( dir == 2 ) { px++; }
			else if( dir == 3 ) { px--; }

			maze[ px][ py] = 1;
		};
	};

	return( maze);
};

