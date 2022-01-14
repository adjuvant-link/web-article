# Adjuvant

Transparent & Accountable Financing of Social Good Catalysts. 

Guiding values for the project: 

    - No-intermediary
    - Zero-trust
    - Milestone-based installments
    - Auditable
    - Participatory
    - Sustainability


## Ledger

We are seeing transactions sent to the BTC addresses listed. And we are looking at transactions made by the BTC addresses. UI should be better
at differentiating the two. 


## Receiving donations

### Crypto 

Option #1: Simply put your BTC & ETH address under the story (Native SegWit)

Option #2: If you want a GUI, [Coinbase Commerce](https://commerce.coinbase.com/) offers payment button that can be easily embedded. (Pay to Script Hash)

Option #3: Bitpay

### Fiat



## Hosting

### IPFS

IPFS content addressing enables you to store files off-chain and put immutable, permanent links in transactions — timestamping and securing content without having to put the data itself on-chain.

1. Setup a MetaMask wallet, fund it with Ether

2. "adjuvant.eth" was purchased from the [Ethereum Name Service](https://app.ens.domains/). 

3. The "registrant", "controller", and "resolver" records of the domain were configured. 

4. Using [Fleek](https://app.fleek.co/#/), the static files of the website were uploaded to [IPFS](https://ipfs.io/) (here is the [tutorial](https://medium.com/the-ethereum-name-service/cloudflare-and-fleek-make-ens-ipfs-site-deployment-as-easy-as-ever-262c990a7514)).

5. The "content" record of the domain was set to point to the IPNS hosting of the website (more info can be found [here](https://eth.link/)).


### Dedicated Server + TOR

1. The "adjuvant.link" domain was purchased

2. The [A record](https://support.dnsimple.com/articles/a-record/) was configured to point to the IP address of the server hosting the static files of the website

3. On the hosting server, install Tor

        sudo apt update
        sudo apt install tor

4. Uncomment these two lines in the config file found at /etc/tor/torrc

        HiddenServiceDir /var/lib/tor/hidden_service/
        HiddenServicePort 80 127.0.0.1:80

5. Get the Onion address of your server by running

        sudo cat /var/lib/tor/hidden_service/hostname

        For example, 

            en5kq3sxdasdasd212aoisdjaoifzu3kxtxvttrsbibaznpk4ljqd.onion

6. Set the onion address in the [constants file](./src/constants.json),

        "ONION_ADDRESS": "http://<your-onion-service-address>.onion"


### S3 Bucket

Here are the instructions to host the website inside an AWS S3 bucket.

1. Go to your [AWS S3 console](https://s3.console.aws.amazon.com/)

2. Click on "Create bucket", set the name and region, and make sure "Block all public access" is unchecked. Then, click on "Create Bucket".

3. Click on your bucket and then click on the "Permissions" tab

4. Edit "Bucket policy" and paste the following policy while making sure to replace {bucket_name} with the name of your bucket:

        {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Sid": "PublicRead",
                    "Effect": "Allow",
                    "Principal": "*",
                    "Action": "s3:GetObject",
                    "Resource": "arn:aws:s3:::{bucket_name}/*"
                }
            ]
        }

5. Click on "Save changes"

6. Click on the "Objects" tab and then click on "Upload"

7. Drag and drop all the content from the [public](./public/) folder of this repo and then click on "Upload"

8. Click on the "Properties" tab and scroll down to the "Static website hosting" section. Click on "Edit"

9. Enable Static website hosting, and set "index.html" as the Index document. Click on "Save changes"

10. Make sure everything works by clicking on the Bucket website endpoint



## PGP key

Viewers might want to reach out by email. They can encrypt their message using the PGP public key displayed at 
the bottom of the page. 

Many tools are available to generate a new public/private key pair, encrypt a message using the public key, and 
decrypt the message using the private key. 

For testing purposes, you can use the online [pgptool](https://pgptool.org/). 

To update copy the public key [here](./public/files/pgp.pub.txt).



## Development

### Linting

To lint the src/ files use eslint

        npx eslint src/* --fix



## Author

* **Jean-Romain Roy** - *Principal Developer* - [jeanromainroy](https://github.com/jeanromainroy)

