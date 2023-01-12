import getPost from "./handlers/getPost";
import getPostsHome from "./handlers/getPostsHome";
import createPost from "./handlers/createPost";
import createPostLike from "./handlers/createPostLike";
import createPostComment from "./handlers/createPostComment";
import createPostAttachment from "./handlers/createPostAttachment";

export default {
    getPost,
    createPost,
    createPostLike,
    createPostComment,
    createPostAttachment,
    getPostsHome
}