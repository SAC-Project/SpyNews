function NewsItem({ item, clickOnItem }) {
    const websiteUrl = item.url
    const website = websiteUrl.split('https://').pop().split('/')[0]

    const date = item.publishedAt
    const formatDate = date.replace('T', ' ')
    const formatTime = formatDate.replace('Z', '')

    return (
        <div className="article" onClick={() => clickOnItem(item)}>
            <div className="article-image">
                <img src={item.urlToImage} alt={item.title} />
            </div>
            <div className="article-content">
                <div className="article-source">
                    <img src={`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,
                    URL&url=http://${website}&size=16`} alt={item.source.id} />
                    <span>{item.source.name}</span>
                </div>
                <div className="article-title">
                    <h2>{item.title}</h2>
                </div>
                <p className="article-description">
                    {item.description}
                </p>
                <div className="article-description" style={{display: "flex", flexDirection: "column"}}>
                    <span>Action: {item.action}</span>
                    <span>Comedy: {item.comedy}</span>
                    <span>Sports: {item.sports}</span>
                    <span>Health: {item.health}</span>
                    <span>Tragedy: {item.tragedy}</span>
                    <span>Romance: {item.romance}</span>
                </div>
                <div className="article-details">
                    <small><b>Published At: </b>{formatTime}</small>
                </div>
            </div>
        </div>
    )
}

export default NewsItem