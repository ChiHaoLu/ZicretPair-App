/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
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
import type {
    TypedContractEvent,
    TypedDeferredTopicFilter,
    TypedEventLog,
    TypedLogDescription,
    TypedListener,
    TypedContractMethod
} from "./common"

export declare namespace ZicretPair {
    export type PublicInfoStruct = { MBTI: BigNumberish }

    export type PublicInfoStructOutput = [MBTI: bigint] & { MBTI: bigint }

    export type PersonalInfoStruct = { twitter: BytesLike; name: BytesLike }

    export type PersonalInfoStructOutput = [twitter: string, name: string] & {
        twitter: string
        name: string
    }

    export type MatchStruct = {
        gender: BytesLike
        nation: BytesLike
        town: BytesLike
        age: BytesLike
        interest: BytesLike[]
    }

    export type MatchStructOutput = [
        gender: string,
        nation: string,
        town: string,
        age: string,
        interest: string[]
    ] & {
        gender: string
        nation: string
        town: string
        age: string
        interest: string[]
    }

    export type PrivateInfoStruct = {
        personalInfo: ZicretPair.PersonalInfoStruct
        matchInfo: ZicretPair.MatchStruct
        matchRequest: ZicretPair.MatchStruct
    }

    export type PrivateInfoStructOutput = [
        personalInfo: ZicretPair.PersonalInfoStructOutput,
        matchInfo: ZicretPair.MatchStructOutput,
        matchRequest: ZicretPair.MatchStructOutput
    ] & {
        personalInfo: ZicretPair.PersonalInfoStructOutput
        matchInfo: ZicretPair.MatchStructOutput
        matchRequest: ZicretPair.MatchStructOutput
    }

    export type EncryptedInfoStruct = {
        publicInfo: ZicretPair.PublicInfoStruct
        privateInfo: ZicretPair.PrivateInfoStruct
    }

    export type EncryptedInfoStructOutput = [
        publicInfo: ZicretPair.PublicInfoStructOutput,
        privateInfo: ZicretPair.PrivateInfoStructOutput
    ] & {
        publicInfo: ZicretPair.PublicInfoStructOutput
        privateInfo: ZicretPair.PrivateInfoStructOutput
    }

    export type PairStruct = {
        target: AddressLike
        pubK: BigNumberish[]
        encryptedInfo: ZicretPair.EncryptedInfoStruct
    }

    export type PairStructOutput = [
        target: string,
        pubK: bigint[],
        encryptedInfo: ZicretPair.EncryptedInfoStructOutput
    ] & {
        target: string
        pubK: bigint[]
        encryptedInfo: ZicretPair.EncryptedInfoStructOutput
    }

    export type SharingInfoStruct = {
        target: AddressLike
        sharingInfo: BytesLike
    }

    export type SharingInfoStructOutput = [
        target: string,
        sharingInfo: string
    ] & { target: string; sharingInfo: string }

    export type WeightStruct = {
        gender: BigNumberish
        nation: BigNumberish
        town: BigNumberish
        age: BigNumberish
        interest: BigNumberish[]
    }

    export type WeightStructOutput = [
        gender: bigint,
        nation: bigint,
        town: bigint,
        age: bigint,
        interest: bigint[]
    ] & {
        gender: bigint
        nation: bigint
        town: bigint
        age: bigint
        interest: bigint[]
    }
}

export interface ZicretPairInterface extends Interface {
    getFunction(
        nameOrSignature:
            | "approvePair"
            | "calculatePSI"
            | "getPairHash"
            | "online"
            | "pairRecored"
            | "requestPair"
            | "sendSharingInfo"
            | "successfulPair"
            | "userStats"
    ): FunctionFragment

    getEvent(
        nameOrSignatureOrTopic:
            | "ApprovePair"
            | "GetOnline"
            | "RequestPair"
            | "SendSharingInfo"
    ): EventFragment

