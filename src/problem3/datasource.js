// Data source class
class Datasource {
    async getPrices() {
        return fetch("https://interview.switcheo.com/test.json")
            .then(response => response.json())
            .then(data => {
                return data.data.prices.map(price => new Price(price))
            });
    }
}

// Price class that holds the pricing related information of a cryptocurrency pair
class Price {
    constructor(price) {
        // buy price
        this.buy = price.buy
        // sell price
        this.sell = price.sell
        //pair id
        this.id = price.id
        // trading pair
        this.pair = price.pair
        // timestamp of when data is fetched
        this.timestamp = price.timestamp
    }

    // function that returns the mid-point value between the buy and sell price
    mid() {
        return (this.buy + this.sell) / 200
    }

    // function that returns the quote currency of the trading pair
    quote() {
        return this.pair.slice(3)
    }
}

function main() {
    const ds = new Datasource()
    ds.getPrices()
        .then(
            prices => {
            prices.forEach(price => {
                console.log(`Mid price for ${ price.pair } is ${ price.mid() } ${ price.quote() }.`);
            });
        }).catch(error => {
            console.error(error);
        });
}

main()