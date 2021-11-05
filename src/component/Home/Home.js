import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './style.scss'
import $ from 'jquery'
import  axios  from 'axios'
import Login from '../Login/Login'
function Home() {

    const [username, setUsername] = useState('u')


    useEffect(()=>{
        axios.request({
            method: 'get',
            url: 'http://localhost:5000/api/getuser',
            withCredentials:true,
        })
        .then(data=>{
            setUsername(data.data.username)
        })
        .catch(err=>{
            console.log('looix',err)
        })
    },[])

    function handleOpenNav(){
        $('.home-nav').toggleClass('active')
    }


    return (
        <div>
            <div className="container-fluid d-flex justify-content-between home-header fixed-top">
                <div className=" d-block my-auto">
                
                <h1 className="fs-4 hover-class"> <i class="fas fa-bars fs-4 me-3 btn-animation hover-class" onClick={()=>handleOpenNav()}></i> Thẻ Nhớ</h1>
                </div>
                <div className="home-input  d-block my-auto d-none d-md-block">
                    <input type="text" placeholder="Tìm phần học..." />
                    <i class="fas fa-search hover-class"></i>
                </div>
                <div className="home-infor  d-block my-auto hover-class">
                    <img src="/avatar.jpg" alt="logo" />
                    <span className="fs-5">{username}</span>
                </div>
            </div>

            {/* nav */}

            <div className="home-nav d-none d-md-block ">
               <div className="nav-item">
                   <Link to='/' className='Link Link-home'>
                    <i class="fas fa-home"></i>
                    <span>Home</span>
                   </Link>
               </div>
               <div className="nav-item">
                   <Link to='/study' className='Link Link-home'>
                   <i class="fab fa-studiovinari"></i>
                   <span>Study</span>
                   </Link>
               </div>
               <div className="nav-item">
                   <Link to='/study' className='Link Link-home'>
                   <i class="fas fa-folder-plus"></i>
                   <span>Add</span>
                   </Link>
               </div>
            </div>

            <div className="body">
                <div className="container">

                </div>
            </div>



        </div>
    )
}

export default Home
