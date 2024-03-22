import { ZicretPair } from "@/typechain-types"

export interface LocalProfile {
    publicInfo: {
        MBTI: string
    }
    privateInfo: {
        personalInfo: {
            twitter: string
            name: string
        }
        matchInfo: {
            gender: string
            nation: string
            town: string
            age: string
            interest: string[]
        }
        matchRequest: {
            gender: string
            nation: string
            town: string
            age: string
            interest: string[]
        }
    }
}

export type OnlineUser = {
    address: string
    encryptedInfoStruct: ZicretPair.EncryptedInfoStruct
    time: number
    matchScore: number
    humanityScore: number
}

export type RequestUser = {
    address: string
    pairStruct: ZicretPair.PairStruct
    time: number
    matchScore: number
    humanityScore: number
}

export type MatchedUser = {
    address: string
    pairStruct: ZicretPair.PairStruct
    time: number
    matchScore: number
    humanityScore: number
    isDecrypted: boolean
    otherPubKey: Uint8Array
    name: string
    twitter: string
}