    encodeFunctionData(
        functionFragment: "approvePair",
        values: [ZicretPair.PairStruct]
    ): string
    encodeFunctionData(
        functionFragment: "calculatePSI",
        values: [
            ZicretPair.EncryptedInfoStruct,
            ZicretPair.EncryptedInfoStruct,
            ZicretPair.WeightStruct
        ]
    ): string
    encodeFunctionData(
        functionFragment: "getPairHash",
        values: [AddressLike, AddressLike]
    ): string
    encodeFunctionData(
        functionFragment: "online",
        values: [ZicretPair.EncryptedInfoStruct]
    ): string
    encodeFunctionData(
        functionFragment: "pairRecored",
        values: [BytesLike]
    ): string
    encodeFunctionData(
        functionFragment: "requestPair",
        values: [ZicretPair.PairStruct]
    ): string
    encodeFunctionData(
        functionFragment: "sendSharingInfo",
        values: [ZicretPair.SharingInfoStruct]
    ): string
    encodeFunctionData(
        functionFragment: "successfulPair",
        values: [AddressLike, BigNumberish]
    ): string
    encodeFunctionData(
        functionFragment: "userStats",
        values: [AddressLike]
    ): string

    decodeFunctionResult(
        functionFragment: "approvePair",
        data: BytesLike
    ): Result
    decodeFunctionResult(
        functionFragment: "calculatePSI",
        data: BytesLike
    ): Result
    decodeFunctionResult(
        functionFragment: "getPairHash",
        data: BytesLike
    ): Result
    decodeFunctionResult(functionFragment: "online", data: BytesLike): Result
    decodeFunctionResult(
        functionFragment: "pairRecored",
        data: BytesLike
    ): Result
    decodeFunctionResult(
        functionFragment: "requestPair",
        data: BytesLike
    ): Result
    decodeFunctionResult(
        functionFragment: "sendSharingInfo",
        data: BytesLike
    ): Result
    decodeFunctionResult(
        functionFragment: "successfulPair",
        data: BytesLike
    ): Result
    decodeFunctionResult(functionFragment: "userStats", data: BytesLike): Result
}

export namespace ApprovePairEvent {
    export type InputTuple = [
        sender: AddressLike,
        pairRequest: ZicretPair.PairStruct,
        time: BigNumberish
    ]
    export type OutputTuple = [
        sender: string,
        pairRequest: ZicretPair.PairStructOutput,
        time: bigint
    ]
    export interface OutputObject {
        sender: string
        pairRequest: ZicretPair.PairStructOutput
        time: bigint
    }
    export type Event = TypedContractEvent<
        InputTuple,
        OutputTuple,
        OutputObject
    >
    export type Filter = TypedDeferredTopicFilter<Event>
    export type Log = TypedEventLog<Event>
    export type LogDescription = TypedLogDescription<Event>
}

export namespace GetOnlineEvent {
    export type InputTuple = [
        sender: AddressLike,
        encryptedInfo: ZicretPair.EncryptedInfoStruct,
        time: BigNumberish
    ]
    export type OutputTuple = [
        sender: string,
        encryptedInfo: ZicretPair.EncryptedInfoStructOutput,
        time: bigint
    ]
    export interface OutputObject {
        sender: string
        encryptedInfo: ZicretPair.EncryptedInfoStructOutput
        time: bigint
    }
    export type Event = TypedContractEvent<
        InputTuple,
        OutputTuple,
        OutputObject
    >
    export type Filter = TypedDeferredTopicFilter<Event>
    export type Log = TypedEventLog<Event>
    export type LogDescription = TypedLogDescription<Event>
}

export namespace RequestPairEvent {
    export type InputTuple = [
        sender: AddressLike,
        pairRequest: ZicretPair.PairStruct,
        time: BigNumberish
    ]
    export type OutputTuple = [
        sender: string,
        pairRequest: ZicretPair.PairStructOutput,
        time: bigint
    ]
    export interface OutputObject {
        sender: string
        pairRequest: ZicretPair.PairStructOutput
        time: bigint
    }
    export type Event = TypedContractEvent<
        InputTuple,
        OutputTuple,
        OutputObject
    >
    export type Filter = TypedDeferredTopicFilter<Event>
    export type Log = TypedEventLog<Event>
    export type LogDescription = TypedLogDescription<Event>
}

