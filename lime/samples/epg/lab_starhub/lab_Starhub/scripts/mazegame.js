/**********************************************************************
 * Copyright (C) 2009 Nippon Telegraph and Telephone Corporation.
 * Copyright (C) 2010 Institute for Infocomm Research.
 * All rights reserved.
 **********************************************************************/

/************************************************************
 * Global variables
 */
var SIZE = 21;	// ��ϩ�Υ�����(�ĤȲ�)
var Time = 0;	// �����೫�ϻ�����в���
var DoRefresh;	// ������������������
var Maze;	// ��ϩ�ǡ�������������
var Hero;	// ��͸����֥�������
var Enemies;	// Ũ���֥�����������

var ShowMapTimer = NaN;	// �ޥå�ɽ���ѥ�����
var CounterTimer = NaN;	// ������ʹ��ѥ�����

/************************************************************
 DOM event functions
 ************************************************************/
function onunload() {}

/************************************************************/
// ��������������ޤ�
function start() {
	gState.bmltype = 8;
	clockStart();
	hideElem( "loading2");

	document.getElementById( "end").normalStyle.visibility = "hidden";
	document.getElementById( "maze").focus();

	Time = 0;
	DoRefresh = true;

	Maze	= createMaze( SIZE);
	Hero	= new CharacterObject( 0, 0, "hero");		// ����
	Enemies	= new Array(
		new CharacterObject( SIZE, 0, "enemy0"),	// ����
		new CharacterObject( 0, SIZE, "enemy1"),	// ����
		new CharacterObject( SIZE, SIZE, "enemy2")	// ����
	 );

	drawScope();
	CounterTimer = browser.setInterval( "gameTick();", 1000, 0);
};

/************************************************************/
// �����������Υ��٥�ȥϥ�ɥ�
function keydown() {
	var x = Hero.X;		// ��ư���X��ɸ
	var y = Hero.Y;		// ��ư���Y��ɸ

	var code = document.currentEvent.keyCode;

	if( code == 1) {	// ��
		// Was up key press.
		y--;
		Hero.Object.data = "../images/mazegame/hero1.png";
	}
	else if( code == 2) {	// ��
		// Was down key press.
		y++;
		Hero.Object.data = "../images/mazegame/hero2.png";
	}
	else if( code == 3) {	// ��
		// Was left key press.
		x--;
		Hero.Object.data = "../images/mazegame/hero3.png";
	}
	else if( code == 4) {	// ��
		// Was right key press.
		x++;
		Hero.Object.data = "../images/mazegame/hero4.png";
	}
	else if( code == 18) {	// ����
		// Was select/enter key press.
		showMap();
	}
	else if( code == 19) {
		// Was data key press.
		browser.unlockScreen();
		romSound(7);
		gState.launchDocument( "startup.bml");
		hideElem( "loading2");
	};

	if( (0 <= x) && (x < SIZE) && (0 <= y) && (y < SIZE)) {
		if( Maze[x][y] == 0) {	// ��ư�褬��ϩ
			// ������������ݤΥ����å�
			DoRefresh = (Hero.X / 7 != x / 7) || (Hero.Y / 7 != y / 7);

			Hero.X = x;
			Hero.Y = y;

			drawScope();

			if( (Hero.X == SIZE - 1) && (Hero.Y == SIZE - 1)) {
				gameOver( "���ꥢ�����������ࡧ" + getTimeString( Time));
			};
		};
	};
};

/************************************************************
 Internal functions
 ************************************************************/
// ������ѡʼ�͸���Ũ�˥��֥������ȤΥ��󥹥ȥ饯��
function CharacterObject( x, y, id) {
	this.X = x;
	this.Y = y;
	this.Object	= document.getElementById( id);
	this.Style	= document.getElementById( id).normalStyle;
};

/************************************************************/
// ��ϩ��������ޤ�
// ��size���Ĳ����礭��
function createMaze( size ) {
	// ��ϩ[x,y]������
	var maze = new Array( size);

	for( var x = 0; x < size; x++) {
		maze[x] = new Array( size);

		for( var y = 0; y < size; y++) {
			maze[x][y] = 0;
		};
	};

	// ���ݤ�ˡ����ϩ����
	for( var x = 1; x < size - 1; x += 2) {
		for( var y = 1; y < size - 1; y += 2) {
			maze[x][y] = 1;		// ��

			// �Ǻ���Ͼ岼����������ʳ��Ͼ岼���Τ�
			var dir = browser.random( (x == 1) ? 4 : 3);
			var px = x;
			var py = y;

			if( dir == 0 ) { py--; }
			else if( dir == 1 ) { py++; }
			else if( dir == 2 ) { px++; }
			else if( dir == 3 ) { px--; }

			maze[px][py] = 1;	// �ݤ줿��
		};
	};

	return( maze);
};

