import Review from "./Review";

export default function ReviewList ({reviews}) {
    const reviewItems = reviews.map((r) => 
        <Review key={r.author_name} review={r}/>
    )
    return (
        <div>{reviewItems}</div>
    )
}