export namespace SendSharingInfoEvent {
    export type InputTuple = [
        sender: AddressLike,
        sharingInfo: ZicretPair.SharingInfoStruct,
        time: BigNumberish
    ]
    export type OutputTuple = [
        sender: string,
        sharingInfo: ZicretPair.SharingInfoStructOutput,
        time: bigint
    ]
    export interface OutputObject {
        sender: string
        sharingInfo: ZicretPair.SharingInfoStructOutput
        time: bigint
    }
    export type Event = TypedContractEvent<
        InputTuple,
        OutputTuple,
        OutputObject
    >
    export type Filter = TypedDeferredTopicFilter<Event>
    export type Log = TypedEventLog<Event>
    export type LogDescription = TypedLogDescription<Event>
}

export interface ZicretPair extends BaseContract {
    connect(runner?: ContractRunner | null): ZicretPair
    waitForDeployment(): Promise<this>

    interface: ZicretPairInterface

    queryFilter<TCEvent extends TypedContractEvent>(
        event: TCEvent,
        fromBlockOrBlockhash?: string | number | undefined,
        toBlock?: string | number | undefined
    ): Promise<Array<TypedEventLog<TCEvent>>>
    queryFilter<TCEvent extends TypedContractEvent>(
        filter: TypedDeferredTopicFilter<TCEvent>,
        fromBlockOrBlockhash?: string | number | undefined,
        toBlock?: string | number | undefined
    ): Promise<Array<TypedEventLog<TCEvent>>>

    on<TCEvent extends TypedContractEvent>(
        event: TCEvent,
        listener: TypedListener<TCEvent>
    ): Promise<this>
    on<TCEvent extends TypedContractEvent>(
        filter: TypedDeferredTopicFilter<TCEvent>,
        listener: TypedListener<TCEvent>
    ): Promise<this>

    once<TCEvent extends TypedContractEvent>(
        event: TCEvent,
        listener: TypedListener<TCEvent>
    ): Promise<this>
    once<TCEvent extends TypedContractEvent>(
        filter: TypedDeferredTopicFilter<TCEvent>,
        listener: TypedListener<TCEvent>
    ): Promise<this>

    listeners<TCEvent extends TypedContractEvent>(
        event: TCEvent
    ): Promise<Array<TypedListener<TCEvent>>>
    listeners(eventName?: string): Promise<Array<Listener>>
    removeAllListeners<TCEvent extends TypedContractEvent>(
        event?: TCEvent
    ): Promise<this>

    approvePair: TypedContractMethod<
        [pairApprovement: ZicretPair.PairStruct],
        [void],
        "nonpayable"
    >

    calculatePSI: TypedContractMethod<
        [
            a: ZicretPair.EncryptedInfoStruct,
            b: ZicretPair.EncryptedInfoStruct,
            weight: ZicretPair.WeightStruct
        ],
        [bigint],
        "view"
    >

    getPairHash: TypedContractMethod<
        [a: AddressLike, b: AddressLike],
        [string],
        "view"
    >

    online: TypedContractMethod<
        [encryptedInfo: ZicretPair.EncryptedInfoStruct],
        [void],
        "nonpayable"
    >

    pairRecored: TypedContractMethod<[arg0: BytesLike], [boolean], "view">

    requestPair: TypedContractMethod<
        [pairRequest: ZicretPair.PairStruct],
        [void],
        "nonpayable"
    >

    sendSharingInfo: TypedContractMethod<
        [sharingInfo: ZicretPair.SharingInfoStruct],
        [void],
        "nonpayable"
    >

    successfulPair: TypedContractMethod<
        [arg0: AddressLike, arg1: BigNumberish],
        [string],
        "view"
    >

    userStats: TypedContractMethod<
        [arg0: AddressLike],
        [
            [bigint, bigint, bigint, bigint] & {
                onlineTimes: bigint
                requestingTimes: bigint
                requestedTimes: bigint
                matchTimes: bigint
            }
        ],
        "view"
    >

    getFunction<T extends ContractMethod = ContractMethod>(
        key: string | FunctionFragment
    ): T

