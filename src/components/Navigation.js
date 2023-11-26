import { ethers } from 'ethers';
import { Link } from 'react-router-dom';

const Navigation = ({ account, setAccount }) => {


    const connectHandler = async () => {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const account = ethers.utils.getAddress(accounts[0]);
        setAccount(account);
        console.log(account);
    }

    return (
        <nav>

               <a className='link__header' href='/'>
               <div className='nav__brand'>
                    <h1>PharmaSync</h1>
                    <div>
                        <img src="https://img.icons8.com/ios/50/000000/ethereum.png" alt="Ethereum" />
                    </div>
                </div>
               </a>

            <input
                type="text"
                placeholder="Search"
                className="nav__search"
            />


            {
                account ?
                    <button
                        type='button'
                        className='nav__connect'
                    >
                        {account.slice(0, 6) + "..." + account.slice(42)}
                    </button>
                    :
                    <button
                        type='button'
                        className='nav__connect'
                        onClick={connectHandler}
                    >
                        Connect
                    </button>
            }

            <ul className='nav__links'>
                <li>
                    <a href='#Tablets'>Tablets</a>
                </li>
                <li>
                    <a href='#Drops'>Drops</a>
                </li>
                <li>
                    <a href='#Kit'>Kit</a>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;