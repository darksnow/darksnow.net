#!/bin/bash

declare -A styles
styles[.]="1920x600"
styles[large]="1440x450"
styles[medium]="1024x320"
styles[small]="960x300"
styles[thumb]="300x217"

src=$1
dst=$2

for f in `find $src -iregex '.*\.\(jpg\|jpeg\|png\)'`
do

  for s in "${!styles[@]}"
  do
    size="${styles[$s]}"
    trg=$dst/$s${f#$src}
    dir=$(dirname $trg)

    if [ ! -d $dir ]; then
      mkdir -p $dir
    fi
    if [ ! -f $trg ]; then
      convert $f -resize "$size^" -gravity center -crop $size+0+0 $trg
    fi

  done
done
