import { ethers } from 'ethers';

const Navigation = ({ account, setAccount }) => {


    const connectHandler = async () => {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const account = ethers.utils.getAddress(accounts[0]);
        setAccount(account);
        console.log(account);
    }

    return (
        <nav>
            <div className='nav__brand'>
                <h1>PharmaSync</h1>
            </div>
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
                    <a href='#tablets'>Tablets</a>
                </li>
                <li>
                    <a href='#drops'>Drops</a>
                </li>
                <li>
                    <a href='#kit'>Kit</a>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;