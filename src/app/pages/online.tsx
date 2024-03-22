import { ZicretPair } from "@/typechain-types"
import {
    useClipboard,
    Input,
    Stack,
    Text,
    Select,
    Card,
    CardBody,
    Button
} from "@chakra-ui/react"
import { ethers } from "ethers"
import React from "react"
import * as ZicretPairMeta from "../../utils/abi/ZicretPair.json"
import { encryptLocalProfile } from "../../utils/encode"
import { ExampleLocalProfile } from "../../utils/metadata"
import { LocalProfile } from "../../utils/types"

export const Online = () => {
    const [zircretPairAddress, setZircretPairAddress] = React.useState<string>(
        process.env.NEXT_PUBLIC_ZIRCRET_PAIR_ADDRESS as string
    )
    const [localProfile, setLocalProfile] =
        React.useState<LocalProfile>(ExampleLocalProfile)
    const [encryptedValue, setEncryptedValue] =
        React.useState<ZicretPair.EncryptedInfoStruct>(
            encryptLocalProfile(ExampleLocalProfile)
        )
    const { onCopy, value, setValue, hasCopied } = useClipboard("")

    async function getEncryptLocalProfile() {
        setEncryptedValue(encryptLocalProfile(localProfile))
        setValue(JSON.stringify(encryptLocalProfile(localProfile), null, 4))
    }

    async function getOnline() {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const zicretPair = new ethers.Contract(
            zircretPairAddress,
            ZicretPairMeta.abi,
            await provider.getSigner()
        )
        const tx = await zicretPair.online(encryptedValue)
        await tx.wait()
    }

    return (
        <>
            <br />
            {/* <Button onClick={deployZicretPair}>Deploy ZicretPair</Button> */}
            <p>
                <b>LocalProfile</b>
            </p>
            <br />
            <Stack spacing={2}>
                <Text mb="8px">PublicInfo:</Text>
                <Select
                    placeholder="Your MBTI"
                    value={localProfile.publicInfo.MBTI || ""}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        setLocalProfile((prevState) => ({
                            ...prevState,
                            publicInfo: {
                                ...prevState.publicInfo,
                                MBTI: e.target.value
                            }
                        }))
                    }}
                    size="sm">
                    <option value="ESTP">ESTP</option>
                    <option value="ESFP">ESFP</option>
                    <option value="ISTP">ISTP</option>
                    <option value="ISFP">ISFP</option>
                    <option value="ESTJ">ESTJ</option>
                    <option value="ESFJ">ESFJ</option>
                    <option value="ISTJ">ISTJ</option>
                    <option value="ISFJ">ISFJ</option>
                    <option value="ENTJ">ENTJ</option>
                    <option value="ENTP">ENTP</option>
                    <option value="INTJ">INTJ</option>
                    <option value="INTP">INTP</option>
                    <option value="ENFJ">ENFJ</option>
                    <option value="ENFP">ENFP</option>
                    <option value="INFJ">INFJ</option>
                    <option value="INFP">INFP</option>
                </Select>
            </Stack>
            <br />
            <Stack spacing={2}>
                <Text mb="8px">PrivateInfo - PersonalInfo</Text>
                <Input
                    value={localProfile.privateInfo.personalInfo.twitter || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setLocalProfile((prevState) => ({
                            ...prevState,
                            privateInfo: {
                                ...prevState.privateInfo,
                                personalInfo: {
                                    ...prevState.privateInfo.personalInfo,
                                    twitter: e.target.value
                                }
                            }
                        }))
                    }}
                    placeholder="Your Twitter"
                    size="sm"
                />
                <Input
                    value={localProfile.privateInfo.personalInfo.name || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setLocalProfile((prevState) => ({
                            ...prevState,
                            privateInfo: {
                                ...prevState.privateInfo,
                                personalInfo: {
                                    ...prevState.privateInfo.personalInfo,
                                    name: e.target.value
                                }
                            }
                        }))
                    }}
                    placeholder="Your Name"
                    size="sm"
                />
            </Stack>
            <br />
            <Text mb="8px">
                PrivateInfo - MatchInfo: what is your Information
            </Text>
            <Stack spacing={2} direction={["column", "row"]}>
                <Select
                    placeholder="Your Gender"
                    value={localProfile.privateInfo.matchInfo.gender || ""}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        setLocalProfile((prevState) => ({
                            ...prevState,
                            privateInfo: {
                                ...prevState.privateInfo,
                                matchInfo: {
                                    ...prevState.privateInfo.matchInfo,
                                    gender: e.target.value
                                }
                            }
                        }))
                    }}
                    size="sm">
                    <option value="false">Male</option>
                    <option value="true">Female</option>
                    <option value="x">X</option>
                </Select>
                <Input
                    value={localProfile.privateInfo.matchInfo.nation || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setLocalProfile((prevState) => ({
                            ...prevState,
                            privateInfo: {
                                ...prevState.privateInfo,
                                matchInfo: {
                                    ...prevState.privateInfo.matchInfo,
                                    nation: e.target.value
                                }
                            }
                        }))
                    }}
                    placeholder="Your Nation"
                    size="sm"
                />
                <Input
                    value={localProfile.privateInfo.matchInfo.town || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setLocalProfile((prevState) => ({
                            ...prevState,
                            privateInfo: {
                                ...prevState.privateInfo,
                                matchInfo: {
                                    ...prevState.privateInfo.matchInfo,
                                    town: e.target.value
                                }
                            }
                        }))
                    }}
                    placeholder="Your Town"
                    size="sm"
                />
                <Select
                    placeholder="Your Age"
                    value={localProfile.privateInfo.matchInfo.age || ""}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        setLocalProfile((prevState) => ({
                            ...prevState,
                            privateInfo: {
                                ...prevState.privateInfo,
                                matchInfo: {
                                    ...prevState.privateInfo.matchInfo,
                                    age: e.target.value
                                }
                            }
                        }))
                    }}
                    size="sm">
                    <option value="1x">18~19</option>
                    <option value="2x">20~29</option>
                    <option value="3x">30~39</option>
                    <option value="4x">40~49</option>
                    <option value="5x">50~59</option>
                    <option value="6x">60~</option>
                    <option value="Any">Any</option>
                </Select>
            </Stack>
            <br />
            <Input
                value={localProfile.privateInfo.matchInfo.interest || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setLocalProfile((prevState) => ({
                        ...prevState,
                        privateInfo: {
                            ...prevState.privateInfo,
                            matchInfo: {
                                ...prevState.privateInfo.matchInfo,
                                interest: e.target.value
                                    .split(",")
                                    .map((item) => item.trim())
                            }
                        }
                    }))
                }}
                placeholder="Your Interests seperated with comma (e.g. music, vollyball, history, uniqlo)"
                size="sm"
            />
            <br />
            <br />

            <Text mb="8px">
                PrivateInfo - MatchRequest: what types do you wanna pair
            </Text>
            <Stack spacing={2} direction={["column", "row"]}>
                <Select
                    placeholder="Expected Gender"
                    value={localProfile.privateInfo.matchRequest.gender || ""}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        setLocalProfile((prevState) => ({
                            ...prevState,
                            privateInfo: {
                                ...prevState.privateInfo,
                                matchRequest: {
                                    ...prevState.privateInfo.matchRequest,
                                    gender: e.target.value
                                }
                            }
                        }))
                    }}
                    size="sm">
                    <option value="true">Male</option>
                    <option value="false">Female</option>
                    <option value="x">X</option>
                </Select>
                <Input
                    value={localProfile.privateInfo.matchRequest.nation || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setLocalProfile((prevState) => ({
                            ...prevState,
                            privateInfo: {
                                ...prevState.privateInfo,
                                matchRequest: {
                                    ...prevState.privateInfo.matchRequest,
                                    nation: e.target.value
                                }
                            }
                        }))
                    }}
                    placeholder="Expected Nation"
                    size="sm"
                />
                <Input
                    value={localProfile.privateInfo.matchRequest.town || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setLocalProfile((prevState) => ({
                            ...prevState,
                            privateInfo: {
                                ...prevState.privateInfo,
                                matchRequest: {
                                    ...prevState.privateInfo.matchRequest,
                                    town: e.target.value
                                }
                            }
                        }))
                    }}
                    placeholder="Expected Town"
                    size="sm"
                />
                <Select
                    placeholder="Expected Age"
                    value={localProfile.privateInfo.matchRequest.age || ""}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        setLocalProfile((prevState) => ({
                            ...prevState,
                            privateInfo: {
                                ...prevState.privateInfo,
                                matchRequest: {
                                    ...prevState.privateInfo.matchRequest,
                                    age: e.target.value
                                }
                            }
                        }))
                    }}
                    size="sm">
                    <option value="1x">18~19</option>
                    <option value="2x">20~29</option>
                    <option value="3x">30~39</option>
                    <option value="4x">40~49</option>
                    <option value="5x">50~59</option>
                    <option value="6x">60~</option>
                    <option value="Any">Any</option>
                </Select>
            </Stack>
            <br />
            <Input
                value={localProfile.privateInfo.matchRequest.interest || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setLocalProfile((prevState) => ({
                        ...prevState,
                        privateInfo: {
                            ...prevState.privateInfo,
                            matchRequest: {
                                ...prevState.privateInfo.matchRequest,
                                interest: e.target.value
                                    .split(",")
                                    .map((item) => item.trim())
                            }
                        }
                    }))
                }}
                placeholder="Expected Interests seperated with comma (e.g. music, vollyball, history, uniqlo)"
                size="sm"
            />
            <br />
            <br />
            <p>
                <b>EncryptedInfo</b>
            </p>
            <br />
            <Button onClick={getEncryptLocalProfile}>Get EncryptedInfo</Button>
            <br />
            <br />
            <Card>
                <CardBody>
                    <Text>{JSON.stringify(encryptedValue, null, 4)}</Text>
                    <Button onClick={onCopy}>
                        {hasCopied ? "Copied!" : "Copy"}
                    </Button>
                </CardBody>
            </Card>
            <br />
            <Button onClick={getOnline}> Go Online</Button>
            <br />
        </>
    )
}
