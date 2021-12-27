import React, {useState} from 'react'
import {authRoutes, publicRoutes} from '../routes'
import {useSelector} from 'react-redux'
import {
    Routes,
    Route,
} from "react-router-dom";
// import {START_ROUTE} from '../utils/consts'


const AppRouter = () => {
    const isAuth = useSelector(state => state.auth.isAuth)

    return (
        <Routes>
            {isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={Component} exact/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={Component} exact/>
            )}
            {/*<Route path={'*'} element={Error} />*/}
        </Routes>
    )
}

export default AppRouter