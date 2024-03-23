"use client"

import { ChakraProvider, Flex, Heading, Button, Link } from "@chakra-ui/react"
import { ethers } from "ethers"
import { useState, useEffect } from "react"
import { TabLayout } from "./tab-contents"

declare global {
    interface Window {
        ethereum: any
    }
}

declare global {
    var provider: ethers.BrowserProvider
}

interface Stamp {
    id: number
    stamp: string
}

export default function Passport() {
    const [address, setAddress] = useState<string>("default")
    const [connected, setConnected] = useState<boolean>(false)
    const [network, setNetwork] = useState<string>("")

    useEffect(() => {
        checkConnection()
        async function checkConnection() {
            if (connected) {
                console.log("already connected")
            } else {
                const result = await connect()
                console.log("reconnect: ", result)
            }
        }
    }, [connected])

    async function connect() {
        try {
            globalThis.provider = new ethers.BrowserProvider(window.ethereum)
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts"
            })
            const network = await provider.getNetwork()
            setAddress(accounts[0])
            setConnected(true)
            setNetwork(network.chainId.toString())
        } catch (err) {
            console.log("error connecting...")
        }
        return true
    }

    const styles = {
        main: {
            width: "900px",
            margin: "0 auto",
            paddingTop: 90
        }
    }

    return (
        /* this is the UI for the app */
        <div style={styles.main}>
            <ChakraProvider>
                <Flex
                    minWidth="max-content"
                    alignItems="right"
                    gap="2"
                    justifyContent="right">
                    {connected ? (
                        <Button
                            colorScheme="pink.400"
                            variant="outline"
                            isDisabled={true}>
                            {address}
                        </Button>
                    ) : (
                        <Button
                            colorScheme="pink.400"
                            variant="outline"
                            onClick={connect}>
                            Connect
                        </Button>
                    )}
                </Flex>
                <div>
                    {connected && <p>✅ Wallet connected</p>}
                    {connected && network == "48899" && (
                        <p>✅ Network: Zircuit Testnet</p>
                    )}
                    {connected && network == "534351" && (
                        <p>✅ Network: Scroll Sepolia</p>
                    )}
                    {connected && network == "59140" && (
                        <p>✅ Network: Linea Goerli</p>
                    )}
                    {connected && network == "18" && (
                        <p>✅ Network: Thunder Testnet</p>
                    )}
                    {connected &&
                        network != "48899" &&
                        network != "534351" &&
                        network != "59140" &&
                        network != "18" && (
                            <p>
                                ❌ Please switch to{" "}
                                <Link
                                    href="https://docs.zircuit.com/build-on-zircuit/quick-startZircuit"
                                    color="pink.400"
                                    isExternal>
                                    <b>Ziruit Testnet</b>{" "}
                                </Link>
                                or{" "}
                                <Link
                                    href="https://docs.scroll.io/en/user-guide/faucet/"
                                    color="pink.400"
                                    isExternal>
                                    <b>Scroll Sepolia</b>{" "}
                                </Link>
                                or{" "}
                                <Link
                                    href="https://docs.linea.build/use-mainnet/set-up-your-wallet"
                                    color="pink.400"
                                    isExternal>
                                    <b>Linea Goerli</b>{" "}
                                </Link>
                                or{" "}
                                <Link
                                    href="https://docs.developers.thundercore.com/product-protocol/wallets"
                                    color="pink.400"
                                    isExternal>
                                    <b>Thunder Testnet</b>.
                                </Link>
                            </p>
                        )}
                </div>
                <br />
                <br />
                <br />
                <br />
                <Heading as="h1" size="4xl" noOfLines={2}>
                    💖 ZicretPair
                </Heading>
                <br />
                <br />
                <TabLayout />
            </ChakraProvider>
        </div>
    )
}
