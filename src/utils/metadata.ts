import { ZicretPair } from "@/typechain-types"
import { LocalProfile } from "./types"

export const ExampleWeight: ZicretPair.WeightStruct = {
    gender: 100,
    nation: 100,
    town: 10,
    age: 30,
    interest: [10, 10, 10, 10, 10, 10]
}

export const ExampleLocalProfile: LocalProfile = {
    publicInfo: {
        MBTI: "ESTJ"
    },
    privateInfo: {
        personalInfo: {
            twitter: "molly_1234",
            name: "Molly"
        },
        matchInfo: {
            gender: "true",
            nation: "Taiwan",
            town: "Taipei",
            age: "2x",
            interest: ["i1", "i2", "i4", "i13"]
        },
        matchRequest: {
            gender: "false",
            nation: "Any",
            town: "Any",
            age: "3x",
            interest: ["i1", "i2", "i4", "i6", "i8", "i10"]
        }
    }
}
