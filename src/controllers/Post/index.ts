import getPostComments from "./handlers/getPostComments";
import getPostsHome from "./handlers/getPostsHome";
import createPost from "./handlers/createPost";
import createPostLike from "./handlers/createPostLike";
import createPostComment from "./handlers/createPostComment";
import createPostAttachment from "./handlers/createPostAttachment";
import getPostById from "./handlers/getPostById";
import getProfilePosts from "./handlers/getProfilePosts";

export default {
    getProfilePosts,
    getPostComments,
    createPost,
    createPostLike,
    createPostComment,
    createPostAttachment,
    getPostsHome,
    getPostById,
}