#!/usr/bin/sh
awk -F \\t '{ printf $1"\t"$2"\t"$3"\t""\t"$5"\t""\t""\t""\t""\t""\t""\t""\t""\t""\t""\t""\t""\t""\t""\t""\t""\t""\t""\t""\t"$25"\t"$26"\t""\t""\t""\t""\t""\t""\t""\t""\t""\t""\t""\t""\t""\t""\t""\t""\t""\t""\t""\t""\t""\t""\t""\t""\t""\t""\t""\t""\t""\t""\t""\t""\t""\t""\t""\t""\t""\t""\t""\t""\t""\t""\t""\t""\t""\t""\t""\t""\t""\t""\t""\t""\t""\t""\t""\t"$82"\t""\t""\t""\t""\r\n";}' $1