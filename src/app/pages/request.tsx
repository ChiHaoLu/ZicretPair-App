import { ZicretPair } from "@/typechain-types"
import {
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
import { ethers } from "ethers"
import type { EventLog } from "ethers"
import React from "react"
import * as ZicretPairMeta from "../../utils/abi/ZicretPair.json"
import { proxyObjectToEncryptedInfoStruct, ellipsis } from "../../utils/encode"
import { calculatePSI, getScore } from "../../utils/get"
import { OnlineUser } from "../../utils/types"

export const Request = ({ userPub }: { userPub: Uint8Array }) => {
    const [nowUsers, setNowUsers] = React.useState<OnlineUser[]>([])
    const [encryptedInfo, setEncryptedInfo] =
        React.useState<ZicretPair.EncryptedInfoStruct>(
            {} as ZicretPair.EncryptedInfoStruct
        )

    async function fetchOnlineUser() {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const zicretPair = new ethers.Contract(
            process.env.NEXT_PUBLIC_ZIRCRET_PAIR_ADDRESS as string,
            ZicretPairMeta.abi,
            await provider.getSigner()
        )
        const filter = zicretPair.filters.GetOnline
        const events = await zicretPair.queryFilter(filter)
        console.log("GetOnline:", events)
        ;(events as EventLog[]).forEach(async (element) => {
            if (
                element.fragment.name === "GetOnline" &&
                !nowUsers.some((user) => user.address === element.args.sender)
            ) {
                setNowUsers([
                    ...nowUsers,
                    {
                        address: element.args.sender,
                        encryptedInfoStruct: element.args.encryptedInfo,
                        time: (
                            (await provider.getBlock(
                                element.blockNumber
                            )) as ethers.Block
                        ).timestamp,
                        matchScore: Number(
                            await calculatePSI(
                                encryptedInfo,
                                proxyObjectToEncryptedInfoStruct(
                                    element.args.encryptedInfo
                                )
                            )
                        ),
                        humanityScore: await getScore(element.args.sender)
                    }
                ])
            }
        })
    }

    function handleEncryptedInfo(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setEncryptedInfo(
            JSON.parse(e.target.value) as ZicretPair.EncryptedInfoStruct
        )
    }

    async function pair(address: string) {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const zicretPair = new ethers.Contract(
            process.env.NEXT_PUBLIC_ZIRCRET_PAIR_ADDRESS as string,
            ZicretPairMeta.abi,
            await provider.getSigner()
        )

        const pairRequest: ZicretPair.PairStruct = {
            target: address,
            pubK: Array.from(userPub).map((value) => ethers.toBigInt(value)),
            encryptedInfo: encryptedInfo
        }
        const tx = await zicretPair.requestPair(pairRequest)
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
                <b>
                    Here is the other online users, send a Pair Request to them!
                </b>
            </p>
            <br />
            <Button onClick={fetchOnlineUser}>Fetch a Mr & Mrs Right</Button>
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
                            <Th>Request Pair</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {nowUsers.length !== 0
                            ? nowUsers.map((mapping) => (
                                  <Tr
                                      key={
                                          Math.floor(Math.random() * 60000000) +
                                          1
                                      }>
                                      <Td>{ellipsis(mapping.address, 4)}</Td>
                                      <Td>{mapping.time}</Td>
                                      <Td>{mapping.humanityScore}</Td>
                                      <Td>{mapping.matchScore}</Td>
                                      <Td>
                                          <Button
                                              onClick={() =>
                                                  pair(mapping.address)
                                              }>
                                              Pair
                                          </Button>
                                      </Td>
                                  </Tr>
                              ))
                            : null}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    )
}
