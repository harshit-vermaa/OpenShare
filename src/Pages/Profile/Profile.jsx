import React, { useEffect, useState } from 'react'
import Style from "./Profile.module.css"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { logIn, logOut } from "../../store/slice/logSlice";
import Navbar from '../../Components/Navbar/Navbar';
import ReviewCard from '../../Components/ReviewCard/ReviewCard';
import PostReview from '../PostReview/PostReview';



const Profile = () => {
  const PORT = process.env.PORT
  const navigation = useNavigate();
  const [user, setUser] = useState()
  const [token, setToken] = useState()

  const userAuth = async () => {

    const res = await fetch(`https://openshare-server.onrender.com/auth`, {
      method: "GET",
      headers: {
        Accept: "app/json",
        'Content-Type': 'application/json',
        responseType: 'arraybuffer',
      },
      "credentials": "include"
    })

    const data = await res.json()
    if (res.status === 200) {
      setUser(data.user)
      setToken(data.token)
    } else if (res.status === 400 || !res) {
      navigation('/login')
    }
  }

  useEffect(() => {
    userAuth()
  }, [])

  console.log(user)

  const imageData = `data:image/jpeg;base64,${user?.image}`;

  return (
    <>
      {
        !user ? <PostReview /> : <>
          <Navbar />
          <div className={Style.profile} >
            <div className={Style.profileContent}>
              <div className={Style.profileContent_img} style={{ backgroundImage: `url(${imageData})` }} >
              </div>
              <div className={Style.profileContent_data}>
                <h1>Name : {user?.name}</h1>
                <h1>Email : {user?.email}</h1>
                <h1>Total Shares : {user?.reviews?.length}</h1>
                <h1>Bio : {user?.bio}</h1>
              </div>
            </div>
            <h1 className={Style.yourShare} >Your Shares</h1>
            <div className={Style.profileReviews}>
              {
                user?.reviews?.map((item, index) => {
                  return <>
                    <ReviewCard imageUrl={item.image} cardData={item} title={item.title} description={item.description} postId={item._id} token={token} deletePost={true} />
                  </>
                })
              }
            </div>

          </div>
        </>
      }
    </>
  )
}

export default Profile