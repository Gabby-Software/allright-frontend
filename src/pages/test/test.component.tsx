import React, {useState, useEffect} from 'react';
import Styles from './test.styles';
import IdentityLayout from "../../layouts/identity-layout/identity-layout.component";
import IdentitySidebar from "../../layouts/identity-sidebar/identity-sidebar.component";
import {Routes} from "../../enums/routes.enum";

const Test = () => {
    return (
        <IdentityLayout sidebar={() => (
            <>
                     <IdentitySidebar.Title>Welcome back!</IdentitySidebar.Title>
                     <IdentitySidebar.Subtitle>Sign into your account</IdentitySidebar.Subtitle>
                     <IdentitySidebar.Hr/>
                     <IdentitySidebar.Desc>Don't have an account?</IdentitySidebar.Desc>
                     <IdentitySidebar.Link to={Routes.LOGIN}>Sign up for a new account</IdentitySidebar.Link>
            </>
        )}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, autem corporis deleniti deserunt excepturi exercitationem fugit incidunt laborum magnam magni maiores minima modi molestiae nisi nulla odio pariatur, perspiciatis possimus praesentium quae quaerat qui quod reiciendis sed tenetur ut voluptas? Accusamus, alias dolor dolores eaque excepturi id illo ipsum laboriosam magni numquam perspiciatis quisquam rerum, sed tenetur vel? Animi asperiores assumenda beatae cum dolor, dolore esse est explicabo illum impedit ipsam non nostrum placeat provident quae quidem repellat, temporibus vero. Ab adipisci atque, aut corporis dicta explicabo facilis labore, laborum minima mollitia natus obcaecati, omnis provident quaerat quisquam reiciendis sequi.
        </IdentityLayout>
    )
};

export default Test;
