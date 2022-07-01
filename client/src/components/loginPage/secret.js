import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const Secret = ()=>{
    const au = localStorage.getItem('user')
    return au ? <Outlet/>:<Navigate to=''/>
}


