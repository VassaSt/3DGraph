# Get the current date and format it as YYYYMMDD
DATE=$(date +"%Y%m%d")
# Rename arcgis-connector.html to arcgis-connector.js
mv diagram-graph.html diagram-graph.js

if [ -f diagram-graph-$DATE.zip ]; then
  zip -u diagram-graph-$DATE.zip diagram-graph.js reearth.yml
else
  zip diagram-graph-$DATE.zip diagram-graph.js reearth.yml
fi

# Rename diagram-graph.js to its original name
mv diagram-graph.js diagram-graph.html
