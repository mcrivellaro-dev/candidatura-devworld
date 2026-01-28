export const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const json = await response.json();
  return json;
}

export const fetchPostDetails = async (postId: string) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/' + postId);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const json = await response.json();
  return json;
}