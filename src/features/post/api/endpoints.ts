export const postEndpoints = {
  fetchPosts: { method: "get", path: "/posts" },
  fetchPostDetail: {
    method: "get",
    path: (postId: number) => `/posts/${postId}`,
  },

  createPost: { method: "post", path: "/posts" },

  likePost: {
    method: "post",
    path: (postId: number) => `/posts/${postId}/like`,
  },
  unlikePost: {
    method: "post",
    path: (postId: number) => `/posts/${postId}/unlike`,
  },

  registerPostImage: {
    method: "post",
    path: (postId: number) => `/posts/${postId}/images/register`,
  },
};
