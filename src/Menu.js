function Menu({active, setActive, setCategory}){
     const links = [
    { id: 1, name: "ACTION", value: "action" },
    { id: 1, name: "COMEDY", value: "comedy" },
    { id: 1, name: "HEALTH", value: "health" },
    { id: 1, name: "ROMANCE", value: "romance" },
    { id: 1, name: "SPORTS", value: "sports" },
    { id: 1, name: "TRAGEDY", value: "tragedy" },
  ]


    function onClick(id, value) {
        setActive(id)
        setCategory(value)
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