import reactLogoGrey from '../assets/react_grey.svg'

export default function Main() {
    return (
    <main>
        <div className='main--header'> Fun facts about React </div>
        <ul className='main--facts'>
            <li>Was first released in 2013</li>
            <li>Was originally created by Jordan Walke</li>
            <li>Has well over 100K stars on GitHub</li>
            <li>Is maintained by Facebook</li>
            <li>Powers thousands of enterprise apps, including mobile apps</li>
        </ul>
        <img className="main--logo" src={reactLogoGrey} ></img>
    </main>
    )
}
