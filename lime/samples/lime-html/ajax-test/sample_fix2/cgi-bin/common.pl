$MAX_LENGTH=1000;

# �r�����b�N
sub lockex {
	flock($_[0], 2);
}

# �A�����b�N
sub unlock {
	flock($_[0], 8);
}

# ���N�G�X�g�p�����[�^�̎擾
sub get_parameter {
	local($s, $c, $i);
	
	# POST���ǂ����A�p�����[�^���͓K�؂��ǂ������m�F����
	if (
		$ENV{'REQUEST_METHOD'} ne 'POST' ||
		$ENV{'CONTENT_LENGTH'}>$MAX_LENGTH
	) {
		print "error,parameter";
		exit;
	}
	
	# �p�����[�^�̎擾
	read(STDIN, $s, $ENV{'CONTENT_LENGTH'});

	# �p�����[�^�ɕs�K�؂ȕ������Ȃ����ǂ������m�F����
	if ($s!~/^[A-Za-z0-9,]*$/) {
		print "error,parameter";
		exit;
	}

	# �p�����[�^�̕���
	return split(',', $s);
}

# �t�@�C�����J���ēǂݍ���
sub open_file {
	local($s, @a);

	# �t�@�C����ǂݍ��݃��[�h�ŊJ���ă��b�N����
	$file=$_[0];
	if (open(FP, "<$file")==0) {
		print "error,file";
		exit;
	}
	lockex(FP);

	# �t�@�C����z��ɓǂݍ���
	while (eof(FP)!=1) {
		$s=<FP>;
		chomp($s);
		push(@a, $s);
	}

	# �t�@�C�������
	close(FP);

	return @a;
}

# �t�@�C���ɏ�������ŕ���
sub close_file {
	local($i);
	
	# �t�@�C�����������݃��[�h�ŊJ��
	if (open(FP, ">$file")==0) {
		print "error,file";
		unlock(FP);
		exit;
	}

	# �z����t�@�C���ɏ�������
	for ($i=0; $i<=$#_; $i++) {
		print FP "$_[$i]\n";
	}

	# �t�@�C������ăA�����b�N����
	close(FP);
	unlock(FP);
}

