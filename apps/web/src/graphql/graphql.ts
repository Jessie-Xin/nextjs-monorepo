/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: string; output: string };
  /** A field whose value is a JSON Web Token (JWT): https://jwt.io/introduction. */
  JWT: { input: any; output: any };
};

export type Auth = {
  __typename?: "Auth";
  /** JWT access token */
  accessToken: Scalars["JWT"]["output"];
  /** JWT refresh token */
  refreshToken: Scalars["JWT"]["output"];
  user: User;
};

export type ChangePasswordInput = {
  newPassword: Scalars["String"]["input"];
  oldPassword: Scalars["String"]["input"];
};

export type CreatePostInput = {
  content: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
};

export type LoginInput = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type Mutation = {
  __typename?: "Mutation";
  changePassword: User;
  createPost: Post;
  login: Auth;
  refreshToken: Token;
  signup: Auth;
  updateUser: User;
};

export type MutationChangePasswordArgs = {
  data: ChangePasswordInput;
};

export type MutationCreatePostArgs = {
  data: CreatePostInput;
};

export type MutationLoginArgs = {
  data: LoginInput;
};

export type MutationRefreshTokenArgs = {
  token: Scalars["JWT"]["input"];
};

export type MutationSignupArgs = {
  data: SignupInput;
};

export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
};

/** Possible directions in which to order a list of items when provided an `orderBy` argument. */
export enum OrderDirection {
  Asc = "asc",
  Desc = "desc",
}

export type PageInfo = {
  __typename?: "PageInfo";
  endCursor?: Maybe<Scalars["String"]["output"]>;
  hasNextPage: Scalars["Boolean"]["output"];
  hasPreviousPage: Scalars["Boolean"]["output"];
  startCursor?: Maybe<Scalars["String"]["output"]>;
};

export type Post = {
  __typename?: "Post";
  author?: Maybe<User>;
  content?: Maybe<Scalars["String"]["output"]>;
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  published: Scalars["Boolean"]["output"];
  title: Scalars["String"]["output"];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars["DateTime"]["output"];
};

export type PostConnection = {
  __typename?: "PostConnection";
  edges?: Maybe<Array<PostEdge>>;
  pageInfo: PageInfo;
  totalCount: Scalars["Int"]["output"];
};

export type PostEdge = {
  __typename?: "PostEdge";
  cursor: Scalars["String"]["output"];
  node: Post;
};

export type PostOrder = {
  direction: OrderDirection;
  field: PostOrderField;
};

/** Properties by which post connections can be ordered. */
export enum PostOrderField {
  Content = "content",
  CreatedAt = "createdAt",
  Id = "id",
  Published = "published",
  Title = "title",
  UpdatedAt = "updatedAt",
}

export type Query = {
  __typename?: "Query";
  hello: Scalars["String"]["output"];
  helloWorld: Scalars["String"]["output"];
  me: User;
  post: Post;
  publishedPosts: PostConnection;
  userPosts: Array<Post>;
};

export type QueryHelloArgs = {
  name: Scalars["String"]["input"];
};

export type QueryPublishedPostsArgs = {
  orderBy?: InputMaybe<PostOrder>;
  query?: InputMaybe<Scalars["String"]["input"]>;
};

/** User role */
export enum Role {
  Admin = "ADMIN",
  User = "USER",
}

export type SignupInput = {
  email: Scalars["String"]["input"];
  firstname?: InputMaybe<Scalars["String"]["input"]>;
  lastname?: InputMaybe<Scalars["String"]["input"]>;
  password: Scalars["String"]["input"];
};

export type Subscription = {
  __typename?: "Subscription";
  postCreated: Post;
};

export type Token = {
  __typename?: "Token";
  /** JWT access token */
  accessToken: Scalars["JWT"]["output"];
  /** JWT refresh token */
  refreshToken: Scalars["JWT"]["output"];
};

export type UpdateUserInput = {
  firstname?: InputMaybe<Scalars["String"]["input"]>;
  lastname?: InputMaybe<Scalars["String"]["input"]>;
};

export type User = {
  __typename?: "User";
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars["DateTime"]["output"];
  email: Scalars["String"]["output"];
  firstname?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  lastname?: Maybe<Scalars["String"]["output"]>;
  posts?: Maybe<Array<Post>>;
  role: Role;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars["DateTime"]["output"];
};
