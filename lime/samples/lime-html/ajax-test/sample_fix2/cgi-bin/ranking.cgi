#!/usr/local/bin/perl
$[=0;
require "common.pl";

# �萔
$RANKING_FILE="ranking.txt";
$RANKING_COUNT=5;
$MAX_NAME_LENGTH=20;

# �w�b�_�̏o��
print "Content-type: text/plain\n\n";

# �p�����[�^�̎擾
@param=get_parameter();
$new_name=shift(@param);
$new_score=shift(@param);
if (
	$new_name!~/[A-Za-z0-9]+/ ||
	length($new_name)>$MAX_NAME_LENGTH ||
	$new_score!~/[0-9]+/
) {
	print "error,parameter";
	exit;
}

# �t�@�C���̓���
@line=open_file($RANKING_FILE);

# �X�R�A�̓o�^
for ($i=0; $i<=$#line; $i++) {
	@a=split(',', $line[$i]);
	$name=shift(@a);
	$score=shift(@a);
	if ($score<$new_score) {
		splice(@line, $i, 0, "$new_name,$new_score");
		last;
	}
}
splice(@line, $RANKING_COUNT);

# �t�@�C���̏o��
close_file(@line);

# ���X�|���X�̑��M
print "ok\n";
for ($i=0; $i<=$#line; $i++) {
	print "$line[$i]\n";
}

