#!/bin/bash
SOURCEFILENAME=redacted.md
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
echo Done.
