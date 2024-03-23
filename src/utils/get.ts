import { ZicretPair } from "@/typechain-types"
import { ethers } from "ethers"
import * as abi from "../utils/abi/GitcoinPassportDecoder.json"
import * as ZicretPairMeta from "./abi/ZicretPair.json"
import { ExampleWeight } from "./metadata"

export async function calculatePSI(
    caller: ZicretPair.EncryptedInfoStruct,
    callee: ZicretPair.EncryptedInfoStruct,
    weight = ExampleWeight
) {
    const provider = new ethers.BrowserProvider(window.ethereum)
    const zicretPair = new ethers.Contract(
        process.env.NEXT_PUBLIC_ZIRCRET_PAIR_ADDRESS as string,
        ZicretPairMeta.abi,
        await provider.getSigner()
    )
    try {
        return await zicretPair.calculatePSI(caller, callee, weight)
    } catch {
        return 0
    }
}

/** get poassport score from decoder contract */
export async function getScore(askingAddress: string) {
    const provider = new ethers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_OP_SEP_NODE_URL
    )
    const abiKey = process.env
        .NEXT_PUBLIC_GITCOIN_ABI_ID as string as keyof typeof abi

    const decoderContract: ethers.Contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_GITCOIN_PASSPORT_ADDRESS as string,
        new ethers.Interface(abi[abiKey]),
        provider
    )
    try {
        const score = await decoderContract.getScore(askingAddress)
        return score
    } catch {
        return 0
    }
}
