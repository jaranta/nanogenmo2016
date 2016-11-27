#!/bin/bash
SOURCEFILENAME=test.md
OUTPUTFILENAME=test.pdf
COUNT=0
MAX=50000 # Loop while the number of words is below this max
echo Building markdown text.
while (( COUNT < MAX ))
do
  node main.js >> $SOURCEFILENAME
  words=`wc $SOURCEFILENAME | awk '{print $2}'` # count the number of words
  echo Current word count: $words
  let COUNT=$words
done
echo Finished with the markdown text.
echo Converting to pdf.
$(pandoc --latex-engine=xelatex --template=latex.template $SOURCEFILENAME -o $OUTPUTFILENAME)
echo Finished converting.
echo Done.
