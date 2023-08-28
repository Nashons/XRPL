const xrpl = require("xrpl")

async function main() {

    //define the network client
    const api = new xrpl.Client("wss://s.altnet.rippletest.net:51233")

    await api.connect()

    console.log("connected to client")

    //create a testenet wallet and fund it
    // const funded_wallet = await api.fundWallet()
    // console.log(funded_wallet)

    //if you just want to create an account without funding it(won't be available on-ledger till it does it's first tx, though it can receive funds)
    // const zeroFundWallet = xrpl.Wallet.generate()
    // console.log(zeroFundWallet)

    const test_wallet = xrpl.Wallet.fromSeed("sEdTS4JisB4N2Yq977vPy3iy4n7zUvA")
    console.log(test_wallet)

    // Get info from the ledger about the address we just funded
    //   const response = await api.request({
    //     "command": "account_info",
    //     "account": test_wallet.address,
    //     "ledger_index": "validated"
    //   })
    //   console.log(response)

    //SEND XRP
    const tx = await api.autofill({
        "TransactionType": "Payment",
        "Account": "rGjjuKgNux8HcJ3UBvW7uiyb9XuLeUk3Vu",
        "Amount": "2000000",
        "Destination": "rUb3riH3ggeLinN7mwJnvs6vzKP2uCSosY"
    })

    // Sign prepared instructions 
    const signed = test_wallet.sign(tx)
    // console.log("Identifying hash:", signed.hash)
    // console.log("Signed blob:", signed.tx_blob)

    // Submit signed blob
  const transaction = await api.submitAndWait(signed.tx_blob)
  console.log("transaction", transaction)

    // Disconnect when done (If you omit this, Node.js won't end the process)
    api.disconnect()
}

main()