    getFunction(
        nameOrSignature: "approvePair"
    ): TypedContractMethod<
        [pairApprovement: ZicretPair.PairStruct],
        [void],
        "nonpayable"
    >
    getFunction(
        nameOrSignature: "calculatePSI"
    ): TypedContractMethod<
        [
            a: ZicretPair.EncryptedInfoStruct,
            b: ZicretPair.EncryptedInfoStruct,
            weight: ZicretPair.WeightStruct
        ],
        [bigint],
        "view"
    >
    getFunction(
        nameOrSignature: "getPairHash"
    ): TypedContractMethod<[a: AddressLike, b: AddressLike], [string], "view">
    getFunction(
        nameOrSignature: "online"
    ): TypedContractMethod<
        [encryptedInfo: ZicretPair.EncryptedInfoStruct],
        [void],
        "nonpayable"
    >
    getFunction(
        nameOrSignature: "pairRecored"
    ): TypedContractMethod<[arg0: BytesLike], [boolean], "view">
    getFunction(
        nameOrSignature: "requestPair"
    ): TypedContractMethod<
        [pairRequest: ZicretPair.PairStruct],
        [void],
        "nonpayable"
    >
    getFunction(
        nameOrSignature: "sendSharingInfo"
    ): TypedContractMethod<
        [sharingInfo: ZicretPair.SharingInfoStruct],
        [void],
        "nonpayable"
    >
    getFunction(
        nameOrSignature: "successfulPair"
    ): TypedContractMethod<
        [arg0: AddressLike, arg1: BigNumberish],
        [string],
        "view"
    >
    getFunction(nameOrSignature: "userStats"): TypedContractMethod<
        [arg0: AddressLike],
        [
            [bigint, bigint, bigint, bigint] & {
                onlineTimes: bigint
                requestingTimes: bigint
                requestedTimes: bigint
                matchTimes: bigint
            }
        ],
        "view"
    >

    getEvent(
        key: "ApprovePair"
    ): TypedContractEvent<
        ApprovePairEvent.InputTuple,
        ApprovePairEvent.OutputTuple,
        ApprovePairEvent.OutputObject
    >
    getEvent(
        key: "GetOnline"
    ): TypedContractEvent<
        GetOnlineEvent.InputTuple,
        GetOnlineEvent.OutputTuple,
        GetOnlineEvent.OutputObject
    >
    getEvent(
        key: "RequestPair"
    ): TypedContractEvent<
        RequestPairEvent.InputTuple,
        RequestPairEvent.OutputTuple,
        RequestPairEvent.OutputObject
    >
    getEvent(
        key: "SendSharingInfo"
    ): TypedContractEvent<
        SendSharingInfoEvent.InputTuple,
        SendSharingInfoEvent.OutputTuple,
        SendSharingInfoEvent.OutputObject
    >

    filters: {
        "ApprovePair(address,tuple,uint256)": TypedContractEvent<
            ApprovePairEvent.InputTuple,
            ApprovePairEvent.OutputTuple,
            ApprovePairEvent.OutputObject
        >
        ApprovePair: TypedContractEvent<
            ApprovePairEvent.InputTuple,
            ApprovePairEvent.OutputTuple,
            ApprovePairEvent.OutputObject
        >

        "GetOnline(address,tuple,uint256)": TypedContractEvent<
            GetOnlineEvent.InputTuple,
            GetOnlineEvent.OutputTuple,
            GetOnlineEvent.OutputObject
        >
        GetOnline: TypedContractEvent<
            GetOnlineEvent.InputTuple,
            GetOnlineEvent.OutputTuple,
            GetOnlineEvent.OutputObject
        >

        "RequestPair(address,tuple,uint256)": TypedContractEvent<
            RequestPairEvent.InputTuple,
            RequestPairEvent.OutputTuple,
            RequestPairEvent.OutputObject
        >
        RequestPair: TypedContractEvent<
            RequestPairEvent.InputTuple,
            RequestPairEvent.OutputTuple,
            RequestPairEvent.OutputObject
        >

        "SendSharingInfo(address,tuple,uint256)": TypedContractEvent<
            SendSharingInfoEvent.InputTuple,
            SendSharingInfoEvent.OutputTuple,
            SendSharingInfoEvent.OutputObject
        >
        SendSharingInfo: TypedContractEvent<
            SendSharingInfoEvent.InputTuple,
            SendSharingInfoEvent.OutputTuple,
            SendSharingInfoEvent.OutputObject
        >
    }
}
