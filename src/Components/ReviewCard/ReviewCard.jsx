import React, { useState} from 'react'
import Style from "./ReviewCard.module.css"
import Button from '@mui/material/Button';
import { NavLink, useNavigate } from 'react-router-dom';

const ReviewCard = ({ title, description, token, deletePost, cardData, postId, imageUrl }) => {
    const PORT = process.env.PORT
    // const { _id, image } = cardData;
    const imageData = `data:image/jpeg;base64,${imageUrl}`;
    const deleteReview = async () => {
        window.alert("are you sure you want to delete the post ?")
        const postIdToDelete = postId;
        const authToken = token; // Replace with your actual authorization token
        window.location.reload();
        const res = await fetch(`https://openshare-server.onrender.com/delete-post/${postIdToDelete}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json', // Specify the content type for the request
                'Authorization': `Bearer ${authToken}`, // Include the authorization token in the 'Authorization' header
            },
        });

        if (res.ok) {
            console.log('Post Deleted')
        }
    }


    return (
        <div className={Style.reviewCard}>
            <div className={Style.reviewCard_img} style={{ backgroundImage: `url(${imageData})` }} ></div>
            <div className={Style.reviewCard_text}>
                <h1>{title}</h1>
                <p>{description}</p>
                {
                    deletePost ? <Button className={Style.reviewCard_btn} onClick={deleteReview} variant="contained">Delete</Button> : ''
                }
                </div>
          
        </div>
    )
}

export default ReviewCard