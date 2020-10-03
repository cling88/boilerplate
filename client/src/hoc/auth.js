import Axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action'
import {withRouter} from 'react-router-dom';

export default function(SpecificComponent, option, adminRoute=null) {
    // option
    // null => 아무나 출입가능
    // true => 로그인한 유저만 출입가능
    // flase => 로그인한 유저는 출입불가능


    function AuthenticationCheck(props) {
        const dispatch = useDispatch();

        // 원래는 axios를 쓰는데 우리는 redux를 사용함 [ redux에서 axios를 사용 ]
        useEffect(() => {
            dispatch(auth()).then(response=>{
                console.log(response)

                // 로그인하지않은 상태
                if(!response.payload.isAuth) {
                    if(option) {
                        props.history.push('/login')
                    }
                }else {
                    // 로그인한 상태
                    if(adminRoute && !response.payload.isAdmin) {
                        props.history.push('/')
                    } else {
                        if(option === false) {
                            props.history.push('/')
                        }
                    }
                }
            })
        }, [])

        return (
            <SpecificComponent />
        )
    }
    
    return withRouter(AuthenticationCheck);
}