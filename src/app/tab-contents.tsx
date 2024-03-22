import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"
import * as crypto from "crypto"
import React from "react"
import { Approve } from "./pages/approve"
import { Exchange } from "./pages/exchange"
import { Online } from "./pages/online"
import { Request } from "./pages/request"
import { Welcome } from "./pages/welcome"

const TabLayout = ({}) => {
    const curve = "secp256k1"
    const privKey = crypto.createECDH(curve)
    privKey.generateKeys()
    const pubKey = privKey.getPublicKey()
    return (
        <Tabs>
            <TabList>
                <Tab>Home</Tab>
                <Tab>Step1. Go Online</Tab>
                <Tab>Step2. Request Pair</Tab>
                <Tab>Step3. Approve Pair</Tab>
                <Tab>Step4. Exchange Info</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <Welcome />
                </TabPanel>
                <TabPanel>
                    <Online />
                </TabPanel>
                <TabPanel>
                    <Request userPub={pubKey} />
                </TabPanel>
                <TabPanel>
                    <Approve userPub={pubKey} />
                </TabPanel>
                <TabPanel>
                    <Exchange userPriv={privKey} />
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}

export { TabLayout }
