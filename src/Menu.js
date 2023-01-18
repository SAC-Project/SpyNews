import newsGenres from "./newsGenres"

function Menu({active, setActive, setCategory}){
    const links = newsGenres;

    function onClick(id, value) {
        console.log(`Ai selectat ${id} si ${value}`)
        //setActive(id)
        //setCategory(value)

    }

    return(
        <nav className="menu">
            <ul>
                {links.map(link => (
                    <li
                        key={link.id}
                        className={active === link.id ? "active" : "inactive"}
                        onClick={() => onClick(link.id, link.value)}
                    >
                        {link.name}
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Menu