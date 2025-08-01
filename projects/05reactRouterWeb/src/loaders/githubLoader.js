// Loader function for GitHub API
export const githubInfo = async () => {
  const response = await fetch(
    "https://api.github.com/users/swayamyadav05"
  );

  if (!response.ok) {
    throw new Error(`GitHub API Error: ${response.status}`);
  }

  return response.json();
};
