type cardProps = {
    title:string
    category:string
    thumbnail_image:string
    price:number | string
}
function Card(props : cardProps){
   const {title, category, thumbnail_image, price} = props;
   return(
    <section className="card-props">
        <p>{title}</p>
        <p>{category}</p>
        <picture>
            <img src={thumbnail_image} alt={title} />
            <figcaption>{title}</figcaption>
        </picture>
        <p></p>
        <p>{price}</p>
    </section>
   )
}

export default Card;