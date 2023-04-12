import React, { Fragment } from 'react';
import Header from './Header';
import HomeBanner from '../../module/home/HomeBanner';
import HomeFeature from '../../module/home/HomeFeature';
import HomeNewest from '../../module/home/HomeNewest';



const Layout = ({childrent}) => {
    return (
        <Fragment>
            <Header></Header>
            {childrent}
            <HomeBanner></HomeBanner>
            <HomeFeature></HomeFeature>
            <HomeNewest></HomeNewest>
        </Fragment>
    );
};

export default Layout;