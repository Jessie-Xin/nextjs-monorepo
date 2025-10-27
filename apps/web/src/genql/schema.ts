// @ts-nocheck
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Scalars = {
    Boolean: boolean,
    DateTime: any,
    ID: string,
    Int: number,
    JWT: any,
    String: string,
}

export interface Auth {
    /** JWT access token */
    accessToken: Scalars['JWT']
    /** JWT refresh token */
    refreshToken: Scalars['JWT']
    user: User
    __typename: 'Auth'
}

export interface Mutation {
    changePassword: User
    createPost: Post
    login: Auth
    refreshToken: Token
    signup: Auth
    updateUser: User
    __typename: 'Mutation'
}


/** Possible directions in which to order a list of items when provided an `orderBy` argument. */
export type OrderDirection = 'asc' | 'desc'

export interface PageInfo {
    endCursor: (Scalars['String'] | null)
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
    startCursor: (Scalars['String'] | null)
    __typename: 'PageInfo'
}

export interface Post {
    author: (User | null)
    content: (Scalars['String'] | null)
    /** Identifies the date and time when the object was created. */
    createdAt: Scalars['DateTime']
    id: Scalars['ID']
    published: Scalars['Boolean']
    title: Scalars['String']
    /** Identifies the date and time when the object was last updated. */
    updatedAt: Scalars['DateTime']
    __typename: 'Post'
}

export interface PostConnection {
    edges: (PostEdge[] | null)
    pageInfo: PageInfo
    totalCount: Scalars['Int']
    __typename: 'PostConnection'
}

export interface PostEdge {
    cursor: Scalars['String']
    node: Post
    __typename: 'PostEdge'
}


/** Properties by which post connections can be ordered. */
export type PostOrderField = 'content' | 'createdAt' | 'id' | 'published' | 'title' | 'updatedAt'

export interface Query {
    hello: Scalars['String']
    helloWorld: Scalars['String']
    me: User
    post: Post
    publishedPosts: PostConnection
    userPosts: Post[]
    __typename: 'Query'
}


/** User role */
export type Role = 'ADMIN' | 'USER'

export interface Subscription {
    postCreated: Post
    __typename: 'Subscription'
}

export interface Token {
    /** JWT access token */
    accessToken: Scalars['JWT']
    /** JWT refresh token */
    refreshToken: Scalars['JWT']
    __typename: 'Token'
}

export interface User {
    /** Identifies the date and time when the object was created. */
    createdAt: Scalars['DateTime']
    email: Scalars['String']
    firstname: (Scalars['String'] | null)
    id: Scalars['ID']
    lastname: (Scalars['String'] | null)
    posts: (Post[] | null)
    role: Role
    /** Identifies the date and time when the object was last updated. */
    updatedAt: Scalars['DateTime']
    __typename: 'User'
}

