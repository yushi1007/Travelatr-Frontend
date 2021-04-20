
export default function Review ({review}) {
    const { author_name, profile_photo_url, rating, relative_time_description, text } = review
    return (
        <div>
            <h5>{author_name}</h5>
            <img src={profile_photo_url} alt="avatar" />
            <p>{rating} | {relative_time_description}</p>
            <p>{text}</p>
        </div>
    )
}