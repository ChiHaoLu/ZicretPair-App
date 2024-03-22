import { ZicretPair } from "@/typechain-types"
import {
    Stack,
    Input,
    Button,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Textarea
} from "@chakra-ui/react"
import * as crypto from "crypto"
import type { ECDH } from "crypto"
import { ethers } from "ethers"
import type { EventLog } from "ethers"
import React from "react"
import * as ZicretPairMeta from "../../utils/abi/ZicretPair.json"
import { proxyObjectToEncryptedInfoStruct, ellipsis } from "../../utils/encode"
import { calculatePSI, getScore } from "../../utils/get"
import { MatchedUser } from "../../utils/types"

export const Exchange = ({ userPriv }: { userPriv: ECDH }) => {
    const iv = "8076681919faed7f"
    const [name, setName] = React.useState<string>("")
    const [twitter, setTwitter] = React.useState<string>("")
    const [nowUsers, setNowUsers] = React.useState<MatchedUser[]>([])
    const [encryptedInfo, setEncryptedInfo] =
        React.useState<ZicretPair.EncryptedInfoStruct>(
            {} as ZicretPair.EncryptedInfoStruct
        )

    async function decryptUser() {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const zicretPair = new ethers.Contract(
            process.env.NEXT_PUBLIC_ZIRCRET_PAIR_ADDRESS as string,
            ZicretPairMeta.abi,
            await provider.getSigner()
        )

        const filterF = zicretPair.filters.SendSharingInfo
        const eventsF = await zicretPair.queryFilter(filterF)
        console.log("SendSharingInfo:", eventsF)
        ;(eventsF as EventLog[]).forEach(async (element) => {
            let newUsers: MatchedUser[] = nowUsers
            if (
                element.fragment.name === "SendSharingInfo" &&
                element.args.sharingInfo.target ==
                    (await provider.getSigner()).address // who share info with me
            ) {
                for (let j = 0; j < nowUsers.length; j++) {
                    let thisUser: MatchedUser = nowUsers[j]
                    if (
                        nowUsers[j].address == element.args.sender &&
                        !nowUsers[j].isDecrypted
                    ) {
                        // this user has not been decrypted
                        try {
                            const encrypted = Uint8Array.from(
                                element.args.sharingInfo.sharingInfo
                                    .slice(2) // slice the "0x"
                                    .match(/.{1,2}/g)
                                    .map((byte: any) => parseInt(byte, 16))
                            )
                            const sharingKey = userPriv.computeSecret(
                                thisUser.otherPubKey
                            )
                            const decipher = crypto.createDecipheriv(
                                "aes-256-cbc",
                                sharingKey,
                                iv
                            )
                            const decrypted = Buffer.concat([
                                decipher.update(encrypted),
                                decipher.final()
                            ]).toString("utf8")
                            const plainJson = JSON.parse(decrypted)
                            thisUser = {
                                ...thisUser,
                                isDecrypted: true,
                                name: plainJson.name,
                                twitter: plainJson.twitter
                            }
                            console.log(plainJson.name, plainJson.twitter)
                        } catch (error) {
                            // console.log(thisUser.address, error)
                        }
                    }
                    newUsers[j] = thisUser
                }
            }
            setNowUsers(newUsers)
        })
    }

    async function fetchMatchedUser() {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const zicretPair = new ethers.Contract(
            process.env.NEXT_PUBLIC_ZIRCRET_PAIR_ADDRESS as string,
            ZicretPairMeta.abi,
            await provider.getSigner()
        )

        const filter = zicretPair.filters.ApprovePair
        const events = await zicretPair.queryFilter(filter)
        console.log("ApprovePair:", events)
        ;(events as EventLog[]).forEach(async (element) => {
            if (
                element.fragment.name === "ApprovePair" &&
                !nowUsers.some(
                    (user) => user.address === element.args.sender
                ) &&
                element.args.pairRequest.target ==
                    (await provider.getSigner()).address
            ) {
                // From proxy object to truly Uint8Array
                const values = Object.values(element.args.pairRequest.pubK)
                const pubKey = new Uint8Array(values.length)
                for (let i = 0; i < values.length; i++) {
                    pubKey[i] = Number(values[i])
                }
                try {
                    setNowUsers([
                        ...nowUsers,
                        {
                            address: element.args.sender,
                            pairStruct: element.args.pairRequest,
                            time: (
                                (await provider.getBlock(
                                    element.blockNumber
                                )) as ethers.Block
                            ).timestamp,
                            matchScore: Number(
                                await calculatePSI(
                                    encryptedInfo,
                                    proxyObjectToEncryptedInfoStruct(
                                        element.args.pairRequest.encryptedInfo
                                    )
                                )
                            ),
                            humanityScore: await getScore(element.args.sender),
                            otherPubKey: pubKey,
                            isDecrypted: false,
                            name: "",
                            twitter: ""
                        }
                    ])
                } catch (error) {}
            }
        })
    }

    function handleEncryptedInfo(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setEncryptedInfo(
            JSON.parse(e.target.value) as ZicretPair.EncryptedInfoStruct
        )
    }

    async function sendSharingInfo(address: string, otherPub: Uint8Array) {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const zicretPair = new ethers.Contract(
            process.env.NEXT_PUBLIC_ZIRCRET_PAIR_ADDRESS as string,
            ZicretPairMeta.abi,
            await provider.getSigner()
        )
        const sharingKey = userPriv.computeSecret(otherPub)
        const message = JSON.stringify({ name: name, twitter: twitter })
        const cipher = crypto.createCipheriv("aes-256-cbc", sharingKey, iv)
        const encrypted = Buffer.concat([
            cipher.update(message, "utf8"),
            cipher.final()
        ])

        const sharingInfo: ZicretPair.SharingInfoStruct = {
            target: address,
            sharingInfo: "0x" + encrypted.toString("hex")
        }
        const tx = await zicretPair.sendSharingInfo(sharingInfo)
        await tx.wait()
    }

    return (
        <>
            <br />
            <p>
                <b>Paste your EncryptedInfo</b>
            </p>
            <br />
            <Textarea
                onChange={handleEncryptedInfo}
                placeholder={JSON.stringify({
                    publicInfo: {
                        MBTI: "..."
                    },
                    privateInfo: {}
                })}
            />
            <br />
            <br />
            <p>
                <b>PersonalInfo</b>
            </p>
            <br />
            <Stack spacing={2}>
                <Input
                    value={twitter}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setTwitter(e.target.value)
                    }}
                    placeholder="Your Twitter"
                    size="sm"
                />
                <Input
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setName(e.target.value)
                    }}
                    placeholder="Your Name"
                    size="sm"
                />
            </Stack>
            <br />
            <p>
                <b>Here is the other online users who has matched with you!</b>
            </p>
            <br />
            <Button onClick={fetchMatchedUser}>
                Fetch who is your Mr & Mrs Right
            </Button>
            <br />
            <br />
            <Button onClick={decryptUser}>Decrypt Available Users</Button>
            <br />
            <br />
            <TableContainer>
                <Table variant="striped" colorScheme="pink">
                    {nowUsers.length !== 0 ? (
                        <TableCaption> Onlne User </TableCaption>
                    ) : (
                        <TableCaption>
                            {" "}
                            Please click the "Fetch" button{" "}
                        </TableCaption>
                    )}
                    <Thead>
                        <Tr>
                            <Th>Address</Th>
                            <Th isNumeric>Block</Th>
                            <Th isNumeric>Humanity Score</Th>
                            <Th isNumeric>MatchScore</Th>
                            <Th>Send SharingInfo</Th>
                            <Th>Name</Th>
                            <Th>Twitter</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {nowUsers.length !== 0
                            ? nowUsers.map((mapping) =>
                                  mapping.isDecrypted ? (
                                      <Tr
                                          key={
                                              Math.floor(
                                                  Math.random() * 60000000
                                              ) + 1
                                          }>
                                          <Td>
                                              {ellipsis(mapping.address, 4)}
                                          </Td>
                                          <Td>{mapping.time}</Td>
                                          <Td>{mapping.humanityScore}</Td>
                                          <Td>{mapping.matchScore}</Td>
                                          <Td>
                                              <Button
                                                  onClick={() =>
                                                      sendSharingInfo(
                                                          mapping.address,
                                                          mapping.otherPubKey
                                                      )
                                                  }>
                                                  Send Info
                                              </Button>
                                          </Td>
                                          <Td>{mapping.name}</Td>
                                          <Td>{mapping.twitter}</Td>
                                      </Tr>
                                  ) : (
                                      <Tr
                                          key={
                                              Math.floor(
                                                  Math.random() * 60000000
                                              ) + 1
                                          }>
                                          <Td>
                                              {ellipsis(mapping.address, 4)}
                                          </Td>
                                          <Td>{mapping.time}</Td>
                                          <Td>{mapping.humanityScore}</Td>
                                          <Td>{mapping.matchScore}</Td>
                                          <Td>
                                              <Button
                                                  onClick={() =>
                                                      sendSharingInfo(
                                                          mapping.address,
                                                          mapping.otherPubKey
                                                      )
                                                  }>
                                                  Send Info
                                              </Button>
                                          </Td>
                                          <Td> Wait for Sharing Info</Td>
                                          <Td> Wait for Sharing Info</Td>
                                      </Tr>
                                  )
                              )
                            : null}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    )
}
