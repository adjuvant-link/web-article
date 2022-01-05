### Uploads the public files to the web server ###

# build
npm run build

# deep copy – with assets
scp -r ./public/* adjuvant:/home/ubuntu/web-article/public/

# light copy - only dynamic files
# scp ./public/bundle.* adjuvant:/home/ubuntu/web-article/public/
# scp ./public/index.html adjuvant:/home/ubuntu/web-article/public/