export interface AuthGenqlSelection{
    /** JWT access token */
    accessToken?: boolean | number
    /** JWT refresh token */
    refreshToken?: boolean | number
    user?: UserGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ChangePasswordInput {newPassword: Scalars['String'],oldPassword: Scalars['String']}

export interface CreatePostInput {content: Scalars['String'],title: Scalars['String']}

export interface LoginInput {email: Scalars['String'],password: Scalars['String']}

export interface MutationGenqlSelection{
    changePassword?: (UserGenqlSelection & { __args: {data: ChangePasswordInput} })
    createPost?: (PostGenqlSelection & { __args: {data: CreatePostInput} })
    login?: (AuthGenqlSelection & { __args: {data: LoginInput} })
    refreshToken?: (TokenGenqlSelection & { __args: {token: Scalars['JWT']} })
    signup?: (AuthGenqlSelection & { __args: {data: SignupInput} })
    updateUser?: (UserGenqlSelection & { __args: {data: UpdateUserInput} })
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PageInfoGenqlSelection{
    endCursor?: boolean | number
    hasNextPage?: boolean | number
    hasPreviousPage?: boolean | number
    startCursor?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PostGenqlSelection{
    author?: UserGenqlSelection
    content?: boolean | number
    /** Identifies the date and time when the object was created. */
    createdAt?: boolean | number
    id?: boolean | number
    published?: boolean | number
    title?: boolean | number
    /** Identifies the date and time when the object was last updated. */
    updatedAt?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PostConnectionGenqlSelection{
    edges?: PostEdgeGenqlSelection
    pageInfo?: PageInfoGenqlSelection
    totalCount?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PostEdgeGenqlSelection{
    cursor?: boolean | number
    node?: PostGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PostOrder {direction: OrderDirection,field: PostOrderField}

export interface QueryGenqlSelection{
    hello?: { __args: {name: Scalars['String']} }
    helloWorld?: boolean | number
    me?: UserGenqlSelection
    post?: PostGenqlSelection
    publishedPosts?: (PostConnectionGenqlSelection & { __args?: {orderBy?: (PostOrder | null), query?: (Scalars['String'] | null)} })
    userPosts?: PostGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SignupInput {email: Scalars['String'],firstname?: (Scalars['String'] | null),lastname?: (Scalars['String'] | null),password: Scalars['String']}

export interface SubscriptionGenqlSelection{
    postCreated?: PostGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TokenGenqlSelection{
    /** JWT access token */
    accessToken?: boolean | number
    /** JWT refresh token */
    refreshToken?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UpdateUserInput {firstname?: (Scalars['String'] | null),lastname?: (Scalars['String'] | null)}

export interface UserGenqlSelection{
    /** Identifies the date and time when the object was created. */
    createdAt?: boolean | number
    email?: boolean | number
    firstname?: boolean | number
    id?: boolean | number
    lastname?: boolean | number
    posts?: PostGenqlSelection
    role?: boolean | number
    /** Identifies the date and time when the object was last updated. */
    updatedAt?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


    const Auth_possibleTypes: string[] = ['Auth']
    export const isAuth = (obj?: { __typename?: any } | null): obj is Auth => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isAuth"')
      return Auth_possibleTypes.includes(obj.__typename)
    }
    


    const Mutation_possibleTypes: string[] = ['Mutation']
    export const isMutation = (obj?: { __typename?: any } | null): obj is Mutation => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMutation"')
      return Mutation_possibleTypes.includes(obj.__typename)
    }
    


    const PageInfo_possibleTypes: string[] = ['PageInfo']
    export const isPageInfo = (obj?: { __typename?: any } | null): obj is PageInfo => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPageInfo"')
      return PageInfo_possibleTypes.includes(obj.__typename)
    }
    


    const Post_possibleTypes: string[] = ['Post']
    export const isPost = (obj?: { __typename?: any } | null): obj is Post => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPost"')
      return Post_possibleTypes.includes(obj.__typename)
    }
    


    const PostConnection_possibleTypes: string[] = ['PostConnection']
    export const isPostConnection = (obj?: { __typename?: any } | null): obj is PostConnection => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPostConnection"')
      return PostConnection_possibleTypes.includes(obj.__typename)
    }
    


    const PostEdge_possibleTypes: string[] = ['PostEdge']
    export const isPostEdge = (obj?: { __typename?: any } | null): obj is PostEdge => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPostEdge"')
      return PostEdge_possibleTypes.includes(obj.__typename)
    }
    


    const Query_possibleTypes: string[] = ['Query']
    export const isQuery = (obj?: { __typename?: any } | null): obj is Query => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isQuery"')
      return Query_possibleTypes.includes(obj.__typename)
    }
    


    const Subscription_possibleTypes: string[] = ['Subscription']
    export const isSubscription = (obj?: { __typename?: any } | null): obj is Subscription => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSubscription"')
      return Subscription_possibleTypes.includes(obj.__typename)
    }
    


    const Token_possibleTypes: string[] = ['Token']
    export const isToken = (obj?: { __typename?: any } | null): obj is Token => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isToken"')
      return Token_possibleTypes.includes(obj.__typename)
    }
    


    const User_possibleTypes: string[] = ['User']
    export const isUser = (obj?: { __typename?: any } | null): obj is User => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isUser"')
      return User_possibleTypes.includes(obj.__typename)
    }
    

export const enumOrderDirection = {
   asc: 'asc' as const,
   desc: 'desc' as const
}

export const enumPostOrderField = {
   content: 'content' as const,
   createdAt: 'createdAt' as const,
   id: 'id' as const,
   published: 'published' as const,
   title: 'title' as const,
   updatedAt: 'updatedAt' as const
}

export const enumRole = {
   ADMIN: 'ADMIN' as const,
   USER: 'USER' as const
}
