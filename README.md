# Adjuvant

Transparent & Accountable Financing of Social Good Catalysts. 

Guiding values for the project: 

    - No-intermediary
    - Zero-trust
    - Milestone-based installments
    - Auditable
    - Participatory
    - Sustainability


## Hosting

### Traditional + TOR

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


### IPFS

1. Setup a MetaMask wallet, fund it with Ether

2. "adjuvant.eth" was purchased from the [Ethereum Name Service](https://app.ens.domains/). 

3. The "registrant", "controller", and "resolver" records of the domain were configured. 

4. Using [Fleek](https://app.fleek.co/#/), the static files of the website were uploaded to [IPFS](https://ipfs.io/) (here is the [tutorial](https://medium.com/the-ethereum-name-service/cloudflare-and-fleek-make-ens-ipfs-site-deployment-as-easy-as-ever-262c990a7514)).

5. The "content" record of the domain was set to point to the IPNS hosting of the website (more info can be found [here](https://eth.link/)).


## Author

* **Jean-Romain Roy** - *Principal Developer* - [jeanromainroy](https://github.com/jeanromainroy)

