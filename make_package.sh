# Get the current date and format it as YYYYMMDD
DATE=$(date +"%Y%m%d")
# Rename arcgis-connector.html to arcgis-connector.js
mv 3DGraph.html 3DGraph.js

if [ -f 3DGraph-$DATE.zip ]; then
  zip -u 3DGraph-$DATE.zip 3DGraph.js reearth.yml
else
  zip 3DGraph-$DATE.zip 3DGraph.js reearth.yml
fi

# Rename 3DGraph.js to its original name
mv 3DGraph.js 3DGraph.html
