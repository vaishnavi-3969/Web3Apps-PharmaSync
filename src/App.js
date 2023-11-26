import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import Navigation from './components/Navigation'
import Section from './components/Section'
import Product from './components/Product'
import ABI from './abis/Medicine.json'
import config from './config.json'

function App() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [dappazon, setDappazon] = useState(null)
  const [tablets, setTablets] = useState(null);
  const [drops, setDrops] = useState(null);
  const [kit, setKit] = useState(null);
  const [toggle, setToggle] = useState(false)
  const [item, setItem] = useState({})
  const togglePop = (item) => {
    setItem(item)
    toggle ? setToggle(false) : setToggle(true)
  }
  const loadBlockchainData = async () => {
    //connect to blockchain
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)


    const network = await provider.getNetwork()
    console.log(network)

    //connect to contract
    const dappazon = new ethers.Contract (
      '0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82',
      ABI,
      provider
    )
    setDappazon(dappazon)
    
    const items = []

    for(let i=0; i<9; i++){
      const item = await dappazon.items(i)
      items.push(item)
    }
    console.log(items)
    const tablets = items.filter((item) => item.category === 'tablets')
    const drops = items.filter((item) => item.category === 'drops')
    const kit = items.filter((item) => item.category === 'kit')
    setTablets(tablets)
    setDrops(drops)
    setKit(kit)

  }

  useEffect(() => {
    loadBlockchainData()
  }, [])

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} />
      <div className='logo__homepage'>
      <img className='logo__home' src="https://i.ibb.co/9bDBNT7/Pharma-Sync.png" alt="Pharma-Sync"/>
        <h2>Welcome to PharmaSync</h2>
      </div>
      {tablets && kit && drops && (
        <>
          <Section title={"Tablets"} items={tablets} togglePop={togglePop} />
          <Section title={"Drops"} items={drops} togglePop={togglePop} />
          <Section title={"Kit"} items={kit} togglePop={togglePop} />
        </>
      )}
      {toggle && (
        <Product item={item} provider={provider} account={account} dappazon={dappazon} togglePop={togglePop} />
      )}
    </div>

  );
}

export default App;






