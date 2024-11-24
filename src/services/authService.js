const sampleUserData = [
  {
    id: 1,
    username: "user1",
    password: "password123",
  },
  {
    id: 2,
    username: "user2",
    password: "securepass456",
  },
  {
    id: 3,
    username: "user3",
    password: "123456789",
  },
    {
    id: 4,
    username: "admin",
    password: "admin",
  }
];

export const authenticateUser = (username, password) => {
  const user = sampleUserData.find(user => user.username === username);

  if (!user) {
    return { success: false, message: "User not found." };
  }

  if (user.password !== password) {
    return { success: false, message: "Incorrect password." };
  }

  return { success: true, message: "Login successful.", user };
};
