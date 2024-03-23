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
                I know you want to encourage the ZicretPair team! Or just want
                to know more about the introduction and system design. You can
                find ALL information{" "}
                <Link
                    href="https://github.com/ChiHaoLu/ZicretPair-App/wiki"
                    color="pink.400"
                    isExternal>
                    <b>GITHUB WIKI</b>
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
                    Then go down the step with next pages to find your Mr & Mrs
                    Right!
                </li>
            </ol>
            <br />
            <br />
            <p>
                ZicretPair is made by Alfred Lu{" "}
                <Link href="https://chihaolu.me" color="pink.400" isExternal>
                    (chihaolu.me)
                </Link>
                !
            </p>
        </>
    )
}
