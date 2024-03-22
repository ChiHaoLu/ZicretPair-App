import { ZicretPair } from "@/typechain-types"
import { ethers } from "ethers"
import type {
    BaseContract,
    BigNumberish,
    BytesLike,
    FunctionFragment,
    Result,
    Interface,
    EventFragment,
    AddressLike,
    ContractRunner,
    ContractMethod,
    Listener
} from "ethers"
import { LocalProfile } from "../utils/types"

function compareBytes32(a: BytesLike, b: BytesLike): number {
    const uintA = BigInt(a.toString())
    const uintB = BigInt(b.toString())
    if (uintA < uintB) {
        return -1
    } else if (uintA > uintB) {
        return 1
    } else {
        return 0
    }
}

function keccakString(str: string): string {
    return ethers.keccak256(ethers.toUtf8Bytes(str))
}

const MBTI: { [key: string]: number } = {
    ESTP: 0,
    ESFP: 1,
    ISTP: 2,
    ISFP: 3,
    ESTJ: 4,
    ESFJ: 5,
    ISTJ: 6,
    ISFJ: 7,
    ENTJ: 8,
    ENTP: 9,
    INTJ: 10,
    INTP: 11,
    ENFJ: 12,
    ENFP: 13,
    INFJ: 14,
    INFP: 15
}

export function encryptLocalProfile(
    localProfile: LocalProfile
): ZicretPair.EncryptedInfoStruct {
    return {
        publicInfo: {
            MBTI: MBTI[localProfile.publicInfo.MBTI] as BigNumberish
        },
        privateInfo: {
            personalInfo: {
                twitter: keccakString(
                    localProfile.privateInfo.personalInfo.twitter
                ),
                name: keccakString(localProfile.privateInfo.personalInfo.name)
            },
            matchInfo: {
                gender: keccakString(
                    localProfile.privateInfo.matchInfo.gender.toString()
                ),
                nation: keccakString(localProfile.privateInfo.matchInfo.nation),
                town: keccakString(localProfile.privateInfo.matchInfo.town),
                age: keccakString(localProfile.privateInfo.matchInfo.age),
                interest: localProfile.privateInfo.matchInfo.interest
                    .map(function (i) {
                        return keccakString(i)
                    })
                    .sort((a, b) => compareBytes32(a, b))
            },
            matchRequest: {
                gender: keccakString(
                    localProfile.privateInfo.matchRequest.gender.toString()
                ),
                nation: keccakString(
                    localProfile.privateInfo.matchRequest.nation
                ),
                town: keccakString(localProfile.privateInfo.matchRequest.town),
                age: keccakString(localProfile.privateInfo.matchRequest.age),
                interest: localProfile.privateInfo.matchRequest.interest
                    .map(function (i) {
                        return keccakString(i)
                    })
                    .sort((a, b) => compareBytes32(a, b))
            }
        }
    }
}

export function proxyObjectToEncryptedInfoStruct(
    structOutput: any
): ZicretPair.EncryptedInfoStruct {
    return {
        publicInfo: {
            MBTI: Number(structOutput.publicInfo.MBTI)
        },
        privateInfo: {
            personalInfo: {
                twitter: structOutput.privateInfo.personalInfo
                    .twitter as string,
                name: structOutput.privateInfo.personalInfo.name as string
            },
            matchInfo: {
                gender: structOutput.privateInfo.matchInfo.gender as string,
                nation: structOutput.privateInfo.matchInfo.nation as string,
                town: structOutput.privateInfo.matchInfo.town as string,
                age: structOutput.privateInfo.matchInfo.age as string,
                interest: structOutput.privateInfo.matchInfo.interest
                    .map(function (i: any) {
                        return i as string
                    })
                    .sort((a: any, b: any) => compareBytes32(a, b))
            },
            matchRequest: {
                gender: structOutput.privateInfo.matchRequest.gender as string,
                nation: structOutput.privateInfo.matchRequest.nation as string,
                town: structOutput.privateInfo.matchRequest.town as string,
                age: structOutput.privateInfo.matchRequest.age as string,
                interest: structOutput.privateInfo.matchRequest.interest
                    .map(function (i: any) {
                        return i as string
                    })
                    .sort((a: any, b: any) => compareBytes32(a, b))
            }
        }
    }
}

export function ellipsis(str: string, len: number) {
    return str.slice(0, len) + "..." + str.slice(str.length - len)
}
