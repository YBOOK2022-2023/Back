import getPost from "./handlers/getPost";
import getPostComment from "./handlers/getPostComment";
import getPostLike from "./handlers/getPostLike";
import createPost from "./handlers/createPost";
import createPostLike from "./handlers/createPostLike";
import createPostComment from "./handlers/createPostComment";
import createPostAttachment from "./handlers/createPostAttachment";

export default {
    getPost,
    getPostLike,
    getPostComment,
    createPost,
    createPostLike,
    createPostComment,
    createPostAttachment
}