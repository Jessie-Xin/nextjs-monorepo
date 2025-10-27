export default {
    "scalars": [
        1,
        4,
        5,
        6,
        7,
        10,
        16,
        18,
        20
    ],
    "types": {
        "Auth": {
            "accessToken": [
                7
            ],
            "refreshToken": [
                7
            ],
            "user": [
                24
            ],
            "__typename": [
                20
            ]
        },
        "Boolean": {},
        "ChangePasswordInput": {
            "newPassword": [
                20
            ],
            "oldPassword": [
                20
            ],
            "__typename": [
                20
            ]
        },
        "CreatePostInput": {
            "content": [
                20
            ],
            "title": [
                20
            ],
            "__typename": [
                20
            ]
        },
        "DateTime": {},
        "ID": {},
        "Int": {},
        "JWT": {},
        "LoginInput": {
            "email": [
                20
            ],
            "password": [
                20
            ],
            "__typename": [
                20
            ]
        },
        "Mutation": {
            "changePassword": [
                24,
                {
                    "data": [
                        2,
                        "ChangePasswordInput!"
                    ]
                }
            ],
            "createPost": [
                12,
                {
                    "data": [
                        3,
                        "CreatePostInput!"
                    ]
                }
            ],
            "login": [
                0,
                {
                    "data": [
                        8,
                        "LoginInput!"
                    ]
                }
            ],
            "refreshToken": [
                22,
                {
                    "token": [
                        7,
                        "JWT!"
                    ]
                }
            ],
            "signup": [
                0,
                {
                    "data": [
                        19,
                        "SignupInput!"
                    ]
                }
            ],
            "updateUser": [
                24,
                {
                    "data": [
                        23,
                        "UpdateUserInput!"
                    ]
                }
            ],
            "__typename": [
                20
            ]
        },
        "OrderDirection": {},
        "PageInfo": {
            "endCursor": [
                20
            ],
            "hasNextPage": [
                1
            ],
            "hasPreviousPage": [
                1
            ],
            "startCursor": [
                20
            ],
            "__typename": [
                20
            ]
        },
        "Post": {
            "author": [
                24
            ],
            "content": [
                20
            ],
            "createdAt": [
                4
            ],
            "id": [
                5
            ],
            "published": [
                1
            ],
            "title": [
                20
            ],
            "updatedAt": [
                4
            ],
            "__typename": [
                20
            ]
        },
        "PostConnection": {
            "edges": [
                14
            ],
            "pageInfo": [
                11
            ],
            "totalCount": [
                6
            ],
            "__typename": [
                20
            ]
        },
        "PostEdge": {
            "cursor": [
                20
            ],
            "node": [
                12
            ],
            "__typename": [
                20
            ]
        },
        "PostOrder": {
            "direction": [
                10
            ],
            "field": [
                16
            ],
            "__typename": [
                20
            ]
        },
        "PostOrderField": {},
        "Query": {
            "hello": [
                20,
                {
                    "name": [
                        20,
                        "String!"
                    ]
                }
            ],
            "helloWorld": [
                20
            ],
            "me": [
                24
            ],
            "post": [
                12
            ],
            "publishedPosts": [
                13,
                {
                    "orderBy": [
                        15
                    ],
                    "query": [
                        20
                    ]
                }
            ],
            "userPosts": [
                12
            ],
            "__typename": [
                20
            ]
        },
        "Role": {},
        "SignupInput": {
            "email": [
                20
            ],
            "firstname": [
                20
            ],
            "lastname": [
                20
            ],
            "password": [
                20
            ],
            "__typename": [
                20
            ]
        },
        "String": {},
        "Subscription": {
            "postCreated": [
                12
            ],
            "__typename": [
                20
            ]
        },
        "Token": {
            "accessToken": [
                7
            ],
            "refreshToken": [
                7
            ],
            "__typename": [
                20
            ]
        },
        "UpdateUserInput": {
            "firstname": [
                20
            ],
            "lastname": [
                20
            ],
            "__typename": [
                20
            ]
        },
        "User": {
            "createdAt": [
                4
            ],
            "email": [
                20
            ],
            "firstname": [
                20
            ],
            "id": [
                5
            ],
            "lastname": [
                20
            ],
            "posts": [
                12
            ],
            "role": [
                18
            ],
            "updatedAt": [
                4
            ],
            "__typename": [
                20
            ]
        }
    }
}