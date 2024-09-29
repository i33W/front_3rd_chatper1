/** @jsx createVNode */
import { createVNode } from "../lib";
import { Footer, Header, Post, PostForm } from "../components";
import { globalStore } from "../stores";
import { addEvent } from "../utils";

export const HomePage = () => {
  const { loggedIn, posts } = globalStore.getState();
  return (
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        {Header({ loggedIn })}
        <main class="p-4">
          {loggedIn ? PostForm() : ""}
          <div id="posts-container" class="space-y-4">
            {posts.map(Post)}
          </div>
        </main>
        {Footer()}
      </div>
    </div>
  );
};

const addPost = (content) => {
  const { currentUser, posts } = globalStore.getState();
  globalStore.setState({
    posts: [
      {
        id: Date.now(),
        author: currentUser.username,
        time: "방금 전",
        content: content,
      },
      ...posts,
    ],
  });
};

addEvent("click", "#post-submit", () => {
  const content = document.getElementById("post-content").value;
  addPost(content);
});
