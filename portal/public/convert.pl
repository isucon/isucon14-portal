#!/usr/bin/env perl

use strict;
use warnings;
use 5.16.1;

while (my $filename = <>) {
	chomp $filename;
	if ($filename =~ /(\w+)-(\d+)x(\d+)(-precomposed)?\.png$/) {
		my ($prefix, $w, $h, $suffix) = ($1, $2, $3, $4);
		if ($w != $h) {
			say "Skipping $filename";
			next;
		}
		my @cmd = ('magick', "../../materials/14-150x150.png", '-geometry', "${w}x${h}" , $filename);
		say "@cmd";
		system @cmd;
	}
}