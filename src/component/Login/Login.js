import React, { useState } from 'react'
import './style.scss'
import axios from'axios'
import $ from'jquery'
function Login() {
    const [sign,setSign]= useState('signIn')

    function handleOnClick(a){
        a==='signIn'? setSign('signIn'):setSign('signUp')
    }

    function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function login(){
        console.log($('#login-username').val())
        axios({
            method: 'post',
            url: 'http://localhost:5000/post/login',
            data:{
                username: $('#login-username').val(),
                password: $('#login-password').val()
            }
        }).then(data=>{
                console.log(data)

            if(data.data.status === 'success'){
                setCookie('tokenLogin',data.data.tokenLogin)
                // window.location.replace("http://webcoban.vn");
                console.log('thanhf cong')
            }
            else{
                alert('Thông tin đăng nhập không đúng')
            }
        }).catch(err=>{
            console.log('Không có tiền nên sever ngủm rồi')
        })
        
    }

    function register() {
        if($('#repeat-password').val() === $('#register-password').val()){
            axios({
                method: 'post',
                 url: 'http://localhost:5000/post/register',
                 data:{
                     username:$('#register-username').val(),
                     password:$('#register-password').val()
                 }
            }).then(data=>{
                    console.log(data)
                    if(data.data.status === 'success'){
                        alert('đăng ký tài khoản thành công!')
                        setSign('signIn')
                    }else{
                        alert('vui lòng chọn tên đăng nhập khác!')
                    }
                 })
        }
        else{
            alert('repeat password không trùng khớp')
        }
    }



    return (
        <div className="d-flex login">
            <div className=" mx-auto form my-auto">
                {sign === 'signIn' && (
                    <div className="form-input">
                        <div className='d-flex justify-content-around fs-3 my-4'>
                            <div className="hover-class " onClick={ ()=> handleOnClick('signIn')}>SIGN IN</div>
                            <div className="hover-class dismit" onClick={ ()=> handleOnClick('signUp')} >SIGN UP</div>
                        </div>
                        <div className="username mb-3">
                            <div className="username-text text my-1">USERNAME</div>
                            <input type="text" name="" id="login-username" className="username-input" className="w-100" />
                        </div>
                        <div className="password mb-3">
                            <div className="password-text text my-1">PASSWORD</div>
                            <input type="password" name="" id="login-password" className="password-input" className="w-100" />
                        </div>
                        <div className="checkbox mb-3"></div>
                        <input type="checkbox" id="check"  required/>
                        <label htmlFor="check">Keep me signed in</label>
                        <div className="submit my-5 bg-primary text-center hover-class" onClick={()=> login()}>
                            SIGN IN
                        </div>
                    </div>
                )}

                {sign === 'signUp' && (
                    <div className="form-input">
                        <div className='d-flex justify-content-around fs-3 my-4'>
                            <div className="hover-class dismit"  onClick={ ()=> handleOnClick('signIn')} >SIGN IN</div>
                            <div className="hover-class "  onClick={ ()=> handleOnClick('signUp')} >SIGN UP</div>
                        </div>
                        <div className="username mb-3">
                            <div className="username-text text my-1">USERNAME</div>
                            <input type="text" name="" id="register-username" className="register-username" className="w-100"  />
                        </div>
                        <div className="password mb-3">
                            <div className="password-text text my-1">PASSWORD</div>
                            <input type="password" name="" id="register-password" className="password-input" className="w-100" />
                        </div>
                        <div className="password mb-3">
                            <div className="password-text text my-1">REPEAT PASSWORD</div>
                            <input type="password" name="" id="repeat-password" className="password-input" className="w-100" />
                        </div>
                        <div className="submit my-5 bg-primary text-center hover-class" onClick={()=>register()}>
                            SIGN UP
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Login
