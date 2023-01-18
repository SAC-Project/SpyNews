import NewsItem from './NewsItem'

function NewsGrid({ items, clickOnItem }) {
    return (
        <div className='news-grid'>
            {items.map((item, i) => (
                <NewsItem key={i} item={item} clickOnItem={clickOnItem}/>
            ))}
        </div>
    )

}

export default NewsGrid