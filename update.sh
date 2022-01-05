### Uploads the public files to the web server ###

# destination
DEST="portfolio:/home/ubuntu/portfolio/public/projects/adjuvant/"

# build
npm run build

# copy fonts to root dir of portfolio
# scp -r ./public/assets/fonts/* portfolio:/home/ubuntu/portfolio/public/assets/fonts/

# deep copy – with assets
# scp -r ./public/* "$DEST"

# light copy - only dynamic files
scp ./public/bundle.* "$DEST"
scp ./public/index.html "$DEST"