/************************************************************/
// ���̤����褷�ޤ���
function drawScope() {
	browser.lockScreen();

	// ���̥�������ϣ�����([x,y]��[x+6,y+6])ñ�̤Ǥ���
	// ����ϳ��Ȥ�ޤ�뤿�᣹����([x-1,y-1]��[x+7,y+7])�ˤʤ�ޤ���

	var scopeX = Hero.X / 7;
	var scopeY = Hero.Y / 7;

	// ��ϩ�����褷�ޤ���
	if( DoRefresh) {
		DoRefresh = false;

		for( var y = 0; y < 9; y++) {
			for( var x = 0; x < 9; x++) {
				var obj = document.getElementById( "c" + y + x);
				var dx = scopeX * 7 + x - 1;
				var dy = scopeY * 7 + y - 1;

				// ��ϩ������ʡ���ϡ��ɤ���ɽ����
				var flag = true;
				if( (0 <= dx) && (dx < SIZE) && (0 <= dy) && (dy < SIZE)) {
					flag = Maze[ dx][ dy];
				};

				obj.normalStyle.visibility = flag ? "hidden" : "visible";
			};
		};
	};

	// ��͸������褷�ޤ���
	Hero.Style.top  = (Hero.Y % 7 + 1) * 50 + "px";
	Hero.Style.left = (Hero.X % 7 + 1) * 50 + "px";

	// Ũ���������褷�ޤ���
	for( var i = 0; i < Enemies.length; i++) {
		var enemy = Enemies[i];

		// ��͸���Ʊ���������׻��Τ�����
		if( (enemy.X / 7 == scopeX) && (enemy.Y / 7 == scopeY)) {
			enemy.Style.visibility	= "visible";
			enemy.Style.top  = (enemy.Y % 7 + 1) * 50 + "px";
			enemy.Style.left = (enemy.X % 7 + 1) * 50 + "px";
		}
		else {
			enemy.Style.visibility	= "hidden";
		};

		if( (enemy.X == Hero.X) && (enemy.Y == Hero.Y)) {
			gameOver( "̵ǰ������ޤä�����");
			return;
		};
	};

	browser.unlockScreen();
};

/************************************************************/
// �ÿ�����"mm:ss"��ʸ�����������ޤ���
function getTimeString( time) {
	var m0 = (time / 60) / 10;
	var m1 = (time / 60) % 10;
	var s0 = (time % 60) / 10;
	var s1 = (time % 60) % 10;
	return( " " + m0 + m1 + ":" + s0 + s1);
};

/************************************************************/
// ���Ū�˸ƤФ�륿���ޡ��Ǥ���Ũ���ư������򹹿����ޤ���
function gameTick() {
	// �в����򹹿����ޤ���
	Time++;
	document.getElementById( "time").firstChild.data = getTimeString( Time);

	// ��͸����ɤ������ޤ���
	for( var i = 0; i < Enemies.length; i++) {
		var enemy = Enemies[i];
		var xdiff = Hero.X - enemy.X;
		var ydiff = Hero.Y - enemy.Y;
		var dir = browser.random(3);

		if( dir == 1) {
			// X���������ܶ�
			if( xdiff < 0) {
				enemy.X--;
				enemy.Object.data = "../images/mazegame/enemy3.png";
			}
			else if( xdiff > 0) {
				enemy.X++;
				enemy.Object.data = "../images/mazegame/enemy4.png";
			};
		}
		else if( dir == 2) {
			// Y���������ܶ�
			if( ydiff < 0) {
				enemy.Y--;
				enemy.Object.data = "../images/mazegame/enemy1.png";
			}
			else if( ydiff > 0) {
				enemy.Y++;
				enemy.Object.data = "../images/mazegame/enemy2.png";
			};
		};
	};

	drawScope();
};

/************************************************************/
// �ޥåפ�������ɽ�����ޤ���
function showMap() {
	if( !isNaN( ShowMapTimer)) {
		return;
	};

	var str = "";

	for( var y = 0; y < SIZE; y++) {
		for( var x = 0; x < SIZE; x++) {
			if( (x == Hero.X) && (y == Hero.Y)) {
				str += "��";		// ��ʬ
			}
			else if( Maze[x][y] == 1) {
				str += "��";		// ��
			}
			else {
				str += "��";		// ��ϩ
			};
		};
		str += "\r\n";
	};

	var map = document.getElementById( "map");
	map.firstChild.data = str;
	map.normalStyle.visibility = "visible";

	ShowMapTimer = browser.setInterval( "hideMap();", 3000, 1);
};

/************************************************************/
// �ޥåפ���ɽ���ˤ��ޤ���
function hideMap() {
	document.getElementById( "map").normalStyle.visibility = "hidden";
	ShowMapTimer = NaN;
};

/************************************************************/
// �����ཪλɽ���򤷤ޤ���
function gameOver( msg) {
	browser.clearTimer( CounterTimer);
	var obj = document.getElementById( "end");
	obj.normalStyle.visibility = "visible";
	obj.lastChild.firstChild.data = msg;
	obj.focus();
};

