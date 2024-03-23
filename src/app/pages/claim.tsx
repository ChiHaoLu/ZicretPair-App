import { ZicretPair } from "@/typechain-types"
import { Input, Stack, Button } from "@chakra-ui/react"
import { ethers } from "ethers"
import React from "react"
import * as ZicretPairMeta from "../../utils/abi/ZicretPair.json"

export const Claim = () => {
    const [zircretPairAddress, setZircretPairAddress] = React.useState<string>(
        process.env.NEXT_PUBLIC_ZIRCRET_PAIR_ADDRESS as string
    )
    const [zpppAddress, setZPPPAddress] = React.useState<string>(
        process.env.NEXT_PUBLIC_ZPPP_ADDRESS as string
    )
    const [txHash, setTxHash] = React.useState<string>("")
    const [pairAddress, setPairAddress] = React.useState<string>("")

    async function isProven() {
        // TODO: grab the all SharingInfo Events to check the matching info is correct or not
        return false
    }

    async function getNFT() {
        if (!(await isProven())) {
            throw Error("Your matching information is incorrect!")
        }
        const provider = new ethers.BrowserProvider(window.ethereum)
        // TODO: Find a good way to claim the NFT
    }

    return (
        <>
            <br />
            <p>
                <b>Claim Your ZicretPair PairProof</b>
            </p>
            <br />

            <Stack spacing={2}>
                <Input
                    value={pairAddress}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setPairAddress(e.target.value)
                    }}
                    placeholder="Who you pair with"
                    size="sm"
                />
                <Input
                    value={txHash}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setTxHash(e.target.value)
                    }}
                    placeholder="What is the transaction hash when he/she send sharing info with you"
                    size="sm"
                />
            </Stack>
            <br />
            <Button onClick={getNFT}> Claim the NFT</Button>
            <br />
        </>
    )
}
