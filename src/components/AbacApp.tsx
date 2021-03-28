import { UserInfo } from "os";
import * as React from "react";
import { AbacProvider, AllowedTo } from "react-abac";
import App from './App';

enum permissions {
    VIEW_POSTS_LIST = 'VIEW_POST_LISTS',
    VIEW_POSTS = 'VIEW_POSTS',
    EDIT_POST = 'EDIT_POST',
    SIGN_UP = 'SIGN_UP',
    SIGN_IN = 'SIGN_IN',
}

enum Role {
    ADMIN =  'ADMIN',
    VISITOR = 'VISITOR',
    USER = 'USER',
}

const rules = {
    [Role.ADMIN]: {
        [permissions.VIEW_POSTS_LIST]: true,
        [permissions.VIEW_POSTS]: true,
        [permissions.EDIT_POST]: true,
    },
    [Role.USER]: {        
        [permissions.VIEW_POSTS_LIST]: true,
        [permissions.VIEW_POSTS]: true,
        [permissions.EDIT_POST]: (post: Post, user: Usuario) => post.autor_id === user.id,
    },
    [Role.VISITOR]: {
        [permissions.VIEW_POSTS_LIST]: true,
        [permissions.VIEW_POSTS]: true,
    }
};