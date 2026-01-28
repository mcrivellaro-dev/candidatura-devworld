
export const fetchUsers = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const json = await response.json();
  return json;
}

export const fetchUserDetails = async (userId: number) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users/' + userId);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const json = await response.json();
  return json;
}