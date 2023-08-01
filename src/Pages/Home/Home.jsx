import React, { useEffect, useState } from 'react'
import Style from "./Home.module.css"
import Navbar from '../../Components/Navbar/Navbar'
import ReviewCard from '../../Components/ReviewCard/ReviewCard'
import PostReview from '../PostReview/PostReview'

const Home = () => {
  const PORT = process.env.PORT
  const [user, setUser] = useState([])

  const FetchAll = async () => {
    const res = await fetch(`https://openshare-server.onrender.com/home`, {
      method: "GET",
      headers: {
        Accept: "app/json",
        "Content-Type": "applicaiton/json"
      },
      "credentials": "include"
    })

    const data = await res.json()
    setUser(data)
  }

  console.log(user)

  useEffect(() => {
    FetchAll()
  }, [])
  // console.log(user)


  return (
    <>
      <Navbar />
      {
        user.length === 0  ? <PostReview /> :
          <>
            
              {
                user.map((data, idx) => {
                  return <>
                    <div className={Style.home} key={idx} >
                      {
                        data.reviews.map((item, index) => {
                          return <>
                            <ReviewCard imageUrl={item.image} title={item.title} description={item.description} />
                          </>
                        })
                      }
                    </div>
                  </>
                })
              }
          </>
      }
    </>
  )
}

export default Home