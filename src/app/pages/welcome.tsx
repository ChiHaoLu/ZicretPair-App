import { Link } from "@chakra-ui/react"
import React from "react"

export const Welcome = () => {
    return (
        <>
            <br />
            <br />
            <p>
                💖 Find your better half secretly in ZicretPair. Unlock a new
                dimension of privacy and decentralized connection with
                ZicretPair, the avaunt-grade social matching platform.
            </p>
            <br />
            <p>
                I know you want to encourage the ZicretPair team! You can find
                ALL information{" "}
                <Link href="https://" color="pink.400" isExternal>
                    <b>HERE</b>
                </Link>
                !
            </p>
            <br />
            <ol>
                <li>
                    Make sure you have claimed your stamps and bring it on chain
                    on{" "}
                    <Link
                        href="https://passport.gitcoin.co/#/dashboard/testing"
                        color="pink.400"
                        isExternal>
                        <b>Optimism Sepolia</b>
                    </Link>
                    !
                </li>
                <li>Connect your wallet by clicking "Connect"</li>
                <li>
                    Allow the app to query your Passport by clicking "Query
                    Passport"
                </li>
            </ol>
            <br />
        </>
    )
}
