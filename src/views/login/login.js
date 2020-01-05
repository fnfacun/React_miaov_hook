import React, { useState } from 'react';
import { connect } from "react-redux";
import login from "../../store/action/login"
import {withRouter} from "react-router-dom";
import {useBack} from "../../common/hook/index";

function LoginBox(props) {
    let [user, setUser] = useState(""); // 用户名
    let [password, setPassword] = useState(""); // 密码
    let [vcode, setVcode] = useState("");   // 验证码
    let [vcodeShow, setVcodeShow] = useState(false);    // 是否显示验证码
    let [vcodeSrc, setVcodeSrc] = useState("/miaov/user/verify?" + Date.now()); // 图片请求
    let back = useBack(props.history);  // 路由跳转
    function toLogin() {
        props.dispatch(login({
            verify: vcode,
            username: user,
            password
        })).then(data => {
            alert(data.msg);
            setTimeout(() => {
                if (data.code != 0) {
                    setVcodeSrc("/miaov/user/verify?" + Date.now())
                } else {
                    back();
                }
            }, 100);
        })
    }
    return (
        <div className="login_box">
            <figure className="user_img">
                <img src="../../common/images/user_img.png" alt="" />
                <figcaption>如有账号，请直接登录</figcaption>
            </figure>
            <div className="login_form">
                <p>
                    <input
                        type="text"
                        placeholder="用户名"
                        value={user}
                        onChange={e => {
                            setUser(e.target.value);
                        }}
                    />
                </p>
                <p>
                    <input
                        type="password"
                        placeholder="请输入密码"
                        value={password}
                        onChange={e => {
                            setPassword(e.target.value);
                        }}
                    />
                </p>
                <p className="clearfix">
                    <input
                        className="verifyCode"
                        type="text"
                        placeholder="验证码"
                        value={vcode}
                        onChange={e => {
                            setVcode(e.target.value);
                        }}
                        onFocus={() => {
                            setVcodeShow(true);
                        }}
                    />
                    {vcodeShow ?
                        <img
                            className="verify"
                            src={vcodeSrc}
                            onClick={() => {
                                setVcodeSrc("/miaov/user/verify?" + Date.now())
                            }}
                        />
                        : ""}
                </p>
                <button
                    className="form_btn"
                    onClick={toLogin}
                >登录</button>
                <p className="form_tip">没有帐号？<a href="#">立即注册</a></p>
            </div>
        </div>
    )
};
// 注入 dispatch 到 props And withRouter 
export default connect(res => res)(withRouter(LoginBox));